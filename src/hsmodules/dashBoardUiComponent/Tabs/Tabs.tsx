import React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    variant='scrollable'
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
    border: '0px !important',
    width: '100%',
  },
  '& .MuiTabs-indicatorSpan': {
    // maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
    display: 'none',
  },
});

interface StyledTabProps {
  label: string;
}

export const StyledTab = styled((props: StyledTabProps) => (
  <Tab disableRipple {...props} />
))(({ theme }) => ({
  textTransform: 'uppercase',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(10),
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  // width: '31%',
  padding: '14px',
  borderRadius: 4,
  border: '0px',
  backgroundColor: '#EAF2FF',
  color: '#0364FF',
  '&.Mui-selected': {
    backgroundColor: '#0364FF',
    color: '#fff',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'rgba(100, 95, 228, 0.32)',
  },
}));
