import { cn } from '@/utils/cn';
import {
    Root,
    Item,
    Header,
    Trigger,
    Content
} from '@radix-ui/react-accordion';
import { BetslipsData, IGameState, IMarketData } from '@/state/types';
import BetslipsCard from '../betslips-card';
import BestCard from '../best-card';
import CustomAccordion from '../custom-accordion';
import Tabbar from '../tab-bar';
import ScrollArea from '../scroll-area';
import EmptyState from '../empty-state';
import Loader from '../loading-state/loader';
import { useChatContext, useRequest } from '@/state';
import { ReactNode, useState } from 'react';
import MetricCard from '../metric-card';
import { generateMetricData } from '@/utils/generate-metric-data';
import Graph from '../graph';
export interface BetslipsProps {
    className?: string;
    items: BetslipsData[];
}

export function Betslips({ items, className }: BetslipsProps) {
    const { getMarketWithMetadata, getGraphData } = useRequest();
    const { betSlipsWithMetadata, betSlipsWithGraphData } = useChatContext();
    const [graphMinimized, setGraphMinimized] = useState<{
        [key: string]: boolean;
    }>(items.reduce((acc, item) => ({ ...acc, [item.id]: true }), {}));
    const handleValueChange = (value: string) => {
        if (value) {
            const [marketId, index] = value.split('-');
            const indexNumber = parseInt(index);
            getMarketWithMetadata(marketId, items[indexNumber].bets[0].line);
            getGraphData(marketId, items[indexNumber].bets[0].line);
        }
    };

    const bestSlips = (
        <Root type="single" collapsible onValueChange={handleValueChange}>
            {items.map((item, index) => {
                const _betSlipWithMetadata = betSlipsWithMetadata[item.id];
                let marketData: IMarketData | undefined;
                let marketDataLoading: boolean = false;
                if (
                    _betSlipWithMetadata !== 'loading' &&
                    _betSlipWithMetadata
                ) {
                    marketData = _betSlipWithMetadata[item.id] as IMarketData;
                } else {
                    marketDataLoading = true;
                }

                let metricCards: ReactNode[] = [];
                if (!marketData && !marketDataLoading) {
                    return null;
                } else if (marketData) {
                    metricCards = generateMetricData(marketData as IMarketData)
                        .splice(0, 6)
                        .map((metric) => (
                            <MetricCard
                                key={metric.key}
                                title={metric.key}
                                persentage={metric.percentage}
                            />
                        ));
                }

                const _graphData = betSlipsWithGraphData[item.id];
                let graphData: IGameState[] = [];
                let graphDataLoading: boolean = false;
                if (_graphData !== 'loading' && _graphData) {
                    graphData = _graphData as IGameState[];
                } else {
                    graphDataLoading = true;
                }

                return (
                    <Item
                        value={`${item.id}-${index}`}
                        className={cn(
                            'relative border-b-[1px] border-b-white-10 px-[10px] py-[16px] data-[state=open]:rounded-[8px] data-[state=open]:border-b-[transparent] data-[state=open]:bg-white-2 lg:py-[20px]',
                            className
                        )}
                    >
                        <Header>
                            <Trigger className="group/accordion w-full">
                                <BetslipsCard
                                    id={item.id}
                                    player={{
                                        title: item.title,
                                        team: item.bets[0].event,
                                        date: item.bets[0].date,
                                        teamLogo: item.bets[0].bookImage,
                                        playerAvatar:
                                            item.bets[0].positionImageUrl,
                                        extraAction: false
                                    }}
                                />
                            </Trigger>
                        </Header>
                        <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                            <CustomAccordion
                                collapsible
                                className="mt-[12px]"
                                items={[
                                    {
                                        id: 'predictions',
                                        title: 'Predictions',
                                        children: marketDataLoading ? (
                                            <div className="my-[16px] flex w-full flex-col items-center justify-center">
                                                <Loader
                                                    width={50}
                                                    height={50}
                                                    className="animate-reverse-spin"
                                                />
                                                <p className="text-white-70">
                                                    Loading metric data
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-3 gap-[12px]">
                                                {metricCards}
                                            </div>
                                        )
                                    },
                                    {
                                        id: 'best',
                                        title: 'Best Odds',
                                        children: <BestCard bets={item.bets} />
                                    },
                                    {
                                        id: 'graph',
                                        title: 'Graph',
                                        extraAction: () => {
                                            setGraphMinimized((prev) => ({
                                                ...prev,
                                                [item.id]: !prev[item.id]
                                            }));
                                        },
                                        children: graphDataLoading ? (
                                            <div className="my-[16px] flex w-full flex-col items-center justify-center">
                                                <Loader
                                                    width={50}
                                                    height={50}
                                                    className="animate-reverse-spin"
                                                />
                                                <p className="text-white-70">
                                                    Loading graph data
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="w-full py-[8px]">
                                                <Graph
                                                    minimized={
                                                        graphMinimized[item.id]
                                                    }
                                                    data={graphData
                                                        .slice(0, 10)
                                                        .map(
                                                            (
                                                                game: IGameState
                                                            ) => ({
                                                                value: game.value,
                                                                dataLabelTop:
                                                                    game.opponent.substring(
                                                                        0,
                                                                        3
                                                                    ),
                                                                dataLabel:
                                                                    new Date(
                                                                        game.date
                                                                    ).toLocaleDateString(
                                                                        'en-US',
                                                                        {
                                                                            month: 'numeric',
                                                                            day: 'numeric'
                                                                        }
                                                                    )
                                                            })
                                                        )}
                                                />
                                            </div>
                                        )
                                    }
                                ]}
                            />
                        </Content>
                    </Item>
                );
            })}
        </Root>
    );

    return (
        <Tabbar
            tabs={[
                {
                    id: 'betslips',
                    label: 'Betslips',
                    content: (
                        <ScrollArea
                            className={cn(
                                'h-[calc(100vh-500px)] lg:h-[calc(100vh-290px)]'
                            )}
                        >
                            {bestSlips}
                        </ScrollArea>
                    )
                },
                {
                    id: 'selections',
                    label: 'Selections',
                    content: (
                        <ScrollArea
                            className={cn(
                                'h-[calc(100vh-500px)] lg:h-[calc(100vh-290px)]'
                            )}
                        >
                            <EmptyState title="Create a free account to unlock this whole game" />
                        </ScrollArea>
                    )
                }
            ]}
        />
    );
}

export default Betslips;
