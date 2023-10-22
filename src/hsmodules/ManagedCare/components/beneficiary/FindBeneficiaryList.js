/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../../../feathers";
import {formatDistanceToNowStrict} from "date-fns";
import FilterMenu from "../../../../components/utilities/FilterMenu";
import {Avatar, Box, Button} from "@mui/material";
import CustomTable from "../../../../components/customtable";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import {returnAvatarString} from "../../../helpers/returnAvatarString";

const BeneficiariesList = ({showDetail, corporate}) => {
  const policyServer = client.service("policy");
  const ClientServ = client.service("client");
  const [beneficiaries, setBeneficiaries] = useState([]);
  const {state, setState} = useContext(ObjectContext);
  const {user} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState();

  const handleCreateNew = () => {};

  const deepCopy =(obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map(deepCopy);
    }
    const copy = {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepCopy(obj[key]);
        }
    }
    return copy;
}

  const handleRow = async item => {
    console.log("state",item)
     const newI= deepCopy(item)
    if (newI.paymentinfo.length==1){
      console.log("add policy")
      let result=newI.policy
      delete newI.policy
      let clientpolicy= {
        paymentmode:"HMO",
        organizationId:result.organizationId,
        organizationName:result.organizationName,
        principalId:result.policyNo,
        clientId:result.policyNo,
        principalName:`${result.principal.firstname} ${result.principal.lastname}`, //confirm
        plan:result.plan.planName, //confirm
        active:true,
        principal:result.principal._id,
        organizationType: result.organizationType,
        agent:result.agent,
        agentName:result.agentName,
        policy:result
      }
      newI.paymentinfo.push(clientpolicy)
      console.log("updated item", newI)
      await ClientServ.patch(item._id, {paymentinfo:newI.paymentinfo})
      .then((resp)=>{
        console.log("update successful "+ resp)
      })
      .catch((err)=>{
        toast.error("Update not successful "+ err)
      })
    } 
   
    setState(prev => ({
      ...prev,
      PolicyModule: {
        ...prev.PolicyModule,
        selectedPolicy: item.policy,
        preservedPolicy: item.policy,
       
        },
        ClientModule:{
          selectedClient:item
      },
      AppointmentModule: {
        ...prev.AppointmentModule,
        selectedPatient:newI,
      },
    }));

    showDetail(item);
  };

  const handleSearch = val => {
    if (val.length < 3 && val.trim() === "") return;
    policyServer
      .find({
        query: {
         /*  $or: [
            { */
              policyNo: {
                $regex: val,
                $options: "i",
              },
           /*  },
             {
              "principal.lastname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              status: {
                $regex: val,
                $options: "i",
              },
            },

            {
              "principal.firstname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.type": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "principal.type": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.firstname": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "dependantBeneficiaries.lastname": {
                $regex: val,
                $options: "i",
              },
            },

            {
              "sponsor.facilityName": {
                $regex: val,
                $options: "i",
              },
            },
            {
              sponsorshipType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              planType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              "plan.planName": {
                $regex: val,
                $options: "i",
              },
            },
            {
              "providers.facilityName": {
                $regex: val,
                $options: "i",
              },
            },
            {"principal.gender": val},
            {"dependantBeneficiaries.gender": val}, 
          ], */

         // organizationId: user.currentEmployee.facilityDetail._id, // || "",

         /*  $sort: {
            "principal.firstname": 1,
            "dependantBeneficiaries.firstname":1
          }, */
        },
      })
      .then(res => {
        const policies = res.data;
        const data = returnBeneficiaries(policies);
        setBeneficiaries(data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const returnBeneficiaries = policies => {
    const data = policies.map(policy => {
      const dependents = policy.dependantBeneficiaries.map(item => {
        return {
          ...item,
          policyNo: policy.policyNo,          
          sponsor: policy.sponsor,
          plan: policy.plan,
          clientType: "Dependent",
          sponsortype: policy?.sponsorshipType,
          approved: policy?.approved,
          policy: policy,
        };
      });
      return [
        {
          ...policy.principal,
          policyNo: policy.policyNo,
          sponsor: policy.sponsor,
          plan: policy.plan,
          clientType: "Principal",
          sponsortype: policy?.sponsorshipType,
          approved: policy?.approved,
          policy: policy,
        },
        ...dependents,
      ];
    });

    const beneficiariesData = [].concat.apply([], data);

    return beneficiariesData;
  };

  const getFacilities = async () => {
   /*  setLoading(true);
   
   let   query = {
     
         
          "providers._id":user.currentEmployee.facilityDetail._id,
    
        $sort: {
          createdAt: -1,
        },
      };
    
    policyServer
      .find({
        query: query,
      })
      .then(res => {
        const policies = res.data;
        const data = returnBeneficiaries(policies);
        setBeneficiaries(data);
       setTotal(data.length)
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err); //"Something went wrong!"
        console.log(err);
      }); */
  };

  useEffect(() => {
    getFacilities();
    policyServer.on("created", obj => getFacilities());
    policyServer.on("updated", obj => getFacilities());
    policyServer.on("patched", obj => getFacilities());
    policyServer.on("removed", obj => getFacilities());
    return () => {};
    // eslint-disable-next-line
  }, []);

  const BeneficiarySchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: row => row.sn,
      sortable: true,
      inputType: "HIDDEN",
      width: "50px",
    },
    {
      name: "Image",
      key: "sn",
      description: "Enter name of employee",
      selector: row => (
        <Avatar
          src={row.imageurl}
          {...returnAvatarString(
            `${row.firstname.replace(/\s/g, "")} ${row.lastname.replace(
              /\s/g,
              ""
            )}`
          )}
        />
      ),
      sortable: true,
      inputType: "HIDDEN",
      width: "80px",
    },
    {
      name: "First Name",
      key: "firstname",
      description: "First Name",
      selector: row => row.firstname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Last Name",
      key: "lastname",
      description: "Last Name",
      selector: row => row.lastname,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Age",
      key: "dob",
      description: "Age",
      selector: row =>
        row.dob ? formatDistanceToNowStrict(new Date(row?.dob)) : "",
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Gender",
      key: "gender",
      description: "Male",
      selector: row => row.gender,
      sortable: true,
      required: true,
      inputType: "SELECT_LIST",
      options: ["Male", "Female"],
    },

    {
      name: "Email",
      key: "email",
      description: "johndoe@mail.com",
      selector: row => row.email,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },
    {
      name: "Policy No",
      key: "policyNo",
      description: "Policy No",
      selector: row => row?.policyNo,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Client Type",
      key: "clientType",
      description: "Client Type",
      selector: row => row?.clientType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Sponsor Type",
      key: "sponsorType",
      description: "Sponsor Type",
      selector: row => row?.sponsortype,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Policy Status",
      key: "policyStatus",
      description: "Policy Status",
      selector: row => (row?.approved ? "Approved" : "Pending"),
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
      }}
      p={2}
    >
      <div style={{display: "flex", alignItems: "center"}}>
        <div className="inner-table">
          <FilterMenu onSearch={handleSearch} />
        </div>

        <h2 style={{marginLeft: "10px", fontSize: "0.95rem"}}>
          List of Beneficiaries ({total})
        </h2>
      </div>
      {handleCreateNew && (
        <Button
          style={{fontSize: "14px", fontWeight: "600px"}}
          label="Add New"
          onClick={handleCreateNew}
          showicon={true}
        />
      )}
      <Box
        className="level"
        style={{
          height: corporate ? "calc(100vh - 240px)" : "calc(100vh - 140px)",
          overflow: "scroll",
        }}
      >
        <CustomTable
          title={""}
          columns={BeneficiarySchema}
          data={beneficiaries}
          pointerOnHover
          highlightOnHover
          striped
          onRowClicked={handleRow}
          progressPending={loading}
        />
      </Box>
    </Box>
  );
};

export default BeneficiariesList;
