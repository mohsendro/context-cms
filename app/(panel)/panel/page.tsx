"use client";

// React
import * as React from "react";

// MUI
import {
  Button,
  Card,
  CardContent,
  Divider,
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

// Local Storage Key
const CONTEXT_KEY = "cms_contexts";

const createId = () =>
  (crypto && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()));

export default function ContextCrudPage(): React.JSX.Element {
  const [items, setItems] = React.useState<ContextPerson[]>([]);
  const [name, setName] = React.useState("");
  const [info, setInfo] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [storageReady, setStorageReady] = React.useState(false);
  const [dirty, setDirty] = React.useState(false);

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
        setStorageReady(true);
      } else {
        console.error("cms_contexts is not an array in localStorage.");
      }
    } catch {
      console.error("cms_contexts is invalid JSON in localStorage.");
    }
  }, []);

  React.useEffect(() => {
    if (!storageReady && !dirty) return;
    localStorage.setItem(CONTEXT_KEY, JSON.stringify(items));
  }, [items, storageReady, dirty]);

  const resetForm = () => {
    setName("");
    setInfo("");
    setEmail("");
    setPhone("");
    setEditingId(null);
  };

  const saveItem = () => {
    const nextName = name.trim();
    const nextInfo = info.trim();
    const nextEmail = email.trim();
    const nextPhone = phone.trim();
    if (!nextName || !nextInfo) return;

    if (editingId) {
      setItems((prev) =>
        prev.map((item) =>
          String(item.id) === editingId
            ? {
                ...item,
                name: nextName,
                info: nextInfo,
                email: nextEmail,
                phone: nextPhone,
              }
            : item
        )
      );
    } else {
      const next: ContextPerson = {
        id: createId(),
        name: nextName,
        info: nextInfo,
        email: nextEmail,
        phone: nextPhone,
        createdAt: new Date().toISOString(),
      };
      setItems((prev) => [next, ...prev]);
    }

    setDirty(true);
    resetForm();
  };

  const editItem = (item: ContextPerson) => {
    setName(item.name);
    setInfo(item.info);
    setEmail(item.email ?? "");
    setPhone(item.phone ?? "");
    setEditingId(String(item.id));
  };

  const deleteItem = (id: string) => {
    setItems((prev) => prev.filter((item) => String(item.id) !== id));
    setDirty(true);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: 3,
        borderColor: "rgba(0,0,0,0.08)",
        boxShadow: "0 14px 30px rgba(0,0,0,0.06)",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          Context CRUD
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Information"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
            fullWidth
            multiline
            minRows={3}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
            />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={saveItem}
              sx={{ borderRadius: 999, textTransform: "none" }}
            >
              {editingId ? "Update" : "Create"}
            </Button>
            {editingId && (
              <Button variant="text" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </Stack>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {items.length === 0 ? (
          <Typography color="error.main">No records yet.</Typography>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Information</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell sx={{ color: "text.secondary" }}>
                      {item.info}
                    </TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <Button size="small" onClick={() => editItem(item)}>
                          Edit
                        </Button>
                        <Button
                          size="small"
                          color="error"
                          onClick={() => deleteItem(String(item.id))}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
}
