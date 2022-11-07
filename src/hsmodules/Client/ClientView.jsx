import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Button from "../../components/buttons/Button";
import Input from "../../components/inputs/basic/Input";
import CustomSelect from "../../components/inputs/basic/Select";
import BasicDatePicker from "../../components/inputs/Date";
import { Box } from "@mui/material";
import ViewText from "../../components/viewtext";
import CustomTable from "./ui-components/customtable";
import client from "../../feathers";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext, ObjectContext } from "../../context";

import {
  BottomWrapper,
  DetailsWrapper,
  GrayWrapper,
  GridBox,
  GridWrapper,
  HeadWrapper,
  PageWrapper,
} from "../app/styles";
import dayjs from "dayjs";
import { createClientSchema } from "./schema";
import ModalBox from "../../components/modal";
import { Checkbox } from "../../components/switch/styles";
import CheckboxInput from "../../components/inputs/basic/Checkbox";
import { ClientSearch } from "../helpers/ClientSearch";
import DataTable from "react-data-table-component";
import { customStyles } from "../../components/customtable/styles";
import BillServiceCreate from "../Finance/BillServiceCreate";

const ClientView = ({ open, setOpen, user }) => {
  const ClientServ = client.service("client");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openFinance, setOpenFinance] = useState(false);
  const [editing, setEditing] = useState(false);
  const [active, setActive] = useState("");
  const [billService, setBillService] = useState(false);

  const {  state, setState  } = useContext(ObjectContext);

  const result = localStorage.getItem("user");
  const data = JSON.parse(result);

  const {
    register,
    handleSubmit,
    formState: {  errors  },
    reset,
  } = useForm({
    resolver: yupResolver(createClientSchema),

    defaultValues: {
      firstname: user?.firstname,
      lastname: user?.lastname,
      middlename: user?.middlename,
      dob: dayjs(user?.dob).format("YYYY-MM-DD"),
      phone: user?.phone,
      email: user?.email,
      facility: data?.currentEmployee.facility,
      gender: user?.gender,
      maritalstatus: user?.maritalstatus,
      mrn: user?.mrn,
      religion: user?.religion,
      profession: user?.profession,
      clientTags: user?.clientTags,
    },
  });

  useEffect(() => {
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      middlename: user.middlename,
      dob: dayjs(user.dob).format("YYYY-MM-DD"),
      phone: user.phone,
      email: user.email,
      facility: data.currentEmployee.facility,
      gender: user?.gender,
      maritalstatus: user?.maritalstatus,
      mrn: user?.mrn,
      religion: user?.religion,
      profession: user?.profession,
      clientTags: user?.clientTags,
    });
  }, []);

  const handleFinance = async () => {
    // setLoading(true);
    // e.preventDefault();
    // setSuccess(false);
    setOpenFinance(true);
  };

  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");
    const dleteId = user._id;
    if (conf) {
      ClientServ.remove(dleteId)
        .then((res) => {
          toast.success(`Client successfully deleted!`);
          setOpen(false);
        })
        .catch((err) => {
          toast.error(`Sorry, Unable to delete client. ${err}`);
        });
    }
  };
  const getSearchfacility = (obj) => {
    setClientId(obj._id);
    setChosen(obj);
    //handleRow(obj)
    if (!obj) {
      //"clear stuff"
      setClientId();
      setChosen();
    }
  };
  const submit = async (data, e) => {
    setLoading(true);
    e.preventDefault();
    setSuccess(false);

    await ClientServ.patch(user._id, data)
      .then((res) => {
        toast.success(`Client successfully updated!`);

        setLoading(false);
      })
      .catch((err) => {
        toast.error(`Sorry, You weren't able to updated an client. ${err}`);
        setLoading(false);
      });

    setOpen(false);
    setLoading(false);
  };

  const handleBillClient = async () => {
    const newProductEntryModule = {
      selectedDispense: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      DispenseModule: newProductEntryModule,
    }));

    await setBillService(true);
  };

  const ClientFinanceSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
    },
    {
      name: "Type",
      key: "type",
      description: " Type",
      selector: (row) => row.type,
      sortable: true,
      required: true,
    },

    {
      name: "Principal",
      key: "name",
      description: "Principal",
      selector: (row) => row.name,
      sortable: true,
      required: true,
    },

    {
      name: "Organization",
      key: "organization",
      description: "age",
      selector: (row) => row.organization,
      sortable: true,
      required: true,
    },

    {
      name: "Gender",
      key: "gender",
      description: "Gender",
      selector: (row) => row.gender,
      sortable: true,
      required: true,
    },

    {
      name: "HMO Agenst",
      key: "agent",
      description: "Agent",
      selector: (row) => row.agent,
      sortable: true,
      required: true,
    },
  ];

  return (
    <PageWrapper>
      <ModalBox
        open={openFinance}
        onClose={() => setOpenFinance(false)}
        header="Financial Information"
      >
        <GrayWrapper>
          <CustomSelect
            options={[
              "Payment Mode",
              "HMO Cover",
              "Family Cover",
              "Company Cover",
            ]}
          />
          <ClientSearch getSearchfacility={getSearchfacility} clear={success} />
          <Input label="Plan" register={register("plan")} />
          <Box
            sx={{
              justifyContent: "space-between",
              width: "50px",
              display: "flex",
              gap: "4px",
            }}
          >
            <input
              type="checkbox"
              name="Active"
              value={active}
              onChange={(e) => {
                setActive(e.target.value);
              }}
              placeholder="Active"
            />
            <label>Active</label>
          </Box>
          <Button label="Add" background="#FFE9E9" color="#ED0423" />
          <DataTable
            title="Clients"
            columns={ClientFinanceSchema}
            customStyles={customStyles}

            // data={users}
          />
        </GrayWrapper>
      </ModalBox>

      <GrayWrapper>
        <HeadWrapper>
          <div>
            <h2>Client Detail</h2>
            <span>
              Client detail of {user?.firstname} {user?.lastname}
            </span>
          </div>
          <BottomWrapper>
            <Button
              label="Delete User"
              background="#FFE9E9"
              color="#ED0423"
              onClick={() => handleDelete()}
            />

            <Button
              label={`${!editing ? "Edit Client" : "Cancel Editing"}`}
              background="#ECF3FF"
              color="#0364FF"
              showicon
              icon="bi bi-pen-fill"
              disabled={editing}
              onClick={() => {
                setEditing(!editing);
              }}
            />

            {/*********************************** IMPLEMENT BILL CLIENT MODAL************************************** */}

            <Button onClick={handleBillClient}>Bill Client</Button>
            <Button onClick={handleFinance}> Financial Information</Button>
          </BottomWrapper>
        </HeadWrapper>
        <form onSubmit={handleSubmit(submit)}>
          <ToastContainer theme="colored" />

          {/* Names Section */}

          <ViewBox>
            <h2>Names</h2>
            <GridBox>
              {!editing ? (
                <ViewText label="First Name" text={user?.firstname} />
              ) : (
                <Input
                  label="First Name"
                  register={register("firstname")}
                  errorText={errors?.firstname?.message}
                />
              )}
              {!editing ? (
                <ViewText label="Middle Name" text={user?.middlename} />
              ) : (
                <Input
                  label="Middle Name"
                  register={register("middlename")}
                  errorText={errors?.middlename?.message}
                  defaultValue={user?.middlename}
                />
              )}
              {!editing ? (
                <ViewText label="Last Name" text={user?.lastname} />
              ) : (
                <Input
                  label="Last Name"
                  register={register("lastname", { required: true })}
                  errorText={errors?.lastname?.message}
                  defaultValue={user?.lastnames}
                />
              )}
              {!editing ? (
                <ViewText
                  label="Date of Birth"
                  text={dayjs(user?.dob).format("YYYY/MM/DD")}
                />
              ) : (
                <BasicDatePicker
                  label="dob"
                  register={register("dob")}
                  defaultValue={dayjs(user?.dob).format("YYYY/MM/DD")}
                  // errorText={errors?.dob?.message}
                />
              )}
            </GridBox>
          </ViewBox>
          {/* Biodata Section */}

          <ViewBox>
            <h2>Biodata</h2>

            <GridBox>
              {!editing ? (
                <ViewText label="Gender" text={user?.gender} />
              ) : (
                <CustomSelect
                  label="Gender"
                  register={register("gender")}
                  options={[
                    { label: "Male", value: "male" },
                    { label: "Female", value: "female" },
                  ]}
                  errorText={errors?.gender?.message}
                />
              )}
              {!editing ? (
                <ViewText label="Marital Status" text={user?.maritalstatus} />
              ) : (
                <CustomSelect
                  label="Marital Status"
                  register={register("maritalstatus")}
                  options={[
                    { label: "Single", value: "single" },
                    { label: "Married", value: "married" },
                  ]}
                />
              )}

              {!editing ? (
                <ViewText label="Medical record Number" text={user?.mrn} />
              ) : (
                <Input
                  label="Medical record Number"
                  register={register("mrn")}
                />
              )}
              {!editing ? (
                <ViewText label="Religion" text={user?.religion} />
              ) : (
                <Input label="Religion" register={register("religion")} />
              )}

              {!editing ? (
                <ViewText label="Profession" text={user?.profession} />
              ) : (
                <Input label="Profession" register={register("profession")} />
              )}
              {!editing ? (
                <ViewText label="Phone Number" text={user?.phone} />
              ) : (
                <Input
                  label="Phone Number"
                  register={register("phone")}
                  type="tel"
                />
              )}
              {!editing ? (
                <ViewText label="Email" text={user?.email} />
              ) : (
                <Input
                  label="Email"
                  register={register("email")}
                  type="email"
                />
              )}
              {!editing ? (
                <ViewText label="Tags" text={user?.clientTags} />
              ) : (
                <Input
                  label="Tags"
                  register={register("clientTags")}
                  type="email"
                />
              )}
            </GridBox>
          </ViewBox>
          {/* Address */}
          <ViewBox>
            <h2>Addresses</h2>

            <GridBox>
              {!editing ? (
                <ViewText label="Residential Address" text={user?.address} />
              ) : (
                <Input
                  label="Residential Address"
                  register={register("address")}
                />
              )}
              {!editing ? (
                <ViewText label="Town/City" text={user?.city} />
              ) : (
                <Input label="Town/City" register={register("city")} />
              )}

              {!editing ? (
                <ViewText label="Local Government Area" text={user?.lga} />
              ) : (
                <Input
                  label="Local Government Area"
                  register={register("lga")}
                />
              )}

              {!editing ? (
                <ViewText label="State" text={user?.state} />
              ) : (
                <Input label="State" register={register("state")} />
              )}

              {!editing ? (
                <ViewText label="Country" text={user?.country} />
              ) : (
                <Input label="Country" register={register("country")} />
              )}
            </GridBox>
          </ViewBox>
          {/* Medical Data */}
          <ViewBox>
            <h2>Medical Data</h2>

            <GridBox>
              {!editing ? (
                <ViewText label="Blood Group" text={user?.bloodgroup} />
              ) : (
                <Input label="Blood Group" register={register("bloodgroup")} />
              )}

              {!editing ? (
                <ViewText label="Genotype" text={user?.genotype} />
              ) : (
                <Input label="Genotype" register={register("genotype")} />
              )}
              {!editing ? (
                <ViewText label="Disabilities" text={user?.disabilities} />
              ) : (
                <Input
                  label="Disabilities"
                  register={register("disabilities")}
                />
              )}
              {!editing ? (
                <ViewText label="Allergies" text={user?.allergies} />
              ) : (
                <Input label="Allergies" register={register("allergies")} />
              )}
              {!editing ? (
                <ViewText label="Co-mobidities" text={user?.comorbidities} />
              ) : (
                <Input
                  label="Co-mobidities"
                  register={register("comorbidities")}
                />
              )}
              {!editing ? (
                <ViewText
                  label="Specific Details about patient"
                  text={user?.specificDetails}
                />
              ) : (
                <Input
                  label="Specific Details about patient"
                  register={register("specificDetails")}
                />
              )}
            </GridBox>
          </ViewBox>
          {/* Next of Kin Information */}
          <ViewBox>
            <h2>Next of Kin Information</h2>

            <GridBox>
              {!editing ? (
                <ViewText label="Next of Kin Full Name" text={user?.nok_name} />
              ) : (
                <Input
                  label="Next of Kin Full Name"
                  register={register("nok_name")}
                />
              )}

              {!editing ? (
                <ViewText
                  label="Next of Kin Phone Number"
                  text={user?.nok_phoneno}
                />
              ) : (
                <Input
                  label="Next of Kin Phone Number"
                  register={register("nok_phoneno")}
                />
              )}

              {!editing ? (
                <ViewText label="Next of Kin Email" text={user?.email} />
              ) : (
                <Input
                  label="Next of Kin Email"
                  register={register("nok_email")}
                />
              )}
              {!editing ? (
                <ViewText
                  label="Next of Kin Relationship"
                  text={user?.nok_relationship}
                />
              ) : (
                <Input
                  label="Next of Kin Relationship"
                  register={register("nok_relationship")}
                />
              )}
              {!editing ? (
                <ViewText label="Co-mobidities" text={user?.comorbidities} />
              ) : (
                <Input
                  label="Co-mobidities"
                  register={register("comorbidities")}
                />
              )}
              {!editing ? (
                <ViewText
                  label="Specific Details about patient"
                  text={user?.specificDetails}
                />
              ) : (
                <Input
                  label="Specific Details about patient"
                  register={register("specificDetails")}
                />
              )}
            </GridBox>
          </ViewBox>
          {editing && (
            <BottomWrapper>
              <Button label="Save Form" type="submit" loading={loading} />
            </BottomWrapper>
          )}
        </form>
      </div>

      <ModalBox
        open={billService}
        onClose={() => setBillService(false)}
        header="Bill Client/Service"
      >
        <BillServiceCreate />
      </ModalBox>
    </PageWrapper>
  );
};

export default ClientView;
