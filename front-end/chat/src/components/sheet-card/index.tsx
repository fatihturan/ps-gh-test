import ArrowDown from '@/icons/arrow-down';
import { cn } from '@/utils/cn';
import Button from '../button';
import { Arrow, ChatBlue, Info, MLB, NBA, NFL, NHL, Short } from '@/icons';
import Tag from '../tag';
import {
    Root,
    Item,
    Header,
    Trigger,
    Content
} from '@radix-ui/react-accordion';
import CustomAccordion from '../custom-accordion';
import MetricCard from '../metric-card';
import BestCard from '../best-card';
import CustomPopover from '../custom-popover';
import Chart from '../chart';
import SelectWithTab from '../select-with-tab';
import { useState } from 'react';
import ScrollArea from '../scroll-area';
import MultipleSelectFilter from '../multiple-select-filter';
import RangeFilter from '../range-filter';

interface SheetCardProps {
    className?: string;
    expanded: boolean;
    items: {
        id: string;
        player: {
            firstName: string;
            lastName: string;
            team: string;
            position: string;
            teamLogo: string;
            playerAvatar: string;
        };
        props: string;
        line: string;
        proj: string;
        predictions: {
            title: string;
            value: number;
        }[];
        count: {
            up: number;
            down: number;
        };
        bestOdds: {
            imageUrl: string;
            betMetric: string;
            betMetricValue: string;
            line: string;
            odds: string;
        }[];
    }[];
}

const tabs = [
    {
        id: 'nfl',
        label: 'Nfl',
        icon: <NFL />,
        options: [
            {
                value: 'player-props',
                label: 'Player Props'
            },
            {
                value: 'anytime-td-scorer-sheet',
                label: 'Anytime TD Scorer Sheet'
            },
            {
                value: 'single-game-consistency-sheet',
                label: 'Single Game Consistency Sheet'
            },
            {
                value: 'all-games-consistency-sheet',
                label: 'All Games Consistency Sheet'
            },
            {
                value: '100-sheet',
                label: '100% Sheet'
            },
            {
                value: 'prize-picks-sheet',
                label: 'PrizePicks Sheet'
            },
            {
                value: 'underdog-sheet',
                label: 'Underdog Sheet'
            }
        ]
    },
    {
        id: 'nba',
        label: 'Nba',
        icon: <NBA />,
        options: [
            {
                value: 'player-props',
                label: 'Player Props'
            },
            {
                value: 'anytime-td-scorer-sheet',
                label: 'Anytime TD Scorer Sheet'
            },
            {
                value: 'single-game-consistency-sheet',
                label: 'Single Game Consistency Sheet'
            },
            {
                value: 'all-games-consistency-sheet',
                label: 'All Games Consistency Sheet'
            },
            {
                value: '100-sheet',
                label: '100% Sheet'
            },
            {
                value: 'prize-picks-sheet',
                label: 'PrizePicks Sheet'
            },
            {
                value: 'underdog-sheet',
                label: 'Underdog Sheet'
            }
        ]
    },
    {
        id: 'mlb',
        label: 'Mlb',
        icon: <MLB />,
        options: [
            {
                value: 'player-props',
                label: 'Player Props'
            },
            {
                value: 'anytime-td-scorer-sheet',
                label: 'Anytime TD Scorer Sheet'
            },
            {
                value: 'single-game-consistency-sheet',
                label: 'Single Game Consistency Sheet'
            },
            {
                value: 'all-games-consistency-sheet',
                label: 'All Games Consistency Sheet'
            },
            {
                value: '100-sheet',
                label: '100% Sheet'
            },
            {
                value: 'prize-picks-sheet',
                label: 'PrizePicks Sheet'
            },
            {
                value: 'underdog-sheet',
                label: 'Underdog Sheet'
            }
        ]
    },
    {
        id: 'nhl',
        label: 'Nhl',
        icon: <NHL />,
        options: [
            {
                value: 'player-props',
                label: 'Player Props'
            },
            {
                value: 'anytime-td-scorer-sheet',
                label: 'Anytime TD Scorer Sheet'
            },
            {
                value: 'single-game-consistency-sheet',
                label: 'Single Game Consistency Sheet'
            },
            {
                value: 'all-games-consistency-sheet',
                label: 'All Games Consistency Sheet'
            },
            {
                value: '100-sheet',
                label: '100% Sheet'
            },
            {
                value: 'prize-picks-sheet',
                label: 'PrizePicks Sheet'
            },
            {
                value: 'underdog-sheet',
                label: 'Underdog Sheet'
            }
        ]
    }
];

function SheetCard({ className, items, expanded = false }: SheetCardProps) {
    const [selectedOption, setSelectedOption] = useState('player-props');
    const [graphExpanded, setGraphExpanded] = useState<string[]>([]);

    return (
        <>
            {!expanded && (
                <div className="flex justify-between gap-[8px]">
                    <SelectWithTab
                        title="Select Sheet"
                        contentTitle="Sheet"
                        tabs={tabs}
                        selectedOption={selectedOption}
                        onApply={setSelectedOption}
                    />
                    <CustomPopover title="Filter" align="end" />
                </div>
            )}

            {expanded && (
                <div className="my-[16px] flex justify-between gap-[8px]">
                    <MultipleSelectFilter
                        title="All Games"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <MultipleSelectFilter
                        title="All Players"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <MultipleSelectFilter
                        title="All Props"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <MultipleSelectFilter
                        title="All Projections"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <RangeFilter
                        title="Line"
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <MultipleSelectFilter
                        title="Over Moneyline"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                    <MultipleSelectFilter
                        title="Under Moneyline"
                        options={[]}
                        appliedOptions={[]}
                        onApply={(value) => {
                            console.log(value);
                        }}
                    />
                </div>
            )}

            <div className="mb-[5px] flex h-[39px] items-center text-white">
                <div className="flex h-full w-full min-w-[150px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Player
                    <Short className="size-[10px]" color="text-white-70" />
                </div>
                <div className="flex h-full w-full min-w-[70px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Prop
                    <Short className="size-[10px]" color="text-white-70" />
                </div>
                <div className="flex h-full w-full min-w-[35px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Line
                    <Short className="size-[10px]" color="text-white-70" />
                </div>
                <div className="flex h-full w-full min-w-[35px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Proj
                    <Short className="size-[10px]" color="text-white-70" />
                </div>
                <div className="flex h-full w-full min-w-[50px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Count
                    <Short className="size-[10px]" color="text-white-70" />
                </div>
                <div className="flex h-full w-full min-w-[100px] cursor-pointer select-none items-center gap-[4px] text-[9px] font-semibold leading-[11px] text-[rgba(255,255,255,0.7)]">
                    Robot Likes
                </div>
            </div>
            <ScrollArea className="h-[calc(100%-75px)]">
                <Root type="single" collapsible>
                    {items.map((item) => (
                        <Item
                            value={item.id}
                            className="border-b-[1px] border-b-white-10 bg-white-5 p-[1px] first:rounded-t-[8px] last:rounded-b-[8px] last:border-b-0 data-[state=open]:gradient-border"
                        >
                            <Header>
                                <Trigger className="group/accordion w-full">
                                    <div
                                        className={cn(
                                            'flex w-full justify-between overflow-hidden rounded-[8px]',
                                            expanded
                                                ? 'max-w-full'
                                                : 'max-w-full',
                                            className
                                        )}
                                    >
                                        <div
                                            className={`flex w-full items-center gap-[2px] px-[4px] py-[8px] ${expanded ? 'min-w-[220px] border-r-0' : 'min-w-[150px] border-r-[1px] border-r-[rgba(255,255,255,0.1)]'}`}
                                        >
                                            <div
                                                className={`relative flex ${expanded ? 'pl-[12px]' : 'pl-[5px]'}`}
                                            >
                                                <img
                                                    src={item.player.teamLogo}
                                                    className={`z-1 absolute left-0 top-0 ${expanded ? 'size-[32px]' : 'size-[16px]'}`}
                                                />
                                                <img
                                                    src={
                                                        item.player.playerAvatar
                                                    }
                                                    className={`z-2 relative ${expanded ? 'size-[40px]' : 'size-[24px]'}`}
                                                />
                                            </div>

                                            <div className="flex flex-col gap-[2px]">
                                                <div
                                                    className={`font-semibold text-white ${expanded ? 'text-[12px] leading-[16px]' : 'text-[11px] leading-[14px]'}`}
                                                >
                                                    {item.player.firstName}{' '}
                                                    {item.player.lastName}
                                                </div>
                                                <span
                                                    className={`text-left text-[8px] font-semibold leading-[10px] text-[rgba(255,255,255,0.5)] ${expanded ? 'hidden' : 'block'}`}
                                                >
                                                    {item.player.team} @{' '}
                                                    {item.player.position}
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className={`w-full items-center px-[4px] py-[8px] font-semibold text-[rgba(255,255,255,0.7)] ${expanded ? 'flex border-r-0 text-[12px] leading-[16px]' : 'hidden border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px]'}`}
                                        >
                                            {item.player.team} vs.{' '}
                                            {item.player.position}
                                        </div>
                                        <div
                                            className={`flex w-full min-w-[70px] items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'border-r-0 text-[12px] leading-[15px] text-[rgba(255,255,255,0.7)]' : 'border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            {item.props}
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'border-r-0 text-[13px] leading-[16px] text-[rgba(255,255,255,0.7)]' : 'border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            {item.line}
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold text-[#4CFFD4] ${expanded ? 'block border-r-0 text-[13px] leading-[16px]' : 'hidden border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px]'}`}
                                        >
                                            -115
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold text-[#4CFFD4] ${expanded ? 'block border-r-0 text-[13px] leading-[16px]' : 'hidden border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px]'}`}
                                        >
                                            -110
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'border-r-0 text-[13px] leading-[16px] text-[rgba(255,255,255,0.7)]' : 'border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            {item.proj}
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'block border-r-0 text-[13px] leading-[16px] text-[rgba(255,255,255,0.7)]' : 'hidden border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            92.6
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'block border-r-0 text-[13px] leading-[16px] text-[rgba(255,255,255,0.7)]' : 'hidden border-r-[1px] border-r-[rgba(255,255,255,0.1)] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            45.5
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center px-[4px] py-[8px] font-semibold ${expanded ? 'gap-[16px] text-[13px] leading-[16px] text-[rgba(255,255,255,0.7)]' : 'gap-[2px] text-[9px] leading-[12px] text-white'}`}
                                        >
                                            <div className="flex items-center">
                                                <ArrowDown
                                                    className="size-[12px]"
                                                    color="rgba(76,255,212,1)"
                                                />
                                                {item.count.up}
                                            </div>
                                            <div className="flex items-center">
                                                <ArrowDown
                                                    className="size-[12px] rotate-[180deg]"
                                                    color="rgba(64,118,255,1)"
                                                />
                                                {item.count.down}
                                            </div>
                                        </div>
                                        <div
                                            className={`flex w-full items-center justify-center border-r-[1px] border-r-[rgba(255,255,255,0.1)] pr-[4px] ${expanded ? 'gap-[16px] border-r-0' : 'gap-[4px] border-r-[1px] border-r-[rgba(255,255,255,0.1)]'}`}
                                        >
                                            <Tag
                                                text="Under"
                                                filled={!expanded}
                                            />
                                            <Button
                                                className={`p-0 ${expanded ? 'size-[32px]' : 'size-[24px]'}`}
                                            >
                                                <ChatBlue
                                                    className={`${expanded ? 'size-[24px]' : 'size-[16px]'}`}
                                                />
                                            </Button>
                                        </div>
                                        <div className="flex w-full items-center justify-center">
                                            <Arrow
                                                className="size-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180"
                                                color="rgba(255,255,255,.7)"
                                            />
                                        </div>
                                    </div>
                                </Trigger>
                            </Header>
                            <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down data-[state=open]:border-t-[1px] data-[state=open]:border-t-white-10">
                                <CustomAccordion
                                    className="p-[8px]"
                                    items={[
                                        {
                                            id: '1',
                                            title: 'Predictions',
                                            children: (
                                                <div
                                                    className={cn(
                                                        'gap-[4px]',
                                                        expanded
                                                            ? 'flex'
                                                            : 'grid grid-cols-3'
                                                    )}
                                                >
                                                    {item.predictions.map(
                                                        (prediction) => (
                                                            <MetricCard
                                                                title={
                                                                    prediction.title
                                                                }
                                                                persentage={
                                                                    prediction.value
                                                                }
                                                                Icon={Info}
                                                            />
                                                        )
                                                    )}
                                                </div>
                                            )
                                        },
                                        {
                                            id: '2',
                                            title: 'Best Odds',
                                            children: (
                                                <div>
                                                    <BestCard
                                                        bets={[
                                                            {
                                                                id: '1',
                                                                imageUrl:
                                                                    '/images/walker-logo-thumb.png',
                                                                betMetric:
                                                                    'Implied Probability',
                                                                betMetricValue:
                                                                    '62.26%',
                                                                line: 'O 4.5',
                                                                odds: '-130'
                                                            },
                                                            {
                                                                id: '2',
                                                                imageUrl:
                                                                    '/images/walker-logo-thumb.png',
                                                                betMetric:
                                                                    'Implied Probability',
                                                                betMetricValue:
                                                                    '62.26%',
                                                                line: 'O 4.5',
                                                                odds: '+130'
                                                            },
                                                            {
                                                                id: '3',
                                                                imageUrl:
                                                                    '/images/walker-logo-thumb.png',
                                                                betMetric:
                                                                    'Implied Probability',
                                                                betMetricValue:
                                                                    '62.26%',
                                                                line: 'O 4.5',
                                                                odds: '-160'
                                                            }
                                                        ]}
                                                    />
                                                </div>
                                            )
                                        },
                                        {
                                            id: '3',
                                            title: 'Graph',
                                            extraAction: () => {
                                                if (
                                                    graphExpanded.includes(
                                                        item.id
                                                    )
                                                ) {
                                                    setGraphExpanded((v) =>
                                                        v.filter(
                                                            (id) =>
                                                                id !== item.id
                                                        )
                                                    );
                                                } else {
                                                    setGraphExpanded((v) => [
                                                        ...v,
                                                        item.id
                                                    ]);
                                                }
                                            },
                                            children: (
                                                <div className="py-[16px]">
                                                    <Chart
                                                        step={100}
                                                        minimal={
                                                            !graphExpanded.includes(
                                                                item.id
                                                            )
                                                        }
                                                        expanded={expanded}
                                                        minValue={0}
                                                        data={[
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/8',
                                                                value: 260
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 100
                                                            },
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/11',
                                                                value: 150
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 330
                                                            },
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/8',
                                                                value: 260
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 100
                                                            },
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/11',
                                                                value: 150
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 300
                                                            },
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/8',
                                                                value: 260
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 100
                                                            },
                                                            {
                                                                label: '@MIA',
                                                                subLabel:
                                                                    '11/11',
                                                                value: 150
                                                            },
                                                            {
                                                                label: '',
                                                                subLabel: '',
                                                                value: 500
                                                            }
                                                        ]}
                                                    />
                                                </div>
                                            )
                                        }
                                    ]}
                                />
                            </Content>
                        </Item>
                    ))}
                </Root>
            </ScrollArea>
        </>
    );
}

export default SheetCard;
