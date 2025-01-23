import { cn } from '@/utils/cn';
import { Root, List, Trigger, Content } from '@radix-ui/react-tabs';

interface TabbarProps {
    size?: 'small' | 'large';
    tabs: {
        id: string;
        label: string;
        icon?: React.ReactNode;
        badgeLabel?: string;
        content: React.ReactNode;
    }[];
}

function Tabbar({ size = 'large', tabs }: TabbarProps) {
    return (
        <Root defaultValue={tabs[0].id}>
            <List className="relative mx-[8px] flex">
                {tabs.map((tab) => (
                    <Trigger
                        key={tab.id}
                        className="group flex w-full select-none flex-col text-[15px] uppercase leading-none text-white-70 outline-none"
                        value={tab.id}
                    >
                        <div
                            className={cn(
                                'flex h-[calc(100%-1px)] w-full items-center justify-center gap-[4px] text-[14px] font-semibold',
                                size === 'large'
                                    ? 'px-[14px] py-[16px]'
                                    : 'p-[9px]',
                                !tab.icon && 'text-[13px]'
                            )}
                        >
                            {tab.icon && tab.icon} {tab.label}
                            {tab.badgeLabel && (
                                <span className="flex size-[18px] items-center justify-center rounded-[20px] bg-gradient text-[12px] text-black">
                                    {tab.badgeLabel}
                                </span>
                            )}
                        </div>
                        <div className="h-[1px] w-full bg-white-20 group-data-[state=active]:-mt-[1px] group-data-[state=active]:h-[2px] group-data-[state=active]:bg-gradient"></div>
                    </Trigger>
                ))}
            </List>
            {tabs.map((tab) => (
                <Content key={tab.id} value={tab.id} className="h-full w-full">
                    {tab.content}
                </Content>
            ))}
        </Root>
    );
}

export default Tabbar;
