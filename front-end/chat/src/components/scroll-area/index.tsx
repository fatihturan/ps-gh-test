import { Root, Viewport, Scrollbar, Thumb } from '@radix-ui/react-scroll-area';
import { cn } from '@/utils/cn';

interface ScrollAreaProps {
    className?: string;
    viewPortClassName?: string;
    children: React.ReactNode;
}

function ScrollArea({
    className,
    viewPortClassName,
    children
}: ScrollAreaProps) {
    return (
        <Root className={cn('w-full', className)} type="always">
            <Viewport className={cn('size-full', viewPortClassName)}>
                {children}
            </Viewport>
            <Scrollbar
                className="touch-none select-none data-[orientation=vertical]:w-[3px]"
                orientation="vertical"
            >
                <Thumb className="rounded-[100px] bg-[rgba(255,255,255,0.7)]" />
            </Scrollbar>
        </Root>
    );
}

export default ScrollArea;
