/** @type {import('tailwindcss').Config} */
export default {
    theme: {
        fontFamily: {
            sans: ['aktiv-grotesk', 'sans-serif']
        },
        extend: {
            colors: {
                'dark-blue': '#10111E',
                'dark-blue-95': '#1C1D29',
                green: '#4CFFD4',
                blue: '#4076FF',
                gray: '#474851',
                'background-green': 'rgba(76, 255, 212, 0.12)',
                'button-green': '#152930',
                'background-blue': 'rgba(41, 46, 101, 0.3)',
                red: 'rgba(255, 76, 79, 1)',
                white: {
                    DEFAULT: '#FFFFFF',
                    80: 'rgba(255, 255, 255, 0.8)',
                    70: 'rgba(255, 255, 255, 0.7)',
                    50: 'rgba(255, 255, 255, 0.5)',
                    20: 'rgba(255, 255, 255, 0.2)',
                    10: 'rgba(255, 255, 255, 0.1)',
                    5: 'rgba(255, 255, 255, 0.05)',
                    3: 'rgba(255, 255, 255, 0.03)',
                    2: 'rgba(255, 255, 255, 0.02)',
                    1: 'rgba(255, 255, 255, 0.01)'
                }
            },
            backgroundImage: {
                gradient:
                    'linear-gradient(90.08deg, #4CFFD4 -18.86%, #4076FF 135.13%)',
                'loading-gradient':
                    'linear-gradient(90.08deg, #4076FF 0%, #4CFFD4 50%, #4076FF 100%)',
                'dark-shadow-background':
                    'linear-gradient(180deg, rgba(16, 17, 30, 0) 0%, rgba(16, 17, 30, 0.8) 91.1%)',
                'more-text-gradient':
                    'linear-gradient(180deg, rgba(16, 17, 30, 0.00) 0%, rgba(16, 17, 30, 1) 91.1%)',
                'custom-gradient':
                    'linear-gradient(90.08deg, rgba(76,255,212,.1) -18.86%, rgba(64, 118, 255,.1) 135.13%), linear-gradient(0deg, rgba(16, 17, 30, 0.9), rgba(16, 17, 30, 0.9))'
            },
            animation: {
                'reverse-spin': 'reverse-spin 1s linear infinite',
                'slide-down': 'slideDown 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'slide-up': 'slideUp 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                extend: 'extend 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                collapse: 'collapse 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'infobox-open':
                    'infoboxOpen 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                'infobox-close':
                    'infoboxClose 300ms cubic-bezier(0.87, 0, 0.13, 1)',
                gradient: 'gradient 1s linear infinite',
                'gradient-loading': 'gradient 2s linear infinite'
            },
            keyframes: {
                'reverse-spin': {
                    from: {
                        transform: 'rotate(360deg)'
                    }
                },
                slideDown: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                slideUp: {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0px' }
                },
                extend: {
                    from: { height: '0px' },
                    to: { height: 'var(--radix-collapsible-content-height)' }
                },
                collapse: {
                    from: { height: 'var(--radix-collapsible-content-height)' },
                    to: { height: '0px' }
                },
                infoboxOpen: {
                    from: { width: '0px' },
                    to: { width: 'var(--radix-collapsible-content-width)' }
                },
                infoboxClose: {
                    from: { width: 'var(--radix-collapsible-content-width)' },
                    to: { width: '0px' }
                },
                gradient: {
                    from: { backgroundPosition: '0% center' },
                    to: { backgroundPosition: '-200% center' }
                }
            },
            screens: {
                'max-1420': { max: '1420px' },
                'max-767': { max: '767px' }
            }
        }
    },
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    plugins: [
        function ({ matchUtilities }) {
            matchUtilities(
                {
                    'gradient-border': (value) => ({
                        position: 'relative',
                        padding: 'var(--border-width)',
                        '--border-width': '1px',
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            inset: '0',
                            borderRadius: value || '8px', //
                            border: 'var(--border-width) solid transparent',
                            background:
                                'linear-gradient(90.08deg, #4CFFD4 -18.86%, #4076FF 135.13%) border-box',
                            '-webkit-mask':
                                'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
                            '-webkit-mask-composite': 'destination-out',
                            'mask-composite': 'exclude'
                        }
                    })
                },
                {
                    type: ['length', 'number', 'percentage'],
                    values: {
                        DEFAULT: '8px'
                    }
                }
            );

            matchUtilities(
                {
                    'gradient-border-width': (value) => ({
                        '--border-width': value
                    })
                },
                {
                    type: ['length', 'number', 'percentage']
                }
            );
        }
    ]
};
