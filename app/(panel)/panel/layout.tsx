"use client";

// React
import * as React from "react";

// NextAuth
import { signOut, useSession } from "next-auth/react";

// MUI
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  const { data: session } = useSession();

  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={3}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              p: 2,
              borderRadius: 3,
              border: "1px solid rgba(0,0,0,0.08)",
              background:
                "linear-gradient(180deg, rgba(245,248,255,0.9) 0%, rgba(255,255,255,1) 100%)",
            }}
          >
            <Stack spacing={0.5}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Admin Panel
              </Typography>
              <Typography color="text.secondary">
                Manage Context
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              {session?.user?.email && (
                <Typography color="text.secondary">
                  {session.user.email}
                </Typography>
              )}
              <Button
                variant="outlined"
                onClick={() => signOut({ callbackUrl: "/" })}
                sx={{ borderRadius: 999, textTransform: "none" }}
              >
                Sign out
              </Button>
            </Stack>
          </Box>
          
          {children}
        </Stack>
      </Container>
    </Box>
  );
}
