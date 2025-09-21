'use client';

// MUI Material
import { styled, Container, Box } from '@mui/material';

// React State
import React, { useState } from 'react';

// Navbar
import Navbar from '@/components/layout/navbar';

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box className="base-layout">
            {/* Navbar Section */}
            <Navbar />

            {/* Body Section */}
            <Container className="body-layout">
                <Box>{children}</Box>
            </Container>
        </Box>
    );
}
