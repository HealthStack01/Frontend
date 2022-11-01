import React, {useState, useContext, useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import client from "../../../feathers";
import Encounter from "../../Documentation/Documentation";
import {UserContext, ObjectContext} from "../../../context";
import {toast} from "bulma-toast";

export default function LaboratoryReportForm() {
  const {register, handleSubmit} = useForm();

  const {state, setState} = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const [choosenForm, setChoosenForm] = useState("");
  const [productModal, setProductModal] = useState(false);

  const formtype = [
    "Haematology",
    "Serology",
    "Biochemistry",
    "Microbiology",
    "Urine",
    "Urinalysis",
    "Stool",
    "HVS Culture",
    "Generic",
  ];
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const handleChangeMode = value => {
    setChoosenForm(value);

    setState(prevstate => ({...prevstate, labFormType: value}));
  };

  useEffect(() => {
    if (order.resultDetail?.labFormType == null) {
      console.log("null");
      //setChoosenForm("unknown")
      setState(prevstate => ({...prevstate, labFormType: "unknown"}));
    } else {
      console.log("not null");
      //setChoosenForm(state.financeModule.selectedFinance.resultDetail.labFormType)
      setState(prevstate => ({
        ...prevstate,
        labFormType:
          state.financeModule.selectedFinance.resultDetail.labFormType,
      }));
    }
    if (order.resultDetail == null) {
      console.log("does not exist");
      // setChoosenForm("")
      setState(prevstate => ({...prevstate, labFormType: ""}));
    }

    return () => {};
  }, [order]);
  const showDocumentation = async value => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    // handleSearch(val)
  };

  return (
    <div className="card">
      <div className="card-header mb-0">
        <p className="card-header-title">
          {order.serviceInfo.name} for {order.orderInfo.orderObj.clientname}
        </p>
        <p>
          {/* disable dropdown if status is not pending; add flag to know form chosen */}
        </p>
        {bill_report_status === "Pending" && (
          <div className="control mt-2 mr-2">
            <div className="select is-small ">
              <select
                name="FormType"
                {...register("x", {required: true})}
                onChange={e => handleChangeMode(e.target.value)}
                className="selectadd"
              >
                <option value="">Choose Form </option>
                {formtype.map((option, i) => (
                  <option key={i} value={option}>
                    {" "}
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        <button
          className="button is-success is-small btnheight mt-2"
          onClick={showDocumentation}
        >
          Documentation
        </button>
      </div>

      <div className="card-content mb-0 vscrollable">
        <div>
          {state.labFormType === "Haematology" && <Haematology />}
          {state.labFormType === "Serology" && <Serology />}
          {state.labFormType === "Biochemistry" && <Biochemistry />}
          {state.labFormType === "Microbiology" && <Microbiology />}
          {state.labFormType === "Urine" && <Urine />}
          {state.labFormType === "Urinalysis" && <Urinalysis />}
          {state.labFormType === "Stool" && <Stool />}
          {state.labFormType === "HVS Culture" && <HVS />}
          {state.labFormType === "Generic" && <LabNoteGeneric />}
          {state.labFormType === "unknown" && <LabNoteCreate />}
        </div>
      </div>
      <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card  modalbkgrnd">
          <header className="modal-card-head  btnheight">
            <p className="modal-card-title">Documentation</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body modalcolor">
            <Encounter standalone="true" />
          </section>
          {/* <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer>  */}
        </div>
      </div>
    </div>
  );
}

export function Haematology() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  // let draftDoc=state.DocumentClassModule.selectedDocumentClass.document

  useEffect(() => {
    // setState((prevstate)=>({...prevstate, labFormType:value}))
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="label is-small">HEAMATOLOGY</label>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">HB</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="hb"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">PCV</label>
                <div className="control">
                  <input
                    {...register}
                    name="pcv"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">WBC</label>
                <div className="control">
                  <input
                    {...register}
                    name="wbc"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">ESR</label>
                <div className="control">
                  <input
                    {...register}
                    name="esr"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Platelets</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="platelets"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Rectics</label>
                <div className="control">
                  <input
                    {...register}
                    name="rectics"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">RBC</label>
                <div className="control">
                  <input
                    {...register}
                    name="rbc"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">MCV</label>
                <div className="control">
                  <input
                    {...register}
                    name="mcv"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">MCHC</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="mchc"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">MCH</label>
                <div className="control">
                  <input
                    {...register}
                    name="mch"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Neutrophils</label>
                <div className="control">
                  <input
                    {...register}
                    name="neutrophils"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Lymphocytes</label>
                <div className="control">
                  <input
                    {...register}
                    name="lymphocytes"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Monocytes</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="monocytes"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Eosinophils</label>
                <div className="control">
                  <input
                    {...register}
                    name="eosinophils"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Basophils</label>
                <div className="control">
                  <input
                    {...register}
                    name="basophils"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Pro-Myelocyte</label>
                <div className="control">
                  <input
                    {...register}
                    name="proMyelocyte"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Meta-Myelocyte</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="metaMyelocyte"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Nucleated RBC</label>
                <div className="control">
                  <input
                    {...register}
                    name="nucleatedRbc"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Genotype</label>
                <div className="control">
                  <input
                    {...register}
                    name="genotype"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Blood Group</label>
                <div className="control">
                  <input
                    {...register}
                    name="bldGroup"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </div>
    </form>
  );
}

export function Serology() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">SEROLOGY</label>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">HBsAG</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="hbsag"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">HCV</label>
                <div className="control">
                  <input
                    {...register}
                    name="hcv"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">VDRL</label>
                <div className="control">
                  <input
                    {...register}
                    name="vdrl"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">RPHA</label>
                <div className="control">
                  <input
                    {...register}
                    name="rpha"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">COOMBS</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="coombs"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">A.S.O Titre</label>
                <div className="control">
                  <input
                    {...register}
                    name="asoTitre"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SLE</label>
                <div className="control">
                  <input
                    {...register}
                    name="sle"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">R.A Factor</label>
                <div className="control">
                  <input
                    {...register}
                    name="raFactor"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">B-HCG</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="bHcg"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">MANTOUX</label>
                <div className="control">
                  <input
                    {...register}
                    name="mantoux"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Blood Preg. Test</label>
                <div className="control">
                  <input
                    {...register}
                    name="bldPregTest"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">XYZ</label>
                <div className="control">
                  <input
                    {...register}
                    name="xyz"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Biochemistry() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">BIOCHEMISTRY</label>
        <div className="columns mt-3 is-flex-wrap-wrap">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Glucose (Fasting)</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="glucoseFasting"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Glucose (Random)</label>
                <div className="control">
                  <input
                    {...register}
                    name="glucoseRandom"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urea</label>
                <div className="control">
                  <input
                    {...register}
                    name="urea"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Creatinine</label>
                <div className="control">
                  <input
                    {...register}
                    name="creatinine"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Uric Acid</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="uricAcid"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Sodium</label>
                <div className="control">
                  <input
                    {...register}
                    name="sodium"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Potassium</label>
                <div className="control">
                  <input
                    {...register}
                    name="potassium"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bicarbonate</label>
                <div className="control">
                  <input
                    {...register}
                    name="bicarbonate"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Chloride</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="chloride"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Total Protein</label>
                <div className="control">
                  <input
                    {...register}
                    name="totalProtein"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Albumin</label>
                <div className="control">
                  <input
                    {...register}
                    name="albumin"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">T. Bilirubin</label>
                <div className="control">
                  <input
                    {...register}
                    name="tBilirubin"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">D.Bilirubin</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="dBilirubin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Cholesterol</label>
                <div className="control">
                  <input
                    {...register}
                    name="cholesterol"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Triglyceride</label>
                <div className="control">
                  <input
                    {...register}
                    name="triglyceride"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Phos</label>
                <div className="control">
                  <input
                    {...register}
                    name="phos"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Calcium</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="calcium"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SGOT</label>
                <div className="control">
                  <input
                    {...register}
                    name="sgot"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">SGPT</label>
                <div className="control">
                  <input
                    {...register}
                    name="sgpt"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">OGTT</label>
                <div className="control">
                  <input
                    {...register}
                    name="ogtt"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Alk Phos</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="alkPhos"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Acid Phos</label>
                <div className="control">
                  <input
                    {...register}
                    name="acidPhos"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">ADH</label>
                <div className="control">
                  <input
                    {...register}
                    name="adh"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">APK</label>
                <div className="control">
                  <input
                    {...register}
                    name="apk"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="columns mt-3">
          <div className="column">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Amylase</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="amylase"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Microbiology() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <label className="label is-small">MICROBIOLOGY</label>
          <label class="checkbox me-3">
            <input {...register} name="urinalysisOrMicro" type="checkbox" />
            <span className="ms-2 is-small">Urinanalysis/Microscope</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="stoolAnalysis" type="checkbox" />
            <span className="ms-2 is-small">Stool Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="stoolOccult" type="checkbox" />
            <span className="ms-2 is-small">Stool Occult</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="semenAnalysis" type="checkbox" />
            <span className="ms-2 is-small">Semen Analysis</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="gramStain" type="checkbox" />
            <span className="ms-2 is-small">Gram Stain</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="znStain" type="checkbox" />
            <span className="ms-2 is-small">ZN Stain</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="mantouxTest" type="checkbox" />
            <span className="ms-2 is-small">Mantoux Test</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="fungalStudies" type="checkbox" />
            <span className="ms-2 is-small">Fungal Studies</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="urine" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Urine</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="throatSwab" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Throat Swab</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="aspirateAndDischarge" type="checkbox" />
            <span className="ms-2 is-small">C/S/PUS/Aspirate/Discharge</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="woundSwab" type="checkbox" />
            <span className="ms-2 is-small">C/S Wound Swab</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="semen" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Semen</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="fluid" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Fluid</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="stool2" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Stool</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="endocerviclSwab" type="checkbox" />
            <span className="ms-2 is-small">C/S Endocervical Swab</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="hvs" type="checkbox" />
            <span className="ms-2 is-small">M/C/S HVS</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="sputum" type="checkbox" />
            <span className="ms-2 is-small">M/C/S Sputum</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="csBld" type="checkbox" />
            <span className="ms-2 is-small">C/S Blood</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="microfilariaSkin" type="checkbox" />
            <span className="ms-2 is-small">Microfilaria-Skin Snip</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="otherSwab" type="checkbox" />
            <span className="ms-2 is-small">Other Swab (Specify)</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="faecalOccultBld" type="checkbox" />
            <span className="ms-2 is-small">Faecal Occult Blood</span>
          </label>
          <label class="checkbox me-3">
            <input {...register} name="salmoOrshigella" type="checkbox" />
            <span className="ms-2 is-small">Salmonella/Shigella</span>
          </label>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Urine() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">URINE</label>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Macroscopy</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="macroscopy"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Microscopy</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="microscopy"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Pus Cells/hof</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="pusCellsOrhof"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Rbs/hpf</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="rbsOrHpf"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Yeast Cells</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="yeastCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bacteria</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="bacteria"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Casts</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="casts"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Epith Cells</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="epithCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Crystals</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="crystals"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">T.V</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="tv"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture Yielded</label>
          <div className="control">
            <textarea
              {...register}
              name="cultureYielded"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Malaria Parasite</label>
          <div className="control">
            <textarea
              {...register}
              name="malariaParasite"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Urinalysis() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };

  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">URINALYSIS</label>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Appearance</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="appearance"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Color</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="color"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">PH</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="ph"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Protein</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="protein"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Sugar</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="sugar"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Ketones</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="ketones"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Blood</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="blood"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Billirubin</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="billirubin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">S.G</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="sg"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Nitrite</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="nitrite"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urobilin</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="urobilin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Urobilinogen</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="urobilinogin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="column is-half">
            <div className="field-body">
              <div className="field is-flex">
                <label className="label is-small mr-2">Leucocyte</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="leucocyte"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function Stool() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">STOOL</label>
        <div className="field">
          <label className="label is-small">Macro</label>
          <div className="control">
            <textarea
              {...register}
              name="macro"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Micro</label>
          <div className="control">
            <textarea
              {...register}
              name="micro"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field">
          <label className="label is-small">Culture</label>
          <div className="control">
            <textarea
              {...register}
              name="culture2"
              className="textarea is-small"
            ></textarea>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function HVS() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const [docStatus, setDocStatus] = useState("Draft");

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async e => {
    console.log(e.target.value);
    setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="label is-small">HVS CULTURE</label>
        <label className="label is-small mt-3">Wet Prep</label>

        <div className="columns">
          <div className="column is-half">
            <div className="field-body mb-1">
              <div className="field is-flex ">
                <label className="label is-small mr-2">Pus cells' hpf</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="pusCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Rbcs/hpf</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="rbcsOrHpf"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Yeast Cells</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="yeastCells"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Bacteria</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="bacteria2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          <div className="column is-half">
            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Casts</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="casts"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Epith Cells</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="epithCells2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body mb-1">
              <div className="field is-flex">
                <label className="label is-small mr-2">Crystals</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="crystals2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>

            <div className="field-body">
              <div className="field is-flex mb-1">
                <label className="label is-small mr-2">T.V</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="tv2"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body mb-1">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function LabNoteGeneric() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const dClientServ = client.service("clinicaldocument");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const {state, setState} = useContext(ObjectContext);

  const [docStatus, setDocStatus] = useState("Draft");
  const [reportStatus, setReportStatus] = useState("Draft");
  const ClientServ = client.service("labresults");
  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  let draftDoc = state.DocumentClassModule.selectedDocumentClass.document;

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  //check user for facility or get list of facility
  useEffect(() => {
    //setFacility(user.activeClient.FacilityId)//
    if (!user.stacker) {
      /*    console.log(currentUser)
      setValue("facility", user.currentEmployee.facilityDetail._id,  {
          shouldValidate: true,
          shouldDirty: true
      })  */
    }
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangeStatus = async e => {
    // await setAppointment_type(e.target.value)

    setDocStatus(e.target.value);

    //console.log(e.target.value)
  };
  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };
  return (
    <>
      {/*   <label className="label is-size-7">
                Client:  {order.orderInfo.orderObj.clientname}
              </label>
              <label className="label is-size-7">
               Test:  {order.serviceInfo.name}
              </label> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input
              className="input is-small"
              {...register("x")}
              name="Investigation"
              type="text"
              placeholder="Investigation"
            />
            <span className="icon is-small is-left">
              <i className="fas fa-hospital"></i>
            </span>
          </p>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Finding"
                  type="text"
                  placeholder="Findings"
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>

        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                    <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                        Cancel
                    </button>
                </p> */}
        </div>
      </form>
    </>
  );
}

export function LabNoteCreate() {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ClientServ = client.service("labresults");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [reportStatus, setReportStatus] = useState("Draft");
  const {state, setState} = useContext(ObjectContext);

  const order = state.financeModule.selectedFinance;
  const bill_report_status = state.financeModule.report_status;

  const getSearchfacility = obj => {
    setValue("facility", obj._id, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    let document = {};
    // data.createdby=user._id
    //  console.log(data);
    if (user.currentEmployee) {
      document.facility = user.currentEmployee.facilityDetail._id;
      document.facilityname = user.currentEmployee.facilityDetail.facilityName; // or from facility dropdown
    }
    document.documentdetail = data;
    document.documentType = "Diagnostic Result";
    document.documentname = `${order.serviceInfo.name} Result`;
    // document.documentClassId=state.DocumentClassModule.selectedDocumentClass._id
    document.location =
      state.employeeLocation.locationName +
      " " +
      state.employeeLocation.locationType;
    document.locationId = state.employeeLocation.locationId;
    document.client = order.orderInfo.orderObj.clientId;
    document.createdBy = user._id;
    document.createdByname = user.firstname + " " + user.lastname;
    document.status = reportStatus;
    document.billId = order._id;
    // document.formType=choosenForm
    //  console.log(document)
    //  console.log(order)

    if (
      document.location === undefined ||
      !document.createdByname ||
      !document.facilityname
    ) {
      toast({
        message:
          " Documentation data missing, requires location and facility details",
        type: "is-danger",
        dismissible: true,
        pauseOnHover: true,
      });
      return;
    }

    if (bill_report_status === "Pending") {
      document.labFormType = state.labFormType;
      ClientServ.create(document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result created succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error creating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }

    if (bill_report_status === "Draft") {
      ClientServ.patch(order.resultDetail._id, document)
        .then(res => {
          e.target.reset();

          setSuccess(true);
          toast({
            message: "Lab Result updated succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          setSuccess(false);
        })
        .catch(err => {
          toast({
            message: "Error updating Lab Result " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
    const newProductEntryModule = {
      selectedFinance: order,
      show: "show",
      // report_status:order.report_status
    };
    await setState(prevstate => ({
      ...prevstate,
      financeModule: newProductEntryModule,
    }));
  };

  const handleChangePart = async e => {
    console.log(e.target.value);
    await setReportStatus(e.target.value);
  };

  useEffect(() => {
    if (!order.resultDetail?.documentdetail) {
      setValue("Finding", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      setValue("Recommendation", "", {
        shouldValidate: true,
        shouldDirty: true,
      });
      // setReportStatus(order.report_status)

      return;
    }
    if (order.report_status !== "Pending") {
      console.log(order.resultDetail.documentdetail);

      Object.entries(order.resultDetail.documentdetail).map(
        ([keys, value], i) =>
          setValue(keys, value, {
            shouldValidate: true,
            shouldDirty: true,
          })
      );
    }

    return () => {};
  }, [order]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Finding"
                  type="text"
                  placeholder="Findings"
                  disabled={bill_report_status === "Final"}
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-horizontal">
          <div className="field-body">
            <div className="field">
              <div className="control has-icons-left has-icons-right">
                <textarea
                  className="textarea is-small"
                  {...register("x")}
                  name="Recommendation"
                  type="text"
                  placeholder="Recommendation"
                  disabled={bill_report_status === "Final"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="field">
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Draft"
              checked={reportStatus === "Draft" || reportStatus === "Pending"}
              onChange={e => {
                handleChangePart(e);
              }}
              disabled={bill_report_status === "Final"}
            />
            <span> Draft</span>
          </label>{" "}
          <br />
          <label className=" is-small">
            <input
              type="radio"
              name="status"
              value="Final"
              checked={reportStatus === "Final"}
              onChange={e => handleChangePart(e)}
              disabled={bill_report_status === "Final"}
            />
            <span> Final </span>
          </label>
        </div>
        <div className="field  is-grouped mt-2">
          <p className="control">
            <button
              type="submit"
              className="button is-success is-small"
              disabled={bill_report_status === "Final"}
            >
              {bill_report_status === "Pending" ? "Save" : "Update"}
            </button>
          </p>
          {/*  <p className="control">
                  <button className="button is-warning is-small" onClick={(e)=>e.target.reset()}>
                      Cancel
                  </button>
              </p> */}
        </div>
      </form>
    </>
  );
}
