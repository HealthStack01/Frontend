import {useContext, useRef, useEffect} from "react";
import {Box} from "@mui/material";

import "./styles.scss";
import {ObjectContext} from "../../../../../context";

const MessagesSearchInput = () => {
  const {setState} = useContext(ObjectContext);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Box className="message-search-input-container">
      <input
        class="input-elevated"
        type="text"
        placeholder="Search"
        ref={inputRef}
      />
    </Box>
  );
};

export default MessagesSearchInput;
