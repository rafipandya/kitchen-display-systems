'use client';

import React, { useState } from 'react';
import {
    Box,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
    styled,
    useTheme,
    IconButton,
    Collapse,
} from '@mui/material';
import AppButton from '../Button/AppButton';

// Data Type
import { OrderType } from './orders.types';

// Date formatting
import { dateFormatter } from '../../../utils/dateFormatter';

// Icons
import TakeoutDiningOutlinedIcon from '@mui/icons-material/TakeoutDiningOutlined';
import FlatwareOutlinedIcon from '@mui/icons-material/FlatwareOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

interface OrderDataProps {
    data: OrderType;
}

// -- Start Create Styled Component -- //
const OrderContainer = styled(Card)(({ theme }) => {
    const triangleSize = 4;
    const stop1 = triangleSize * 1.42;
    const stop2 = triangleSize * 0.7;
    const stop1r = stop1 + 0.01;
    const stop2r = stop2 + 0.01;

    return {
        boxShadow: 'none',
        borderRadius: '0px',
        border: 'none',
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        background: `
            linear-gradient(135deg, transparent ${stop1}px, ${theme.palette.background.paper} ${stop1r}px) top left,
            linear-gradient(45deg, ${theme.palette.background.paper} ${stop2}px, transparent ${stop2r}px) top left,
            linear-gradient(135deg, ${theme.palette.background.paper} ${stop2}px, transparent ${stop2r}px) bottom left,
            linear-gradient(45deg, transparent ${stop1}px, ${theme.palette.background.paper} ${stop1r}px) bottom left
        `,
        backgroundRepeat: 'repeat-x',
        backgroundSize: `${triangleSize * 2}px ${triangleSize}px`,
        padding: `${triangleSize}px 0`,
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
    };
});

const OrderHeader = styled(CardContent)(({ theme }) => ({
    display: 'grid',
    alignItems: 'center',
    padding: '12px 16px',
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
    position: 'relative',
    zIndex: 1,
    flexShrink: 0,
}));

const OrderDetailContainer = styled(Box)(({ theme }) => ({
    display: 'grid',
    padding: '12px 0',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    fontFamily: 'monospace',
    position: 'relative',
    zIndex: 1,
}));

const OrderDetailHeader = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 0.5fr)',
    alignItems: 'center',
    width: '100%',

    '& :nth-of-type(1)': { justifySelf: 'start' },
    '& :nth-of-type(2)': { justifySelf: 'end' },
});

const CustomText = styled(Typography)(({ theme }) => ({
    fontSize: '0.9rem',
    fontFamily: 'monospace',
    fontWeight: 500,
    letterSpacing: '0.5px',
    [theme.breakpoints.between('sm', 'lg')]: {
        fontSize: '0.75rem',
    },
}));

const OrderTypeContainer = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
    width: '100%',
    gap: '5px',
});
// -- End Create Styled Component -- //

type StatusType = 'new' | 'warning' | 'completed' | 'alert';

const getStatusColors = (theme: any, status: string) => {
    const colorMap: Record<StatusType, { bg: string; text: string }> = {
        new: { bg: theme.palette.primary.main, text: theme.palette.warning.contrastText },
        completed: { bg: theme.palette.success.main, text: theme.palette.success.contrastText },
        warning: { bg: theme.palette.warning.main, text: theme.palette.error.contrastText },
        alert: { bg: theme.palette.error.main, text: theme.palette.error.contrastText },
    };

    // fallback for API values
    if (status in colorMap) {
        return colorMap[status as StatusType];
    }
    return { bg: theme.palette.grey[100], text: theme.palette.text.primary };
};

const typeIconMap: Record<string, React.ReactNode> = {
    DIN: <FlatwareOutlinedIcon fontSize="small" />,
    TKA: <TakeoutDiningOutlinedIcon fontSize="small" />,
    DLV: <DeliveryDiningOutlinedIcon fontSize="small" />,
};

function OrderCard({ data }: OrderDataProps) {
    const theme = useTheme();
    const colors = getStatusColors(theme, data.status);
    const [collapsedItems, setCollapsedItems] = useState<Set<string>>(new Set());
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update current time every second
    React.useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Calculate time elapsed since order was placed
    const orderTime = new Date(data.time);
    const timeElapsed = Math.floor((currentTime.getTime() - orderTime.getTime()) / 1000); // in seconds

    // Determine button color based on time elapsed
    const getButtonColors = () => {
        if (timeElapsed >= 60) {
            // 1 minute or more - red
            return {
                bg: theme.palette.error.main,
                text: theme.palette.error.contrastText,
            };
        } else if (timeElapsed >= 30) {
            // 30 seconds to 1 minute - warning
            return {
                bg: theme.palette.warning.main,
                text: theme.palette.warning.contrastText,
            };
        } else {
            // Less than 30 seconds - primary
            return {
                bg: theme.palette.primary.main,
                text: theme.palette.primary.contrastText,
            };
        }
    };

    const buttonColors = getButtonColors();

    const toggleCollapse = (menuId: string) => {
        setCollapsedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(menuId)) {
                newSet.delete(menuId);
            } else {
                newSet.add(menuId);
            }
            return newSet;
        });
    };

    return (
        <OrderContainer>
            <OrderHeader>
                <Box sx={{ textAlign: 'center', marginBottom: '8px' }}>
                    <CustomText
                        variant="h6"
                        sx={{
                            fontSize: '1.1rem',
                            fontWeight: 700,
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                        }}
                    >
                        #{data.id}
                    </CustomText>
                </Box>
                <OrderDetailContainer>
                    <OrderDetailHeader>
                        <Box>
                            <CustomText variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Que: {data.queue_number}
                            </CustomText>
                            <CustomText
                                variant="body2"
                                sx={{
                                    fontSize: '0.75rem',
                                    color:
                                        timeElapsed >= 60
                                            ? theme.palette.error.main
                                            : timeElapsed >= 30
                                              ? theme.palette.warning.main
                                              : theme.palette.text.secondary,
                                    fontWeight: 500,
                                }}
                            >
                                {timeElapsed < 60
                                    ? `${timeElapsed}s`
                                    : `${Math.floor(timeElapsed / 60)}m ${timeElapsed % 60}s`}
                            </CustomText>
                        </Box>
                        <OrderTypeContainer>
                            {typeIconMap[data.type] || null}
                            <CustomText variant="subtitle1" sx={{ fontWeight: 600 }}>
                                {data.type}
                            </CustomText>
                        </OrderTypeContainer>
                    </OrderDetailHeader>
                    <OrderDetailHeader>
                        <CustomText variant="subtitle1">
                            {dateFormatter.receipt(data.date)}
                        </CustomText>
                        <CustomText variant="subtitle1">{dateFormatter.time(data.time)}</CustomText>
                    </OrderDetailHeader>
                </OrderDetailContainer>
            </OrderHeader>

            {/* Menu Items Section */}
            <Box
                sx={{
                    padding: '12px 16px',
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    position: 'relative',
                    zIndex: 1,
                    flex: 1,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <CustomText
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        flexShrink: 0,
                    }}
                >
                    Menu Items:
                </CustomText>
                <Box
                    sx={{
                        flex: 1,
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        '&::-webkit-scrollbar': {
                            width: '3px',
                        },
                        '&::-webkit-scrollbar-track': {
                            background: 'transparent',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            background: theme.palette.grey[300],
                            borderRadius: '2px',
                            '&:hover': {
                                background: theme.palette.grey[400],
                            },
                        },
                    }}
                >
                    {data.menu.map((item, index) => {
                        const isCollapsed = collapsedItems.has(item.menu_id);
                        const hasSubmenu = item.submenu && item.submenu.length > 0;

                        return (
                            <Box key={item.menu_id}>
                                {/* Main Menu Item */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '4px 0',
                                        borderBottom:
                                            index < data.menu.length - 1
                                                ? `1px solid ${theme.palette.divider}`
                                                : 'none',
                                        cursor: hasSubmenu ? 'pointer' : 'default',
                                        '&:hover': hasSubmenu
                                            ? {
                                                  backgroundColor: theme.palette.action.hover,
                                                  borderRadius: '4px',
                                              }
                                            : {},
                                    }}
                                    onClick={() => hasSubmenu && toggleCollapse(item.menu_id)}
                                >
                                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                        {hasSubmenu && (
                                            <IconButton
                                                size="small"
                                                sx={{
                                                    padding: '2px',
                                                    marginRight: '8px',
                                                    color: theme.palette.primary.main,
                                                }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleCollapse(item.menu_id);
                                                }}
                                            >
                                                {isCollapsed ? (
                                                    <ExpandMoreIcon fontSize="small" />
                                                ) : (
                                                    <ExpandLessIcon fontSize="small" />
                                                )}
                                            </IconButton>
                                        )}
                                        <CustomText
                                            variant="body2"
                                            sx={{
                                                flex: 1,
                                                fontWeight: hasSubmenu ? 600 : 400,
                                                color: hasSubmenu
                                                    ? theme.palette.primary.main
                                                    : 'inherit',
                                            }}
                                        >
                                            {item.menu_name}
                                        </CustomText>
                                    </Box>
                                    <CustomText
                                        variant="body2"
                                        sx={{
                                            fontWeight: 600,
                                            minWidth: '30px',
                                            textAlign: 'right',
                                        }}
                                    >
                                        x{item.qty}
                                    </CustomText>
                                </Box>

                                {/* Sub-menu Items */}
                                {hasSubmenu && (
                                    <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
                                        <Box
                                            sx={{
                                                marginLeft: '16px',
                                                marginTop: '4px',
                                                marginBottom: '8px',
                                                paddingLeft: '12px',
                                                borderLeft: `2px solid ${theme.palette.divider}`,
                                            }}
                                        >
                                            {item.submenu?.map((subItem, subIndex) => (
                                                <Box
                                                    key={subItem.submenu_id}
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                        alignItems: 'center',
                                                        padding: '2px 0',
                                                        fontSize: '0.8rem',
                                                    }}
                                                >
                                                    <CustomText
                                                        variant="body2"
                                                        sx={{
                                                            flex: 1,
                                                            fontSize: '0.8rem',
                                                            color: theme.palette.text.secondary,
                                                        }}
                                                    >
                                                        • {subItem.submenu_name}
                                                    </CustomText>
                                                    <CustomText
                                                        variant="body2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            minWidth: '25px',
                                                            textAlign: 'right',
                                                            fontSize: '0.8rem',
                                                            color: theme.palette.text.secondary,
                                                        }}
                                                    >
                                                        x{subItem.qty}
                                                    </CustomText>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Collapse>
                                )}
                            </Box>
                        );
                    })}
                </Box>
            </Box>

            <CardActions
                sx={{
                    padding: '12px 16px',
                    backgroundColor: theme.palette.background.paper,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    justifyContent: 'center',
                    position: 'relative',
                    zIndex: 1,
                    flexShrink: 0,
                }}
            >
                <AppButton
                    text="start cooking"
                    sx={{
                        backgroundColor: buttonColors.bg,
                        color: buttonColors.text,
                        fontFamily: 'monospace',
                        fontWeight: 600,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        borderRadius: '4px',
                        padding: '8px 16px',
                        minWidth: '120px',
                        '&:hover': {
                            backgroundColor: buttonColors.bg,
                            opacity: 0.8,
                        },
                    }}
                />
            </CardActions>
        </OrderContainer>
    );
}

export default OrderCard;
