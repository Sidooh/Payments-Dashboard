import { Account, PhoneChip } from '@nabcellent/sui-react';
import { CONFIG } from '@/config';

const SidoohAccount = ({ account }: { account?: Account }) => {
    if (!account) return <>-</>;

    return (
        <span>
            {account?.user?.name} {account?.user?.name && <br />}
            <a href={`${CONFIG.sidooh.services.accounts.dashboard.url}/accounts/${account.id}`} target={'_blank'}>
                <PhoneChip phone={account.phone} />
            </a>
        </span>
    );
};

export default SidoohAccount;
