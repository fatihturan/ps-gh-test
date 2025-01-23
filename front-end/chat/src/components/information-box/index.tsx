import { Arrow, DeleteDisabled } from '@/icons';
import Button from '../button';
import SendMessage from '@/icons/send-message';
import { cn } from '@/utils/cn';
import {
    Root,
    Header,
    Item,
    Trigger,
    Content
} from '@radix-ui/react-accordion';
import {
    Root as ScrollAreaRoot,
    Scrollbar,
    Thumb,
    Viewport
} from '@radix-ui/react-scroll-area';
import { ChatContextType } from '@/state';

interface InformationBoxProps {
    markdown?: string;
    className?: string;
    open?: boolean;
    onClose?: () => void;
    items?: ChatContextType['informationBoxData'];
}

export const InformationBox = ({
    className,
    open = false,
    onClose,
    items = []
}: InformationBoxProps) => {
    // Define the items for the accordion
    return (
        <div
            className={cn(
                'absolute left-[0px] top-[0px] z-10 w-full bg-black/30 lg:static lg:left-[0px] lg:top-[0px] lg:w-[465px] lg:bg-transparent',
                'overflow-hidden transition-[width,height,opacity] duration-[0.3s]',
                !open
                    ? 'h-[0px] opacity-0 lg:h-fit lg:w-[0px]'
                    : 'opacity-1 h-fit w-full lg:w-[465px]'
            )}
        >
            <div
                className={cn(
                    `flex flex-col overflow-hidden rounded-[16px] bg-dark-blue-95`,
                    className,
                    'ml-[65px] h-[calc(100vh)] w-[calc(100%-64px)] lg:ml-[0px] lg:mt-[16px] lg:h-[calc(100vh-114px)] lg:w-[465px]'
                )}
            >
                <div className="flex items-center justify-between bg-white-5 px-[16px] py-[10px]">
                    <div className="mr-[4px]">
                        <Arrow className="size-[24px] rotate-90" />
                    </div>
                    <h2 className="flex-grow text-left">BetSlips</h2>
                    <div className="cursor-pointer" onClick={() => onClose?.()}>
                        <DeleteDisabled color="#FFF" className="size-[24px]" />
                    </div>
                </div>

                <ScrollAreaRoot className="flex-grow overflow-hidden px-[16px]">
                    <Viewport className="size-full py-[16px]">
                        <Root type="multiple">
                            {items.map((item) => (
                                <Item
                                    value={item.id}
                                    className="border-b border-b-white-10 pb-[10px] pt-[20px]"
                                >
                                    <Header>
                                        <Trigger className="group/accordion flex w-full flex-col items-start border-white-10">
                                            <h3 className="flex w-full flex-row items-center justify-between text-[16px]">
                                                <span className="text-left flex-1">
                                                    {item.title}
                                                </span>
                                                <Arrow
                                                    className="ml-4 size-[24px] transition-transform duration-300 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180"
                                                    color="rgba(255,255,255,.7)"
                                                />
                                            </h3>
                                            <div className="flex flex-row items-center gap-[8px] py-[8px] text-[14px] text-white-50">
                                                {item.bets[0]
                                                    .positionImageUrl && (
                                                    <div className="flex flex-row items-center gap-[8px]">
                                                        <figure className="w-[60px]">
                                                            <img
                                                                src={
                                                                    item.bets[0]
                                                                        .positionImageUrl
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </figure>
                                                    </div>
                                                )}
                                                <div className="flex flex-grow flex-col items-start">
                                                    <h4 className="text-[13px] text-left font-normal text-white-70">
                                                        {item.bets?.[0]?.event}
                                                    </h4>
                                                    <p className="text-[12px] text-white-50">
                                                        {item.bets?.[0]?.date
                                                            ? new Date(
                                                                  item.bets[0].date
                                                              ).toLocaleDateString(
                                                                  'en-US',
                                                                  {
                                                                      weekday:
                                                                          'short',
                                                                      month: 'short',
                                                                      day: 'numeric',
                                                                      hour: 'numeric',
                                                                      minute: '2-digit',
                                                                      hour12: true
                                                                  }
                                                              )
                                                            : ''}
                                                    </p>
                                                </div>
                                            </div>
                                        </Trigger>
                                    </Header>
                                    <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                                        {item.bets.map((bet) => (
                                            <div
                                                key={bet.id}
                                                className="mb-[16px] flex flex-row justify-between gap-[16px] rounded-[16px] bg-white-3 p-[16px] last:mb-[0px]"
                                            >
                                                {bet.bookImage && (
                                                    <div className="flex flex-row items-center gap-[8px]">
                                                        <figure className="h-[48px] w-[48px] overflow-hidden rounded-[100%]">
                                                            <img
                                                                src={
                                                                    bet.bookImage
                                                                }
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </figure>
                                                    </div>
                                                )}
                                                <div className="flex flex-grow flex-col justify-center">
                                                    <h4 className="text-[13px] font-normal text-white-70">
                                                        {bet.betMetric}
                                                    </h4>
                                                    <p className="text-[12px] text-white-50">
                                                        {bet.betMetricValue}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row items-center justify-center gap-[8px] rounded-[8px] bg-white-5 px-[16px] py-[8px]">
                                                    <div className="flex flex-col items-center justify-center">
                                                        <span className="text-[12px] text-white-70">
                                                            {bet.line}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                'text-[16px] font-semibold',
                                                                parseFloat(
                                                                    bet.odds
                                                                ) < 0
                                                                    ? 'text-red'
                                                                    : 'text-green'
                                                            )}
                                                        >
                                                            {bet.odds}
                                                        </span>
                                                        

                                                    </div>
                                                    <div>
                                                    <Button
                                                        type="submit"
                                                        variant="iconSecondary"
                                                        disabled={false}
                                                        loading={false}
                                                        className={'order-3'}
                                                        onClick={() => window.open(bet.betPlaceUrl, '_blank', 'noopener,noreferrer')}

                                                    >
                                                        <SendMessage />
                                                    </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </Content>
                                </Item>
                            ))}
                        </Root>
                    </Viewport>
                    <Scrollbar
                        className="flex touch-none select-none bg-white-10 p-0.5 transition-colors duration-[160ms] ease-out hover:bg-white-5 data-[orientation=horizontal]:h-2.5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col"
                        orientation="vertical"
                    >
                        <Thumb className="relative flex-1 rounded-[10px] bg-white-50 before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
                    </Scrollbar>
                </ScrollAreaRoot>

                
            </div>
        </div>
    );
};

export default InformationBox;
