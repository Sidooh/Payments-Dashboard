import { Payment } from '@/lib/types/models.ts';
import { getStatusIcon, getUniquePropertyValues } from '@/lib/utils.ts';
import { DataTable } from '@/components/datatable/DataTable.tsx';
import { Status } from '@/lib/enums.ts';
import { columns } from '@/components/tables/payments-table/Columns.tsx';

const PaymentsTable = ({ tableTitle, payments }: { tableTitle: string; payments: Payment[] }) => {
    return (
        <DataTable
            title={tableTitle}
            columns={columns}
            data={payments}
            facetedFilters={[
                {
                    column_id: 'subtype',
                    title: 'Source',
                    options: getUniquePropertyValues(payments, 'subtype').map((t) => ({
                        label: t as string,
                        value: t as string,
                    })),
                },
                {
                    column_id: 'destination_subtype',
                    title: 'Destination',
                    options: getUniquePropertyValues(payments, 'destination_subtype').map((t) => ({
                        label: t as string,
                        value: t as string,
                    })),
                },
                {
                    column_id: 'status',
                    title: 'Status',
                    options: getUniquePropertyValues(payments, 'status').map((s) => ({
                        label: s as string,
                        value: s as string,
                        icon: getStatusIcon(s as Status),
                    })),
                },
            ]}
        />
    );
};

export default PaymentsTable;
