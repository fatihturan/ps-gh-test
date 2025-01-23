import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import Button from '../button';
import ProSwitch from '../pro-switch';
import SendMessage from '@/icons/send-message';
import TextareaAutosize from 'react-textarea-autosize';
import { useCallback } from 'react';
import { Share } from '@/icons';

const messageTextBoxVariants = cva(
    [
        'select-none',
        'transition-all',
        'relative',
        'w-full',
        'bg-gradient',
        'rounded-[8px]',
        'transition-[background]',
        'p-[2px]'
    ],
    {
        variants: {
            disabled: {
                true: ['bg-white-10']
            },
            loading: {
                true: ['bg-gradient! animate-gradient!']
            }
        },
        compoundVariants: [
            {
                loading: true,
                disabled: true,
                className: [
                    'bg-loading-gradient bg-[length:200%_auto] animate-gradient-loading'
                ]
            }
        ]
    }
);

interface MessageTextBoxProps {
    className?: string;
    disabled?: boolean;
    short?: boolean;
    value?: string;
    loading?: boolean;
    onChange?: (value: string) => void;
    onSubmit?: (message: string) => void;
    changeProMode: () => void;
    proMode: boolean;
    proModeDisabled: boolean;
    chatsRemaining: number;
}

function MessageTextBox({
    disabled,
    className,
    onSubmit,
    value,
    onChange,
    loading,
    changeProMode,
    proMode,
    proModeDisabled,
    chatsRemaining,
    short
}: MessageTextBoxProps) {
    const handleSubmit = useCallback(() => {
        onSubmit?.(value || '');
    }, [onSubmit, value]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && e.shiftKey) {
            return;
        }
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div
            className={cn(
                messageTextBoxVariants({ disabled, loading }),
                className
            )}
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}
            >
                <div
                    className={cn(
                        'flex min-h-[120px] flex-wrap items-end justify-between gap-[16px] rounded-[6px] bg-dark-blue-95 px-[16px] py-[12px]',
                        short && 'min-h-[0] flex-nowrap items-center'
                    )}
                >
                    <Button
                        variant="iconSecondary"
                        type="submit"
                        loading={loading}
                        className={'order-1'}
                    >
                        <Share className="size-[16px]" />
                    </Button>
                    <TextareaAutosize
                        value={value}
                        onKeyDown={handleKeyDown}
                        onChange={handleChange}
                        minRows={1}
                        maxRows={4}
                        disabled={loading}
                        className={cn(
                            'text-16px order-1 h-[36px] resize-none appearance-none bg-transparent py-[6px] !text-white placeholder:text-white-50 focus:border-none focus:outline-none',
                            'order-0 w-full',
                            short && 'order-2'
                        )}
                        placeholder="Ask anything..."
                    />
                    <Button
                        type="submit"
                        variant="icon"
                        disabled={disabled}
                        loading={loading}
                        className="order-4"
                    >
                        <SendMessage color="#10111E" />
                    </Button>
                    <ProSwitch
                        checked={proMode}
                        onCheckedChange={changeProMode}
                        disabled={proModeDisabled}
                        chatsRemaining={chatsRemaining}
                        className={cn(
                            'order-3 mb-[6px] ml-[auto]',
                            short && 'mb-0'
                        )}
                    />
                </div>
            </form>
        </div>
    );
}

export default MessageTextBox;
