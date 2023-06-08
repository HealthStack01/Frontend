import {useState, useEffect, useCallback, useContext} from "react";
import {Box} from "@mui/system";
import {IconButton, Typography} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import ExpandableSearchInput from "../../../../../components/inputs/Search/ExpandableSearch";
import client from "../../../../../feathers";
import {UserContext} from "../../../../../context";
import ChatEachStaff from "./each-staff";
import {useForm} from "react-hook-form";
import ReactCustomSelectComponent from "../../../../../components/react-custom-select";
import ReactCustomSearchSelectComponent from "../../../../../components/react-custom-select/ReactSearchSelect";
import {toast} from "react-toastify";

const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <img
      src="/loading.gif"
      style={{width: "200px", height: "auto", display: "block"}}
    />
    <Typography sx={{marginTop: "-2rem", fontSize: "0.85rem"}}>
      Hold on, whilst we fetch your data...
    </Typography>
  </div>
);

const CommunicationChatStaffsList = ({closeStaffsList}) => {
  const EmployeeServ = client.service("employee");
  const facilityServ = client.service("facility");
  const {user} = useContext(UserContext);
  const [staffs, setStaffs] = useState([]);
  const [filteredStaffs, setFilteredStaffs] = useState([]);
  const [fetchingStaffs, setFetchingStaffs] = useState(false);
  const [fetchingFacilities, setFetchingFacilities] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [orgSearchVal, setOrgSearchVal] = useState("");
  const {control, watch} = useForm();

  const handleSearchChange = e => {
    const inputValue = e.target.value;
    setSearchValue(inputValue);

    const filterdStaffs = staffs.filter(staff => {
      const value = inputValue.toLowerCase();
      if (
        staff.firstname.toLowerCase().includes(value) ||
        staff.lastname.toLowerCase().includes(value) ||
        staff.profession.toLowerCase().includes(value) ||
        staff.department.toLowerCase().includes(value)
      ) {
        return staff;
      }
    });

    setFilteredStaffs(filterdStaffs);
  };

  const selectedOrg = watch("organization");

  const getFacilities = () => {
    setFetchingFacilities(true);
    facilityServ
      .find({
        query: {
          //$limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        //console.log(res.data[0]);
        setFacilities(res.data);
        setFetchingFacilities(false);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
      });
  };

  const handleGetStaffs = useCallback(async () => {
    //console.log(selectedOrg);
    setFetchingStaffs(true);
    if (user.currentEmployee) {
      const findEmployee = await EmployeeServ.find({
        query: {
          facility: !selectedOrg
            ? user.currentEmployee.facilityDetail._id
            : selectedOrg.value,
          _id: {$ne: user.currentEmployee._id},
          $limit: 200,
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setStaffs(findEmployee.data);
      setFetchingStaffs(false);
    } else {
      if (user.stacker) {
        const findEmployee = await EmployeeServ.find({
          query: {
            $limit: 200,
            $sort: {
              facility: -1,
            },
          },
        });

        await setStaffs(findEmployee.data);
        setFetchingStaffs(false);
      }
    }
  }, [selectedOrg]);

  // useEffect(() => {
  //   getFacilities();
  // }, []);

  useEffect(() => {
    if (user) {
      handleGetStaffs();
    } else {
      return;
    }
    EmployeeServ.on("created", obj => handleGetStaffs());
    EmployeeServ.on("updated", obj => handleGetStaffs());
    EmployeeServ.on("patched", obj => {
      handleGetStaffs();
    });
    EmployeeServ.on("removed", obj => handleGetStaffs());
    return () => {};
  }, [handleGetStaffs]);

  const handleSelectInputChange = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);
    facilityServ
      .find({
        query: {
          $or: [
            {
              facilityName: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityOwner: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityType: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityCategory: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityContactPhone: {
                $regex: val,
                $options: "i",
              },
            },
            {
              facilityEmail: {
                $regex: val,
                $options: "i",
              },
            },
          ],

          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        //console.log(res);
        setFacilities(res.data);
        setFetchingFacilities(false);
      })
      .catch(err => {
        console.log(err);
        setFetchingFacilities(false);
        toast.error("An error occured, check your network");
      });
  };

  const finalStaffs = searchValue !== "" ? filteredStaffs : staffs;

  return (
    <Box sx={{width: "100%", height: "100%"}}>
      <Box
        sx={{
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          padding: "0 15px",
        }}
      >
        <Box sx={{width: "calc(100% - 50px)"}}>
          <ExpandableSearchInput
            onChange={handleSearchChange}
            value={searchValue}
          />
        </Box>

        <IconButton onClick={closeStaffsList}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          height: "54px",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f0f0f0",
          padding: "0 15px",
        }}
      >
        <ReactCustomSearchSelectComponent
          control={control}
          onInputChange={handleSelectInputChange}
          isLoading={fetchingFacilities}
          name="organization"
          placeholder="Select organization"
          options={facilities.map(item => {
            return {
              label: item.facilityName,
              value: item._id,
            };
          })}
        />
      </Box>

      {fetchingStaffs ? (
        <Box
          sx={{
            width: "100%",
            height: "calc(100% - 104px)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CustomLoader />
        </Box>
      ) : staffs.length > 0 ? (
        <Box
          sx={{width: "100%", height: "calc(100% - 110px)", overflowY: "auto"}}
        >
          {finalStaffs.map(staff => {
            return <ChatEachStaff key={staff._id} staff={staff} />;
          })}
        </Box>
      ) : (
        <Box
          sx={{
            width: "100%",
            minHeight: "calc(100vh - 110px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
          gap={2}
        >
          <img
            src="https://cdn.dribbble.com/users/37530/screenshots/2937858/drib_blink_bot.gif"
            alt=""
            style={{height: "150px", width: "auto", display: "block"}}
          />
          <Typography sx={{fontSize: "0.8rem"}}>
            Selected Oraganization has no staff(s) yet
          </Typography>
          {/* <GlobalCustomButton onClick={() => showStaffsList()}>
            <ChatIcon fontSize="small" sx={{marginRight: "5px"}} />
            Start New Chat
          </GlobalCustomButton> */}
        </Box>
      )}
    </Box>
  );
};

export default CommunicationChatStaffsList;
