import moment from 'moment';
import { cn } from '@/lib/utils.ts';

type LatencyProps = {
    from: Date;
    to: Date;
};

export const calcLatency = (from: Date, to: Date) => Math.abs(moment(to).diff(from, 's'));

const Latency = ({ from, to }: LatencyProps) => {
    let unit = 's',
        latInSec = calcLatency(from, to),
        latency = latInSec;

    if (latency > 86400) {
        unit = 'd';
        latency = latency / 86400;
    } else if (latency > 3600) {
        unit = 'hrs';
        latency = latency / 3600;
    } else if (latency > 120) {
        unit = 'min';
        latency = latency / 60;
    }

    return (
        <span
            className={cn(`font-bold`, {
                'text-red-600': latInSec > 30,
                'text-yellow-500': latInSec > 7 && latInSec <= 30,
                'text-[#1f7503]': latInSec <= 7,
            })}
        >
            {Math.round(latency)}
            {unit}
        </span>
    );
};

export default Latency;
