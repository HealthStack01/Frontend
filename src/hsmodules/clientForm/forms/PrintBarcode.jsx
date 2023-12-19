import { renderToStaticMarkup } from "react-dom/server";
import QRCode from "qrcode";

import {
  useRef,
  forwardRef,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import CustomTable from "../../../components/customtable";
import ReactToPrint, { useReactToPrint } from "react-to-print";
import GlobalCustomButton from "../../../components/buttons/CustomButton";
import client from "../../../feathers";
import { ObjectContext, UserContext } from "../../../context";
import { EmailsSourceList } from "../../CRM/components/deals/SendLink";
import SendIcon from "@mui/icons-material/Send";
import ModalBox from "../../../components/modal";
import { useForm } from "react-hook-form";
import Input from "../../../components/inputs/basic/Input";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import axios from "axios";
import moment from "moment";
import { styled } from "@mui/material/styles";
import Textarea from "../../../components/inputs/basic/Textarea";

export const PrintBarcode = ({ data, action }) => {
  const EmployeeServ = client.service("employee");
  const [emailModal, setEmailModal] = useState(false);
  const [screenshot, setScreenshot] = useState("");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const printRef = useRef(null);
  const screenshotRef = useRef(null);
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [imgSrc, setImgSrc] = useState(
    "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  );

  // With promises
  const getBarCodeUrl = async (data) => {
    QRCode.toDataURL(
      `
      *** Client FullName : ${data.clientName} ***
      *** Test Name : ${data.labTestName} test ***
      *** Specimen name : ${data.specimenName} ***
      *** volume : ${data.volume} ***
      *** Date of Request : ${data.dateOfRequest} ***
      *** Date of Collection : ${data.dateOfCollection} ***
      *** Specimen Route : ${data.specimenRoute} ***`
    )
      .then((url) => {
        console.log("barcode", url);
        data.qrCodeUrl = url;
        setQrCodeUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const screenshotPrintout = async () => {
    const canvas = await html2canvas(screenshotRef.current, {
      logging: true,
      letterRendering: 1,
      useCORS: true,
    });
    const image = canvas.toDataURL("image/png", 1.0);
    setScreenshot(image);
    setEmailModal(true);
  };

  const beneschema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Beneficiary Name",
      key: "beneficiaryname",
      description: "Beneficiary Name",
      selector: (row) => `${data.firstname} ${data.lastname}`,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Policy Number",
      key: "policynumber",
      description: "Policy Number",
      selector: (row) => data?.policyNo,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Plan Name",
      key: "planname",
      description: "Plan Name",
      selector: (row) => data?.plan?.planName,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  console.log("DATA", data);
  const beneList = () => {
    let list = [];
    list = [data?.principal];
    setBeneficiaries(list);
  };

  const handleData = async () => {
    const newData = {
      selectedData: data,
    };
    await setState((prev) => ({ ...prev, data: newData }));
  };

  const getUserData = useCallback(() => {
    const userId = user.currentEmployee._id;
    EmployeeServ.get({
      _id: userId,
    })
      .then((res) => {
        setUserData(res);
        // console.log("USER DATA", res);
        //
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    getBarCodeUrl(data);
    beneList();
    handleData();
    getUserData();
  }, [data]);

  const ImgStyled = styled("img")(({ theme }) => ({
    width: 300,
    height: 150,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  const ImgStyledId = styled("img")(({ theme }) => ({
    width: 240,
    height: 120,
    marginLeft: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  return (
    <Box style={{ width: "60vw" }}>
      <Box
        sx={{
          width: "100%",
          //height: "40px",
          display: "flex",
        }}
        gap={2}
        mb={2}
      >
        <ReactToPrint
          trigger={() => (
            <GlobalCustomButton color="info">Print Document</GlobalCustomButton>
          )}
          content={() => printRef.current}
        />

        <GlobalCustomButton onClick={screenshotPrintout}>
          Send Via Email
        </GlobalCustomButton>
      </Box>

      <ModalBox
        open={emailModal}
        onClose={() => setEmailModal(false)}
        header="Send Via Email Address"
      >
        <SendViaEmail
          closeModal={() => setEmailModal(false)}
          screenshot={screenshot}
          data={data}
        />
      </ModalBox>

      <Box
        sx={{
          display: "none",
        }}
      >
        <ComponentToPrint ref={printRef} />
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        ref={screenshotRef}
        p={1}
      >
        {/* <Box
					style={{
						marginTop: '0.2rem',
					}}>
					<Divider></Divider>
					 Find below your Policy ID Card 
				</Box> */}

        <Box
          sx={{
            maxWidth: "540px",
            minWidth: "540px",
            minHeight: "240px",
            maxHeight: "240px",
            margin: "1rem",
            borderRadius: "10px",
            // bgcolor: 'info.main',
            border: "2px solid blue",
          }}
          p={2}
        >
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={12}>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#000000",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                NAME: <b>{`${data.clientName}`}</b>
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid xs={12} md={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    // float: "left",
                    alignItems: "center",
                    borderRadius: "10px",
                    //   bgcolor: "primary.main",
                    //   border: "2px solid red",
                  }}
                >
                  <ImgStyledId
                    src={qrCodeUrl ? qrCodeUrl : imgSrc}
                    alt="QR Code"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const ComponentToPrint = forwardRef(({ action }, ref) => {
  const EmployeeServ = client.service("employee");
  const { state, setState } = useContext(ObjectContext);
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [userData, setUserData] = useState({});
  const { user } = useContext(UserContext);
  const [imgSrc, setImgSrc] = useState(
    "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
  );

  const data = state?.data?.selectedData;

  console.log("selectedDataNew", data);

  const beneschema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Beneficiary Name",
      key: "beneficiaryname",
      description: "Beneficiary Name",
      selector: (row) => `${row.firstname} ${row.lastname}`,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Policy Number",
      key: "policynumber",
      description: "Policy Number",
      selector: (row) => data?.policyNo,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Plan Name",
      key: "planname",
      description: "Plan Name",
      selector: (row) => data?.plan?.planName,
      sortable: true,
      inputType: "HIDDEN",
    },
  ];

  const beneList = () => {
    let list = [];
    list = [data?.principal];
    setBeneficiaries(list);
  };

  // const handleData = async () => {
  // 	const newData = {
  // 		selectedData: data,
  // 	};
  // 	await setState((prev) => ({ ...prev, data: newData }));
  // };

  const getUserData = useCallback(() => {
    const userId = user.currentEmployee._id;
    EmployeeServ.get({
      _id: userId,
    })
      .then((res) => {
        setUserData(res);
        console.log("USER DATA", res);
        //
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    setTimeout(() => {
      beneList();
      // handleData();
      getUserData();
    }, 2000);
  }, []);

  const ImgStyled = styled("img")(({ theme }) => ({
    width: 300,
    height: 150,
    marginRight: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  const ImgStyledId = styled("img")(({ theme }) => ({
    width: 240,
    height: 120,
    marginLeft: theme.spacing(6.25),
    borderRadius: theme.shape.borderRadius,
  }));

  return (
    <Box sx={{ width: "100%", height: "100%" }} p={4} ref={ref}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
        p={1}
      >
        <Box
          sx={{
            maxWidth: "540px",
            minWidth: "540px",
            minHeight: "240px",
            maxHeight: "240px",
            margin: "1rem",
            borderRadius: "10px",
            // bgcolor: 'info.main',
            border: "2px solid blue",
          }}
          p={2}
        >
          <Grid container spacing={2} sx={{ alignItems: "center" }}>
            <Grid item xs={12} md={12}>
              <Typography sx={{ fontSize: "1rem", color: "#000000" }}>
                NAME: <b>{`${data?.clientName}`}</b>
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: "60px",
                    float: "left",
                    borderRadius: "10px",
                    //   bgcolor: "primary.main",
                    //   border: "2px solid red",
                  }}
                >
                  <ImgStyledId
                    src={data?.qrCodeUrl ? data?.qrCodeUrl : imgSrc}
                    alt="QR Code"
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
});

export const SendViaEmail = ({ closeModal, screenshot, data }) => {
  const emailServer = client.service("email");
  const { user } = useContext(UserContext);
  const { state, showActionLoader, hideActionLoader } =
    useContext(ObjectContext);
  const [emailsModal, setEmailModals] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState("");
  const [destinationEmail, setDestinationEmail] = useState("");
  const [toEmailModal, setToEmailModal] = useState(false);

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    //const deal = state.DealModule.selectedDeal.email;
    reset({
      to: destinationEmail,
      name: user.currentEmployee.facilityDetail.facilityName,
      subject: `${data?.organizationName?.toUpperCase()} BarCode`,
      from: selectedEmail,
    });
  }, [selectedEmail, destinationEmail]);

  const handleSelectEmail = (email) => {
    setSelectedEmail(email);
    setEmailModals(false);
  };

  const handleSelectDestinationEmail = (email) => {
    setDestinationEmail(email);
    setToEmailModal(false);
  };

  const handleSendEmail = async (data) => {
    const facility = user.currentEmployee.facilityDetail;
    showActionLoader();

    const token = localStorage.getItem("feathers-jwt");
    axios
      .post(
        "https://hsbackend.azurewebsites.net/upload",
        { uri: screenshot },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(async (res) => {
        const imageUrl = res.data.url;

        const document = {
          organizationId: facility._id,
          organizationName: facility.facilityName,
          html: `<img src="${imageUrl}" alt="" >`,
          //attachments: attachments,
          text: data.message,
          status: "pending",
          ...data,
        };

        await emailServer
          .create(document)
          .then((res) => {
            hideActionLoader();
            closeModal();
            toast.success(`The Document was sent successfully`);
          })
          .catch((err) => {
            hideActionLoader();
            console.log(err);
            toast.error(`Sorry, Failed to send Document ${err}`);
          });
      })
      .catch((err) => {
        toast.error(`Sorry, failed to send Document ${err}`);
      });

    //return console.log(document);
  };
  useEffect(() => {
    if (data) {
      setDestinationEmail(data?.principal?.email);
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: "60vw",
      }}
    >
      <ModalBox
        open={emailsModal}
        //onClose={() => setEmailModals(false)}
        header="Plese Select Your Email Source"
      >
        <EmailsSourceList selectEmail={handleSelectEmail} />
      </ModalBox>

      <Box
        sx={{ display: "flex", justifyContent: "flex-end" }}
        mb={2}
        mt={-1}
        gap={1.5}
      >
        <GlobalCustomButton
          sx={{ marginTop: "5px" }}
          color="success"
          onClick={() => setEmailModals(true)}
        >
          Change Source Email
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{ marginTop: "5px" }}
          color="secondary"
          onClick={() => setToEmailModal(true)}
        >
          Change Destination Email
        </GlobalCustomButton>
      </Box>

      <Grid container spacing={1} mb={2}>
        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Name"
            register={register("name", { require: "Please enter Name" })}
            errorText={errors?.name?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="Subject"
            register={register("subject", { require: "Please enter Subject" })}
            errorText={errors?.subject?.message}
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6} gap={1}>
          <Input
            important
            label="From"
            register={register("from", { require: "Please Add Source Email" })}
            errorText={errors?.from?.message}
            disabled
          />
        </Grid>

        <Grid item lg={6} md={6} sm={6}>
          <Input
            important
            label="To"
            register={register("to", {
              require: "Please Enter Destination Email",
            })}
            errorText={errors?.to?.message}
          />
        </Grid>
        <Grid item lg={12} md={12} sm={12}>
          <Textarea
            label="Message"
            register={register("message")}
            errorText={errors?.message?.message}
          />
        </Grid>
      </Grid>

      <Box>
        <GlobalCustomButton onClick={handleSubmit(handleSendEmail)}>
          Send Policy Via Email
          <SendIcon fontSize="small" sx={{ marginLeft: "4px" }} />
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};
