import { Share } from '@/icons';
import Button from '../button';

export interface Bet {
    date: string;
    event: string;
    line: string;
    odds: string;
    bookImage: string;
    id:string;
    betMetric: string;
    betMetricValue: string;
    positionImageUrl: string;
    betPlaceUrl: string;
}

interface BetCardProps {
    bets: Bet[];
}

function BetCard({ bets }: BetCardProps) {
    return (
        <div className="relative flex w-full max-w-[532px] flex-col gap-[24px] rounded-[16px] bg-white-3 p-[16px]">
            {bets.map((bet, index) => (
                <div key={index} className="flex flex-col gap-[24px]">
                    <div className="flex flex-col items-center gap-[5px]">
                        <span className="text-[13px] text-white-50">
                            {bet.date}
                        </span>
                        <span className="text-[13px] text-white-50">
                            {bet.event}
                        </span>
                    </div>
                    <div className="flex justify-between gap-[8px]">
                        <div className="flex items-center gap-[8px]">
                            <figure className="h-[40px] w-[40px] overflow-hidden rounded-[100%]">
                                <img
                                    src={bet.positionImageUrl}
                                    className="h-full w-full object-cover"
                                />
                            </figure>
                            <div className="flex flex-col">
                                <span className="text-[16px] font-semibold text-white">
                                    {bet.betMetricValue}
                                </span>
                                <span className="text-[12px] uppercase text-white-50">
                                    {bet.betMetric}
                                </span>
                            </div>
                        </div>
                        <a href={bet.betPlaceUrl} className="no-underline" target="_blank" rel="noopener noreferrer">
                            <div className="flex items-center gap-[8px] rounded-[8px] bg-white-5 px-[40px] py-[8px]">
                                <div className="flex flex-col items-center">
                                    <span className="text-[13px] text-white">
                                        {bet.line}
                                    </span>
                                    <span className="text-[16px] font-semibold text-red">
                                        {bet.odds}
                                    </span>
                                </div>
                                <figure className="h-[24px] w-[24px] overflow-hidden rounded-[100%]">
                                    <img
                                        src={bet.bookImage}
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </figure>
                            </div>
                        </a>
                    </div>
                </div>
            ))}
            <Button
                
                variant="iconSecondary"
                className="absolute right-[-56px] top-[50%] translate-y-[-50%]"
            >
                <Share className="w-[16px]" />
            </Button>
        </div>
    );
}

export default BetCard;
