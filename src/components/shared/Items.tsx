// React
import React from 'react';

// Material UI
import { Box, Card, CardActions, CardContent, Divider, Typography } from '@mui/material';

// Component
import Button from './Button';

function Items() {
    return (
        <Card 
            sx={{ 
                boxShadow: 'none'
            }}
        >   
            {/* Main Content */}
            <CardContent>
                {/* Order Header  */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 0.5fr)',
                        alignItems: 'center'
                    }}
                >   
                    {/* Order Number  */}
                    <Typography sx={{ color: '#1D1616', fontSize: 18, fontWeight: 700}}>
                        #32    
                    </Typography>

                    {/* Order Status  */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#5C7AEA',
                            borderRadius: '6px',
                            width: '90px',
                            justifySelf: 'end',
                            padding: '6px 0'
                        }}
                    >
                        <Typography sx={{ color: '#FFFFFF', fontSize: 14}}>
                            New
                        </Typography>
                    </Box>
                </Box>
                
                {/* Order Code */}
                <Box
                    sx={{
                        padding: '5px 0'
                    }}
                >
                    <Typography variant="subtitle1" sx={{ fontSize: '18px', color: '#1D1616'}}>
                        ORDABCDE12345
                    </Typography>
                </Box>
               
                {/* Order Details */}
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 0.5fr)',
                        alignItems: 'center',
                        padding: '5px 0'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#F1F0E8',
                            borderRadius: '6px',
                            width: '90px',
                            padding: '5px 0px'
                        }}
                    >
                        <Typography sx={{ color: '#1D1616', fontSize: 14}}>
                            Dine In
                        </Typography>
                    </Box>

                    <Box sx={{ justifySelf: 'end'}}>
                        <Typography sx={{ color: '#1D1616', fontSize: 14}}>
                            1 January 2025, 12:00
                        </Typography>
                    </Box>
                </Box>

                <Divider sx={{ padding: '8px 0px' }} />
            </CardContent>

            {/* Actions Button */}
            <CardActions sx={{ padding: '16px' }}>
                <Button 
                    text='Start Cooking'
                    sx={{
                        background: '#1D1616',
                        color: '#FFFFFF'                  
                    }}
                />
            </CardActions>
        </Card>
    )
}

export default Items