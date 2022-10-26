import {Grow, MenuList, Popper} from "@mui/material";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import * as React from "react";

import DateRange from "../inputs/DateRange";
import SearchInput from "../inputs/Search";

const FilterMenu = ({schema = [], onSearch = _ => {}, dateField = false}) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
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
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        position: "relative",
        justifyContent: "space-around",
        zIndex: "10",
        //height: "40px",
      }}
    >
      {schema.length ? (
        <>
          <label
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? "composition-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexWrap: "nowrap",
              padding: "4px 10px",
              width: "200px",
              borderRadius: "4px",
              margin: "0 10px",
              background: "#fafafa",
              border: "1px solid #CDD2D7",
            }}
          >
            <span style={{fontWeight: "500"}}>Filter by</span>
            <i className="bi bi-chevron-down"></i>
          </label>

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal
          >
            {({TransitionProps, placement}) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom-start" ? "left top" : "left bottom",
                }}
              >
                <div
                  style={{
                    background: "#fff",
                    minWidth: "200px",
                    border: "1px solid #CDD2D7",
                    borderRadius: "4px",
                  }}
                >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="composition-menu"
                      aria-labelledby="composition-button"
                      onKeyDown={handleListKeyDown}
                    >
                      <div style={{padding: "5px 10px", margin: " 0 0 10px 0"}}>
                        <input type="checkbox" />
                        <label>None</label>
                      </div>
                      <div style={{padding: "5px 10px", margin: "10px 0"}}>
                        <input type="checkbox" />
                        <label>Date</label>
                      </div>
                      <div style={{padding: "5px 10px", margin: "10px 0"}}>
                        <input type="checkbox" />
                        <label>Description</label>
                      </div>
                      {schema
                        .filter(obj => obj.filterable)
                        .map((obj, i) => (
                          <div key={i}>
                            <input type="checkbox" onChange={onSearch} />
                            <label>{obj.description}</label>
                          </div>
                        ))}
                    </MenuList>
                  </ClickAwayListener>
                </div>
              </Grow>
            )}
          </Popper>
        </>
      ) : null}
      <SearchInput
        label="Search here"
        onChange={onSearch ? onSearch : () => {}}
      />
      {dateField && <DateRange />}
    </div>
  );
};

export default FilterMenu;
