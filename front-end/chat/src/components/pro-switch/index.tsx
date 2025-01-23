import { Root, Thumb } from '@radix-ui/react-switch';
import * as Popover from '@radix-ui/react-popover';
import Button from '../button';
import { useState } from 'react';
import { useChatContext } from '@/state';
import { cn } from '@/utils/cn';

interface ProSwitchProps {
    className?: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
    disabled: boolean;
    chatsRemaining: number;
}

export default function ProSwitch({
    className,
    checked,
    onCheckedChange,
    disabled,
    chatsRemaining
}: ProSwitchProps) {
    const [open, setOpen] = useState(false);
    const { isJaxonUser, MAX_CHAT_COUNT, monthlyPeriodEndString } =
        useChatContext();

    return (
        <Popover.Root open={open} onOpenChange={setOpen}>
            <Popover.Trigger asChild>
                <div className={cn('flex items-center gap-2', className)}>
                    <Root
                        checked={checked}
                        onCheckedChange={
                            !disabled ? onCheckedChange : undefined
                        }
                        className={`relative rounded-full p-[1.5px] outline-none ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} data-[state=unchecked]:bg-white data-[state=checked]:bg-gradient data-[state=unchecked]:opacity-70`}
                        id="pro-mode"
                        disabled={disabled} // This disables interaction
                        onMouseEnter={
                            !isJaxonUser ? () => setOpen(true) : undefined
                        }
                    >
                        <div
                            className="relative w-[31px] rounded-[8px] bg-dark-blue p-[1.5px]"
                            onMouseEnter={
                                !isJaxonUser ? () => setOpen(true) : undefined
                            }
                        >
                            <Thumb
                                onMouseEnter={
                                    !isJaxonUser
                                        ? () => setOpen(true)
                                        : undefined
                                }
                                className="shadow-blackA4 block size-[14px] translate-x-[0px] rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[14px] data-[state=checked]:bg-green"
                            />
                        </div>
                    </Root>

                    <label
                        className={`cursor-pointer text-[16px] text-white ${checked ? 'font-bold text-[#4CFFD4]' : ''}`}
                        htmlFor="pro-mode"
                        onMouseEnter={() => setOpen(true)}
                    >
                        Pro
                    </label>
                </div>
            </Popover.Trigger>
            <Popover.Portal>
                <Popover.Content
                    sideOffset={5}
                    side="bottom"
                    align="start"
                    onMouseEnter={() => setOpen(true)}
                    className="z-50"
                >
                    <div className="flex w-[268px] flex-col gap-[12px] rounded-[8px] border-[1px] border-white-20 bg-dark-blue-95 p-[16px]">
                        <h2 className="text-[18px] font-semibold">
                            jaXon
                            <span className="bg-gradient bg-clip-text text-transparent">
                                Pro
                            </span>{' '}
                        </h2>
                        <p className="text-[16px]">
                            Use Pro to see responses using proprietary data and
                            sources.
                        </p>

                        {isJaxonUser && (
                            <>
                                <p className="text-[12px]">
                                    {chatsRemaining} of {MAX_CHAT_COUNT}{' '}
                                    remaining until {monthlyPeriodEndString}.
                                </p>
                            </>
                        )}

                        <Button
                            asLink
                            href="https://pine-sports.com/subscribe"
                            className="w-fit normal-case"
                            variant="primary"
                        >
                            Upgrade
                        </Button>
                    </div>
                </Popover.Content>
            </Popover.Portal>
        </Popover.Root>
    );
}
