import CustomAccordion from '@/components/custom-accordion';
import Header from '@/components/header';
import MessageContainer from '@/components/message-container';
import MessageTextBox from '@/components/message-text-box';
import NavigationMenu from '@/components/navigation-menu';
import { Betslips, Expand, SheetsStats } from '@/icons';
import { cn } from '@/utils/cn';
import { useAppContext, useChatContext } from '@/state/';
import { useEffect, useState } from 'react';
import BetslipsBox from '@/components/betslips';
import ScrollArea from '@/components/scroll-area';

interface IChatWithMessagesScreenProps {
    message: string;
    setMessage: (message: string) => void;
    onSend: () => void;
}

export function ChatWithMessages({
    message,
    setMessage,
    onSend
}: IChatWithMessagesScreenProps) {
    const [containerVisiualState, setContainerVisiualState] = useState<
        'onlyChatList' | 'chatListWithSideBox' | 'sideBoxExpanded'
    >('onlyChatList');

    // **Chat Context**
    const {
        messages,
        informationBoxData,
        changeProMode,
        proMode,
        proModeDisabled,
        loading
    } = useChatContext();

    // **App Context**
    const { chatsRemaining } = useAppContext();

    useEffect(() => {
        if (informationBoxData.length > 0) {
            setContainerVisiualState('chatListWithSideBox');
        }
    }, [informationBoxData]);

    return (
        <div className="flex h-[calc(100vh-32px)] flex-col items-center pt-[56px] lg:justify-center lg:pl-[80px]">
            <Header />
            <NavigationMenu selectedItemId="chat" />
            <div
                className={cn(
                    'z-5 relative flex w-full lg:mx-auto lg:h-full lg:max-w-[1300px]',
                    containerVisiualState === 'onlyChatList' &&
                        'lg:max-w-[1000px]',
                    containerVisiualState === 'chatListWithSideBox' &&
                        'lg:gap-[40px]'
                )}
            >
                <div
                    className={
                        'relative mb-[72px] mt-[16px] flex h-[calc(100vh-320px)] w-full flex-col justify-end lg:h-[auto]'
                    }
                >
                    <MessageContainer
                        messages={messages}
                        className={cn(
                            'm-[-16px] mb-[8px]',
                            containerVisiualState === 'sideBoxExpanded' &&
                                'opacity-0'
                        )}
                        loading={false}
                    />
                    <div className="fixed bottom-[96px] left-[16px] z-10 flex w-[calc(100%-32px)] flex-col-reverse gap-[8px] lg:absolute lg:-bottom-[72px] lg:left-0 lg:w-full">
                        <MessageTextBox
                            changeProMode={changeProMode}
                            value={message}
                            onChange={setMessage}
                            disabled={!message}
                            loading={loading}
                            onSubmit={onSend}
                            proMode={proMode}
                            proModeDisabled={proModeDisabled}
                            chatsRemaining={chatsRemaining}
                            short={true}
                        />
                        <div className="flex w-full justify-between gap-[8px] lg:hidden">
                            <div className="w-full gap-[8px] rounded-[8px] bg-gradient p-[1px]">
                                <div className="flex cursor-pointer items-center gap-[8px] rounded-[8px] bg-custom-gradient px-[12px] py-[8px]">
                                    <Betslips className="size-[20px]" />
                                    <span className="text-[14px] font-semibold leading-[18px] text-white">
                                        Betslips
                                    </span>
                                    <Expand className="ml-[auto] size-[14px]" />
                                </div>
                            </div>
                            <div className="w-full gap-[8px] rounded-[8px] bg-gradient p-[1px]">
                                <div className="flex cursor-pointer items-center gap-[8px] rounded-[8px] bg-custom-gradient px-[12px] py-[8px]">
                                    <SheetsStats className="size-[20px]" />
                                    <span className="text-[14px] font-semibold leading-[18px] text-white">
                                        Sheets
                                    </span>
                                    <Expand className="ml-[auto] size-[14px]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={cn(
                        `z-9 transition-width relative hidden w-full shrink-0 transition-all duration-300 lg:block`,
                        containerVisiualState === 'onlyChatList' &&
                            'w-[0px] opacity-0',
                        containerVisiualState === 'chatListWithSideBox' &&
                            'opacity-100 lg:w-[456px]'
                    )}
                >
                    <CustomAccordion
                        size="large"
                        defaultOpenFirst={true}
                        showOpenedOnTop={true}
                        items={[
                            {
                                id: '2',
                                title: 'Betslips',
                                children: (
                                    <BetslipsBox items={informationBoxData} />
                                )
                            },
                            {
                                id: '1',
                                title: 'Sheets',

                                children: (
                                    <ScrollArea
                                        className={cn(
                                            'h-[calc(100vh-412px)] lg:h-[calc(100vh-245px)]'
                                        )}
                                    >
                                        <div>Sheets</div>
                                    </ScrollArea>
                                )
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
