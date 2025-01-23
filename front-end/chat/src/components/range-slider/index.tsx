import * as Slider from '@radix-ui/react-slider';

interface RangeSliderProps {
    defaultValue: number[];
    values: number[];
    max?: number;
    min?: number;
    step?: number;
    onChange?: (value: number[]) => void;
}
const RangeSlider = ({
    defaultValue,
    values,
    max = 100,
    min = 0,
    step = 1,
    onChange
}: RangeSliderProps) => {
    const handleValueChange = (newValues: number[]) => {
        onChange?.(newValues);
    };

    return (
        <form className="relative w-full">
            <Slider.Root
                className="relative flex touch-none select-none items-center"
                defaultValue={defaultValue}
                max={max}
                min={min}
                step={step}
                onValueChange={handleValueChange}
            >
                <Slider.Track className="relative h-[6px] grow rounded-full bg-white-10">
                    <Slider.Range className="absolute h-full rounded-full bg-gradient" />
                </Slider.Track>
                {values.map((value, index) => (
                    <Slider.Thumb
                        className="relative block h-[20px] w-[20px] rounded-[10px] before:absolute before:left-0 before:top-0 before:z-[1] before:h-full before:w-full before:rounded-[10px] before:bg-gradient after:absolute after:left-[1px] after:top-[1px] after:z-[2] after:h-[calc(100%-2px)] after:w-[calc(100%-2px)] after:rounded-[10px] after:bg-dark-blue"
                        aria-label="Min Value"
                        key={index}
                    >
                        <div
                            className="absolute text-center text-[12px] text-white-70"
                            style={{
                                transform: `translateX(-50%) translateY(23px)`,
                                left: '50%'
                            }}
                        >
                            {value}
                        </div>
                    </Slider.Thumb>
                ))}
            </Slider.Root>
        </form>
    );
};

export default RangeSlider;
