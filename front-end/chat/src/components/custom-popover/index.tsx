import { DeleteDisabled } from '@/icons';
import Filter from '@/icons/filter';
import { Root, Trigger, Portal, Content, Close } from '@radix-ui/react-popover';
import ScrollArea from '../scroll-area';

interface CustomPopoverProps {
    title?: string;
    align?: 'start' | 'center' | 'end';
    sideOffset?: number;
    icon?: React.ReactNode;
}

function CustomPopover({
    title = 'Title',
    align = 'start',
    sideOffset = 5,
    icon = <Filter className="size-[24px]" />
}: CustomPopoverProps) {
    return (
        <div>
            <Root>
                <Trigger className="group">
                    <div className="rounded-[8px] border-[1px] p-[1px] group-data-[state=closed]:border-white-20 group-data-[state=open]:gradient-border">
                        <div className="flex h-[40px] w-[40px] items-center justify-center gap-[8px] rounded-[8px] text-white">
                            {icon}
                        </div>
                    </div>
                </Trigger>
                <Portal>
                    <Content
                        className="relative z-[4] flex w-full min-w-[300px] flex-col gap-[8px] rounded-[8px] bg-gradient p-[1px]"
                        sideOffset={sideOffset}
                        align={align}
                    >
                        <div className="relative rounded-[8px] bg-dark-blue p-[7px] before:absolute before:left-0 before:top-0 before:size-[100%] before:bg-white-5">
                            <div className="flex items-center justify-between px-[8px] py-[4px] pr-0 text-white">
                                <span className="text-[14px] font-normal text-white">
                                    {title}
                                </span>
                                <Close
                                    className="size-[24px] cursor-pointer"
                                    aria-label="Close"
                                >
                                    <DeleteDisabled className="w-[24px] opacity-50" />
                                </Close>
                            </div>
                            <ScrollArea>
                                <div className="text-[13px] text-white">
                                    Content Text 1
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 2
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 3
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 4
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 5
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 6
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 7
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 8
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 9
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 10
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 11
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 12
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 13
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 14
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 15
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 16
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 17
                                </div>
                                <div className="text-[13px] text-white">
                                    Content Text 18
                                </div>
                            </ScrollArea>
                        </div>
                    </Content>
                </Portal>
            </Root>
        </div>
    );
}

export default CustomPopover;
