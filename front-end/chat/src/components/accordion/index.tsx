import { Arrow } from '@/icons';
import { cn } from '@/utils/cn';
import {
    Root,
    Header,
    Item,
    Trigger,
    Content
} from '@radix-ui/react-accordion';
import BetCard, { Bet } from '../bet-card';
import Button from '@/components/button';
import { useState } from 'react';

export interface AccordionProps {
    className?: string;
    items: {
        id: string;
        title: string;
        count: number;
        content?: { id: string; text: string }[];
        bets?: Bet[];
    }[];
    onClick?: (id: string) => void;
}

export const Accordion = ({
    items = [],
    onClick,
    className
}: AccordionProps) => {
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    const handleClick = async (id: string) => {
        setLoading((prev) => ({ ...prev, [id]: false }));
        onClick?.(id);
        setLoading((prev) => ({ ...prev, [id]: true }));
    };

    return (
        <Root type="multiple" className={cn('w-full space-y-[8px]', className)}>
            {items.map((item) => (
                <Item key={item.id} value={item.id}>
                    <Header className="pt-4">
                        {''}
                        {/* Added padding-top */}
                        <Trigger className="group/accordion flex w-full items-center gap-[8px]">
                            <div className="text-[16px] text-white-70">
                                {item.title}
                            </div>
                            <div className="flex size-[24px] items-center justify-center rounded-full bg-white-20">
                                <span className="text-[12px]">
                                    {item.count}
                                </span>
                            </div>
                            <Arrow
                                className="ml-[auto] size-[24px] transition-transform duration-300 ease-linear group-data-[state=closed]/accordion:rotate-0 group-data-[state=open]/accordion:rotate-180"
                                color="rgba(255,255,255,.7)"
                            />
                        </Trigger>
                    </Header>
                    {item.content && item.content.length > 0 && (
                        <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                            <ul className="cursor-pointer space-y-[16px] py-[18px]">
                                {item.content.slice(0, 20).map((content) => (
                                    <li key={content.id}>
                                        <Button
                                            asLink
                                            variant="secondary"
                                            className="w-full normal-case"
                                            href={`/chat/${content.id}`}
                                            loading={loading[content.id]}
                                            onClick={() =>
                                                handleClick(content.id)
                                            }
                                        >
                                            {content.text}
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        </Content>
                    )}
                    {item.bets && item.bets.length > 0 && (
                        <Content className="overflow-hidden data-[state=closed]:animate-slide-up data-[state=open]:animate-slide-down">
                            <ul className="cursor-pointer space-y-[16px] py-[18px]">
                                {item.bets.map((bet) => (
                                    <li
                                        key={bet.id}
                                        onClick={() => onClick?.(bet.id)}
                                    >
                                        <BetCard bets={[bet]} />
                                    </li>
                                ))}
                            </ul>
                        </Content>
                    )}
                </Item>
            ))}
        </Root>
    );
};

export default Accordion;
