import { useParams } from "react-router-dom";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export default function DetailsPage() {
  const { tableName } = useParams();
  const [tab, setTab] = useState(0); // Default to Schema

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const labels = ["Schema", "Timeliness", "Completeness", "Accuracy"];

  const renderAccordionGroup = (label: string) => (
    <>
      {[1, 2, 3].map((i) => (
        <Accordion key={i}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{ bgcolor: "primary.main", color: "white" }}
          >
            <Typography>{`Detector ${i}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              {label} - Detector {i} for table <strong>{tableName}</strong>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );

  return (
    <Box sx={{ width: "80%", margin: "auto", mt: 4 }}>
      <Tabs value={tab} onChange={handleChange} centered>
        {labels.map((label, index) => (
          <Tab key={index} label={label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 3 }}>
        {tab === 0 ? (
          <Accordion expanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{ bgcolor: "primary.main", color: "white" }}
            >
              <Typography>Schema Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Schema info for table <strong>{tableName}</strong>.
              </Typography>
            </AccordionDetails>
          </Accordion>
        ) : (
          renderAccordionGroup(labels[tab])
        )}
      </Box>
    </Box>
  );
}
