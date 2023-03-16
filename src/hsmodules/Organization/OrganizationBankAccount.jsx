import {useEffect, useState, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import client from "../../feathers";
import {ObjectContext, UserContext} from "../../context";
import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import {useForm} from "react-hook-form";
import {FormsHeaderText} from "../../components/texts";
import CustomSelect from "../../components/inputs/basic/Select";
import GlobalCustomButton from "../../components/buttons/CustomButton";
import CustomTable from "../../components/customtable";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import DeleteOutline from "@mui/icons-material/DeleteOutline";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {useNavigate} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import ModalBox from "../../components/modal";
import Textarea from "../../components/inputs/basic/Textarea";
import CheckboxGroup from "../../components/inputs/basic/Checkbox/CheckBoxGroup";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import CustomConfirmationDialog from "../../components/confirm-dialog/confirm-dialog";
import {v4 as uuidv4} from "uuid";

const OrganizationBankAccount = () => {
  const facilityServer = client.service("facility");
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);
  const {user, setUser} = useContext(UserContext);
  const [bankAccountModal, setBankAccountModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    type: "",
    message: "",
  });

  const currentOrganization = state.OrganizationModule.selectedOrganization;

  useEffect(() => {
    // hideActionLoader();
    const orgBankAccounts = currentOrganization.facilityBankAcct || [];
    setBankAccounts(orgBankAccounts);
  }, [state.OrganizationModule.selectedOrganization]);

  const handleRow = data => {
    setState(prev => ({
      ...prev,
      BankAccountModule: {...prev.BankAccountModule, selectedBankAccount: data},
    }));
    setDetailModal(true);
  };

  const confirmDelete = account => {
    setConfirmDialog({
      open: true,
      action: () => deleteBankAccount(account),
      message: `You're about to delete this ${account.bankname} account with account name ${account.accountname}`,
      type: "danger",
    });
  };

  const cancelConfrim = () => {
    setConfirmDialog({open: false, action: null, type: "", message: ""});
  };

  const deleteBankAccount = async account => {
    showActionLoader();
    const prevOrgDetail = currentOrganization;

    const prevBankAccounts = prevOrgDetail.facilityBankAcct || [];

    const newBankAccounts = prevBankAccounts.filter(
      item => item._id !== account._id
    );

    const newOrgDetail = {
      ...prevOrgDetail,
      facilityBankAcct: newBankAccounts,
    };

    // console.log(newOrgDetail);

    const documentId = currentOrganization._id;

    await facilityServer
      .patch(documentId, {...newOrgDetail})
      .then(resp => {
        hideActionLoader();
        // setUser(prev => ({
        //   ...prev,
        //   currentEmployee: {
        //     ...prev.currentEmployee,
        //     facilityDetail: newOrgDetail,
        //   },
        // }));

        cancelConfrim();

        toast.success(
          "You've succesfully deleted a bank account from your Organization"
        );
      })
      .catch(error => {
        cancelConfrim();
        toast.error(
          `Failed to delete the bank account from your oragnization; ${error}`
        );
        hideActionLoader();
        // console.error(error);
      });
  };

  const bankColumns = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "60px",
    },
    {
      name: "Bank Name",
      key: "bank_name",
      description: "Bank Name",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2"}}
          data-tag="allowRowEvents"
        >
          {row.bankname}
        </Typography>
      ),
      //selector: row => row.bankname,
      sortable: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Account Name",
      key: "account_name",
      description: "Account Name",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal", color: "#1976d2"}}
          data-tag="allowRowEvents"
        >
          {row.accountname}
        </Typography>
      ),
      // selector: row => row.accountname,
      sortable: true,
      inputType: "TEXT",
      width: "200px",
    },
    {
      name: "Account Number",
      key: "account_number",
      description: "Account Number",
      selector: row => row.accountnumber,
      sortable: true,
      inputType: "TEXT",
      width: "150px",
    },
    {
      name: "Branch",
      key: "branch",
      description: "Branch",
      selector: row => row.branch,
      sortable: true,
      inputType: "TEXT",
      width: "150px",
    },
    {
      name: "Sort Code",
      key: "sort_code",
      description: "Sort Code",
      selector: row => row.sortcode,
      sortable: true,
      inputType: "TEXT",
      width: "120px",
    },
    {
      name: "Comments",
      key: "sort_code",
      description: "Sort Code",
      selector: row => (
        <Typography
          sx={{fontSize: "0.8rem", whiteSpace: "normal"}}
          data-tag="allowRowEvents"
        >
          {row.comment ? row.comment : "----------"}
        </Typography>
      ),
      // selector: row => (row.comment ? row.comment : "----------"),
      sortable: true,
      inputType: "TEXT",
    },
    {
      name: "Action",
      width: "50px",
      center: true,
      key: "contact_email",
      description: "Enter Date",
      selector: row => (
        <IconButton onClick={() => confirmDelete(row)} color="error">
          <DeleteOutline fontSize="small" />
        </IconButton>
      ),
      sortable: true,
      required: true,
      inputType: "NUMBER",
      width: "80px",
    },
  ];

  return (
    <Box>
      <CustomConfirmationDialog
        open={confirmDialog.open}
        cancelAction={cancelConfrim}
        message={confirmDialog.message}
        confirmationAction={confirmDialog.action}
        type={confirmDialog.type}
      />
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={2}
        >
          <FormsHeaderText text="Organization Bank Accounts" />

          <GlobalCustomButton onClick={() => setBankAccountModal(true)}>
            <AddCircleOutline fontSize="small" sx={{marginRight: "5px"}} />
            Add Bank Account
          </GlobalCustomButton>
        </Box>
        <Box>
          <CustomTable
            title={""}
            columns={bankColumns}
            data={bankAccounts}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            CustomEmptyData={
              <Typography sx={{fontSize: "0.8rem"}}>
                This Organization doesn't have any bank account yet...
              </Typography>
            }
          />
        </Box>
      </Box>

      <ModalBox
        open={bankAccountModal}
        onClose={() => setBankAccountModal(false)}
        header="Add a New Bank Account"
      >
        <AddNewBankAccount closeModal={() => setBankAccountModal(false)} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={() => setDetailModal(false)}
        header="Bank Account Details"
      >
        <BankAccountDetail closeModal={() => setDetailModal(false)} />
      </ModalBox>
    </Box>
  );
};

export default OrganizationBankAccount;

export const AddNewBankAccount = ({closeModal}) => {
  const facilityServer = client.service("facility");
  const {register, handleSubmit, control, reset} = useForm();
  const {user, setUser} = useContext(UserContext);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  const currentOrganization = state.OrganizationModule.selectedOrganization;

  const addBankAccount = async data => {
    showActionLoader();
    const employee = user.currentEmployee;
    const prevOrgDetail = currentOrganization;

    const document = {
      ...data,
      _id: uuidv4(),
      createdBy: employee.userId,
      createdByName: `${employee.firstname} ${employee.lastname}`,
    };

    const prevBankAccounts = prevOrgDetail.facilityBankAcct || [];

    const newBankAccounts = [document, ...prevBankAccounts];

    const newOrgDetail = {
      ...prevOrgDetail,
      facilityBankAcct: newBankAccounts,
    };

    //return console.log(newOrgDetail);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, {...newOrgDetail})
      .then(resp => {
        Object.keys(data).forEach(key => {
          data[key] = null;
        });
        reset(data);
        hideActionLoader();
        // setUser(prev => ({
        //   ...prev,
        //   currentEmployee: {
        //     ...prev.currentEmployee,
        //     facilityDetail: newOrgDetail,
        //   },
        // }));
        closeModal();

        toast.success(
          "You've succesfully Added a new bank account to your Organization"
        );
      })
      .catch(error => {
        toast.error(
          `Error adding new bank account to your oragnization; ${error}`
        );
        hideActionLoader();
        console.error(error);
      });
  };

  return (
    <Box sx={{width: "60vw"}}>
      <Grid container spacing={1} mb={1}>
        <Grid item lg={6}>
          <Input
            register={register("bankname", {required: true})}
            label="Bank Name"
            important
          />
        </Grid>

        <Grid item lg={6}>
          <Input
            register={register("accountname", {required: true})}
            label="Account Name"
            important
          />
        </Grid>

        <Grid item lg={4}>
          <Input
            register={register("accountnumber", {required: true})}
            label="Account Number"
            important
            type="number"
          />
        </Grid>

        <Grid item lg={4}>
          <Input register={register("sortcode")} label="Sort Code" />
        </Grid>

        <Grid item lg={4}>
          <Input register={register("branch")} label="Branch" />
        </Grid>

        <Grid item lg={12}>
          <Textarea
            register={register("comment")}
            label="Comment"
            placeholder="write here..."
          />
        </Grid>
      </Grid>

      <Box sx={{display: "flex"}} gap={2}>
        <GlobalCustomButton color="error" onClick={closeModal}>
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton onClick={handleSubmit(addBankAccount)}>
          Add Account
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export const BankAccountDetail = ({closeModal}) => {
  const facilityServer = client.service("facility");
  const {register, handleSubmit, control, reset} = useForm();
  const {user, setUser} = useContext(UserContext);
  const [edit, setEdit] = useState(false);
  const {state, setState, showActionLoader, hideActionLoader} =
    useContext(ObjectContext);

  useEffect(() => {
    const accountDetail = state.BankAccountModule.selectedBankAccount;
    reset(accountDetail);
  }, []);

  const updateBankAccount = async data => {
    showActionLoader();
    //);
    const employee = user.currentEmployee;
    const prevOrgDetail = user.currentEmployee.facilityDetail;
    const currentAccount = state.BankAccountModule.selectedBankAccount;

    const document = {
      ...currentAccount,
      ...data,
      updatedBy: employee.userId,
      updatedByName: `${employee.firstname} ${employee.lastname}`,
    };

    const prevBankAccounts = prevOrgDetail.facilityBankAcct || [];

    //console.log(prevBankAccounts)

    const newBankAccounts = prevBankAccounts.map(item => {
      if (item._id === document._id) {
        return document;
      } else {
        return item;
      }
    });

    const newOrgDetail = {
      ...prevOrgDetail,
      facilityBankAcct: newBankAccounts,
    };

    //return console.log(newBankAccounts);

    const documentId = prevOrgDetail._id;

    await facilityServer
      .patch(documentId, {...newOrgDetail})
      .then(resp => {
        hideActionLoader();
        setUser(prev => ({
          ...prev,
          currentEmployee: {
            ...prev.currentEmployee,
            facilityDetail: newOrgDetail,
          },
        }));

        setState(prev => ({
          ...prev,
          BankAccountModule: {
            ...prev.BankAccountModule,
            selectedBankAccount: document,
          },
        }));

        toast.success("You've succesfully updated the bank account");
      })
      .catch(error => {
        toast.error(`Failed to updated the bank account; ${error}`);
        hideActionLoader();
        console.error(error);
      });
  };

  return (
    <Box sx={{width: "60vw"}}>
      <Box sx={{display: "flex", justifyContent: "flex-end"}} gap={2} mb={2}>
        {!edit ? (
          <GlobalCustomButton onClick={() => setEdit(true)}>
            Edit Account
          </GlobalCustomButton>
        ) : (
          <>
            <GlobalCustomButton color="error" onClick={() => setEdit(false)}>
              Cancel Edit
            </GlobalCustomButton>
            <GlobalCustomButton onClick={handleSubmit(updateBankAccount)}>
              Update Account
            </GlobalCustomButton>
          </>
        )}
      </Box>

      <Grid container spacing={1}>
        <Grid item lg={6}>
          <Input
            register={register("bankname")}
            label="Bank Name"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={6}>
          <Input
            register={register("accountname")}
            label="Account Name"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4}>
          <Input
            register={register("accountnumber")}
            label="Account Number"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4}>
          <Input
            register={register("sortcode")}
            label="Sort Code"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={4}>
          <Input
            register={register("branch")}
            label="Branch"
            disabled={!edit}
          />
        </Grid>

        <Grid item lg={12}>
          <Textarea
            register={register("comment")}
            label="Comment"
            placeholder="write here..."
            disabled={!edit}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
