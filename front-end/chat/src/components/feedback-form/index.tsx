import TextareaAutosize from 'react-textarea-autosize';
import Button from '../button';
import { DeleteDisabled } from '@/icons';
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface FeedbackFormProps {
    className?: string;
    onClose: () => void;
    onSubmit: (feedback: string) => void;
}

const FeedbackForm = ({ className,  onSubmit }: FeedbackFormProps) => {
    const [isClosed, setIsClosed] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        await onSubmit(feedback); 
        setIsLoading(false);
        setIsSent(true);
    };

    if (isClosed) return null;

    return (
        <div className={cn('flex flex-col gap-[12px]', className)}>
            <div className="flex items-center justify-between text-[18px] font-bold text-white">
                <h3>
                    {isSent
                        ? 'Thank you for your feedback!'
                        : 'We Value Your Feedback!'}
                </h3>
                <Button
                    variant="iconSecondary"
                    onClick={() => setIsClosed(true)}
                >
                    <DeleteDisabled className="size-[24px]" />
                </Button>
            </div>
            {!isSent && (
                <form
                    className="flex flex-col gap-[12px]"
                    onSubmit={handleSubmit}
                >
                    <TextareaAutosize
                        minRows={1}
                        maxRows={4}
                        className={
                            'text-16px resize-none appearance-none rounded-[8px] border-[1px] border-white-10 bg-white-3 p-[12px] text-white'
                        }
                        placeholder="Please enter suggestions/thought/issues..."
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                    />
                    <Button
                        disabled={feedback.length === 0}
                        loading={isLoading}
                        className="w-fit normal-case"
                        variant="primary"
                    >
                        Submit
                    </Button>
                </form>
            )}
        </div>
    );
};

export default FeedbackForm;
