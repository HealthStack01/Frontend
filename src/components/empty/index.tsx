import {Typography} from "@mui/material";
import React from "react";

const EmptyData = () => {
  return (
    <div style={{textAlign: "center"}}>
      <img
        src="https://i.pinimg.com/originals/5d/35/e3/5d35e39988e3a183bdc3a9d2570d20a9.gif"
        alt="Empty State"
        width={300}
      />
      <Typography sx={{marginTop: "-20px"}}>
        There are no records available.
      </Typography>
    </div>
  );
};

export default EmptyData;
