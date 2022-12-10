import {useState} from "react";
import {Box, Typography} from "@mui/material";
import {getPlansColumns} from "../colums/columns";
import {contactsData} from "../lead/data";
import CustomTable from "../../../../components/customtable";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../../../components/texts";

const PlansList = ({
  openCreateModal,
  openDetailModal,
  plans,
  removePlan,
  omitCreate,
  handleRow,
}) => {
  //first param is passed to the delete element on the table and the second param (false) decides whether or not the delete button is disabled
  const plansColumns = getPlansColumns(removePlan, false);
  return (
    <Box>
      {!omitCreate && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Plans List" />

          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutlineOutlined
              sx={{marginRight: "5px"}}
              fontSize="small"
            />
            Add New Plan
          </GlobalCustomButton>
        </Box>
      )}

      <Box mt={1} mb={1}>
        <CustomTable
          title={"Plans List"}
          columns={plansColumns}
          data={plans}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          CustomEmptyData={
            <Typography sx={{fontSize: "0.8rem"}}>
              You haven't added any plan yet!
            </Typography>
          }
          progressPending={false}
        />
      </Box>
    </Box>
  );
};

export default PlansList;
