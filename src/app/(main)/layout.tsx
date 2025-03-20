"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Navbar from "@/components/layout/navbar";
import { baseTheme } from "@/theme";

const MainContainer = styled("div")(() => ({
	display: "grid",
	gridTemplateColumns: "1fr",
	gridTemplateRows: "70px auto",
	width: "100%",
	maxWidth: "100%",
	height: "100vh",
	zIndex: 1,
	background: baseTheme.palette.background.default
}));

interface Props {
	children: React.ReactNode;
}

export default function RootLayout({ children }: { children: React.ReactNode; }) {  	
	return (
    	<MainContainer className="layout">
			{/* Navbar Section */}
        	<Navbar />

			{/* Body Section */}
			<Container
				sx={{
					maxWidth: '100% !important',
					padding: '24px'
				}}
			>
				<Box>{children}</Box>
			</Container>
        </MainContainer>
  	);
}
