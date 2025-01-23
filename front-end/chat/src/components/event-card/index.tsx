import { cn } from '@/utils/cn';
import Button from '../button';
import { ChatBlue } from '@/icons';
import { Fragment } from 'react/jsx-runtime';
import { IEvent } from '@/state/types';

export interface IEventCardProps {
    eventItem: IEvent;
    className?: string;
}

export function EventCard({ eventItem, className }: IEventCardProps) {
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const rows = [
        {
            team: {
                name: eventItem.contestantAwayAbbr,
                fullName: eventItem.contestantAway.fullName,
                logo: eventItem.contestantAwayLogo,
                score: ''
            },
            moneyline: {
                name: eventItem.awayMoneyline?.abbr,
                logo: eventItem.awayMoneyline?.bookLogo,
                line: eventItem.awayMoneyline?.price.line.toString(),
                odds: eventItem.awayMoneyline?.price.odds.toString()
            },
            spread: {
                name: eventItem.awaySpread?.abbr,
                logo: eventItem.awaySpread?.bookLogo,
                line: eventItem.awaySpread?.price.line.toString(),
                odds: eventItem.awaySpread?.price.odds.toString()
            },
            total: {
                name: eventItem.totalOver?.abbr,
                logo: eventItem.totalOver?.bookLogo,
                line: `O ${eventItem.totalOver?.price.line}`,
                odds: eventItem.totalOver?.price.odds.toString()
            }
        },
        {
            team: {
                name: eventItem.contestantHomeAbbr,
                fullName: eventItem.contestantHome.fullName,
                logo: eventItem.contestantHomeLogo,
                score: ''
            },
            moneyline: {
                name: eventItem.homeMoneyline?.abbr,
                logo: eventItem.homeMoneyline?.bookLogo,
                line: eventItem.homeMoneyline?.price.line.toString(),
                odds: eventItem.homeMoneyline?.price.odds.toString()
            },
            spread: {
                name: eventItem.homeSpread?.abbr,
                logo: eventItem.homeSpread?.bookLogo,
                line: eventItem.homeSpread?.price.line.toString(),
                odds: eventItem.homeSpread?.price.odds.toString()
            },
            total: {
                name: eventItem.totalUnder?.abbr,
                logo: eventItem.totalUnder?.bookLogo,
                line: `U ${eventItem.totalUnder?.price.line}`,
                odds: eventItem.totalUnder?.price.odds.toString()
            }
        }
    ];

    return (
        <div className={cn('overflow-hidden rounded-[8px]', className)}>
            <table className="w-full bg-white-3">
                <thead>
                    <tr className="bg-white-5">
                        <th className="p-[16px] text-center text-[14px] font-semibold text-[rgba(255,255,255,0.7)] lg:p-[8px]">
                            {formatTime(eventItem.startTime)}
                        </th>
                        <th className="p-[16px] text-center text-[14px] font-semibold text-[rgba(255,255,255,0.7)] lg:p-[8px]">
                            Moneyline
                        </th>
                        <th className="p-[16px] text-center text-[14px] font-semibold text-[rgba(255,255,255,0.7)] lg:p-[8px]">
                            Spread
                        </th>
                        <th className="p-[16px] text-center text-[14px] font-semibold text-[rgba(255,255,255,0.7)] lg:p-[8px]">
                            Total
                        </th>
                        <th className="hidden p-[16px] text-center text-[14px] font-semibold text-[rgba(255,255,255,0.7)] lg:table-cell lg:p-[8px]">
                            Ask
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((item, index) => (
                        <Fragment key={index}>
                            <tr
                                key={index}
                                className="border-t-[1px] border-t-[rgba(255,255,255,0.1)] first:border-t-0 lg:hover:bg-[rgba(255,255,255,0.1)]"
                            >
                                <td
                                    className="whitespace-nowrap px-[8px] py-[20px] pl-[16px] lg:py-[12px]"
                                    title={item.team.fullName}
                                >
                                    <div className="flex items-center justify-center gap-[12px]">
                                        {item.team.logo ? (
                                            <img
                                                src={item.team.logo}
                                                className="h-[40px] w-[40px] rounded-[50%]"
                                            />
                                        ) : (
                                            <div className="size-[40px] rounded-[50%] bg-white-20" />
                                        )}
                                        <span className="whitespace-nowrap text-[16px] font-semibold leading-[20px] text-white">
                                            {item.team.name}
                                            <span className="block text-[13px] font-normal leading-[16px] text-[rgba(255,255,255,0.5)]">
                                                {item.team.score}
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td className="px-[8px] py-[20px] lg:py-[12px]">
                                    <div className="flex flex-col items-center justify-center gap-[5px] lg:flex-row">
                                        {item.moneyline.logo ? (
                                            <img
                                                src={item.moneyline.logo}
                                                className="h-[24px] w-[24px] rounded-[50%]"
                                            />
                                        ) : (
                                            <div className="size-[24px] rounded-[50%] bg-white-20" />
                                        )}
                                        <span className="whitespace-nowrap text-[13px] font-normal leading-[16px] text-white-5">
                                            {item.moneyline.line}
                                            <span className="block text-[13px] font-normal leading-[16px] text-white">
                                                {item.moneyline.odds}
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td className="px-[8px] py-[20px] lg:py-[12px]">
                                    <div className="flex flex-col items-center justify-center gap-[5px] lg:flex-row">
                                        {item.spread.logo ? (
                                            <img
                                                src={item.spread.logo}
                                                className="h-[24px] w-[24px] rounded-[50%]"
                                            />
                                        ) : (
                                            <div className="size-[24px] rounded-[50%] bg-white-20" />
                                        )}
                                        <span className="whitespace-nowrap text-[13px] font-normal leading-[16px] text-[rgba(255,255,255,0.5)]">
                                            {item.spread.line}
                                            <span className="block text-[13px] font-normal leading-[16px] text-white">
                                                {item.spread.odds}
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td className="px-[8px] py-[20px] lg:py-[12px]">
                                    <div className="flex flex-col items-center justify-center gap-[5px] lg:flex-row">
                                        {item.total.logo ? (
                                            <img
                                                src={item.total.logo}
                                                className="h-[24px] w-[24px] rounded-[50%]"
                                            />
                                        ) : (
                                            <div className="size-[24px] rounded-[50%] bg-white-20" />
                                        )}
                                        <span className="whitespace-nowrap text-[13px] font-normal leading-[16px] text-[rgba(255,255,255,0.5)]">
                                            {item.total.line}
                                            <span className="block text-[13px] font-normal leading-[16px] text-white">
                                                {item.total.odds}
                                            </span>
                                        </span>
                                    </div>
                                </td>
                                <td className="hidden px-[8px] pr-[16px] text-center align-middle lg:table-cell">
                                    <Button className="size-[32px] p-0">
                                        <ChatBlue className="size-[24px]" />
                                    </Button>
                                </td>
                            </tr>
                            <tr className="px-[16px] pt-[12px] lg:hidden">
                                <td colSpan={4} className="p-[0_16px_20px]">
                                    <Button className="w-full">
                                        Ask Jaxon
                                    </Button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default EventCard;
