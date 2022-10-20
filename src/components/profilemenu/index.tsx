import { MenuList } from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Models } from '../../hsmodules/app/Constants';
import useRepository from '../hooks/repository';
import { Avatar } from '../topmenu/styles';

const ProfileMenu = () => {
  const { user } = useRepository(Models.EMPLOYEE);
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div style={{ position: 'relative', zIndex: '100' }}>
      <label
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? 'composition-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Avatar src="/img_avatar.png" alt="" />
      </label>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom-start' ? 'left top' : 'left bottom',
            }}
          >
            <div
              style={{
                background: '#fff',
                minWidth: '200px',
                border: '1px solid #CDD2D7',
                borderRadius: '4px',
                marginTop: '20px',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                  sx={{ textAlign: 'center' }}
                >
                  <Avatar
                    src="/img_avatar.png"
                    alt=""
                    style={{ width: '80px', height: '80px' }}
                  />
                  <p>
                    {user.firstname} {user.lastname}
                  </p>
                  {/* <div style={{ padding: '4px 8px' }}>
                    <p>Settings</p>
                  </div> */}

                  <div style={{ padding: '4px 8px' }}>
                    <p
                      onClick={() => {
                        localStorage.setItem('user', '');
                        navigate('/');
                      }}
                    >
                      <i className="bi bi-box-arrow-right"></i>Log out
                    </p>
                  </div>
                </MenuList>
              </ClickAwayListener>
            </div>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default ProfileMenu;
