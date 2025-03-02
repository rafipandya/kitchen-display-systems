"use client";

// Next-React Configuration
import { ThemeProvider } from "@emotion/react";

// MUI
import { CssBaseline } from "@mui/material";

// Theme Application Layout
import { baseTheme } from "@/theme";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
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
