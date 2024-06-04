import { Payment } from '@/lib/types/models.ts';
import { getStatusIcon, getUniquePropertyValues } from '@/lib/utils.ts';
import { DataTable } from '@/components/datatable/DataTable.tsx';
import { Status } from '@/lib/enums.ts';
import { columns } from '@/components/tables/payments-table/Columns.tsx';
import { DataTableDefaultProps } from '@/lib/types';

type PaymentsTableProps = DataTableDefaultProps & {
    tableTitle: string;
    payments: Payment[];
};

const PaymentsTable = ({
    tableTitle,
    payments,
    onRefresh,
    isRefreshing,
    serverTotal,
    serverPageSize,
    serverPageCount,
    onNextServerPage,
    currentServerPage,
    onPreviousServerPage,
    onGoToServerPage,
    onSetServerPageSize,
}: PaymentsTableProps) => (
    <DataTable
        title={tableTitle}
        columns={columns}
        data={payments}
        onRefresh={onRefresh}
        isRefreshing={isRefreshing}
        serverTotal={serverTotal}
        serverPageSize={serverPageSize}
        serverPageCount={serverPageCount}
        currentServerPage={currentServerPage}
        onNextServerPage={onNextServerPage}
        onPreviousServerPage={onPreviousServerPage}
        onGoToServerPage={onGoToServerPage}
        onSetServerPageSize={onSetServerPageSize}
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

export default PaymentsTable;
