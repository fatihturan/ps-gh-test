import { useCallback, useRef, useState, useEffect } from 'react';
import {
    AppContextProvider,
    AppContextType,
    ChatContextProvider,
    ChatContextType
} from '@/state';
import Chat from '@/screens/chat';
import { useSocket } from '@/utils/websocket';
import { v4 as uuidv4 } from 'uuid';
import { capitalizeFirstLetter } from './utils/string';
import logger from '@/utils/datadogLogger';
import { groupDataByTimePeriods } from './utils/group-by-data';
import { Sidetab, Popover } from '@typeform/embed-react';
import { ChatWithMessages } from './screens/chat-with-messages';
import { convertChatHistory } from '@/utils/convert-chat-history';

//TODO - Mabye we can remove this but right now window.context.isJaxonUser is a string
const toBoolean = (str: string): boolean => {
    return str.toLowerCase() === 'true';
};

function App() {
    const domainName = window.location.host;
    const wssProtocol =
        window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const webSocketUrl = `${wssProtocol}${domainName}/chat/ws/chat/${window.context.chatSessionId}/`;

    // if (import.meta.env.DEV) {
    //     console.log('Running in development mode');
    // } else {
    //     console.log('Running in production mode');
    // }

    //Set default pro mode depending on certain conditions
    const isJaxonUser = toBoolean(window.context.isJaxonUser);
    const [chatsRemaining, setChatsRemaining] = useState(
        window.context.MAX_CHAT_COUNT - window.context.currentChatCount
    );
    const proModeDefault = isJaxonUser && chatsRemaining > 0;

    const [context, setContext] = useState<ChatContextType>({
        chatUrl: '/chat/',
        loginedUser: {
            id: window.context.username,
            name: 'John Doe',
            email: 'john.doe@example.com',
            avatar: '/images/avatar.png',
            surveys: window.context.surveys || []
        },
        chatHistory: groupDataByTimePeriods(window.context.userSessions).map(
            ({ label, data }) => ({
                id: uuidv4(),
                title: label,
                count: data.length,
                content: data.map(({ fields: { summary, session_id } }) => ({
                    id: session_id,
                    text: summary
                }))
            })
        ),
        messages: convertChatHistory(window.context.chatHistory),
        informationBoxData: window.context.infobox,
        sampleQuestions: window.context.questions,
        //set default suggestions to the templated sample questions so when you reload a session you still have some suggestions.  TODO:  This should be set to relevant suggestions
        suggestions: window.context.questions,
        sessionId: window.context.chatSessionId,
        events: window.context.events || [],
        setContext: (context: Partial<ChatContextType>) => {
            setContext((prev) => ({ ...prev, ...context }));
        },
        chatId: null,
        thumbAction: (chatId: string, type: 'up' | 'down') => {
            setContext((prev) => {
                const updatedMessages = prev.messages.map((msg) => {
                    if (msg.chatId === chatId && msg.sender === 'assistant') {
                        return {
                            ...msg,
                            thumbsUp: type === 'up',
                            thumbsDown: type === 'down'
                        };
                    }
                    return msg;
                });
                return {
                    ...prev,
                    messages: updatedMessages
                };
            });

            sendJsonMessage({
                chat_id: chatId,
                action: type
            });
        },
        thumbFeedback: (chatId: string, feedback: string) => {
            console.log('thumbFeedback', chatId, feedback);
            sendJsonMessage({
                chat_id: chatId,
                feedback: feedback
            });
        },
        informationBoxOpen: false,
        setInformationBoxOpen: (open: boolean) => {
            setContext((prev) => ({
                ...prev,
                informationBoxOpen: open
            }));
        },
        betSlipsWithGraphData: {},
        profile_picture: window.context.profile_picture || '/images/avatar.png',
        categorizedSuggestions: window.context.categorized_suggestions || [],
        monthlyPeriodEndString: window.context.monthlyPeriodEndString || '',
        proModeDisabled: false,
        setProModeDisabled: (disabled: boolean) => {
            setContext((prev) => ({
                ...prev,
                proModeDisabled: disabled
            }));
        },
        proMode: !!proModeDefault,
        changeProMode: () => {
            setContext((prev) => ({
                ...prev,
                proMode: !prev.proMode
            }));
        },
        betSlipsWithMetadata: {}
    });

    const [appContext, setAppContext] = useState<AppContextType>({
        errorMessage: '',
        warningMessage: '',
        MAX_CHAT_COUNT: window.context.MAX_CHAT_COUNT || 0,
        chatsRemaining,
        isJaxonUser: toBoolean(window.context.isJaxonUser)
    });

    const CHAT_WARNING_THRESHOLD = 10;
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    //TODO - Set default pro mode depending on certain conditions
    const streamMessage = useRef<string>('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSocketError = (error: unknown) => {
        console.error('WebSocket Error:', error);
        logger.warn('WebSocketError', {
            chatSessionId: window.context.chatSessionId
        });
        setAppContext((prev) => ({
            ...prev,
            errorMessage: 'Connection Lost. Please refresh the page.'
        }));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleSocketClose = () => {
        console.warn('WebSocket closed:');
        logger.warn('WebSocketClosed', {
            chatSessionId: window.context.chatSessionId
        });
        setAppContext((prev) => ({
            ...prev,
            errorMessage: 'Connection Lost. Please refresh the page.'
        }));
    };

    const addMessage = (
        message: string,
        sender: 'assistant' | 'you',
        options: {
            fakeStream?: boolean;
            id?: string;
            waiting?: boolean;
            chatId: string;
            thumbsUp?: boolean;
            thumbsDown?: boolean;
        } = { chatId: '-_-' }
    ) => {
        const {
            id,
            fakeStream,
            waiting = false,
            chatId,
            thumbsUp,
            thumbsDown
        } = options;
        const _id = id || uuidv4();

        if (fakeStream) {
            const _messageChunks = message.split(' ');

            function addMessageChunk(index: number = 0) {
                setTimeout(() => {
                    setContext((prev) => ({
                        ...prev,
                        messages: [
                            ...prev.messages.filter((m) => m.id !== _id),
                            {
                                id: _id,
                                chatId,
                                sender,
                                text: _messageChunks.slice(0, index).join(' '),
                                waiting: true,
                                thumbsUp: thumbsUp || false,
                                thumbsDown: thumbsDown || false
                            }
                        ]
                    }));
                    if (index < _messageChunks.length) {
                        addMessageChunk(index + 1);
                    } else {
                        setContext((prev) => ({
                            ...prev,
                            messages: [
                                ...prev.messages.filter((m) => m.id !== _id),
                                {
                                    id: _id,
                                    chatId,
                                    sender,
                                    text: _messageChunks
                                        .slice(0, index)
                                        .join(' '),
                                    waiting: false,
                                    thumbsUp: thumbsUp || false,
                                    thumbsDown: thumbsDown || false
                                }
                            ]
                        }));
                    }
                }, 50);
            }
            addMessageChunk();
        } else if (id) {
            setContext((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages.filter((m) => m.id !== _id),
                    {
                        id,
                        chatId,
                        sender,
                        text: message,
                        waiting,
                        thumbsUp: thumbsUp || false,
                        thumbsDown: thumbsDown || false
                    }
                ]
            }));
        } else {
            setContext((prev) => ({
                ...prev,
                messages: [
                    ...prev.messages,
                    {
                        id: _id,
                        chatId,
                        sender,
                        text: message,
                        waiting,
                        thumbsUp: thumbsUp || false,
                        thumbsDown: thumbsDown || false
                    }
                ]
            }));
        }
    };

    const { sendJsonMessage, socketStatus } = useSocket({
        url: webSocketUrl,
        onMessage: (message: unknown) => {
            if (typeof message === 'string') {
                try {
                    const messageJSON = JSON.parse(message);

                    if (messageJSON.type === 'chat_id') {
                        // Handle chat ID message
                        setContext((prev) => ({
                            ...prev,
                            chatId: messageJSON.chat_id
                        }));
                    } else if (
                        messageJSON.event === 'on_parser_stream' ||
                        messageJSON.event === 'on_parser_start'
                    ) {
                        // Handle assistant streaming messages
                        const { chat_id, data } = messageJSON;
                        if (messageJSON.event === 'on_parser_start') {
                            // Reset streamMessage for new assistant message
                            streamMessage.current = '';
                        }
                        streamMessage.current += data.chunk;

                        addMessage(streamMessage.current, 'assistant', {
                            chatId: chat_id,
                            id: messageJSON.run_id,
                            waiting: true
                        });
                    } else if (messageJSON.type === 'assistant_message') {
                        // Handle assistant message
                        const { chat_id, message: assistantMessage } =
                            messageJSON;

                        addMessage(assistantMessage, 'assistant', {
                            chatId: chat_id,
                            waiting: false, // Ensure waiting is false for complete messages
                            thumbsUp: false,
                            thumbsDown: false
                        });
                    } else if (messageJSON.type === 'end_of_stream') {
                        // Handle end of stream
                        const { chat_id } = messageJSON;

                        setContext((prev) => {
                            const updatedMessages = prev.messages.map((msg) => {
                                if (msg.chatId === chat_id && msg.waiting) {
                                    return { ...msg, waiting: false };
                                }
                                return msg;
                            });
                            return { ...prev, messages: updatedMessages };
                        });
                        setLoading(false);
                        streamMessage.current = '';

                        setTimeout(() => {
                            fetch(`betcard/${chat_id}/`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    if (data && data.length > 0) {
                                        const isMobile =
                                            window.innerWidth < 768;

                                        console.log('data', data);
                                        setContext((prev) => ({
                                            ...prev,
                                            informationBoxData: data,
                                            informationBoxOpen: !isMobile
                                        }));
                                    }
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });

                            fetch(`suggestedqueries/${messageJSON.chat_id}/`, {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log('SuggestedQueries:', data);
                                    setContext((prev) => ({
                                        ...prev,
                                        suggestions: data[0]
                                    }));
                                    logger.info('SuggestedQueries', {
                                        chatId: chat_id,
                                        chatSessionId:
                                            window.context.chatSessionId,
                                        suggestions: data[0]
                                    });
                                })
                                .catch((error) => {
                                    console.error('Error:', error);
                                });
                        }, 0);
                    } else if (messageJSON.type === 'thumbs_action_response') {
                        // Handle thumbs action response (optional)
                        if (!messageJSON.success) {
                            // Optionally handle error (e.g., show a notification)
                            console.error(
                                'Thumbs action failed:',
                                messageJSON.message
                            );
                        }
                    }
                } catch (e) {
                    console.log('error', e);
                    // If JSON parsing fails, handle the raw message
                    if (message === 'end_of_stream') {
                        // Handle end of stream without JSON
                        setContext((prev) => ({
                            ...prev,
                            messages: prev.messages.map((msg, index) =>
                                index === prev.messages.length - 1
                                    ? { ...msg, waiting: false }
                                    : msg
                            )
                        }));
                        setLoading(false);
                        streamMessage.current = '';
                    } else {
                        // Handle raw assistant message (unlikely)
                        addMessage(message, 'assistant', {
                            fakeStream: true,
                            chatId: context.chatId || '-_-'
                        });
                    }
                }
            }
        },
        onError: handleSocketError,
        onClose: handleSocketClose
    });

    const onSend = useCallback(() => {
        setLoading(true);
        sendJsonMessage({
            message,
            history: context.messages
                .map(
                    (m) => `${capitalizeFirstLetter(m.sender)}: ${m.text}\n\n\n`
                )
                .join(''),
            proMode: context.proMode
        });

        addMessage(message, 'you', {
            waiting: false, // Ensure waiting is false for user messages
            thumbsUp: false,
            thumbsDown: false,
            chatId: context.chatId || '-_-'
        });
        setMessage('');
        setContext((prev) => ({
            ...prev,
            chatId: null,
            sampleQuestions: [], //nulls out sample / suggested queries
            suggestions: []
        }));
        setChatsRemaining(
            (prev) => (context.proMode ? Math.max(0, prev - 1) : prev) // No change for Light questions
        );
        logger.info('PressedSend', {
            chatSessionId: window.context.chatSessionId
        });
    }, [sendJsonMessage, message, context]);

    useEffect(() => {
        if (socketStatus === 'Open') {
            console.log('socketStatus:', socketStatus);
            //Only log if we are changing from an error message to no error message
            if (appContext.errorMessage) {
                logger.info('SetErrorMessageNull', {
                    chatSessionId: window.context.chatSessionId,
                    socketStatus: socketStatus,
                    errorMessage: appContext.errorMessage !== null
                });
            }

            if (appContext.errorMessage !== null) {
                setAppContext((prev) => ({
                    ...prev,
                    errorMessage: null
                }));
            }
        } else if (socketStatus === 'Closed' || socketStatus === 'Closing') {
            console.log('socketStatus:', socketStatus);
            handleSocketClose();
            logger.warn('HandleSocketClose', {
                chatSessionId: window.context.chatSessionId,
                socketStatus: socketStatus,
                errorMessage: appContext.errorMessage !== null
            });
        } else if (socketStatus === 'Uninstantiated') {
            console.log('socketStatus:', socketStatus);
            handleSocketError('Websocket Error');
            logger.warn('HandleSocketError', {
                chatSessionId: window.context.chatSessionId,
                socketStatus: socketStatus,
                errorMessage: appContext.errorMessage !== null
            });
        } else if (socketStatus === 'Error') {
            console.log('socketStatus:', socketStatus);
            handleSocketError('Websocket Error');
            logger.warn('HandleSocketError', {
                chatSessionId: window.context.chatSessionId,
                socketStatus: socketStatus,
                errorMessage: appContext.errorMessage !== null
            });
        } else if (socketStatus === 'Connecting') {
            console.log('socketStatus:', socketStatus);
            if (appContext.errorMessage !== 'Connecting to Chat Server...') {
                setAppContext((prev) => ({
                    ...prev,
                    errorMessage: 'Connecting to Chat Server...'
                }));
            }
        }
    }, [
        handleSocketClose,
        handleSocketError,
        socketStatus,
        appContext.errorMessage,
        appContext.warningMessage
    ]);

    useEffect(() => {
        if (chatsRemaining <= CHAT_WARNING_THRESHOLD && isJaxonUser) {
            setAppContext((prev) => ({
                ...prev,
                warningMessage: `You have ${chatsRemaining} Pro Chats Remaining`
            }));
            if (chatsRemaining <= 0) {
                setContext((prev) => ({
                    ...prev,
                    proMode: false,
                    proModeDisabled: true
                }));
            }
        } else {
            setAppContext((prev) => ({
                ...prev,
                warningMessage: null
            }));
        }
    }, [context, isJaxonUser, chatsRemaining]);

    /*
    const [events, setEvents] = useState<typeof window.context.events>({});
    const [categorized_suggestions, setCategorizedSuggestions] = useState<typeof window.context.categorized_suggestions>({});

    const [events, setEvents] = useState<typeof window.context.events>({});
    const [categorized_suggestions, setCategorizedSuggestions] = useState<
        typeof window.context.categorized_suggestions
    >({});

    // Initialize context events and suggested querieson mount
    useEffect(() => {
        if (!window.context.events) {
            window.context.events = {};
        }
        setEvents(window.context.events);

        if (!window.context.categorized_suggestions) {
            window.context.categorized_suggestions = {};
        }
        setCategorizedSuggestions(window.context.categorized_suggestions);

        // fetch /suggestedqueries on mount and log the response

        //fetch(`suggestedqueries/${window.context.events.NFL['2024-12-17'][0].id}/`, {
        fetch(`suggestedqueries/MRKT_a4e8a0b5c69f4189869f4ddca457ec8f/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Suggested queries response:', data);
            })
            .catch((error) => {
                console.error('Error fetching suggested queries:', error);
            });
    }, []);

    // Monitor events changes
    useEffect(() => {
        if (events) {
            console.log('Events from context:', events);
        }
    }, [events]);

    useEffect(() => {
        if (categorized_suggestions) {
            console.log('Categorized Suggestions:', categorized_suggestions);
        }
    }, [categorized_suggestions]);

    // Monitor chart data changes

    useEffect(() => {
        //iterate over the information box items and get the item id
        if (
            context.informationBoxData &&
            context.informationBoxData.length > 0
        ) {
            context.informationBoxData.forEach((item) => {
                console.log('Information Box Item ID:', item.id);
                console.log('Information Box Item Line:', item.bets[0].line);
                fetch(`chartdata/${item.id}/${item.bets[0].line}/metadata/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Chart Summary:', data);

                        logger.info('Chart Summary', {
                            chatId: item.id,
                            chatSessionId: window.context.chatSessionId,
                            chartData: data
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });

                fetch(
                    `chartdata/${item.id}/${item.bets[0].line}/historicData/`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Chart Data:', data);

                        logger.info('Chart Data', {
                            chatId: item.id,
                            chatSessionId: window.context.chatSessionId,
                            chartData: data
                        });
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        }
    }, [context.informationBoxData]);

    useEffect(() => {
        if (
            context.informationBoxData &&
            context.informationBoxData.length > 0
        ) {
            context.informationBoxData.forEach((item) => {
                // First fetch for metadata
                fetch(`chartdata/${item.id}/${item.bets[0].line}/metadata/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log('Chart Summary:', data);
                        logger.info('Chart Summary', {
                            chatId: item.id,
                            chatSessionId: window.context.chatSessionId,
                            chartData: data
                        });
                    })
                    .catch((error) => console.error('Error:', error));

                // Second fetch with corrected filters
                const filters = {
                    //gamesBack: 10,
                    //location: 'home',
                };
                const encodedFilters = encodeURIComponent(
                    JSON.stringify(filters)
                );

                const url = `chartdata/${item.id}/${item.bets[0].line}/historicData/?filters=${encodedFilters}`;

                fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(
                                `HTTP error! status: ${response.status}`
                            );
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log('Chart Data:', data);
                        logger.info('Chart Data', {
                            chatId: item.id,
                            chatSessionId: window.context.chatSessionId,
                            chartData: data
                        });
                    })
                    .catch((error) => {
                        console.error('Error fetching chart data:', error);
                        logger.error('Chart Data Error', {
                            chatId: item.id,
                            error: error.message
                        });
                    });
            });
        }
    }, [context.informationBoxData]);
    */
    return (
        <AppContextProvider value={appContext}>
            <ChatContextProvider
                value={{
                    ...context,
                    loading: loading || socketStatus === 'Connecting'
                }}
            >
                {context.messages.length == 0 ? (
                    <Chat
                        message={message}
                        setMessage={setMessage}
                        onSend={onSend}
                    />
                ) : (
                    <ChatWithMessages
                        message={message}
                        setMessage={setMessage}
                        onSend={onSend}
                    />
                )}

                {window.context.currentChatCount >= 20 &&
                    !context.loginedUser?.surveys.includes('JM2ttuNR') &&
                    (window.innerWidth > 1000 ? (
                        <Sidetab
                            id="JM2ttuNR"
                            hidden={{ user_id: context.loginedUser?.id || '' }}
                            {...(chatsRemaining % 20 === 0 && {
                                open: 'time',
                                openValue: 10000
                            })}
                            buttonText="Feedback"
                            buttonColor="#4CFFD4"
                            onSubmit={(data: {
                                formId: string;
                                responseId: string;
                            }) => {
                                const user =
                                    context.loginedUser?.id || 'defaultUser';
                                const formId = data.formId;
                                const responseId = data.responseId;

                                fetch(
                                    `submitsurvey/${user}/${formId}/${responseId}/`,
                                    {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                )
                                    .then(async (res) => {
                                        const result = await res.json();
                                        console.log(
                                            'Survey submitted:',
                                            result
                                        );
                                    })
                                    .catch((error) => {
                                        console.error(
                                            'Submit survey error:',
                                            error
                                        );
                                    });
                            }}
                        />
                    ) : (
                        <Popover
                            id="JM2ttuNR"
                            hidden={{ user_id: context.loginedUser?.id || '' }}
                            {...(chatsRemaining % 20 === 0 && {
                                notificationDays: 7
                            })}
                            buttonColor="#4CFFD4"
                            onSubmit={(data: {
                                formId: string;
                                responseId: string;
                            }) => {
                                const user =
                                    context.loginedUser?.id || 'defaultUser';
                                const formId = data.formId;
                                const responseId = data.responseId;

                                fetch(
                                    `submitsurvey/${user}/${formId}/${responseId}/`,
                                    {
                                        method: 'POST',
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    }
                                )
                                    .then(async (res) => {
                                        const result = await res.json();
                                        console.log(
                                            'Survey submitted:',
                                            result
                                        );
                                    })
                                    .catch((error) => {
                                        console.error(
                                            'Submit survey error:',
                                            error
                                        );
                                    });
                            }}
                        />
                    ))}
            </ChatContextProvider>
        </AppContextProvider>
    );
}

export default App;

// TODO: Extract FeedbackForm into separate component file
// This section contains feedback form components that should be moved
// to improve code organization and reusability
