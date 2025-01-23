import Header from '@/components/header';
import MessageTextBox from '@/components/message-text-box';
import NavigationMenu from '@/components/navigation-menu';
import SampleQuestions from '@/components/sample-questions';
import EventsWithFilter from '@/components/events-with-filter';
import { useAppContext, useChatContext } from '@/state';

interface IChatScreenProps {
    message: string;
    setMessage: (message: string) => void;
    onSend: () => void;
}

export function Chat({ setMessage, message, onSend }: IChatScreenProps) {
    // **Chat Context**
    const {
        changeProMode,
        proMode,
        proModeDisabled,
        loading,
        categorizedSuggestions,
        events
    } = useChatContext();

    // **App Context**
    const { chatsRemaining } = useAppContext();

    return (
        <div className="flex min-h-[calc(100vh-32px)] flex-col items-center justify-center">
            <Header />
            <NavigationMenu selectedItemId="chat" />
            <div className="z-5 relative flex h-full w-full max-w-[1400px] flex-col items-center justify-center pb-[50px] lg:w-[calc(100%-150px)] lg:pb-0">
                <div className="mt-[150px] lg:order-1 lg:mb-[40px] lg:mt-0">
                    <img
                        src={
                            new URL('/images/jaxon-logo.svg', import.meta.url)
                                .href
                        }
                        className="mx-auto my-0 mt-auto max-w-[180px] lg:max-w-[250px]"
                    />
                    <p className="mb-auto pb-[40px] pt-[16px] text-center text-[16px] lg:pb-[0] lg:text-[18px]">
                        Your Personal AI Sports Companion
                    </p>
                </div>
                <div className="lg:-w-full fixed bottom-0 left-0 z-10 order-4 mb-[80px] w-full bg-dark-blue p-[16px] lg:relative lg:bottom-0 lg:left-0 lg:order-2 lg:-mb-0 lg:max-w-[800px] lg:p-0">
                    <MessageTextBox
                        changeProMode={changeProMode}
                        value={message}
                        onChange={setMessage}
                        disabled={!message}
                        loading={loading}
                        onSubmit={onSend}
                        proMode={proMode}
                        proModeDisabled={proModeDisabled}
                        chatsRemaining={chatsRemaining}
                        short={false}
                    />
                </div>
                <div className="text-center lg:order-3 lg:mt-[24px] lg:w-[800px]">
                    <SampleQuestions
                        className="w-full"
                        sampleQuestions={categorizedSuggestions}
                        onQuestionClick={setMessage}
                    />
                </div>
                <div className="mb-0 mt-[96px] w-full pb-[190px] lg:order-4 lg:mt-[100px] lg:pb-0">
                    <EventsWithFilter events={events} />
                </div>
            </div>
        </div>
    );
}

export default Chat;
