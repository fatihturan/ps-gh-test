import {
    Root,
    Trigger,
    Portal,
    Overlay,
    Content,
    Close
} from '@radix-ui/react-dialog';
import Button from '../button';
import { DeleteDisabled } from '@/icons';

export const FeedbackModal = () => {
    return (
        <Root>
            <Trigger asChild>
                <Button variant="primary">Open</Button>
            </Trigger>
            <Portal>
                <Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 z-[3] bg-dark-blue opacity-[0.9]" />
                <Content className="data-[state=open]:animate-contentShow fixed left-1/2 top-1/2 z-[4] max-h-[85vh] w-[90vw] max-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] border-[2px] border-white-20 bg-dark-blue p-[40px] focus:outline-none">
                    <img
                        src={
                            new URL('/images/jaxon-logo.svg', import.meta.url)
                                .href
                        }
                        className="mx-auto w-[110px]"
                    />
                    <h2 className="pb-[8px] pt-[28px] text-center text-[24px] font-bold text-white">
                        We Value Your Feedback!
                    </h2>
                    <p className="text-center text-[14px] text-white-80">
                        How would you rate your experience with Jaxon?
                    </p>
                    <form className="mt-[32px] flex flex-col gap-[32px]">
                        <div className="rounded-[8px] bg-gradient p-[2px]">
                            <textarea
                                className="mb-[-6px] h-[120px] w-full resize-none rounded-[6px] bg-dark-blue-95 p-[16px] text-[14px] font-normal !text-white placeholder:text-white-50 focus:border-none focus:outline-none lg:text-[16px]"
                                placeholder="Please enter suggestions/thought/issues..."
                            ></textarea>
                        </div>
                        <div>
                            <Button
                                variant="primary"
                                className="w-full text-dark-blue after:bg-transparent hover:text-white hover:after:bg-gradient"
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                    <Close asChild>
                        <DeleteDisabled className="absolute right-[16px] top-[16px] w-[24px] cursor-pointer opacity-[0.5]" />
                    </Close>
                </Content>
            </Portal>
        </Root>
    );
};

export default FeedbackModal;
