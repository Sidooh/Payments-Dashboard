import { Payment, StkRequest } from '@/lib/types/models';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { currencyFormat } from '@/lib/utils.ts';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import Phone from '@/components/common/Phone.tsx';
import TableDate from '@/components/common/TableDate.tsx';

const MpesaPayment = ({ payment }: { payment: Payment }) => {
    const provider: StkRequest = payment.provider as StkRequest;

    return (
        <Card className="mb-3">
            <CardHeader className="flex-row gap-1">
                Source - <i className={'text-muted-foreground'}>{payment.subtype}</i>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-slate-100">
                        <TableRow className={'border-muted'}>
                            <TableHead>Reference</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Result</TableHead>
                            <TableHead>Receipt</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-end">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <h6 className="mb-0 text-nowrap">{provider?.reference}</h6>
                                <Phone phone={provider?.phone} />
                            </TableCell>
                            <TableCell>{currencyFormat(provider?.amount)}</TableCell>
                            <TableCell>{provider.response?.result_desc}</TableCell>
                            <TableCell>{provider.response?.mpesa_receipt_number || 'N/A'}</TableCell>
                            <TableCell>
                                <StatusBadge status={provider?.status} bg={false} />
                            </TableCell>
                            <TableCell className="text-end">
                                <TableDate date={provider?.response?.created_at || provider?.created_at} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default MpesaPayment;
