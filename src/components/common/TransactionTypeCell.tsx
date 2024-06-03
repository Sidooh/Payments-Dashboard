import { TransactionType } from '@/lib/enums';
import { cn } from '@/lib/utils.ts';

const TransactionTypeCell = ({ type }: { type?: TransactionType }) => (
    <b
        className={cn({
            'text-red-700': type === TransactionType.DEBIT,
            'text-lime-500': type === TransactionType.CREDIT,
            'text-slate-500': type !== TransactionType.DEBIT && type !== TransactionType.CREDIT,
        })}
    >
        {type}
    </b>
);

export default TransactionTypeCell;
