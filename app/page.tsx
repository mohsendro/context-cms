"use client";

// React 
import * as React from "react";

// MUI
import {
  Container,
  Box,
  Card,
  CardContent,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

// Types
type ContextPerson = {
  id: string | number;
  name: string;
  info: string;
  email: string;
  phone: string;
  createdAt?: string;
};

// Local Storage Key & Pagination
const CONTEXT_KEY = "cms_contexts";
const PAGE_SIZE = 10;

export default function ContextListPage(): React.JSX.Element {
  const [items, setItems] = React.useState<ContextPerson[]>([]);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  React.useEffect(() => {
    const raw = localStorage.getItem(CONTEXT_KEY);
    if (!raw) {
      console.error("cms_contexts not found in localStorage.");
      return;
    }
    try {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        setItems(parsed);
      } else {
        console.error("cms_contexts is not an array in localStorage.");
      }
    } catch {
      console.error("cms_contexts is invalid JSON in localStorage.");
    }
  }, []);

  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const filtered = items.filter((item) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      item.name.toLowerCase().includes(q) ||
      item.info.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * PAGE_SIZE;
  const current = filtered.slice(start, start + PAGE_SIZE);

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5 , mt: 3}}>
        <Card
          variant="outlined"
          sx={{
            borderRadius: 3,
            borderColor: "rgba(0,0,0,0.08)",
            boxShadow: "0 14px 30px rgba(0,0,0,0.06)",
          }}
        >
          <CardContent>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Context List
                </Typography>
                <Typography color="text.secondary">
                  Search and paginate people information.
                </Typography>
              </Box>

              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, info, email or phone"
                fullWidth
              />

              {current.length === 0 ? (
                <Typography color="error.main">No records found.</Typography>
              ) : (
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Information</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                        <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {current.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.name}</TableCell>
                          <TableCell sx={{ color: "text.secondary" }}>
                            {item.info}
                          </TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}

              {filtered.length > 0 && (
                <Pagination
                  count={totalPages}
                  page={safePage}
                  onChange={(_, value) => setPage(value)}
                  color="primary"
                  shape="rounded"
                />
              )}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
