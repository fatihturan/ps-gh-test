import { useState } from 'react';
import EventsCarousel from '@/components/events-carousel';
import { NFL, NHL, MLB, NBA } from '@/icons';
import { EventsWithFilterType } from '@/state/types';
import SingleSelectFilter from '../single-select-filter';

const leagues = [
    { value: 'nfl', name: 'NFL', icon: <NFL /> },
    { value: 'nba', name: 'NBA', icon: <NBA /> },
    { value: 'mlb', name: 'MLB', icon: <MLB /> },
    { value: 'nhl', name: 'NHL', icon: <NHL /> }
];

type League = (typeof leagues)[number]['name'];

interface IEventsWithFilterProps {
    events: EventsWithFilterType;
}

const formatDateLabel = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function EventsWithFilter({ events }: IEventsWithFilterProps) {
    const [selectedLeague, setSelectedLeague] = useState<League | null>(null);
    const [selectedDate, setSelectedDate] = useState<string | null>(null);

    // Get available leagues based on selected date
    const availableLeagues = leagues.filter((league) => {
        const leagueEvents = events[league.value.toUpperCase()];
        if (!leagueEvents) return false;

        // If date selected, check if league has events on that date
        if (selectedDate) {
            return leagueEvents[selectedDate]?.length > 0;
        }
        return true;
    });

    // Get available dates based on selected league
    const availableDates = [
        ...new Set(
            Object.keys(events).flatMap((league) => {
                // If league selected, only get dates for that league
                if (
                    selectedLeague &&
                    league.toLowerCase() !== selectedLeague.toLowerCase()
                ) {
                    return [];
                }
                return events[league] ? Object.keys(events[league]) : [];
            })
        )
    ];

    // Filter events based on both league and date selections
    const filteredEvents = Object.keys(events).flatMap((league) => {
        // Filter by league if selected
        if (
            selectedLeague &&
            league.toLowerCase() !== selectedLeague.toLowerCase()
        ) {
            return [];
        }

        // Filter by date if selected
        if (selectedDate) {
            return events[league]?.[selectedDate] || [];
        }

        // If no filters, return all events for the league
        return Object.values(events[league] || {}).flat();
    });

    const dateWithLabels = availableDates
        .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
        .map((date) => ({
            value: date,
            label: formatDateLabel(date)
        }));

    return (
        <div className="w-full">
            <div className="mb-[24px] flex justify-center gap-[8px] lg:mx-[auto] lg:mb-[16px] lg:max-w-[410px]">
                <SingleSelectFilter
                    name="select-date"
                    title="Select Date"
                    options={dateWithLabels}
                    selectedOption={selectedDate}
                    onApply={setSelectedDate}
                />
                <SingleSelectFilter
                    name="select-league"
                    title="Select League"
                    options={availableLeagues.map((league) => ({
                        label: (
                            <div className="flex items-center gap-[8px]">
                                {league.icon}
                                {league.name}
                            </div>
                        ),
                        value: league.value
                    }))}
                    selectedOption={selectedLeague}
                    onApply={setSelectedLeague}
                />
            </div>
            <EventsCarousel events={filteredEvents} />
        </div>
    );
}

export default EventsWithFilter;
