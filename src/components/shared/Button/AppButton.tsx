import { Button, SxProps, Theme } from '@mui/material';

interface BaseButtonProps {
    text: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    onClick?: () => void;
    sx?: SxProps<Theme>;
}

export default function AppButton({
    text,
    variant = 'primary',
    disabled,
    onClick,
    sx,
}: BaseButtonProps) {
    return (
        <Button variant={variant} disabled={disabled} onClick={onClick} sx={sx}>
            {text}
        </Button>
    );
}
