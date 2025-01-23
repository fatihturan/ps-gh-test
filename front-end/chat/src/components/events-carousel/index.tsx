import useEmblaCarousel from 'embla-carousel-react';
import { EventCard } from '../event-card';
import Button from '../button';
import { Arrow2 } from '@/icons';
import { usePrevNextButtons } from './use-prev-next-buttons';
import { IEvent } from '@/state/types';

interface IEventsCarouselProps {
    events: IEvent[];
}

export function EventsCarousel({ events }: IEventsCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start'
    });

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick
    } = usePrevNextButtons(emblaApi);

    return (
        <div className="flex flex-col gap-[8px]">
            <div className="flex w-full">
                <div className="hidden w-[48px] shrink-0 items-center justify-center lg:flex">
                    <Button
                        className="size-[40px]"
                        onClick={onPrevButtonClick}
                        variant="iconSecondary"
                        disabled={prevBtnDisabled}
                    >
                        <Arrow2 className="size-[24px] rotate-180" />
                    </Button>
                </div>
                <div className="w-full overflow-hidden" ref={emblaRef}>
                    <div className="flex w-full select-none gap-[8px]">
                        {events.map((event, index) => (
                            <div
                                key={index}
                                className="flex-0 max-1420:basis-[calc(50%-8px)] max-767:basis-[100%] flex-shrink-0 xl:basis-[calc(33.33%-8px)]"
                            >
                                <EventCard
                                    className="w-full"
                                    eventItem={event}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hidden w-[48px] shrink-0 items-center justify-center lg:flex">
                    <Button
                        className="size-[40px]"
                        onClick={onNextButtonClick}
                        variant="iconSecondary"
                        disabled={nextBtnDisabled}
                    >
                        <Arrow2 className="size-[24px]" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EventsCarousel;
