import { v4 as uuidv4 } from 'uuid';

interface ChatFields {
    chat_session_id: string;
    created_at: string;
    question: string | null;
    temporary_answer: string | null;
    answer: string | null;
    thumbs_up?: boolean;
    thumbs_down?: boolean;
}

interface ChatHistoryItem {
    pk: number;
    fields: ChatFields;
}

interface Message {
    id: string;
    chatId: string;
    sender: 'you' | 'assistant';
    text: string;
    waiting?: boolean;
    thumbsUp?: boolean;
    thumbsDown?: boolean;
}

export function convertChatHistory(chatHistory: ChatHistoryItem[]): Message[] {
    return chatHistory.flatMap(({ pk, fields }) => {
        const { question, temporary_answer, answer, thumbs_up, thumbs_down } =
            fields;
        const messages: Message[] = [];
        const defaultChatId = String(pk);

        if (question) {
            messages.push({
                id: uuidv4(),
                chatId: defaultChatId,
                sender: 'you',
                text: question,
                waiting: false,
                thumbsUp: false,
                thumbsDown: false
            });
        }

        if (temporary_answer) {
            messages.push({
                id: uuidv4(),
                chatId: String(pk),
                sender: 'assistant',
                text: temporary_answer,
                waiting: false,
                thumbsUp: thumbs_up ?? false,
                thumbsDown: thumbs_down ?? false
            });
        }

        if (answer) {
            messages.push({
                id: uuidv4(),
                chatId: String(pk),
                sender: 'assistant',
                text: answer,
                waiting: false,
                thumbsUp: thumbs_up ?? false,
                thumbsDown: thumbs_down ?? false
            });
        }

        return messages;
    });
}
