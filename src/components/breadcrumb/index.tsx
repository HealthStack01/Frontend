import {Breadcrumbs as MUIBreadcrumbs, Typography} from "@mui/material";
import React from "react";
import {useLocation} from "react-router-dom";

function Breadcrumbs() {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter(x => x);

  //console.log("loacation path ", pathnames);

  return (
    <MUIBreadcrumbs
      aria-label="breadcrumb"
      sx={{display: "flex", flexWrap: "nowrap"}}
    >
      {/* {pathnames.map((name, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? ( */}
      {pathnames.length < 2 ? (
        <Typography
          color="text.primary"
          //key={to}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
            fontWeight: "medium",
            whiteSpace: "nowrap",
          }}
        >
          {pathnames[0]} <i className="bi bi-chevron-right"></i> Path
          {/* Pass breadcrumb context  */}
        </Typography>
      ) : (
        <Typography
          color="text.primary"
          //key={to}
          style={{
            textDecoration: "none",
            textTransform: "capitalize",
            fontWeight: "medium",
            whiteSpace: "nowrap",
          }}
        >
          {pathnames[1]} <i className="bi bi-chevron-right"></i> {pathnames[2]}
          {/* Pass breadcrumb context  */}
        </Typography>
      )}

      {/* ) : null;
      })} */}
    </MUIBreadcrumbs>
  );
}

export default Breadcrumbs;
