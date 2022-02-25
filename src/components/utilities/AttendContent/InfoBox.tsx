import React, { useState } from 'react';
import { AttendWrapper } from '../../../styles/global';

const InfoBox = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <AttendWrapper background="#FFE9E9" width="300px">
          <h6>
            Specific Information
            <button
              style={{
                borderRadius: '32px',
                background: 'transparent',
                border: 'none',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                margin: ' 1rem',
              }}
              type="submit"
              onClick={() => setOpen(false)}
            >
              +
            </button>
          </h6>
          <small>null</small>
        </AttendWrapper>
        <AttendWrapper background={'#ECF3FF'}>
          <h6>
            Allergies
            <button
              style={{
                borderRadius: '32px',
                background: 'transparent',
                border: 'none',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                margin: ' 1rem',
              }}
              type="submit"
              onClick={() => setOpen(false)}
            >
              +
            </button>
          </h6>
          <small>null</small>
        </AttendWrapper>
        <AttendWrapper background="#f6ffdb">
          <h6>
            Morbidities
            <button
              style={{
                borderRadius: '32px',
                background: 'transparent',
                border: 'none',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                margin: ' 1rem',
              }}
              type="submit"
              onClick={() => setOpen(false)}
            >
              +
            </button>
          </h6>
          <small>null</small>
        </AttendWrapper>
        <AttendWrapper background="#ffdbf8">
          <h6>
            Disabilities
            <button
              style={{
                borderRadius: '32px',
                background: 'transparent',
                border: 'none',
                width: '20px',
                height: '20px',
                cursor: 'pointer',
                margin: ' 1rem',
              }}
              type="submit"
              onClick={() => setOpen(false)}
            >
              +
            </button>
          </h6>
          <small>null</small>
        </AttendWrapper>
      </div>
    </>
  );
};

export default InfoBox;
