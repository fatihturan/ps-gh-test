import { Arrow, DeleteDisabled } from '@/icons';
import { cn } from '@/utils/cn';
import { Root, Trigger, Portal, Content, Close } from '@radix-ui/react-popover';
import ScrollArea from '../scroll-area';
import { useEffect, useState } from 'react';

export interface CustomDropdownProps {
    title: React.ReactNode;
    extraActionElement?: React.ReactNode;
    contentTitle?: string;
    children: React.ReactNode;
    headerComponent?: React.ReactNode;
    footerComponent?: React.ReactNode;
    className?: string;
    withoutScrollArea?: boolean;
    open?: boolean;
}

function CustomDropdown({
    title,
    contentTitle,
    children,
    headerComponent,
    footerComponent,
    className,
    withoutScrollArea,
    open: openProp = false
}: CustomDropdownProps) {
    const [open, setOpen] = useState(openProp);

    useEffect(() => {
        setOpen(openProp);
    }, [openProp]);

    return (
        <div className={cn('w-full', className)}>
            <Root open={open} onOpenChange={setOpen}>
                <Trigger className="group w-full">
                    <div className="rounded-[8px] p-[1px] group-data-[state=closed]:bg-white-20 group-data-[state=open]:bg-gradient">
                        <div className="relative flex items-center justify-between gap-[8px] rounded-[8px] bg-dark-blue py-[8px] pl-[16px] pr-[8px] text-[14px] leading-[18px] text-white before:absolute before:left-0 before:top-0 before:size-[100%] before:rounded-[8px] before:bg-white-5">
                            <span className="truncate">{title}</span>
                            <Arrow className="w-[24px] group-data-[state=closed]:rotate-0 group-data-[state=open]:rotate-180" />
                        </div>
                    </div>
                </Trigger>
                <Portal>
                    <Content
                        className="z-40 flex min-w-[--radix-popover-trigger-width] flex-col gap-[8px] rounded-[8px] bg-gradient p-[1px]"
                        sideOffset={5}
                        align="start"
                    >
                        <div className="relative rounded-[8px] bg-dark-blue p-[7px] before:absolute before:left-0 before:top-0 before:size-[100%] before:rounded-[8px] before:bg-white-5">
                            <div className="flex items-center justify-between px-[8px] py-[4px] pr-0 text-white">
                                <span className="text-[14px] font-normal text-white">
                                    {contentTitle || title}
                                </span>
                                <Close
                                    className="size-[24px] cursor-pointer"
                                    aria-label="Close"
                                >
                                    <DeleteDisabled className="w-[24px] opacity-50" />
                                </Close>
                            </div>
                            {headerComponent && headerComponent}
                            {withoutScrollArea ? (
                                children
                            ) : (
                                <ScrollArea viewPortClassName="max-h-[200px]">
                                    {children}
                                </ScrollArea>
                            )}
                            {footerComponent && footerComponent}
                        </div>
                    </Content>
                </Portal>
            </Root>
        </div>
    );
}

export default CustomDropdown;
