import { Root, Portal, Content, Trigger, Close } from '@radix-ui/react-popover';
import ScrollArea from '@/components/scroll-area';
import { useState } from 'react';
import { cn } from '@/utils/cn';
import { DeleteDisabled } from '@/icons';
import { ICategoriesWithQuestions } from '@/state/types';

interface SampleQuestionsProps {
    className?: string;
    sampleQuestions: ICategoriesWithQuestions;
    onQuestionClick: (question: string) => void;
}

export default function SampleQuestions({
    className,
    sampleQuestions,
    onQuestionClick
}: SampleQuestionsProps) {
    const [open, setOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );
    const [showMore, setShowMore] = useState(false);
    const selectedQuestions = selectedCategory
        ? Object.values(sampleQuestions[selectedCategory]).flatMap((league) =>
              Object.values(league).flatMap((subcategory) =>
                  Object.values(subcategory).flatMap((questions) => questions)
              )
          )
        : [];

    return (
        <Root open={open} onOpenChange={setOpen}>
            <Trigger asChild>
                <div
                    className={cn(
                        'flex flex-row flex-wrap justify-center gap-[8px]',
                        open && 'opacity-0',
                        className
                    )}
                >
                    {Object.keys(sampleQuestions)
                        .slice(
                            0,
                            showMore ? Object.keys(sampleQuestions).length : 4
                        )
                        .map((category) => (
                            <div
                                className="cursor-pointer gap-[10px] rounded-full bg-white-10 px-[24px] py-[12px] text-[14px] font-medium text-white"
                                key={category}
                                onClick={() => {
                                    setSelectedCategory(category);
                                    setOpen(true);
                                }}
                            >
                                {category}
                            </div>
                        ))}
                    <div
                        className="cursor-pointer gap-[10px] rounded-full bg-white-10 px-[24px] py-[12px] text-[14px] font-medium text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowMore(!showMore);
                        }}
                    >
                        {showMore ? 'Less' : 'More'}
                    </div>
                </div>
            </Trigger>
            <Portal>
                <Content
                    className="z-2 left-0 top-0 -mt-[--radix-popover-trigger-height] rounded-[8px] border border-white-10 bg-dark-blue-95"
                    align="start"
                    side="bottom"
                >
                    <div className="flex flex-row justify-between gap-[8px] p-[16px]">
                        <div className="text-[14px] font-light text-white">
                            {selectedCategory}
                        </div>
                        <Close>
                            <DeleteDisabled className="size-[24px] opacity-50" />
                        </Close>
                    </div>
                    <ScrollArea
                        className="mx-[16px] mb-[16px] w-[calc(var(--radix-popover-trigger-width)-32px)]"
                        viewPortClassName="max-h-[245px]"
                    >
                        {selectedQuestions && (
                            <ul className="w-full">
                                {Object.values(selectedQuestions)
                                    .flat()
                                    .map((question, index) => (
                                        <li
                                            key={index}
                                            className="cursor-pointer border-b border-white-10 py-[16px] text-[16px] font-light text-white last:border-b-0 last:pb-0"
                                            onClick={() => {
                                                onQuestionClick(question);
                                                setOpen(false);
                                            }}
                                        >
                                            {question}
                                        </li>
                                    ))}
                            </ul>
                        )}
                    </ScrollArea>
                </Content>
            </Portal>
        </Root>
    );
}
