import { cn } from '@/utils/cn';
import Button from '../button';
import { Check, PlusGradient, SendMessageSendShare } from '@/icons';

interface BestOddsSelectorProps {
    className?: string;
    line: string;
    odds: string;
    selected?: boolean;
    extraAction?: () => void;
}

function BestOddsSelector({
    className,
    line,
    odds,
    extraAction,
    selected
}: BestOddsSelectorProps) {
    const isPositive = parseInt(odds) > 0;
    return (
        <div
            className={cn(
                'flex max-w-[max-content] items-center gap-[12px] rounded-[8px] bg-white-10 py-[8px] pl-[20px] pr-[12px]',
                className
            )}
        >
            <div className="flex flex-col gap-[5px] text-[12px] leading-[15px] text-[rgba(255,255,255,0.7)]">
                {line}
                <span
                    className={cn(
                        'text-semibold block text-[#4076FF]',
                        isPositive && 'text-[#4CFFD4]'
                    )}
                >
                    {odds}
                </span>
            </div>
            <div className="flex gap-[8px]">
                <Button variant="iconSecondary">
                    <SendMessageSendShare className="w-[16px]" color="#fff" />
                </Button>

                {extraAction && (
                    <Button
                        variant="iconSecondary"
                        className={`gradient-border-[50%] ${
                            selected && 'bg-gradient'
                        }`}
                        onClick={extraAction}
                    >
                        {selected ? (
                            <Check className="size-[16px]" />
                        ) : (
                            <PlusGradient className="size-[16px]" />
                        )}
                    </Button>
                )}
            </div>
        </div>
    );
}

export default BestOddsSelector;
