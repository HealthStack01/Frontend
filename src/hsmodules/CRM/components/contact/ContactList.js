import {useState} from "react";
import {Box} from "@mui/material";
import {getContactColumns} from "../colums/columns";
import {contactsData} from "../lead/data";
import CustomTable from "../../../../components/customtable";
import AddCircleOutlineOutlined from "@mui/icons-material/AddCircleOutlineOutlined";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {FormsHeaderText} from "../../../../components/texts";

const ContactsList = ({
  openCreateModal,
  openDetailModal,
  contacts,
  deleteContact,
  standalone,
}) => {
  const handleRow = () => [openDetailModal()];
  //first param is passed to the delete element on the table and the second param (false) decides whether or not the delete button is disabled
  const contactColumns = getContactColumns(deleteContact, false, standalone);
  return (
    <Box pl={2} pr={2}>
      <Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Contact Details" />

          <GlobalCustomButton onClick={openCreateModal}>
            <AddCircleOutlineOutlined
              sx={{marginRight: "5px"}}
              fontSize="small"
            />
            Add Contact
          </GlobalCustomButton>
        </Box>

        <Box mt={1} mb={1}>
          <CustomTable
            title={"Contact List"}
            columns={contactColumns}
            data={contacts}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            CustomEmptyData="You haven't added any contact yet, Click edit to add.."
            progressPending={false}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default ContactsList;
