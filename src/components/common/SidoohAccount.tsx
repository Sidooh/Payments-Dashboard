import { Account, PhoneChip } from '@nabcellent/sui-react';
import { CONFIG } from 'config';

const SidoohAccount = ({account}: { account: Account }) => {
    return (
        <span>
            {account?.user?.name} <br/>
            <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account.id}`} target={'_blank'}>
                <PhoneChip phone={account.phone}/>
            </a>
        </span>
    );
};

export default SidoohAccount;
