'use client';

// Next-React Configuration
import { ThemeProvider } from '@emotion/react';

// MUI
import { CssBaseline } from '@mui/material';

// Theme Application Layout
import { baseTheme } from '@/theme';

// SASS
import '../styles/global.scss';

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <ThemeProvider theme={baseTheme}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
