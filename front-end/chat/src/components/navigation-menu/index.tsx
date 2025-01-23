import {
    Arrow,
    ArrowForward,
    Betslips,
    Chat,
    PredictWinners,
    Sheets,
    Stats,
    NHL,
    MLB,
    NBA,
    NFL
} from '@/icons';
import {
    AccordionContent,
    AccordionItem,
    Root as AccordionRoot,
    AccordionTrigger
} from '@radix-ui/react-accordion';
import { cn } from '@/utils/cn';
import { Fragment, SVGProps, useState } from 'react';

const _navigationItems: NavigationMenuGroup[] = [
    {
        items: [
            {
                id: 'chat',
                title: 'Chat',
                icon: Chat,
                href: '/'
            },
            {
                id: 'sheets',
                title: 'Sheets',
                icon: Sheets,
                href: '/'
            },
            {
                id: 'betslips',
                title: 'Betslips',
                icon: Betslips,
                href: '/'
            }
        ]
    },
    {
        items: [
            {
                id: 'stats',
                title: 'Stats',
                icon: Stats,
                href: '/',
                subItems: [
                    {
                        id: 'nfl',
                        title: 'NFL',
                        href: '/',
                        icon: NFL
                    },
                    {
                        id: 'nba',
                        title: 'NBA',
                        href: '/',
                        icon: NBA
                    },
                    {
                        id: 'nhl',
                        title: 'NHL',
                        href: '/',
                        icon: NHL
                    },
                    {
                        id: 'mlb',
                        title: 'MLB',
                        href: '/',
                        icon: MLB
                    }
                ]
            },
            {
                id: 'predict-winners',
                title: 'Predict Winners',
                icon: PredictWinners,
                href: '/',
                subItems: [
                    {
                        id: 'nfl',
                        title: 'NFL',
                        href: '/',
                        icon: NFL
                    },
                    {
                        id: 'nba',
                        title: 'NBA',
                        href: '/',
                        icon: NBA
                    },
                    {
                        id: 'nhl',
                        title: 'NHL',
                        href: '/',
                        icon: NHL
                    },
                    {
                        id: 'mlb',
                        title: 'MLB',
                        href: '/',
                        icon: MLB
                    }
                ]
            }
        ]
    }
];

interface NavigationMenuItem {
    id: string;
    title: string;
    icon: (svgProps: SVGProps<SVGSVGElement>) => JSX.Element;
    href: string;
    subItems?: {
        id: string;
        title: string;
        href: string;
        icon: (svgProps: SVGProps<SVGSVGElement>) => JSX.Element;
    }[];
}

export interface NavigationMenuGroup {
    items: NavigationMenuItem[];
}

export interface NavigationMenuProps {
    className?: string;
    navigationItems?: NavigationMenuGroup[];
    selectedItemId: string;
}

export const NavigationMenu = ({
    className,
    navigationItems = _navigationItems,
    selectedItemId = 'chat'
}: NavigationMenuProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedItem, setSelectedItem] = useState<string | null>(null);

    const handleExpand = () => {
        if (isExpanded) {
            setSelectedItem(null);
        }
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            data-state={isExpanded ? 'open' : 'closed'}
            className={cn(
                'transition-width group fixed bottom-0 left-[0] z-[15] flex w-full flex-col duration-300 lg:bottom-auto lg:left-[16px] lg:top-[72px] lg:h-[calc(100vh-88px)] lg:max-w-[260px] lg:data-[state=closed]:max-w-[64px] lg:data-[state=open]:max-w-[250px]',
                className
            )}
        >
            <div className="transition-width relative h-full w-full rounded-t-[16px] bg-dark-blue-95 p-[16px] duration-300 lg:rounded-[8px] lg:px-[8px] lg:py-[16px]">
                <div
                    onClick={handleExpand}
                    className="absolute right-[-12px] top-[8px] hidden h-[24px] w-[24px] items-center justify-center rounded-[20px] border-[1px] border-white-10 bg-[rgba(16,17,30,1)] lg:flex"
                >
                    <ArrowForward className="w-[16px] cursor-pointer transition-transform duration-300 group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180" />
                </div>
                <div className="bg flex lg:block">
                    <AccordionRoot
                        type="single"
                        onValueChange={(item) => {
                            setIsExpanded(true);
                            setSelectedItem(item);
                        }}
                        value={
                            selectedItem as undefined | string
                        } /* TODO: fix this */
                        collapsible
                        className="flex w-full gap-[10px] lg:block"
                    >
                        {navigationItems.map((group, index) => (
                            <Fragment key={index}>
                                {group.items.map((item) =>
                                    !item.subItems ||
                                    item.subItems.length == 0 ? (
                                        <div
                                            key={item.id}
                                            className={cn(
                                                'group/accordion flex w-full cursor-pointer items-center justify-center gap-[12px] overflow-hidden whitespace-nowrap rounded-[4px] p-[12px] lg:justify-start',
                                                item.id === selectedItemId &&
                                                    'lg:bg-white-5'
                                            )}
                                        >
                                            <item.icon className="w-[24px] min-w-[24px]" />
                                            <span className="hidden text-[14px] font-semibold text-white group-data-[state=closed]:hidden lg:block">
                                                {item.title}
                                            </span>
                                        </div>
                                    ) : (
                                        <AccordionItem
                                            key={item.id}
                                            value={item.id}
                                            className={cn(
                                                'transition-bg flex w-full overflow-hidden whitespace-nowrap rounded-[8px] px-[12px] duration-300 data-[state=open]:bg-white-5 lg:block',
                                                item.id === selectedItemId &&
                                                    'bg-white-5'
                                            )}
                                        >
                                            <AccordionTrigger className="group/accordion flex w-full items-center justify-center gap-[12px] rounded-[4px] p-[12px] lg:justify-start lg:px-[0]">
                                                <item.icon className="w-[24px] min-w-[24px]" />
                                                <span className="hidden text-[14px] font-semibold text-white transition-opacity duration-300 group-data-[state=closed]:opacity-0 lg:block">
                                                    {item.title}
                                                </span>
                                                <Arrow
                                                    className="ml-[auto] hidden size-[24px] transition-[transform,opacity] duration-300 group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180 group-data-[state=closed]:opacity-0 lg:block"
                                                    color="rgba(255,255,255,.7)"
                                                />
                                            </AccordionTrigger>
                                            {item.subItems && (
                                                <AccordionContent className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                                    <ul className="ml-[48px] flex flex-col gap-[4px] pb-[12px]">
                                                        {item.subItems.map(
                                                            (subItem) => (
                                                                <li
                                                                    className="flex cursor-pointer flex-row gap-[8px] text-[14px] font-medium text-white"
                                                                    key={
                                                                        subItem.title
                                                                    }
                                                                >
                                                                    <subItem.icon className="w-[24px]" />
                                                                    {
                                                                        subItem.title
                                                                    }
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </AccordionContent>
                                            )}
                                        </AccordionItem>
                                    )
                                )}
                                {index < navigationItems.length - 1 && (
                                    <div className="mb-[12px] mt-[12px] hidden h-[1px] w-full bg-white-20 lg:block"></div>
                                )}
                            </Fragment>
                        ))}
                    </AccordionRoot>

                    <div className="align-center absolute bottom-0 left-[8px] my-[16px] hidden w-[calc(100%-16px)] cursor-pointer justify-center gap-[10px] rounded-[5px] bg-[rgba(114,137,218,1)] p-[12px] group-data-[state=closed]:bg-[transparent] lg:flex">
                        <img
                            src={
                                new URL(
                                    '/images/discord-icon.png',
                                    import.meta.url
                                ).href
                            }
                            className="h-[20px] w-[20px]"
                        />
                        <span className="overflow-hidden whitespace-nowrap text-[14px] font-semibold text-white group-data-[state=closed]:hidden">
                            Join Discord
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NavigationMenu;
