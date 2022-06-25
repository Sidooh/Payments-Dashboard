import moment from 'moment';
import { Typography } from '@mui/material';

const REFERENCE = moment();
const TODAY = REFERENCE.clone().startOf("day");
const YESTERDAY = REFERENCE.clone().subtract(1, "days").startOf("day");

const TableDate = ({date}: { date: string }) => {
    let relativeDate;
    if (moment(date).isSame(TODAY, "d")) {
        relativeDate = "Today";
    } else if (moment(date).isSame(YESTERDAY, "d")) {
        relativeDate = "Yesterday";
    } else {
        relativeDate = moment(date).format("D.M.y");
    }

    return (
        <>
            <strong>{moment(date).format("hh:mm A")}</strong><br/>
            <Typography variant={"caption"}>{relativeDate}</Typography>
        </>
    );
};

export default TableDate;
