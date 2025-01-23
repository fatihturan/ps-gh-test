import { createContext, useContext } from 'react';
import {
    EventsWithFilterType,
    ICategoriesWithQuestions,
    IMessage,
    BetslipsData,
    IMarketWithMetadata,
    IGameState
} from './types';
import {
    categorizedSuggestions,
    eventsWithFilter,
    informationBoxData,
    messages
} from './data';

export interface ChatContextType {
    chatUrl: string;
    loginedUser: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        surveys: string[];
    } | null;
    chatHistory:
        | {
              id: string;
              title: string;
              count: number;
              content: { id: string; text: string }[];
          }[]
        | [];
    sessionId: string;
    messages: IMessage[] | [];
    informationBoxData: BetslipsData[];
    informationBoxOpen: boolean;
    setInformationBoxOpen: (open: boolean) => void;
    sampleQuestions: string[];
    suggestions: string[];
    chatId: string | null;
    thumbAction: (chatId: string, type: 'up' | 'down') => void;
    thumbFeedback: (chatId: string, feedback: string) => void;
    betSlipsWithMetadata: {
        [key: string]: IMarketWithMetadata | 'loading';
    };
    betSlipsWithGraphData: {
        [key: string]: IGameState[] | 'loading';
    };
    profile_picture: string;
    loading?: boolean;
    setContext: (context: Partial<ChatContextType>) => void;
    events: EventsWithFilterType;

    categorizedSuggestions: ICategoriesWithQuestions;
    monthlyPeriodEndString: string;

    proModeDisabled: boolean;
    setProModeDisabled: (disabled: boolean) => void;
    proMode: boolean;
    changeProMode: () => void;
}

export const ChatContext = createContext<ChatContextType | null>(null);
export const ChatContextProvider = ChatContext.Provider;

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        // Return dummy context for storybook
        return {
            chatUrl: '/',
            loginedUser: null,
            chatHistory: [],
            messages: messages as IMessage[],
            sessionId: 'ada0d205-4bc1-5601-bf89-f6ad350d47ac',
            sampleQuestions: [],
            suggestions: [],
            setContext: () => {},
            chatId: null,
            thumbAction: () => {},
            thumbFeedback: () => {},
            informationBoxData: informationBoxData as BetslipsData[],
            informationBoxOpen: false,
            betSlipsWithMetadata: {},
            betSlipsWithGraphData: {},
            setInformationBoxOpen: () => {},
            profile_picture: '',
            monthlyPeriodEndString: '',
            changeProMode: () => {},
            proMode: false,
            setProModeDisabled: () => {},
            proModeDisabled: false,
            loading: false,
            events: eventsWithFilter as EventsWithFilterType,
            categorizedSuggestions:
                categorizedSuggestions as ICategoriesWithQuestions
        } as ChatContextType;
    }
    return context;
};

// **System Messages Context**
export interface AppContextType {
    errorMessage: string | null;
    warningMessage: string | null;
    MAX_CHAT_COUNT: number;
    chatsRemaining: number;
    isJaxonUser: boolean;
}

export const AppContext = createContext<AppContextType | null>(null);
export const AppContextProvider = AppContext.Provider;

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        return {
            errorMessage: '',
            warningMessage: '',
            MAX_CHAT_COUNT: 0,
            chatsRemaining: 0,
            isJaxonUser: true
        } as AppContextType;
    }
    return context;
};

export const useRequest = () => {
    const { setContext, betSlipsWithMetadata, betSlipsWithGraphData } =
        useChatContext();

    return {
        getMarketWithMetadata: async (marketId: string, line: string) => {
            if (
                betSlipsWithMetadata[marketId] === 'loading' ||
                !!betSlipsWithMetadata[marketId]
            ) {
                return;
            }
            setContext({
                betSlipsWithMetadata: {
                    [marketId]: 'loading'
                }
            });

            const response = await fetch(
                `chartdata/${marketId}/${line}/metadata/`
            );
            const data = await response.json();

            setContext({
                betSlipsWithMetadata: {
                    ...betSlipsWithMetadata,
                    [marketId]: data
                }
            });
        },
        getGraphData: async (
            marketId: string,
            line: string,
            filters: Record<string, number | string> = {}
        ) => {
            setContext({
                betSlipsWithGraphData: {
                    ...betSlipsWithGraphData,
                    [marketId]: 'loading'
                }
            });

            const encodedFilters = encodeURIComponent(JSON.stringify(filters));
            const historicdataurl = `chartdata/${marketId}/${line}/historicData/?filters=${encodedFilters}`;
            //const metadataurl = `chartdata/${marketId}/${line}/metadata/?filters=${encodedFilters}`;

            const historicDataResponse = await fetch(historicdataurl);
            //const metadataResponse = await fetch(metadataurl);

            const historicData = await historicDataResponse.json();
            //const metadata = await metadataResponse.json();

            setContext({
                betSlipsWithGraphData: {
                    ...betSlipsWithGraphData,
                    [marketId]: historicData[marketId]['gameStats']
                }
            });
        }
    };
};
