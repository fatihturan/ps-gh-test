import resolveConfig from 'tailwindcss/resolveConfig';
import { Config } from 'tailwindcss/types/config';

// Import the tailwind config from the correct location
import tailwindConfig from '../../tailwind.config'; // Your tailwind config
import { useLayoutEffect, useState } from 'react';

const fullConfig = resolveConfig(tailwindConfig as Config);

const breakpoints = fullConfig?.theme?.screens || {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
};

type Breakpoints = {
    [key in keyof typeof breakpoints]: boolean;
};

const populateBreakpointStates = () => {
    return Object.keys(breakpoints).reduce((acc, breakpoint) => {
        acc[breakpoint as keyof typeof breakpoints] = matchMedia(
            `(min-width: ${breakpoints[breakpoint as keyof typeof breakpoints]})`
        ).matches;
        return acc;
    }, {} as Breakpoints);
};

export function useBreakpoint() {
    const [breakpointStates, setBreakpointStates] = useState<Breakpoints>(populateBreakpointStates());

    useLayoutEffect(() => {
        const onResize = () => { setBreakpointStates(populateBreakpointStates()) };
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    return breakpointStates;
}
