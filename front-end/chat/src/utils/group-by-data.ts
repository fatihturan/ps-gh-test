interface ChatData {
    model: string;
    pk: number;
    fields: {
        session_id: string;
        summary: string;
        user: number;
        created_at: string;
        updated_at: string;
    };
}

type GroupedData = {
    label: "Today" | "Yesterday" | "Last Week" | "Last Month" | "Older";
    data: ChatData[];
}[];

export function groupDataByTimePeriods(data: ChatData[]): GroupedData {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const lastWeekStart = new Date(today);
    lastWeekStart.setDate(lastWeekStart.getDate() - 7);
    const lastMonthStart = new Date(today);
    lastMonthStart.setMonth(lastMonthStart.getMonth() - 1);

    const groupedData: GroupedData = [
        { label: "Today", data: [] },
        { label: "Yesterday", data: [] },
        { label: "Last Week", data: [] },
        { label: "Last Month", data: [] },
        { label: "Older", data: [] }
    ];

    data.forEach(item => {
        const itemDate = new Date(item.fields.created_at);
        
        if (itemDate >= today) {
            groupedData[0].data.push(item);
        } else if (itemDate >= yesterday) {
            groupedData[1].data.push(item);
        } else if (itemDate >= lastWeekStart) {
            groupedData[2].data.push(item);
        } else if (itemDate >= lastMonthStart) {
            groupedData[3].data.push(item);
        } else {
            groupedData[4].data.push(item);
        }
    });

    // Remove empty groups (optional)
    return groupedData.filter(group => group.data.length > 0);
}