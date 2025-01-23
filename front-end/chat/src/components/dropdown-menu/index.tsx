import {
    Root,
    Trigger,
    Portal,
    Content,
    Item,
    Separator
} from '@radix-ui/react-dropdown-menu';
import { DeleteDisabled, MenuBurge, NewsPaper, Billing } from '@/icons';
import Logout from '@/icons/logout';
import Settings from '@/icons/settings';
import Help from '@/icons/help';
//import HistoricalGameData from '@/icons/historical-game-data';
//import StatisticsAnalyticsArrowUpSquare from '@/icons/statistics-analytics-arrow-up-square';
import { useState } from 'react';

export const FeedbackModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <Root onOpenChange={setOpen} open={open}>
            <Trigger className="select-none" asChild>
                <div className="cursor-pointer">
                    {open ? (
                        <DeleteDisabled className="size-[32px]" color="#fff" />
                    ) : (
                        <MenuBurge className="size-[32px]" color="#fff" />
                    )}
                </div>
            </Trigger>
            <Portal>
                <Content
                    className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-10 min-w-[226px] rounded-[8px] border-[1px] border-white-10 bg-dark-blue-95 p-[24px] shadow-[-2px_4px_30px_0px_rgba(0,_0,_0,_0.30)] will-change-[opacity,transform]"
                    sideOffset={8}
                    align="end"
                >
                    <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/">
                            <NewsPaper className="h-[24px] w-[24px]" />
                            Home
                        </a>
                    </Item>
                    <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/subscribe">
                            <Billing className="h-[20px] w-[20px] ml-[3px]" />
                            Billing
                        </a>
                    </Item>
                    {/* <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/stats/props/NBA/">
                            <TaskSheet className="h-[24px] w-[24px]" />
                            Player Prop Sheets
                        </a>
                    </Item> */}
                    {/* <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/predict/NBA/">
                            <StatisticsAnalyticsArrowUpSquare className="h-[24px] w-[24px]" />
                            Predict
                        </a>
                    </Item> */}
                    {/* <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/stats/NBA/">
                            <HistoricalGameData className="h-[24px] w-[24px]" />
                            Explore
                        </a>
                    </Item> */}
                    {/* <Separator className="mb-[20px] h-px bg-white-10" /> */}
                    <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/help">
                            <Help className="h-[24px] w-[24px]" />
                            Help
                        </a>
                    </Item>
                    <Item
                        asChild
                        className="group relative mb-[20px] flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/settings">
                            <Settings className="h-[24px] w-[24px]" />
                            Settings
                        </a>
                    </Item>
                    <Separator className="mb-[20px] h-px bg-white-10" />
                    <Item
                        asChild
                        className="group relative flex cursor-pointer select-none items-center gap-[16px] pl-[8px] pr-[24px] text-[16px] leading-none text-white outline-none"
                    >
                        <a href="/logout">
                            <Logout className="h-[24px] w-[24px]" />
                            Logout
                        </a>
                    </Item>
                </Content>
            </Portal>
        </Root>
    );
};

export default FeedbackModal;
