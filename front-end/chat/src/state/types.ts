export interface IEvent {
    startTime: string;
    name: string;
    id: string;
    contestantHome: {
        id: string;
        fullName: string;
    };
    contestantHomeAbbr: string | null;
    contestantHomeLogo: string | null;
    contestantAway: {
        id: string;
        fullName: string;
    };
    contestantAwayAbbr: string | null;
    contestantAwayLogo: string | null;
    homeMoneyline: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
    awayMoneyline: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
    homeSpread: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
    awaySpread: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
    totalOver: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
    totalUnder: {
        abbr: string;
        price: {
            line: number;
            odds: number;
            main: boolean;
            live: boolean;
        };
        bookLogo: string | null;
    } | null;
}

export type League = 'NFL' | 'NBA' | 'MLB' | 'NHL';

export type EventsWithFilterType = {
    [league in string]?: {
        [date: string]: IEvent[];
    };
};

export interface ICategoriesWithQuestions {
    [category: string]: {
        [league: string]: {
            [subcategory: string]: {
                Questions: string[];
            };
        };
    };
}

export interface IMessage {
    id: string;
    chatId: string;
    sender: 'you' | 'assistant';
    text: string;
    waiting?: boolean;
    thumbsUp?: boolean;
    thumbsDown?: boolean;
}

export interface BetslipsData {
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
}

export interface IStatistics {
    hits: number;
    hitPerc: number;
    stdev: number;
    mean: number;
}

export interface IStatisticsWithCount extends IStatistics {
    count: number;
}

export interface IMarketData {
    event: {
        id: string;
        sportsdataioId: string;
        sportradarId: string;
        oddsjamId: string;
        theOddsApiId: string;
        sport: string;
        league: string;
        name: string;
        nameSpecial: string | null;
        startTime: string;
        startDate: string;
        sportId: string;
        leagueId: string;
        contestantAway: {
            id: string;
            fullName: string;
        };
        contestantHome: {
            id: string;
            fullName: string;
        };
        neutralVenue: boolean;
    };
    team: {
        id: string;
        sportsdataioId: string;
        oddsjamId: string;
        sportradarId: string;
        locale: string;
        name: string;
        fullName: string;
        sportId: string;
    };
    opponent: {
        id: string;
        sportsdataioId: string;
        oddsjamId: string;
        sportradarId: string;
        locale: string;
        name: string;
        fullName: string;
        sportId: string;
    };
    locationType: string;
    player: {
        id: string;
        sportsdataioId: string;
        oddsjamId: string;
        sportradarId: string;
        firstName: string;
        lastName: string;
        sportId: string;
        fullName: string;
    };
    market: {
        id: string;
        name: string;
        type: string;
        proposition: string;
        player: boolean;
        team: boolean;
        future: boolean;
        oddsjamId: string;
        sportradarId: string;
        sportsdataioId: string | null;
        theOddsApiId: string;
        sport: {
            id: string;
            name: string;
        };
        league: {
            id: string;
            name: string;
            abbr: string;
        };
        segment: {
            id: string;
            name: string;
        };
        metric: {
            id: string;
            name: string;
        };
    };
    position: string;
    DVP: number;
    pineProjection: number;
    [key: `L${number}`]: IStatistics;
    vsOpponent: {
        dataStartDate: string;
        [key: string]: IStatisticsWithCount | string;
    };
    atLocationType: {
        [key: string]: IStatisticsWithCount;
    };
    season: IStatisticsWithCount;
}

export interface IPlayerTeam {
    id: string;
    fullName: string;
}

export interface IPlayerWithoutGame {
    id: string;
    sportsdataioId: string;
    oddsjamId: string | null;
    sportradarId: string;
    firstName: string;
    lastName: string;
    sportId: string;
    fullName: string;
    currentTeams: IPlayerTeam[];
}

export interface IMarketWithMetadata {
    [key: string]: IMarketData | string | IPlayerWithoutGame[];
    type: string;
    gamesWithout: IPlayerWithoutGame[];
}

export interface IGameState {
    season: string;
    location: 'home' | 'away';
    opponent: string;
    value: number;
    date: string;
    result: 'Over' | 'Under';
}
