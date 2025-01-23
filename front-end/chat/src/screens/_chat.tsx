import Header from '@/components/header';
import InformationBox from '@/components/information-box';
import MessageContainer from '@/components/message-container';
import MessageTextBox from '@/components/message-text-box';
import Suggestions from '@/components/suggestions';
import Expand from '@/icons/expand';
import { useChatContext } from '@/state';
import { cn } from '@/utils/cn';

interface ChatProps {
    message: string;
    setMessage: (message: string) => void;
    onSend: () => void;
    loading: boolean;
    errorMessage: string | null;
    warningMessage: string | null;
    changeProMode: () => void;
    proMode: boolean;
    proModeDisabled: boolean;
    chatsRemaining: number;
}

function Chat({
    message,
    setMessage,
    onSend,
    loading,
    errorMessage,
    warningMessage,
    changeProMode,
    proMode,
    proModeDisabled,
    chatsRemaining
}: ChatProps) {
    const {
        messages,
        sampleQuestions,
        suggestions,
        informationBoxData,
        informationBoxOpen,
        setInformationBoxOpen
    } = useChatContext();

    return (
        <div
            className={cn(
                'flex h-screen w-screen justify-center',
                messages.length === 0
                    ? 'items-center'
                    : 'items-end pb-[106px] lg:pb-[40px]'
            )}
        >
            <Header />
            <div
                className={cn(
                    'mx-auto flex w-full flex-col p-[16px]',
                    messages.length === 0
                        ? 'z-1 h-auto max-w-[832px] items-center justify-between'
                        : 'h-[calc(100vh-140px)] justify-center gap-[16px] pb-[0] lg:h-[calc(100vh-80px)] lg:flex-row lg:gap-[24px]'
                )}
            >
                <div
                    className={cn(
                        messages.length > 0 &&
                            'flex h-full max-w-[100%] flex-1 flex-col lg:max-w-[800px]'
                    )}
                >
                    {messages.length === 0 && (
                        <div className="mt-auto">
                            <img
                                src={
                                    new URL(
                                        '/images/jaxon-logo.svg',
                                        import.meta.url
                                    ).href
                                }
                                className="mx-auto my-0 mt-auto max-w-[120px] md:max-w-[180px] lg:max-w-[250px]"
                            />
                            <p className="mb-auto pb-[40px] pt-[16px] text-center text-[16px] lg:pb-[0] lg:text-[18px]">
                                Your Personal AI Sports Companion
                            </p>
                        </div>
                    )}
                    {messages.length > 0 && (
                        <MessageContainer
                            messages={messages}
                            className="m-[-16px] mt-[16px] lg:mb-[16px]"
                            loading={loading}
                        />
                    )}
                    {suggestions.length > 0 && messages.length > 0 && (
                        <Suggestions
                            className="mt-[16px]"
                            suggestions={suggestions}
                            onSelect={setMessage}
                        />
                    )}
                    {informationBoxData && informationBoxData.length > 0 && (
                        <div
                            onClick={() => setInformationBoxOpen(true)}
                            className="flex h-[56px] w-full cursor-pointer items-center justify-between rounded-[16px] border border-white-5 bg-white-10 px-[16px] py-[18px] text-[16px] lg:hidden"
                        >
                            <span className="text-[14px] font-semibold text-white">
                                Betslips
                            </span>
                            <Expand className="ml-[8px]" />
                        </div>
                    )}
                    <MessageTextBox
                        short={messages.length > 0}
                        className={cn(
                            messages.length === 0
                                ? '"order-2 lg:my-[64px]" mb-[0] mt-[40px] lg:order-1'
                                : 'fixed bottom-[16px] left-[16px] w-[calc(100%-32px)] lg:static lg:w-full'
                        )}
                        disabled={!message}
                        loading={loading}
                        value={message}
                        onChange={setMessage}
                        onSubmit={onSend}
                        proMode={proMode}
                        proModeDisabled={proModeDisabled}
                        changeProMode={changeProMode}
                        chatsRemaining={chatsRemaining}
                    />
                    {(errorMessage || warningMessage) && (
                        <div
                            className="mt-[8px] text-center text-[14px] font-medium"
                            style={{
                                color: errorMessage ? '#ff4d4d' : '#FFC107'
                            }}
                        >
                            {errorMessage || warningMessage}
                        </div>
                    )}
                    {messages.length === 0 && sampleQuestions.length > 0 && (
                        <ul
                            className={cn(
                                'order-1 mb-auto mt-[24px] grid grid-cols-1 items-center gap-[16px] transition-opacity duration-300 lg:order-2 lg:grid-cols-3',
                                loading && 'pointer-events-none opacity-50'
                            )}
                        >
                            {sampleQuestions.map((question, index) => (
                                <li
                                    key={index}
                                    onClick={() => {
                                        setMessage(question);
                                    }}
                                    className="cursor-pointer select-none rounded-[26px] bg-white-10 px-[24px] py-[16px] text-[14px] text-white lg:text-[16px]"
                                >
                                    {question}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {messages.length > 0 && (
                    <InformationBox
                        open={informationBoxOpen}
                        onClose={() => {
                            setInformationBoxOpen(false);
                        }}
                        items={informationBoxData}
                    />
                )}
            </div>
        </div>
    );
}

export default Chat;
