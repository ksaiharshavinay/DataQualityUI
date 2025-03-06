import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {/* Tabs Section */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Timeliness" {...a11yProps(0)} />
          <Tab label="Completeness" {...a11yProps(1)} />
          <Tab label="Accuracy" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Tab 1 with Expansion Panels */}
      <CustomTabPanel value={value} index={0}>
        <ExpansionPanels />
      </CustomTabPanel>

      {/* Tab 2 with Expansion Panels */}
      <CustomTabPanel value={value} index={1}>
        <ExpansionPanels />
      </CustomTabPanel>

      {/* Tab 3 with Expansion Panels */}
      <CustomTabPanel value={value} index={2}>
        <ExpansionPanels />
      </CustomTabPanel>
    </Box>
  );
}

// Separate Component for Expansion Panels
function ExpansionPanels() {
  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Expansion Panel 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content for Expansion Panel 1.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Expansion Panel 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content for Expansion Panel 2.</Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Expansion Panel 3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>Content for Expansion Panel 3.</Typography>
        </AccordionDetails>
      </Accordion>
    </>
  );
}