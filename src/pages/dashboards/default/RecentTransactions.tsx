import { Card } from 'react-bootstrap';
import DataTable from '../../../components/common/datatable';
import { useNavigate } from 'react-router-dom';

const PendingTransactions = () => {
    const navigate = useNavigate();

    return (
        <Card>
            <Card.Body>
                <DataTable bulkActions onCreateRow={() => navigate('/notifications/create')}
                           title={'Recent Transactions'} columns={[]} data={[]}/>
            </Card.Body>
        </Card>
    );
};

export default PendingTransactions;
