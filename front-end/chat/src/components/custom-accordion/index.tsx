import { Arrow, Collapse } from '@/icons';
import { cn } from '@/utils/cn';
import {
    Root,
    Item,
    Header,
    Trigger,
    Content,
    AccordionSingleProps,
    AccordionMultipleProps
} from '@radix-ui/react-accordion';
import { useState } from 'react';

interface CustomAccordionProps {
    className?: string;
    border?: boolean;
    type?: 'single' | 'multiple';
    size?: 'small' | 'large';
    collapsible?: boolean;
    defaultOpenFirst?: boolean;
    showOpenedOnTop?: boolean;
    items: {
        id: string;
        title: string;
        actionButton?: boolean;
        extraAction?: () => void;
        children: React.ReactNode;
    }[];
}

function CustomAccordion({
    className,
    border = false,
    type = 'single',
    size = 'small',
    collapsible = false,
    items = [],
    defaultOpenFirst = false,
    showOpenedOnTop = false
}: CustomAccordionProps) {
    const [openItems, setOpenItems] = useState<string[]>(
        defaultOpenFirst ? [items[0].id] : []
    );

    const handleValueChange = (value: string[]) => {
        setOpenItems(value);
    };

    const sortedItems = showOpenedOnTop
        ? [...items].sort((a, b) => {
              const aIsOpen = openItems.includes(a.id);
              const bIsOpen = openItems.includes(b.id);
              return bIsOpen ? 1 : aIsOpen ? -1 : 0;
          })
        : items;

    const accordionProps: AccordionSingleProps | AccordionMultipleProps =
        type === 'single'
            ? {
                  type: 'single',
                  collapsible: collapsible,
                  defaultValue: defaultOpenFirst ? items[0].id : undefined,
                  onValueChange: (value: string) => {
                      handleValueChange([value]);
                  }
              }
            : {
                  type: 'multiple',
                  defaultValue: defaultOpenFirst ? [items[0].id] : undefined,
                  onValueChange: (value: string[]) => {
                      handleValueChange(value);
                  }
              };

    return (
        <Root
            className={cn(
                'w-full',
                size === 'small' ? 'relative space-y-[8px]' : 'space-y-[12px]',
                className
            )}
            {...accordionProps}
        >
            {sortedItems.map((item) => (
                <Item
                    key={item.id}
                    value={item.id}
                    className={`relative rounded-[8px] ${border ? 'border-[1px] border-white-20 data-[state=open]:!p-0 data-[state=open]:gradient-border' : 'border-[transparent]'}`}
                >
                    <div
                        className={`overflow-hidden rounded-[8px] ${size === 'small' ? 'bg-white-3 px-[16px] py-[8px] pr-[12px]' : 'bg-dark-blue before:absolute before:left-0 before:top-0 before:size-[100%] before:rounded-[8px] before:bg-white-3'}`}
                    >
                        <Header
                            className={cn(
                                `relative ${size === 'large' ? 'bg-white-5 p-[16px]' : 'bg-transparent'}`,
                                size === 'large'
                                    ? 'bg-white-5 p-[16px]'
                                    : 'bg-transparent'
                            )}
                        >
                            <Trigger
                                className={cn(
                                    `group/accordion before:z-1 flex w-full items-center justify-between gap-[8px] before:absolute`,
                                    size === 'large'
                                        ? 'before:left-0 before:top-0 before:size-[100%]'
                                        : 'before:-left-[16px] before:-top-[16px] before:h-[calc(100%+22px)] before:w-[calc(100%+32px)]'
                                )}
                            >
                                <div
                                    className={cn(
                                        `font-semibold text-white`,
                                        size === 'small'
                                            ? 'lg:text-[14px] lg:leading-[18px]'
                                            : 'lg:text-[16px] lg:leading-[20px]'
                                    )}
                                >
                                    {item.title}
                                </div>
                                {item.extraAction && (
                                    <Collapse
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            item.extraAction?.();
                                        }}
                                        className={cn(
                                            `z-2 relative ml-[auto] group-data-[state=closed]/accordion:hidden`,
                                            size === 'small'
                                                ? 'size-[20px]'
                                                : 'size-[24px]'
                                        )}
                                        color="rgba(255,255,255,.7)"
                                    />
                                )}
                                <Arrow
                                    className="size-[24px] transition-transform duration-300 group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180"
                                    color="rgba(255,255,255,.7)"
                                />
                            </Trigger>
                        </Header>
                        <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                            <div
                                className={cn(
                                    size === 'small' ? 'pt-[8px]' : 'p-[16px]'
                                )}
                            >
                                {item.children}
                            </div>
                        </Content>
                    </div>
                </Item>
            ))}
        </Root>
    );
}

export default CustomAccordion;
