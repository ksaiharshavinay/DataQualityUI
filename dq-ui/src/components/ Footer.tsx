import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => (
  <Box component="footer" sx={{ textAlign: "center", py: 2, mt: 4, bgcolor: "#f5f5f5" }}>
    <Typography variant="body2">© 2024 DataQuality. All rights reserved.</Typography>
  </Box>
);

export default Footer;