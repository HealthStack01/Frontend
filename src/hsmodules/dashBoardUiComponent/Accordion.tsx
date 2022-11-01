import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion as CustomAccordion } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import React from 'react';

interface AccordionProps {
  title?: string | React.ReactNode | React.ReactElement;
  defaultExpanded?: boolean;
  children?: React.ReactNode;
  status?: 'unsuccesful' | 'success' | 'warning' | 'default';
}

const statusColor = (status: string) => {
  if (status === 'unsuccesful')
    return { background: '#ff8886', color: '#ffffff' };
  if (status === 'warning') return { background: '#fffd86', color: '#3f3c03' };
  if (status === 'success') return { background: '#8eff86', color: '#01440c' };

  return;
};

const Accordion: React.FC<AccordionProps> = ({
  title,
  defaultExpanded = false,
  children,
  status = 'default',
}) => {
  return (
    <CustomAccordion
      disableGutters
      defaultExpanded={defaultExpanded}
      elevation={0}
      sx={{
        // boxShadow: '2px 2px 10px rgba(0,0,0,0.04)',
        margin: '10px 0',
        border: '0.6px solid #ebebeb',
        background: statusColor(status)?.background,
        color: statusColor(status)?.color,
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
    </CustomAccordion>
  );
};

export default Accordion;
