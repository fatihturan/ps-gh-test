import { Arrow, Expand } from '@/icons';

interface BestSlipsCardProps {
    className?: string;
    id: string;
    player: {
        title: string;
        team: string;
        date: string;
        teamLogo: string;
        playerAvatar: string;
        extraAction?: boolean;
    };
}

function BestSlipsCard({ className, player }: BestSlipsCardProps) {
    return (
        <div className={className}>
            <div className="mb-[12px] flex items-center justify-between gap-[8px] text-[14px] font-semibold leading-[20px] text-white lg:text-[16px]">
                {player.title}
                <div className="flex items-center gap-[8px]">
                    {player.extraAction && (
                        <Expand className="size-[16px] opacity-50" />
                    )}
                    <Arrow
                        className="size-[24px] transition-transform group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180"
                        color="rgba(255,255,255,.7)"
                    />
                </div>
            </div>
            <div className="flex items-center gap-[8px]">
                <div className="relative flex pl-[12px]">
                    <img
                        src={player.teamLogo}
                        className="z-1 absolute left-0 top-0 size-[32px] rounded-[50%]"
                    />
                    <img
                        src={player.playerAvatar}
                        className="z-2 relative w-[48px] rounded-[50%]"
                    />
                </div>
                <div className="flex flex-col justify-center gap-[5px] text-left text-[12px] font-normal leading-[16px] text-white-70 lg:text-[13px]">
                    {player.team}
                    <span className="text-white-50">
                        {new Date(player.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: 'numeric'
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default BestSlipsCard;
