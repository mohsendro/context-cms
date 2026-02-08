"use client";

import * as React from "react";
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  IconButton,
  Container,
  Chip,
  Stack,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const menuItems = [
  { label: "Context List", href: "/" },
];

export default function Header(): React.JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(245,248,255,0.9) 100%)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
          {/* Logo */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Typography
              variant="h6"
              component={Link}
              href="/"
              sx={{
                textDecoration: "none",
                color: "#1976d2",
                fontWeight: 800,
                letterSpacing: 0.3,
              }}
            >
              Logo
            </Typography>
            <Chip
              label="Beta"
              size="small"
              sx={{
                fontWeight: 600,
                bgcolor: "rgba(25,118,210,0.12)",
                color: "primary.main",
              }}
            />
          </Stack>

          {/* Desktop Menu */}
          <Stack
            direction="row"
            spacing={2}
            sx={{
              flexGrow: 1,
              ml: 3,
              display: { xs: "none", md: "flex" },
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.label}
                component={Link}
                href={item.href}
                color="primary"
                sx={{
                  fontWeight: 600,
                  textTransform: "none",
                  position: "relative",
                  "&:after": {
                    content: '""',
                    position: "absolute",
                    left: 10,
                    right: 10,
                    bottom: 6,
                    height: 2,
                    bgcolor: "primary.main",
                    opacity: 0,
                    transform: "scaleX(0.6)",
                    transition: "all 160ms ease",
                  },
                  "&:hover:after": {
                    opacity: 1,
                    transform: "scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Stack>

          {/* Right Side Actions (Desktop) */}
          <Stack
            direction="row"
            spacing={1}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
 
            <Button
              component={Link}
              href="/panel"
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: 999,
                px: 2.5,
                boxShadow: "0 10px 20px rgba(25,118,210,0.25)",
              }}
            >
              Get Started
            </Button>
          </Stack>

          {/* Mobile Menu Button */}
          <Box sx={{ flexGrow: 1, display: { md: "none" } }} />

          <IconButton
            size="large"
            edge="end"
            onClick={handleMenuOpen}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Mobile Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            {menuItems.map((item) => (
              <MenuItem
                key={item.label}
                onClick={handleMenuClose}
                component={Link}
                href={item.href}
              >
                {item.label}
              </MenuItem>
            ))}

            <MenuItem
              component={Link}
              href="/register"
              onClick={handleMenuClose}
            >
              Get Started
            </MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
