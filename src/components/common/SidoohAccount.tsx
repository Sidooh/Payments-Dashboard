import { CONFIG } from '@/config';
import Phone from '@/components/common/Phone.tsx';
import { Account } from '@/lib/types/models.ts';

const SidoohAccount = ({ account }: { account?: Account }) => {
    if (!account) return <>-</>;

    return (
        <p>
            {account?.user?.name} {account?.user?.name && <br />}
            <a href={`${CONFIG.services.accounts.dashboard.url}/accounts/${account.id}`} target={'_blank'}>
                <Phone phone={account.phone} />
            </a>
        </p>
    );
};

export default SidoohAccount;
