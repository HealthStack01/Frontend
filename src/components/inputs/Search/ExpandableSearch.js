import React from "react";
import styled from "styled-components";
import {withHandlers, withState, compose} from "react-recompose";
import TextField from "@mui/material/TextField";
import {Box} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const SearchBox = styled(TextField)`
  width: ${p => (p.isOpen ? "100%" : "4rem")};
  transition: width 1s cubic-bezier(0, 0.795, 0, 1);
`;

const Content = ({isOpen, onSearchFocus, onSearchBlur, onChange, value}) => (
  <Box>
    <SearchBox
      className="input"
      placeholder="search.."
      isOpen={isOpen}
      onFocus={onSearchFocus}
      onBlur={onSearchBlur}
      onChange={onChange}
      value={value}
      type="text"
      size="small"
      autoComplete="off"
      sx={{
        backgroundColor: "#ffffff",
        "& .MuiInputBase-input": {
          height: "0.9rem",
          fontSize: "0.8rem",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon fontSize="small" />
          </InputAdornment>
        ),
      }}
    />
  </Box>
);

const enhance = compose(
  withState("isOpen", "setOpen", false),
  withHandlers({
    onSearchFocus:
      ({setOpen}) =>
      () => {
        setOpen(true);
      },
    onSearchBlur:
      ({setOpen}) =>
      () => {
        setOpen(false);
      },
  })
);

const ExpandableSearchInput = enhance(Content);

export default ExpandableSearchInput;
