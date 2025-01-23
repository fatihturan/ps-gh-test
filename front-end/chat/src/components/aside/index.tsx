import Button from '@/components/button';
import { ArrowForward } from '@/icons';
import { Accordion } from '@/components/accordion';
import { Root, Trigger, Content } from '@radix-ui/react-collapsible';
import { useChatContext } from '@/state';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface AsideProps {
    className?: string;
}

export const Aside = ({ className }: AsideProps) => {
    const { chatHistory, loginedUser, chatUrl } = useChatContext();
    const [loading, setLoading] = useState(false);

    return (
        <Root
            className={cn(
                'group fixed left-0 top-0 z-10 flex w-full max-w-[375px] flex-col rounded-[8px] lg:left-[16px] lg:top-[16px]',
                className
            )}
        >
            <Trigger className="flex h-[56px] w-full max-w-[300px] items-center justify-between rounded-t-[8px] bg-dark-blue-95 px-[16px] text-[16px] font-semibold text-white group-data-[state=closed]:ml-[16px] group-data-[state=closed]:mt-[16px] group-data-[state=closed]:w-auto group-data-[state=closed]:rounded-b-[8px] group-data-[state=closed]:bg-transparent lg:w-[375px] lg:group-data-[state=closed]:ml-0 lg:group-data-[state=closed]:mt-0 lg:group-data-[state=closed]:w-[375px] lg:group-data-[state=closed]:bg-dark-blue-95">
                <span className="group-data-[state=closed]:hidden lg:block lg:group-data-[state=closed]:block">
                    Chat History
                </span>
                <ArrowForward className="w-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180" />
            </Trigger>
            <Content className="h-[calc(100vh-56px)] max-h-[calc(100vh-56px)] w-full overflow-y-auto rounded-b-[8px] bg-dark-blue-95 p-[16px] pt-0 data-[state='closed']:animate-collapse data-[state='open']:animate-extend lg:h-[calc(100vh-88px)] lg:max-h-[calc(100vh-88px)] lg:w-[375px]">
                <div className="flex h-full flex-col justify-center overflow-y-auto">
                    <div className="w-full flex-grow pt-[24px]">
                        <Button
                            asLink
                            variant="primary"
                            className="w-full normal-case"
                            href={chatUrl}
                            loading={loading}
                            onClick={() => setLoading(true)}
                        >
                            Start a new chat
                        </Button>
                        {loginedUser ? (
                            chatHistory.length > 0 ? (
                                <Accordion
                                    className="mt-[24px]"
                                    items={chatHistory}
                                />
                            ) : (
                                <p className="mt-[24px] text-left text-[14px] text-white-70">
                                    No chat history found.
                                </p>
                            )
                        ) : (
                            <p className="mt-[24px] text-left text-[14px] text-white-70">
                                Login to view the chat history.
                            </p>
                        )}
                    </div>

                    <div className="text-left">
                        {!loginedUser ? (
                            <div className="flex justify-center pb-[40px]">
                                <Button
                                    asLink
                                    variant="secondary"
                                    className="w-full"
                                    href="/login"
                                >
                                    Login
                                </Button>
                            </div>
                        ) : (
                            <>
                                <Button
                                    asLink
                                    sentence
                                    className="w-full"
                                    href="/subscribe"
                                >
                                    Upgrade for More Pro Chats!
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </Content>
        </Root>
    );
};

export default Aside;
