import { Button, SxProps, Theme } from '@mui/material'
import React from 'react'

interface CustomButtonProps {
    text: string;
    sx?: SxProps<Theme>;
    disabled?: boolean;
    onClick?: () => void;
}

const CustomButton : React.FC<CustomButtonProps> = ({text, sx }) => {
    return (
        <Button
            sx={{
                width: '100%',
                height: '45px',
                display: 'flex',
                justifyContent:'center',
                alignItems: 'center',
                ...sx
            }}
        >
            {text}
        </Button>
    )
}

export default CustomButton