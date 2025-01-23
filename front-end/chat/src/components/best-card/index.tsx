import { cn } from '@/utils/cn';
import BestOddsSelector from '../bet-odds-selector';
import { BetslipsData } from '@/state/types';

export interface Bet {
    id: string;
    bookImage: string;
    betMetric: string;
    betMetricValue: string;
    line: string;
    odds: string;
    actionButton?: boolean;
    selected?: boolean;
}

interface BestCardProps {
    className?: string;
    selected?: boolean;
    bets: BetslipsData['bets'];
}

function BestCard({ className, bets, selected }: BestCardProps) {
    return (
        <div className={cn('relative space-y-[8px]', className)}>
            {bets.map((bet, index) => (
                <div
                    key={index}
                    className={`flex items-center justify-between gap-[8px] rounded-[16px] bg-white-3 !py-[8px] !pl-[16px] !pr-[8px] text-white ${
                        selected && 'gradient-border-[16px]'
                    }`}
                >
                    <div className="flex items-center gap-[8px]">
                        <img
                            src={bet.bookImage}
                            className="h-[40px] w-[40px] rounded-[50%]"
                        />
                        <div className="flex flex-col justify-center gap-[5px]">
                            <div className="text-[14px] leading-[16px] text-white">
                                {bet.betMetric}
                            </div>
                            <span className="text-[12px] leading-[15px] text-[rgba(255,255,255,0.5)]">
                                {bet.betMetricValue}
                            </span>
                        </div>
                    </div>

                    <BestOddsSelector
                        line={bet.line}
                        odds={bet.odds}
                        selected={selected}
                        extraAction={() => {}}
                    />
                </div>
            ))}
        </div>
    );
}

export default BestCard;
