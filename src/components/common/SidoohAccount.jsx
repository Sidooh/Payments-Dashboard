import {CONFIG} from 'config';
import PhoneChip from 'components/chips/PhoneChip';

const SidoohAccount = ({account}) => {
    return (
        <span>
            {account?.user?.name} <br/>
            <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account.id}`}>
                <PhoneChip phone={account.phone} textOnly/>
            </a>
        </span>
    );
};

export default SidoohAccount;
