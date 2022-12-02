import React, { useState, useContext, useEffect, useRef } from 'react';

import { Box, Grid, Typography } from '@mui/material';

export default function ManagedCareLeft() {
  return (
    <>
      <div
        style={{
          backgroundColor: '#EBEBEB',
          height: 'auto',
          borderRadius: '8px',
          marginLeft: '5px',
        }}
      >
        <Grid container spacing={2} mt={1} px={2}>
          <Grid item xs={12} style={{ width: 'fit-content' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  maxWidth: '100px',
                  height: '100px',
                }}
              >
                <img
                  src="/img_avatar.png"
                  alt="avatar"
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>
              <div style={{ marginLeft: '10px' }}>
                <p style={{ fontWeight: 'bold', margin: 0 }}>Tejiri Tabor</p>
                <p style={{ fontWeight: 'bold', margin: 0 }}>+2348123456789</p>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1} px={2}>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>DOB: 23/06/2022</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Age: 52</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Gender: Male</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>
              Hospital Name: Lagos State Clinic{' '}
            </p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>
              Health Plan: Former sector plan
            </p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Date of Admission: 23/06/2022</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Date of Discharge: 23/06/2022</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Capitation: Filed</p>
          </Grid>
          <Grid item xs={12}>
            <p style={{ fontWeight: 'bold' }}>Fee of Service: Filed</p>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
