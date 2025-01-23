import Spiner from '@/icons/spiner';
import { IconProps } from '@/icons/types';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import {
    Children,
    cloneElement,
    isValidElement,
    ReactElement,
    ReactNode
} from 'react';

const buttonVariants = cva(['select-none', 'transition-all'], {
    variants: {
        variant: {
            primary: [
                'px-[25px]',
                'py-[11px]',
                'relative',
                'text-white',
                'text-[14px]',
                'font-bold',
                'uppercase',
                // after element
                'after:absolute',
                'after:transition-all',
                'after:top-[1px]',
                'after:left-[1px]',
                'after:w-[calc(100%-2px)]',
                'after:h-[calc(100%-2px)]',
                'after:bg-dark-blue',
                'after:rounded-[5px]',
                'after:z-[2]',
                // before element
                'before:absolute',
                'before:top-0',
                'before:left-0',
                'before:w-full',
                'before:h-full',
                'before:bg-gradient',
                'before:rounded-[4px]',
                'before:z-[1]',
                'hover:after:bg-button-green'
            ],
            secondary: [
                'px-[8px]',
                'py-[2px]',
                'relative',
                'border-b-2',
                'text-white',
                'font-bold',
                'text-[14px]',
                'line-height-[14px]',
                'uppercase',
                'border-b-transparent',
                'hover:before:top-[5px]',
                'hover:border-b-2',
                'hover:border-b-white'
            ],
            tertiary: [
                'px-[25px]',
                'py-[11px]',
                'relative',
                'text-[14px]',
                'font-bold',
                'uppercase',
                'rounded-[5px]',
                'bg-gradient'
            ],
            icon: [
                'flex items-center justify-center',
                'w-[36px]',
                'min-w-[36px]',
                'h-[36px]',
                'rounded-full',
                'bg-gradient'
            ],
            iconSecondary: [
                'flex items-center justify-center',
                'w-[36px]',
                'min-w-[36px]',
                'h-[36px]',
                'rounded-full',
                'bg-white-10',
                'hover:bg-white-20'
            ]
        },
        disabled: {
            true: ['pointer-events-none']
        },
        loading: {
            true: ['pointer-events-none']
        },
        sentence: {
            true: [
                'py-[8px]',
                'normal-case',
                'before:bg-white-50',
                'after:bg-dark-blue-95',
                'hover:after:bg-gray'
            ]
        }
    },
    compoundVariants: [
        {
            variant: 'primary',
            disabled: true,
            className: ['before:bg-white-20', 'text-white-20']
        },
        {
            variant: 'secondary',
            disabled: true,
            className: ['text-white-20']
        },
        {
            variant: 'tertiary',
            disabled: true,
            className: ['text-dark-blue']
        },
        {
            variant: 'icon',
            disabled: true,
            className: ['bg-white-20']
        },
        {
            variant: 'iconSecondary',
            disabled: true,
            className: ['bg-white-10']
        }
    ],
    defaultVariants: {
        variant: 'primary',
        disabled: false
    }
});

interface CommonProps {
    loading?: boolean;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'tertiary' | 'icon' | 'iconSecondary';
    sentence?: boolean;
}

interface ButtonProps
    extends CommonProps,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    asLink?: false;
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    asLink: true;
}

function Button({
    children,
    loading,
    className,
    disabled,
    variant,
    sentence,
    asLink,
    ...props
}: (ButtonProps & CommonProps) | (LinkProps & CommonProps)) {
    let innerElement: ReactNode;
    if (
        variant === 'icon' ||
        (variant === 'iconSecondary' &&
            Children.count(children) === 1 &&
            isValidElement(children))
    ) {
        const icon = children as ReactElement<IconProps>;
        const clonedChildren = cloneElement<IconProps>(icon, {
            color: disabled ? '#10111E' : '#FFF'
        });
        innerElement = clonedChildren;
    } else {
        innerElement = children;
    }

    const Tag = asLink ? 'a' : 'button';
    return (
        <Tag
            className={cn(
                buttonVariants({
                    disabled,
                    loading,
                    className,
                    variant,
                    sentence
                }),
                asLink ? 'block' : ''
            )}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            {...(props as any)}
        >
            <span className="relative z-[3] flex items-center justify-center gap-[4px]">
                {loading && (
                    <Spiner className="size-[18px] animate-reverse-spin" />
                )}
                {((variant !== 'icon' && variant !== 'iconSecondary') ||
                    !loading) && (
                    <span className="relative z-[3] flex items-center gap-[4px]">
                        {innerElement}
                    </span>
                )}
            </span>
        </Tag>
    );
}

export default Button;
