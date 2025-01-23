// types/global.d.ts
import { EventsWithFilterType, ICategorizedSuggestions } from '@/state/types';

declare global {
    interface Window {
        context: {
            currentChatCount: integer;
            profile_picture: string;
            MAX_CHAT_COUNT: integer;
            monthlyPeriodEndString: string;
            customerPortalUrl: string;
            chatSessionId: string;
            isJaxonUser: string;
            questions: string[];
            username: string;
            surveys: string[];
            infobox: {
                bets: {
                    line: string;
                    odds: string;
                    bookImage: string;
                    date: string;
                    event: string;
                    id: string;
                    betMetric: string;
                    betMetricValue: string;
                    positionImageUrl: string;
                    betPlaceUrl: string;
                }[];
                id: string;
                title: string;
                count: number;
            }[];
            chatHistory: {
                pk: number;
                fields: {
                    chat_session_id: string;
                    created_at: string;
                    question: string | null;
                    temporary_answer: string | null;
                    answer: string | null;
                };
            }[];
            userSessions: {
                model: string;
                pk: number;
                fields: {
                    session_id: string;
                    summary: string;
                    user: number;
                    created_at: string;
                    updated_at: string;
                };
            }[];
            events: EventsWithFilterType;
            categorized_suggestions: ICategorizedSuggestions;
        };
    }
}

// Need to add this line to make it a module
export {};
