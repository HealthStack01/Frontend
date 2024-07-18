import React, { useState, useContext } from "react";
import DiscountList from "./components/discounts/DiscountList";
import DiscountCreate from "./components/discounts/CreateDiscount";
import { Box } from "@mui/material";
import ModalBox from "../../components/modal";
import { UserContext, ObjectContext } from "../../context";
// import { toast } from "react-toastify";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import DiscountDetails from "./components/discounts/DiscountDetails";

export default function Discount({
  discount = [],
  createDiscount,
  removeDiscount,
  updateDiscount,
}) {
  const { state, setState } = useContext(ObjectContext);
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const handleRow = (discounts) => {
    console.log("inside row", discounts);
    setState((prev) => ({
      ...prev,
      InvoiceModule: { ...prev.InvoiceModule, selectedDiscount: discounts },
    }));
    setDetailModal(true);
  };
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    message: "",
    type: "",
  });
  const closeConfirmationDialog = () => {
    setConfirmDialog({ open: false, action: "", message: "", type: "" });
  };

  // React.useEffect(() => {
  //   console.log(discount);
  // }, [discount]);

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        cancelAction={closeConfirmationDialog}
        type={confirmDialog.type}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
      />
      <Box>
        <DiscountList
          openCreateModal={() => setCreateModal(true)}
          openDetailModal={() => setDetailModal(true)}
          discount={discount}
          handleRow={handleRow}
        />
      </Box>

      <ModalBox
        open={createModal}
        onClose={() => setCreateModal(false)}
        header="Create Discount"
      >
        <DiscountCreate
          closeModal={() => setCreateModal(false)}
          createDiscount={createDiscount}
        />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Discount Detail"
      >
        <DiscountDetails
          discounts={selectedDiscount}
          closeModal={() => setDetailModal(false)}
        />
      </ModalBox>
    </Box>
  );
}
