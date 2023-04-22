import moment from "moment";

type LatencyProps = {
    from: Date,
    to: Date
}

const Latency = ({ from, to }: LatencyProps) => {
    console.log(to, from)
    let unit = 's', color = 'danger', latency = Math.abs(moment(to).diff(from, 's'));

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