// import {useState, useEffect} from "react";
// import ModeEditOutlineOutlined from "@mui/icons-material/ModeEditOutlineOutlined";
// import {Box, Grid} from "@mui/material";
// import {useForm} from "react-hook-form";
// import GlobalCustomButton from "../../../../components/buttons/CustomButton";
// import Input from "../../../../components/inputs/basic/Input";
// import {FormsHeaderText} from "../../../../components/texts";
// import moment from "moment";
// import CustomSelect from "../../../../components/inputs/basic/Select";

// const CustomerDetail = ({editable}) => {
//   const {register, reset, control, handleSubmit} = useForm();
//   const [editCustomer, setEditCustomer] = useState(false);

//   const initFormState = {
//     customer_type: "Individual",
//     customer_name: "Dr. Simpa Dania",
//     customer_number: "08074567832",
//     customer_email: "simpadania@gmail.com",
//     address: "No 15, gateway road, off Awo complex",
//     local_govt: "Bamidele",
//     city: "Ikeja",
//     state: "Ogun",
//     country: "Nigeria",
//   };

//   const updateDetail = data => {
//     toast.success("Customer Detail Updated");
//     setEditCustomer(false);
//   };

//   useEffect(() => {
//     reset(initFormState);
//   }, []);

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItem: "center",
//           justifyContent: "space-between",
//         }}
//         mb={1}
//       >
//         <FormsHeaderText text="Customer Details" />

//         {editable && (
//           <>
//             {editCustomer ? (
//               <GlobalCustomButton
//                 color="success"
//                 onClick={handleSubmit(updateDetail)}
//               >
//                 <UpgradeOutlinedIcon fontSize="small" />
//                 Update
//               </GlobalCustomButton>
//             ) : (
//               <GlobalCustomButton onClick={() => setEditCustomer(true)}>
//                 <ModeEditOutlineOutlined fontSize="small" /> Edit
//               </GlobalCustomButton>
//             )}
//           </>
//         )}
//       </Box>

//       <Grid container spacing={1}>
//         <Grid item lg={8} md={8} sm={8}>
//           <Input
//             register={register("customer_name", {required: true})}
//             label="Customer Name"
//             disabled={!editCustomer}
//           />
//         </Grid>

//         <Grid item lg={4} md={4} sm={4}>
//           <CustomSelect
//             options={["Individual", "Organization"]}
//             label="Customer Type"
//             disabled={!editCustomer}
//             control={control}
//             name="customer_type"
//           />
//         </Grid>

//         <Grid item lg={6} md={6} sm={6}>
//           <Input
//             register={register("customer_number", {required: true})}
//             label="Customer Number"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={6} md={6} sm={6}>
//           <Input
//             register={register("customer_email", {required: true})}
//             label="Customer Email"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={8} md={8} sm={8}>
//           <Input
//             register={register("address", {required: true})}
//             label="Residential Address"
//             disabled={!editCustomer}
//             //placeholder="Enter customer name"
//           />
//         </Grid>

//         <Grid item lg={4} md={4} sm={4}>
//           <Input
//             register={register("local_govt", {required: true})}
//             label="LGA"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={4} md={4} sm={4}>
//           <Input
//             register={register("city", {required: true})}
//             label="City"
//             disabled={!editCustomer}
//             // placeholder="Enter customer name"
//           />
//         </Grid>

//         <Grid item lg={4} md={4} sm={4}>
//           <Input
//             register={register("state", {required: true})}
//             label="State"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={4} md={4} sm={4}>
//           <Input
//             register={register("country", {required: true})}
//             label="Country"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default CustomerDetail;

// export const PageCustomerDetail = ({editable}) => {
//   const {register, reset, control, handleSubmit} = useForm();
//   const [editCustomer, setEditCustomer] = useState(false);

//   const initFormState = {
//     customer_type: "Individual",
//     customer_name: "Dr. Simpa Dania",
//     customer_number: "08074567832",
//     customer_email: "simpadania@gmail.com",
//     address: "No 15, gateway road, off Awo complex",
//     local_govt: "Bamidele",
//     city: "Ikeja",
//     state: "Ogun",
//     country: "Nigeria",
//   };

//   const updateDetail = data => {
//     toast.success("Customer Detail Updated");
//     setEditCustomer(false);
//   };

//   useEffect(() => {
//     reset(initFormState);
//   }, []);

//   return (
//     <Box>
//       <Box
//         sx={{
//           display: "flex",
//           alignItem: "center",
//           justifyContent: "space-between",
//         }}
//         mb={1}
//       >
//         <FormsHeaderText text="Customer Details" />

//         {editable && (
//           <>
//             {editCustomer ? (
//               <GlobalCustomButton
//                 color="success"
//                 onClick={handleSubmit(updateDetail)}
//               >
//                 <UpgradeOutlinedIcon fontSize="small" />
//                 Update
//               </GlobalCustomButton>
//             ) : (
//               <GlobalCustomButton onClick={() => setEditCustomer(true)}>
//                 <ModeEditOutlineOutlined fontSize="small" /> Edit
//               </GlobalCustomButton>
//             )}
//           </>
//         )}
//       </Box>

//       <Grid container spacing={1}>
//         <Grid item lg={4} md={4} sm={6} xs={6}>
//           <Input
//             register={register("customer_name", {required: true})}
//             label="Customer Name"
//             disabled={!editCustomer}
//           />
//         </Grid>

//         <Grid item lg={2} md={2} sm={6} xs={6}>
//           <CustomSelect
//             options={["Individual", "Organization"]}
//             label="Customer Type"
//             disabled={!editCustomer}
//             control={control}
//             name="customer_type"
//           />
//         </Grid>

//         <Grid item lg={3} md={3} sm={6} xs={6}>
//           <Input
//             register={register("customer_number", {required: true})}
//             label="Customer Number"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={3} md={3} sm={6}>
//           <Input
//             register={register("customer_email", {required: true})}
//             label="Customer Email"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={4} md={6} sm={8}>
//           <Input
//             register={register("address", {required: true})}
//             label="Residential Address"
//             disabled={!editCustomer}
//             //placeholder="Enter customer name"
//           />
//         </Grid>

//         <Grid item lg={2} md={3} sm={4}>
//           <Input
//             register={register("local_govt", {required: true})}
//             label="LGA"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={2} md={3} sm={4}>
//           <Input
//             register={register("city", {required: true})}
//             label="City"
//             disabled={!editCustomer}
//             // placeholder="Enter customer name"
//           />
//         </Grid>

//         <Grid item lg={2} md={4} sm={4}>
//           <Input
//             register={register("state", {required: true})}
//             label="State"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>

//         <Grid item lg={2} md={4} sm={4}>
//           <Input
//             register={register("country", {required: true})}
//             label="Country"
//             disabled={!editCustomer}
//             //placeholder="Enter customer number"
//           />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };
