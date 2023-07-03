import {Box} from "@mui/material";
import GlobalCustomButton from "../../../../components/buttons/CustomButton";
import {useCallback, useContext, useEffect, useState} from "react";
import client from "../../../../feathers";
import {useForm} from "react-hook-form";
import ReactCustomSearchSelectComponent from "../../../../components/react-custom-select/ReactSearchSelect";
import {ObjectContext, UserContext} from "../../../../context";
import {toast} from "react-toastify";
import ReactCustomSelectComponent from "../../../../components/react-custom-select";

const CreateCorporateComponent = ({closeModal}) => {
  const {control, handleSubmit} = useForm();
  const facilityServ = client.service("facility");
  const orgClientServer = client.service("organizationclient");
  const bandsServer = client.service("bands");
  const [fetchingFacilities, setFetchingFacilities] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const [organizationClients, setOrganizationClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bands, setBands] = useState([]);
  const [fetchingBands, setFetchingBands] = useState(false);
  const {user} = useContext(UserContext);
  const {showActionLoader, hideActionLoader} = useContext(ObjectContext);

  const getOrganizationClients = useCallback(() => {
    setLoading(true);
    orgClientServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          relationshiptype: "sponsor",
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setOrganizationClients(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        toast.error(`Something went wrong! ${err}`);
      });
  }, [user]);

  const getFacilityBands = useCallback(() => {
    setFetchingBands(true);
    bandsServer
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          bandType: "Corporate Sponsor",
          $sort: {
            category: 1,
          },
        },
      })
      .then(res => {
        setFetchingBands(false);
        setBands(res.data);
        // console.log(res.data);
      })
      .catch(err => {
        setFetchingBands(false);
        toast.error(`Something went wrong! ${err}`);
      });
  }, [user]);

  useEffect(() => {
    getFacilityBands();
    getOrganizationClients();
  }, []);

  const handleFacilitySearch = val => {
    if (val.length <= 3 && val.trim() === "") return;
    setFetchingFacilities(true);

    facilityServ
      .find({
        _id: {$ne: user.currentEmployee.facilityDetail._id},
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

  const handleAddCorporate = data => {
    const {facility, band} = data;
    if (!facility || !band)
      return toast.error("Please complete all form fields");

    const isPresent = organizationClients.find(
      item => item?.organizationDetail?._id === facility._id
    );

    if (isPresent)
      return toast.warning("Facility Already a Corporate Organization");

    showActionLoader();

    const corporateData = {
      facility: user.currentEmployee.facilityDetail._id,
      organization: facility._id,
      relationshiptype: "sponsor",
      band: band.name,
    };

    orgClientServer
      .create(corporateData)
      .then(res => {
        hideActionLoader();
        closeModal();
        toast.success("Organization added succesfully");
      })
      .catch(err => {
        hideActionLoader();
        toast.error("Error adding organization " + err);
      });
  };

  return (
    <Box
      sx={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <Box>
        <ReactCustomSearchSelectComponent
          control={control}
          label="Select Organization"
          onInputChange={handleFacilitySearch}
          isLoading={fetchingFacilities}
          name="facility"
          placeholder="Searh here..."
          options={facilities.map(item => {
            return {
              label: item.facilityName,
              value: item._id,
              ...item,
            };
          })}
        />
      </Box>

      <Box>
        <ReactCustomSelectComponent
          label="Select Band"
          isLoading={fetchingBands}
          control={control}
          name="band"
          placeholder="Search here..."
          options={bands.map(item => {
            return {
              label: item.name,
              value: item.name,
              ...item,
            };
          })}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: "20px",
        }}
      >
        <GlobalCustomButton
          onClick={closeModal}
          sx={{
            width: "50%",
          }}
          color="warning"
        >
          Cancel
        </GlobalCustomButton>

        <GlobalCustomButton
          sx={{
            width: "50%",
          }}
          onClick={handleSubmit(handleAddCorporate)}
        >
          Add Organization
        </GlobalCustomButton>
      </Box>
    </Box>
  );
};

export default CreateCorporateComponent;
