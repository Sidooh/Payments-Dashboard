import moment from "moment";

type LatencyProps = {
    from: Date,
    to: Date
}

export const calcLatency = (from: Date, to: Date) => Math.abs(moment(to).diff(from, 's'))

const Latency = ({ from, to }: LatencyProps) => {
    let unit = 's', color = 'danger', latency = calcLatency(from, to);

    if (latency <= 5) color = 'success'
    else if (latency <= 30) color = 'warning'

    if (latency > 3600) {
        unit = 'hrs'
        latency = latency / 3600
    } else if (latency > 120) {
        unit = 'min'
        latency = latency / 60
    }

    return <span className={`fw-bold text-${color}`}>{Math.round(latency)} {unit}</span>
};

export default Latency;