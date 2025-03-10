import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Container, CssBaseline, Box } from "@mui/material";
import { Card, CardContent, TextField, Button, FormControlLabel, Radio, RadioGroup, Autocomplete } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { JSX } from "react/jsx-runtime";
import Header from "../components/Header";
import Footer from "../components/ Footer";
import { DataEntry } from "../interfaces/DataEntry";
import { initialData } from "../data/initialData";
import { platforms, databases, tables } from "../data/options";

export default function ConfigPage(): JSX.Element {
  const [data, setData] = useState<DataEntry[]>(initialData);
  const [search, setSearch] = useState<DataEntry>({ platform: "", database: "", table: "" });
  const [view, setView] = useState<string>("search");

  const handleSearch = () => {
    const filteredData = initialData.filter((row) =>
      Object.keys(search).every((key) => row[key as keyof DataEntry].includes(search[key as keyof DataEntry]))
    );
    setData(filteredData);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container sx={{ mt: 5 }}>
        <Card sx={{ maxWidth: 1040, margin: "auto", boxShadow: 3, p: 2 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom align="center">
              {view === "search" ? "Search Page" : "My Configs"}
            </Typography>

            <RadioGroup
              row
              value={view}
              onChange={(e) => setView(e.target.value)}
              sx={{ justifyContent: "center", mb: 2 }}
            >
              <FormControlLabel value="search" control={<Radio />} label="Search Page" />
              <FormControlLabel value="configs" control={<Radio />} label="My Configs" />
            </RadioGroup>

            {view === "search" ? (
              <>
                <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
                  <Autocomplete
                    options={platforms}
                    renderInput={(params) => <TextField {...params} label="Platform" variant="outlined" size="small" />}
                    onChange={(e, value) => setSearch({ ...search, platform: value || "" })}
                  />
                  <Autocomplete
                    options={databases}
                    renderInput={(params) => <TextField {...params} label="Database" variant="outlined" size="small" />}
                    onChange={(e, value) => setSearch({ ...search, database: value || "" })}
                  />
                  <Autocomplete
                    options={tables}
                    renderInput={(params) => <TextField {...params} label="Table" variant="outlined" size="small" />}
                    onChange={(e, value) => setSearch({ ...search, table: value || "" })}
                  />
                  <Button variant="contained" color="primary" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </>
            ) : (
              <TableContainer component={Paper} elevation={2}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell><strong>Platform</strong></TableCell>
                      <TableCell><strong>Database</strong></TableCell>
                      <TableCell><strong>Table</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>{row.platform}</TableCell>
                        <TableCell>{row.database}</TableCell>
                        <TableCell>{row.table}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
}