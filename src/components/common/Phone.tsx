import { getTelcoColor, getTelcoFromPhone } from '@/lib/utils';

export interface PhoneProps {
    phone?: string | number;
    className?: string;
}

const Phone = ({ phone, className }: PhoneProps) => {
    if (!phone) return <></>;

    const telco = getTelcoFromPhone(phone);
    let color = String(getTelcoColor(telco)),
        phoneNumber = phone ?? 'N/A';

    return (
        <span className={`font-bold ${className}`} style={{ color }}>
            {String(phoneNumber).replace('+', '')}
        </span>
    );
};

export default Phone;
