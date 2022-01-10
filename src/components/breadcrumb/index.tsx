import { Breadcrumbs as MUIBreadcrumbs, Typography } from '@mui/material';
import React from 'react';
import { Link as LinkRouter } from 'react-router-dom';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const Breadcrumbs = () => {
  let location = useLocation();
  let navigate = useNavigate();
  let params = useParams();

  const { pathname } = location;
  const pathnames = location.pathname.split('/').filter(x => x);

  console.log(pathnames);
  return (
    <MUIBreadcrumbs aria-label='breadcrumb'>
      {pathnames.map((name, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography
            color='text.primary'
            key={to}
            style={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontWeight: 'medium',
            }}
          >
            {name}
          </Typography>
        ) : (
          <LinkRouter
            to={to}
            key={to}
            style={{
              textDecoration: 'none',
              textTransform: 'capitalize',
              fontWeight: 'medium',
              
            }}
          >
            {name}
          </LinkRouter>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
