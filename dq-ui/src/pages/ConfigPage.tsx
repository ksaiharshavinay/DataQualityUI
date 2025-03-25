import React, { JSX, useState } from "react";
import {
  Typography, Container, CssBaseline, Box,
  Card, CardContent, TextField, Button, FormControlLabel, Radio, RadioGroup, Autocomplete,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
// import Footer from "../components/ Footer";
import { DataEntry } from "../interfaces/DataEntry";
import { initialData } from "../data/initialData";
import { platforms, databases, tables } from "../data/options";

export default function ConfigPage(): JSX.Element {
  const [data, setData] = useState<DataEntry[]>(initialData);
  const [search, setSearch] = useState<DataEntry>({ platform: "", database: "", table: "" });
  const [view, setView] = useState<string>("search");
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    const filteredData = initialData.filter((row) =>
      Object.keys(search).every((key) =>
        row[key as keyof DataEntry].includes(search[key as keyof DataEntry])
      )
    );
    setData(filteredData);
    setShowResults(true);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Container maxWidth="md" sx={{ mt: 6, mb: 4 }}>
        <Card sx={{ p: 3, boxShadow: 4 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              {view === "search" ? "Search Page" : "My Configs"}
            </Typography>

            <RadioGroup
              row
              value={view}
              onChange={(e) => setView(e.target.value)}
              sx={{ justifyContent: "center", mb: 3 }}
            >
              <FormControlLabel value="search" control={<Radio />} label="Search Page" />
              <FormControlLabel value="configs" control={<Radio />} label="My Configs" />
            </RadioGroup>

            {view === "search" && (
              <>
                <Grid container spacing={2} justifyContent="center" sx={{ mb: 3 }}>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      options={platforms}
                      renderInput={(params) => <TextField {...params} label="Platform" size="small" />}
                      onChange={(e, value) => setSearch({ ...search, platform: value || "" })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      options={databases}
                      renderInput={(params) => <TextField {...params} label="Database" size="small" />}
                      onChange={(e, value) => setSearch({ ...search, database: value || "" })}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Autocomplete
                      options={tables}
                      renderInput={(params) => <TextField {...params} label="Table" size="small" />}
                      onChange={(e, value) => setSearch({ ...search, table: value || "" })}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ textAlign: "center" }}>
                    <Button variant="contained" color="primary" onClick={handleSearch}>
                      SEARCH
                    </Button>
                  </Grid>
                </Grid>

                {showResults && (
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
                            <TableCell
                              onClick={() => navigate(`/details/${row.table}`)}
                              style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
                            >
                              {row.table}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </>
            )}

            {view === "configs" && (
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
                    {initialData.map((row, index) => (
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
      {/* <Footer /> */}
    </>
  );
}
