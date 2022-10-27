import {SelectUnstyled} from "@mui/base";
import OptionUnstyled, {optionUnstyledClasses} from "@mui/base/OptionUnstyled";
import {
  selectUnstyledClasses,
  SelectUnstyledProps,
} from "@mui/base/SelectUnstyled";
import {styled} from "@mui/material";
// import { styled } from '@mui/system';
import React, {useEffect, useState} from "react";
import {LocationWrapper} from "../../../../ui/styled/global";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  width: 100%;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 4px;
  margin: 0.5em;
  padding: 10px;
  text-align: left;
  line-height: 1.5;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  position:relative;
  zIndex:1000;

  @media (max-width: 768px) {
   width:40px !important;
  }

  &:hover {
    background: ${theme.palette.mode === "dark" ? "" : grey[100]};
    border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &.${selectUnstyledClasses.focusVisible} {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
  }

  &.${selectUnstyledClasses.expanded} {
    &::after {
      content: '▴';
    }
  }

  &::after {
    content: '▾';
    float: right;
  }

  & img {
    margin-right: 10px;
  }
  `
);

const StyledListbox = styled("ul")(
  ({theme}) => `
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 5px;
  margin: 10px 0;
  min-width: ;
  max-height: 400px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
  border-radius: 4px;
  color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  overflow: auto;
  outline: 0px;
  position:relative;
  zIndex:1000;
  `
);

const StyledOption = styled(OptionUnstyled)(
  ({theme}) => `
  list-style: none;
  padding: 8px;
  border-radius: 2px;
  cursor: default;
  position:relative;
  zIndex:1000;


  &:last-of-type {
    border-bottom: none;
  }

  &.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
    background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
    color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
  }

  &.${optionUnstyledClasses.disabled} {
    color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
  }

  &:hover:not(.${optionUnstyledClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  }

  & img {
    margin-right: 10px;
  }
  `
);

// const StyledPopper = styled(PopperUnstyled)`
//   z-index: 1;
// `;

const CustomSelect = React.forwardRef(function CustomSelect(
  props: SelectUnstyledProps<string>,
  ref: React.ForwardedRef<any>
) {
  const components: SelectUnstyledProps<string>["components"] = {
    Root: StyledButton,
    Listbox: StyledListbox,
    // Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

export default function LocationSelect({
  defaultLocationId,
  locations = [],
  onChange,
}) {
  const [value, setValue] = useState(defaultLocationId);

  useEffect(() => {
    setValue(defaultLocationId);
  }, [defaultLocationId]);
  return (
    <LocationWrapper>
      <CustomSelect
        onChange={value => {
          setValue(value);
          onChange(value);
        }}
        value={value}
      >
        {locations.map((c, i) => (
          <StyledOption key={i} value={c.location}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${c.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png 2x`}
              alt={`Flag of ${c.label}`}
            />
            {c.label}
          </StyledOption>
        ))}
      </CustomSelect>
    </LocationWrapper>
  );
}
