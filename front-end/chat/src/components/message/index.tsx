import { TaskSheet, ThumbsUp } from '@/icons';
import { useChatContext } from '@/state';
import { cn } from '@/utils/cn';
import Markdown from '../markdown';
import FeedbackForm from '../feedback-form'; // Adjust the import path as needed
import { useState } from 'react';

interface Message {
    id: string;
    chatId: string;
    sender: 'you' | 'assistant';
    text: string;
    waiting?: boolean;
    thumbsUp?: boolean;
    thumbsDown?: boolean;
}

interface MessageProps {
    message: Message;
    loading?: boolean;
    hasThumbActions?: boolean;
}

function Message({ message, loading }: MessageProps) {
    const { thumbAction, thumbFeedback } = useChatContext();
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    const handleThumbAction = (
        chatId: string | undefined,
        type: 'up' | 'down'
    ) => {
        if (chatId) {
            thumbAction(chatId, type);
            setShowFeedbackForm(true); // Show the feedback form
        }
    };

    const currentThumbStatus =
        message.thumbsUp === true
            ? 'up'
            : message.thumbsDown === true
              ? 'down'
              : null;

    return (
        <div
            className={cn(
                'flex w-full max-w-[532px] flex-col overflow-hidden rounded-[16px] bg-white-3 p-[16px]',
                message.sender === 'you' ? 'ml-auto' : 'mr-0'
            )}
        >
            {/** Added the "Thinking..." functionality back */}
            {message.sender !== 'you' && loading && !message.text && (
                <div
                    className={cn(
                        'flex items-center gap-[8px]',
                        message.text && 'mb-[24px]'
                    )}
                >
                    <TaskSheet className="w-[20px]" />
                    <span className="animate-gradient bg-[linear-gradient(to_right,#FFF,rgba(255,255,255,0.5),#FFF)] bg-[length:200%_auto] bg-clip-text text-[14px] text-transparent opacity-[0.7]">
                        Thinking...
                    </span>
                    {/* <Arrow className="w-[24px]" /> */}
                </div>
            )}
            <div className="render-markdown">
                {/* Render the message text */}
                <Markdown text={message.text} />
            </div>
            {message.sender === 'assistant' && !message.waiting && !loading && (
                <div
                    className={cn(
                        'mt-2 flex gap-3',
                        currentThumbStatus && 'pointer-events-none'
                    )}
                >
                    <span
                        className="cursor-pointer"
                        onClick={() => handleThumbAction(message.chatId, 'up')}
                        aria-label="Thumbs Up"
                        title="Thumbs Up"
                    >
                        <ThumbsUp
                            color={
                                currentThumbStatus === 'up'
                                    ? 'rgb(76 255 212)'
                                    : '#FFF'
                            }
                            className="w-5"
                        />
                    </span>
                    <span
                        className="cursor-pointer"
                        onClick={() =>
                            handleThumbAction(message.chatId, 'down')
                        }
                        aria-label="Thumbs Down"
                        title="Thumbs Down"
                    >
                        <ThumbsUp
                            color={
                                currentThumbStatus === 'down'
                                    ? 'rgb(255, 76, 79)'
                                    : '#FFF'
                            }
                            className="w-5 rotate-180 transform"
                        />
                    </span>
                </div>
            )}

            {showFeedbackForm && (
                <FeedbackForm
                    className="mt-4"
                    onClose={() => setShowFeedbackForm(false)}
                    onSubmit={async (feedbackText) => {
                        await thumbFeedback(message.chatId, feedbackText);
                        //setShowFeedbackForm(false);
                    }}
                />
            )}
        </div>
    );
}

export default Message;
