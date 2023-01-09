import {useState} from "react";
import {Box} from "@mui/system";
import {IconButton} from "@mui/material";

import ExpandableSearchInput from "../../../../../components/inputs/Search/ExpandableSearch";

const CommunicationChatsList = () => {
  const [chatsList, setChatsList] = [];
  const [searchValue, setSearchValue] = useState("");

  return (
    <Box>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          padding: "0 15px",
        }}
      >
        <Box sx={{width: "calc(100% - 100px)"}}>
          {/* <FilterMenu onSearch={handleSearch} value={searchValue} /> */}
          <ExpandableSearchInput
            onChange={handleSearchChange}
            value={searchValue}
          />
        </Box>

        <IconButton>{/* <CloseIcon /> */}</IconButton>
      </Box>

      <Box></Box>
    </Box>
  );
};

export default CommunicationChatsList;
