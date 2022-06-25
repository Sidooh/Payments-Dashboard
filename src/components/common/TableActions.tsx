import { ReadMore } from '@mui/icons-material';
import pluralize from 'pluralize';
import { Link } from 'react-router-dom';

const TableActions = ({entity, entityId}: { entity: string, entityId: number }) => {
    const entityPlural = pluralize(entity);

    return <Link to={`${entityPlural}/${entityId}`}><ReadMore fontSize={'small'}/></Link>
};

export default TableActions;
