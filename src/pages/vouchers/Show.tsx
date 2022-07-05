import { useParams } from 'react-router-dom';
import { SectionError } from '../../components/common/Error';
import { SectionLoader } from '../../components/common/Loader';
import { useVoucherQuery } from '../../features/vouchers/vouchersAPI';

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
