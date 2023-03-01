/* eslint-disable */
import React, { useState, useContext, useEffect } from "react";
import client from "../../feathers";
import { DebounceInput } from "react-debounce-input";
import { useForm } from "react-hook-form";
import { toast } from "bulma-toast";
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from "../../context";
import { FacilitySearch } from "../helpers/FacilitySearch";
import { PageWrapper } from "../app/styles";
import CustomTable from "../../components/customtable";
import { TableMenu } from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";

export function OrgList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const facilityServ = client.service("facility");
  const orgServ = client.service("organizationclient");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedFacility, setSelectedFacility] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const handleCreateNew = async () => {
    const newfacilityModule = {
      selectedFacility: {},
      show: "create",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };
  const handleRow = async (facility) => {
    //console.log("b4",state)

    //console.log("handlerow",facility)

    await setSelectedFacility(facility.organizationDetail);

    const newfacilityModule = {
      selectedFacility: facility.organizationDetail,
      show: "detail",
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };

  const handleSearch = (val) => {
    const field = "facilityName";
    console.log(val);
    if (val.length > 0) {
      orgServ
        .find({
          query: {
            /* [field]: {
                    $regex:val,
                    $options:'i'
                   
                }, */
            $search: val,
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          console.log(res);
          setFacilities(res.data);
          setMessage(" Organization  fetched successfully");
          setSuccess(true);
        })
        .catch((err) => {
          console.log(err);
          setMessage("Error creating facility, probable network issues " + err);
          setError(true);
        });
    } else {
      getFacilities();
    }
  };

  /*  if (val.length>2){
                console.log("in")
               
            }

        }
     */
  const getFacilities = () => {
    orgServ
      .find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 100,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then((res) => {
        console.log(res);
        setFacilities(res.data);
        setMessage(" Organization  fetched successfully");
        setSuccess(true);
      })
      .catch((err) => {
        setMessage("Error creating facility, probable network issues " + err);
        setError(true);
      });
  };

  useEffect(() => {
    getFacilities();

    orgServ.on("created", (obj) => getFacilities());
    orgServ.on("updated", (obj) => getFacilities());
    orgServ.on("patched", (obj) => getFacilities());
    orgServ.on("removed", (obj) => getFacilities());
    return () => {};
  }, []);
  const OrganizationClientSchema = [
    {
      name: "S/N",
      key: "sn",
      description: "SN",
      selector: (row) => row.sn,
      sortable: true,
      inputType: "HIDDEN",
    },
    {
      name: "Organization",
      key: "facilityName",
      description: "Organization",
      selector: (row) => row?.organizationDetail?.facilityName,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
    {
      name: "Band",
      key: "band",
      description: "Band",
      selector: (row) => row.Band,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Address",
      key: "facilityAddress",
      description: "Address",
      selector: (row) => row?.organizationDetail?.facilityAddress,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "City",
      key: "facilityCity",
      description: "City",
      selector: (row) => row?.organizationDetail?.facilityCity,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Phone",
      key: "phone",
      description: "Phone",
      selector: (row) => row?.organizationDetail?.facilityContactPhone,
      sortable: true,
      required: true,
      inputType: "PHONE",
    },

    {
      name: "Email",
      key: "facilityEmail",
      description: "simpa@gmail.com",
      selector: (row) => row?.organizationDetail?.facilityEmail,
      sortable: true,
      required: true,
      inputType: "EMAIL",
    },

    {
      name: "Type",
      key: "facilityType",
      description: "Facility Type",
      selector: (row) => row?.organizationDetail?.facilityType,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },

    {
      name: "Category",
      key: "facilityCategory",
      description: "Category",
      selector: (row) => row?.organizationDetail?.facilityCategory,
      sortable: true,
      required: true,
      inputType: "TEXT",
    },
  ];

  //todo: pagination and vertical scroll bar

  return (
    <>
      {" "}
      {/* <OrganizationCreate /> */}
      <div className="level">
        <PageWrapper
          style={{ flexDirection: "column", padding: "0.6rem,1rem" }}
        >
          <TableMenu>
            <div style={{ display: "flex", alignItems: "center" }}>
              {handleSearch && (
                <div className="inner-table">
                  <FilterMenu onSearch={handleSearch} />
                </div>
              )}
              <h2 style={{ marginLeft: "10px", fontSize: "0.95rem" }}>
                List of Contracted Organization
              </h2>
            </div>
            {handleCreateNew && (
              <Button
                style={{ fontSize: "14px", fontWeight: "600px" }}
                label="Add New"
                onClick={handleCreateNew}
                showicon={true}
              />
            )}
          </TableMenu>

          <div
            style={{
              width: "100%",
              height: "calc(100vh-90px)",
              overflow: "auto",
            }}
          >
            <CustomTable
              title={""}
              columns={OrganizationClientSchema}
              data={facilities}
              pointerOnHover
              highlightOnHover
              striped
              onRowClicked={handleCreateNew}
              progressPending={loading}
            />
          </div>
        </PageWrapper>
      </div>
    </>
  );
}
