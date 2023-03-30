import {useContext, useRef, useEffect} from "react";
import {Box} from "@mui/material";

import "./styles.scss";
import {ObjectContext} from "../../../../../context";

const MessagesSearchInput = () => {
  const {state, setState} = useContext(ObjectContext);

  const {searchValue} = state.ChatModule;

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = e => {
    const value = e.target.value;

    setState(prev => ({
      ...prev,
      ChatModule: {
        ...prev.ChatModule,
        searchValue: value,
      },
    }));
  };

  return (
    <Box className="message-search-input-container">
      <input
        class="input-elevated"
        type="text"
        placeholder="Search"
        ref={inputRef}
        value={searchValue}
        onChange={handleChange}
      />
    </Box>
  );
};

export default MessagesSearchInput;
