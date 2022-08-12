import { useParams } from 'react-router-dom';
import { useVoucherQuery } from 'features/vouchers/vouchersAPI';
import { SectionError, SectionLoader } from '@nabcellent/sui-react';

const Show = () => {
    const {id} = useParams();
    const {data: voucher, isError, error, isLoading, isSuccess} = useVoucherQuery(Number(id));
    console.log('Voucher:', voucher);

    if (isError) return <SectionError error={error}/>;
    if (isLoading || !isSuccess || !voucher) return <SectionLoader/>;

    return (
        <div>
            Show
        </div>
    );
};

export default Show;
