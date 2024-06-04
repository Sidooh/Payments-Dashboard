import { getRelativeDateAndTime } from '@/lib/utils.ts';

type TableDataProps = { date?: string | Date; dateOverTime?: boolean };

const TableDate = ({ date, dateOverTime }: TableDataProps) => {
    if (!date) return <>N/A</>;

    const { date: relativeDate, time } = getRelativeDateAndTime(date);

    return (
        <>
            <strong>{dateOverTime ? relativeDate : time}</strong>
            <p className={'leading-snug text-gray-600 text-[7pt]'}>{dateOverTime ? time : relativeDate}</p>
        </>
    );
};

export default TableDate;
