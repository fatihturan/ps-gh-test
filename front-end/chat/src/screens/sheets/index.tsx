import BetslipsPanel from '@/components/betslips';
import CustomAccordion from '@/components/custom-accordion';
import Header from '@/components/header';
import MessageContainer from '@/components/message-container';
import MessageTextBox from '@/components/message-text-box';
import NavigationMenu from '@/components/navigation-menu';
import SheetCard from '@/components/sheet-card';
import { Betslips, Expand, SheetsStats } from '@/icons';
import { cn } from '@/utils/cn';
import { ScrollArea } from '@radix-ui/react-scroll-area';
import { useState } from 'react';
import { betsSlips } from '../../state/data';

interface ISheetsScreenProps {
    items: unknown[];
    messages: any[];
}

export function Sheets({ items, messages }: ISheetsScreenProps) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="flex h-[calc(100vh-32px)] flex-col items-center pt-[56px] lg:justify-center lg:pl-[80px]">
            <Header />
            <NavigationMenu selectedItemId="sheets" />
            <div
                className={`z-5 relative flex w-full lg:mx-auto lg:h-full lg:max-w-[1300px] ${expanded ? 'lg:gap-[0]' : 'lg:gap-[40px]'}`}
            >
                <div className="relative mb-[72px] mt-[16px] flex h-[calc(100vh-320px)] w-full flex-col justify-end lg:h-[auto]">
                    <MessageContainer
                        messages={messages}
                        className={`m-[-16px] mb-[8px] ${expanded ? 'opacity-0' : 'opacity-100'}`}
                        loading={false}
                    />
                    <div className="fixed bottom-[96px] left-[16px] z-10 flex w-[calc(100%-32px)] flex-col-reverse gap-[8px] lg:absolute lg:-bottom-[72px] lg:left-0 lg:w-full">
                        <MessageTextBox
                            changeProMode={() => {}}
                            proMode={false}
                            proModeDisabled={false}
                            chatsRemaining={0}
                            loading={false}
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
                    className={`z-9 relative hidden w-full shrink-0 transition-all lg:block ${expanded ? 'lg:-ml-[100%] lg:w-full' : 'lg:w-[456px]'}`}
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
                                    <ScrollArea
                                        className={cn(
                                            'h-[calc(100vh-412px)] lg:h-[calc(100vh-275px)]',
                                            expanded
                                                ? 'lg:h-[calc(100vh-275px)]'
                                                : 'lg:h-[calc(100vh-244px)]'
                                        )}
                                    >
                                        <BetslipsPanel
                                            items={betsSlips.map((item) => ({
                                                ...item,
                                                player: {
                                                    ...item.player,
                                                    content: <div>222</div>
                                                }
                                            }))}
                                        />
                                    </ScrollArea>
                                )
                            },
                            {
                                id: '1',
                                title: 'Sheets',
                                extraAction: () => {
                                    setExpanded(!expanded);
                                },
                                children: (
                                    <ScrollArea
                                        className={cn(
                                            'h-[calc(100vh-412px)] lg:h-[calc(100vh-275px)]',
                                            expanded
                                                ? 'lg:h-[calc(100vh-275px)]'
                                                : 'lg:h-[calc(100vh-244px)]'
                                        )}
                                    >
                                        <SheetCard
                                            expanded={expanded}
                                            items={items as any}
                                        />
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
