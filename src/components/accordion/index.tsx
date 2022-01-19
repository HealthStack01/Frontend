import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface AccordionProps {
  title?: string;
  defaultExpanded?: boolean;
}

const AccordionBox: React.FC<AccordionProps> = ({
  title,
  defaultExpanded = false,
  children,
}) => {
  return (
    <Accordion
      disableGutters
      defaultExpanded={defaultExpanded}
      elevation={0}
      sx={{
        boxShadow: '2px 2px 10px rgba(0,0,0,0.04)',
        margin: '10px 0',
        border: 'none',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel1a-content'
        id='panel1a-header'
      >
        <h5>{title}</h5>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  );
};

export default AccordionBox;
