import { BuniStkRequest, Payment } from '@/lib/types/models';
import { Card, CardContent, CardHeader } from '@/components/ui/card.tsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table.tsx';
import { currencyFormat } from '@/lib/utils.ts';
import StatusBadge from '@/components/common/StatusBadge.tsx';
import TableDate from '@/components/common/TableDate.tsx';
import Phone from '@/components/common/Phone.tsx';

const MpesaPayment = ({ payment }: { payment: Payment }) => {
    const provider: BuniStkRequest = payment.provider as BuniStkRequest;

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
                            <TableHead className="text-center">Status</TableHead>
                            <TableHead className="text-end">Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <h6 className="text-nowrap">{provider?.invoice_number}</h6>
                                <Phone phone={provider?.phone_number} />
                            </TableCell>
                            <TableCell>{currencyFormat(provider?.amount)}</TableCell>
                            <TableCell>{provider.callback?.result_desc}</TableCell>
                            <TableCell>{provider.callback?.mpesa_receipt_number || 'N/A'}</TableCell>
                            <TableCell>
                                <StatusBadge status={provider?.status} bg={false} />
                            </TableCell>
                            <TableCell className="text-end">
                                <TableDate date={provider?.callback?.created_at || provider?.created_at} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default MpesaPayment;
