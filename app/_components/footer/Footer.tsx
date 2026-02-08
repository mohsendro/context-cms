"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  IconButton,
  Divider,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const footerLinks = {
  product: [
    { label: "Features", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
};

export default function Footer(): React.JSX.Element {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        background:
          "linear-gradient(180deg, rgba(14,23,48,1) 0%, rgba(18,28,55,1) 100%)",
        color: "#E8ECF8",
      }}
    >
      <Container maxWidth="lg" sx={{ py: 7 }}>
        <Grid container spacing={4}>
          {/* Brand / Description */}
          <Grid item xs={12} md={4}>
            <Stack spacing={1.5}>
              <Typography variant="h6" sx={{ fontWeight: 800, color: "#fff" }}>
                CMS Platform
              </Typography>
              <Typography variant="body2" sx={{ color: "rgba(232,236,248,0.72)" }}>
                A clean, modern content workspace for teams. Built with Next.js, Typescript
                and MUI for speed and polish.
              </Typography>
              <Stack direction="row" spacing={1}>
                <IconButton
                  component="a"
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  sx={{
                    color: "#E8ECF8",
                    bgcolor: "rgba(255,255,255,0.08)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  }}
                >
                  <GitHubIcon />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{
                    color: "#E8ECF8",
                    bgcolor: "rgba(255,255,255,0.08)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  }}
                >
                  <LinkedInIcon />
                </IconButton>

                <IconButton
                  component="a"
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  sx={{
                    color: "#E8ECF8",
                    bgcolor: "rgba(255,255,255,0.08)",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.16)" },
                  }}
                >
                  <TwitterIcon />
                </IconButton>
              </Stack>
            </Stack>
          </Grid>

          {/* Product Links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Product
            </Typography>

            <Stack spacing={1}>
              {footerLinks.product.map((link) => (
                <Link key={link.label} href={link.href} passHref>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      color: "rgba(232,236,248,0.7)",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Company Links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Company
            </Typography>

            <Stack spacing={1}>
              {footerLinks.company.map((link) => (
                <Link key={link.label} href={link.href} passHref>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      color: "rgba(232,236,248,0.7)",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={4} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Legal
            </Typography>

            <Stack spacing={1}>
              {footerLinks.legal.map((link) => (
                <Link key={link.label} href={link.href} passHref>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      cursor: "pointer",
                      color: "rgba(232,236,248,0.7)",
                      "&:hover": { color: "#fff" },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Stack>
          </Grid>

          {/* Contact */}
          <Grid item xs={12} md={2}>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ fontWeight: 700, color: "#fff" }}
            >
              Contact
            </Typography>

            <Typography variant="body2" sx={{ color: "rgba(232,236,248,0.7)" }}>
              support@cms.dev
            </Typography>

            <Typography variant="body2" sx={{ color: "rgba(232,236,248,0.7)" }}>
              +1 (555) 013-4567
            </Typography>
          </Grid>
        </Grid>

        {/* Bottom line */}
        <Box sx={{ mt: 6 }}>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
        </Box>

        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between",
            alignItems: { xs: "flex-start", sm: "center" },
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: "rgba(232,236,248,0.7)" }}>
            © {year} CMS Platform. All rights reserved.
          </Typography>

          <Typography variant="body2" sx={{ color: "rgba(232,236,248,0.7)" }}>
            Built with Next.js, Typescript & MUI
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
