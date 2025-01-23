import ArrowDown from '@/icons/arrow-down';
import Button from '../button';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import Message from '../message';

interface MessageContainerProps {
    messages: {
        id: string;
        chatId: string;
        sender: 'you' | 'assistant';
        text: string;
        waiting?: boolean;
        thumbsUp?: boolean;
        thumbsDown?: boolean;
    }[];
    className?: string;
    loading?: boolean;
}

function MessageContainer({
    messages,
    className,
    loading
}: MessageContainerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const innerContainerRef = useRef<HTMLDivElement>(null);
    const [showShadow, setShowShadow] = useState(false);
    const [autoScroll, setAutoScroll] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    containerRef.current;
                const reachedBottom =
                    scrollTop + clientHeight >= scrollHeight - 32;
                setShowShadow(!reachedBottom);
                setAutoScroll(reachedBottom);
            }
        };

        const container = containerRef.current;
        const resizeObserver = new ResizeObserver(handleScroll);

        if (container) {
            container.scrollTo({ top: container.scrollHeight });
            container.addEventListener('scroll', handleScroll);
            handleScroll();
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                container.removeEventListener('scroll', handleScroll);
                resizeObserver.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (!containerRef.current || !innerContainerRef.current) return;

        const scrollSizeChanged = () => {
            const currentScrollHeight = containerRef.current!.scrollHeight;

            containerRef.current!.scrollTo({
                top: currentScrollHeight,
                behavior: 'instant'
            });
        };

        const resizeObserver = new ResizeObserver(scrollSizeChanged);
        if (autoScroll) {
            resizeObserver.observe(innerContainerRef.current);
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, [autoScroll]);

    const handleScrollToBottom = () => {
        if (containerRef.current) {
            containerRef.current.scrollTo({
                top: containerRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const hasLoadingMessage = messages.some((message) => message.waiting);

    return (
        <div className={cn('relative min-h-[300px] flex-grow', className)}>
            <div
                className={cn(
                    'pointer-events-none absolute left-0 top-0 flex h-[16px] w-full rotate-180 items-end justify-center bg-more-text-gradient p-[8px]'
                )}
            />
            <div
                className="flex h-full overflow-y-auto p-[16px] [&::-webkit-scrollbar]:w-0"
                ref={containerRef}
            >
                <div
                    ref={innerContainerRef}
                    className="flex h-fit w-full flex-col gap-[16px]"
                >
                    {messages.map((message, index) => (
                        <Message
                            key={message.id}
                            message={message}
                            hasThumbActions={index === messages.length - 1}
                        />
                    ))}

                    {!hasLoadingMessage && loading && (
                        <Message
                            loading
                            message={{
                                id: '-_-',
                                chatId: '-_-',
                                sender: 'assistant',
                                text: ''
                            }}
                        />
                    )}
                </div>
            </div>
            <div
                className={cn(
                    'pointer-events-none absolute bottom-0 left-0 flex h-[140px] w-full items-end justify-center bg-more-text-gradient p-[8px]',
                    !showShadow && 'hidden'
                )}
            />
            <Button
                className={cn(
                    'absolute bottom-[35px] left-[50%] z-10 translate-x-[-50%]',
                    !showShadow && 'hidden'
                )}
                variant="iconSecondary"
                onClick={handleScrollToBottom}
            >
                <ArrowDown className="w-[16px]" />
            </Button>
        </div>
    );
}

export default MessageContainer;
