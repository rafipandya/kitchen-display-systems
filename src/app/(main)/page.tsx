'use client';

import Orders from '@/components/shared/Orders/OrderCard';
import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';

import sampleOrders from '@/components/shared/Orders/orders.sample.json';

function page() {
    // Data Orders State
    const [orders, setOrders] = useState(sampleOrders);

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
                {orders.map((order) => (
                    <Grid key={order.id} size={{ xs: 2, sm: 4, md: 3 }}>
                        <Orders data={order} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default page;
