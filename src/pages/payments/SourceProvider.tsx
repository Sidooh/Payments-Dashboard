import { FloatAccountTransaction, Payment, VoucherTransaction } from '@/lib/types/models';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { currencyFormat } from '@/lib/utils.ts';
import TableDate from '@/components/common/TableDate.tsx';

const SourceProvider = ({ payment }: { payment: Payment<FloatAccountTransaction | VoucherTransaction> }) => (
    <Card className="mb-3">
        <CardHeader className="flex-row gap-1 text-sm lg:text-base">
            Source - <i className={'text-muted-foreground'}>{payment.subtype}</i>
        </CardHeader>
        <CardContent>
            <Table className="border-b border-muted">
                <TableHeader className="bg-slate-100">
                    <TableRow className={'border-muted'}>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="text-end">Created</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>{payment.provider?.type}</TableCell>
                        <TableCell>{payment.provider?.description}</TableCell>
                        <TableCell>{currencyFormat(payment.provider?.amount)}</TableCell>
                        <TableCell className="text-end">
                            <TableDate date={payment.provider?.created_at} />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

export default SourceProvider;
