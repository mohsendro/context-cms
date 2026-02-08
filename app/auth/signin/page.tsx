"use client";

// React
import * as React from "react";

// NextJs
import { useSearchParams } from "next/navigation";

// NextAuth
import { signIn } from "next-auth/react";

// MUI
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function SignInPage(): React.JSX.Element {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleCredentials = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      callbackUrl: "/panel",
    });
  };

  return (
    <Box
      sx={{
        background:
          "linear-gradient(180deg, rgba(245,248,255,0.9) 0%, rgba(255,255,255,1) 100%)",
        py: { xs: 4, md: 7 },
      }}
    >
      <Container maxWidth="sm">
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderColor: "rgba(0,0,0,0.08)",
            boxShadow: "0 16px 32px rgba(0,0,0,0.08)",
          }}
        >
          <CardContent>
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
                  Sign in
                </Typography>
                <Typography color="text.secondary">
                  Access the admin panel.
                </Typography>
              </Box>

              {error && (
                <Alert severity="error">
                  Sign in failed. Please check your credentials.
                </Alert>
              )}

              {/* <Button
                variant="contained"
                size="large"
                onClick={() => signIn("google", { callbackUrl: "/panel" })}
                sx={{ borderRadius: 999, textTransform: "none" }}
              >
                Continue with Google
              </Button>

              <Divider>or</Divider> */}

              <Stack component="form" spacing={2} onSubmit={handleCredentials}>
                <TextField
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                />
                <TextField
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="outlined"
                  size="large"
                  sx={{ borderRadius: 999, textTransform: "none" }}
                >
                  Sign in with Email
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
