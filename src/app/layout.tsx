"use client";

// Next-React Configuration
import { ThemeProvider } from "@emotion/react";

// MUI
import { CssBaseline } from "@mui/material";

// SCSS
import "@/styles/components/_layout.scss";

// Theme Application Layout
import { baselTheme } from "@/theme";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body>
				<ThemeProvider theme={baselTheme}>
					<CssBaseline />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
}
