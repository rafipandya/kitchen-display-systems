// React-Next Configuration
import React, { useState } from 'react';

// Material UI
import { AppBar, Box, Button, Toolbar, styled } from '@mui/material';

// Theme
import { baseTheme } from '@/theme';

// -- Start Create Styled Component -- //
// Navbar Container
const NavbarContainer = styled(AppBar)(({ theme }) => ({
    boxShadow: 'none',
    background: theme.palette.background.paper,
    justifyContent: 'center',
    backdropFilter: 'blur(4px)',
    [theme.breakpoints.up('lg')]: {
        minHeight: '100%',
    },
}));

// Navbar
const NavbarContent = styled(Toolbar)(({ theme }) => ({
    width: '100%',
    height: '100%',
    minHeight: 64,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridTemplateRows: '1fr',
    justifyContent: 'space-between',
}));

// Online or Offline Network Indicator
const Indicator = styled(Box)(({ theme }) => ({
    width: '20px',
    height: '20px',
    background: theme.palette.success.main,
    borderRadius: '4px',
}));

// List of Navigations
const NavigationList = styled(Box)({
    display: 'flex',
    height: '100%',
    alignItems: 'stretch',
    justifySelf: 'center',
});
// -- End Create Styled Component -- //

// List of Navigations
const navItems = ['Active', 'Cooking', 'Completed'];

const Navbar = () => {
    const [activeTab, setActiveTab] = useState('Active');

    return (
        <NavbarContainer position="sticky" color="default">
            <NavbarContent>
                <Indicator />

                <NavigationList>
                    {navItems.map((item) => (
                        <Button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            variant="text"
                            sx={{
                                height: '100%',
                                alignSelf: 'stretch',
                                minHeight: 'unset',
                                py: 0,
                                minWidth: '120px',
                                maxWidth: '140px',
                                color: baseTheme.palette.text.primary,
                                textTransform: 'uppercase',
                                fontWeight: activeTab === item ? 'bold' : 'normal',
                                borderBottom:
                                    activeTab === item
                                        ? `4px solid ${baseTheme.palette.text.primary}`
                                        : 'none',
                                borderRadius: 0,
                                paddingBottom: '4px',
                            }}
                        >
                            {item}
                        </Button>
                    ))}
                </NavigationList>

                <Box
                    sx={{
                        justifySelf: 'end',
                    }}
                >
                    <span>Wednesday, 1 January 2025</span>
                </Box>
            </NavbarContent>
        </NavbarContainer>
    );
};

export default Navbar;
