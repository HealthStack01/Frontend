/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import client from '../../feathers';
import { DebounceInput } from 'react-debounce-input';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'

import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import {ProductCreate} from "./Products";
import {formatDistanceToNowStrict, format, subDays, addDays} from "date-fns";
import DatePicker from "react-datepicker";
import InfiniteScroll from "react-infinite-scroll-component";
import Input from "../../components/inputs/basic/Input";
import {PageWrapper} from "../../ui/styled/styles";
import {TableMenu} from "../../ui/styled/global";
import FilterMenu from "../../components/utilities/FilterMenu";
import Button from "../../components/buttons/Button";
import CustomTable from "./ui-components/customtable";
import CustomSelect from "../../components/inputs/basic/Select";
import "react-datepicker/dist/react-datepicker.css";
import ModalBox from "../../components/modal";
import {
  Box,
  Grid,
  Button as MuiButton,
  Divider,
  Typography,
} from "@mui/material";
import {maxHeight} from "@mui/system";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ProductSearchHelper from "../helpers/ProductSearch";
import moment from "moment";
//import MuiButton from "@mui/material/Button";

// eslint-disable-next-line
const searchfacility = {};

export default function ProductEntry() {
  const { state } = useContext(ObjectContext); //,setState
  // eslint-disable-next-line

  const [selectedProductEntry, setSelectedProductEntry] = useState();
  const [createModal, setCreateModal] = useState(false);
  const [detailModal, setDetailModal] = useState(false);
  const [modifyModal, setModifyModal] = useState(false);
  //const [showState,setShowState]=useState() //create|modify|detail

  const handleOpenCreateModal = () => {
    setCreateModal(true);
  };
  const handleCloseCreateModal = () => {
    setCreateModal(false);
  };

  const handleOpenDetailModal = () => {
    setDetailModal(true);
  };
  const handleCloseDetailModal = () => {
    setDetailModal(false);
  };

  const handleOpenModifyModal = () => {
    setModifyModal(true);
  };
  const handleCloseModifyModal = () => {
    setModifyModal(false);
  };

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">ProductEntry  Module</span></div>
            </div> */}

      <ProductEntryList
        openCreateModal={handleOpenCreateModal}
        openDetailModal={handleOpenDetailModal}
      />

      <ModalBox
        open={createModal}
        onClose={handleCloseCreateModal}
        header="Create ProductEntry: Initialization, Purchase Invoice, Audit"
      >
        <ProductEntryCreate closeModal={handleCloseCreateModal} />
      </ModalBox>

      <ModalBox
        open={detailModal}
        onClose={handleCloseDetailModal}
        header="Product Entry Detail"
      >
        <ProductEntryDetail openModifyModal={handleOpenModifyModal} />
      </ModalBox>

      <ModalBox open={modifyModal} onClose={handleCloseModifyModal}>
        <ProductEntryModify />
      </ModalBox>
    </section>
  );
}


export function ProductEntryCreate({closeModal}) {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductEntryServ = client.service('productentry');
  //const navigate=useNavigate()
  const { user } = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();
  const [type, setType] = useState("Purchase Invoice");
  const [documentNo, setDocumentNo] = useState("");
  const [totalamount, setTotalamount] = useState("");
  const [productId, setProductId] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [baseunit, setBaseunit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [costprice, setCostprice] = useState("");
  const [storeId, setStoreId] = useState("");
  const [productItem, setProductItem] = useState([]);
  const { state } = useContext(ObjectContext);

  /*  const [productEntry,setProductEntry]=useState({
        productitems:[],
        date,
        documentNo,
        type,
        totalamount,
        source,

    })
  */
  const productItemI = {
    type,
    productId,
    name,
    quantity,
    costprice,
    source,
    totalamount: quantity * costprice,
    baseunit,
    date,
    documentNo,
    storeId,
  };
  // consider batchformat{batchno,expirydate,qtty,baseunit}
  //consider baseunoit conversions
  const getSearchfacility = obj => {
    setProductId(obj?._id);
    setName(obj?.name);
    setBaseunit(obj?.baseunit);

    /*  setValue("facility", obj._id,  {
            shouldValidate: true,
            shouldDirty: true
        }) */
  };

  useEffect(() => {
    setCurrentUser(user);
    //console.log(currentUser)
    return () => {};
  }, [user]);

  const handleChangeType = async (e) => {
    await setType(e.target.value);
  };
  const handleClickProd = async () => {
    if (!productId || !quantity || !costprice) {
      toast.error("Kindly choose Product,price and quantity");
      return;
    }
    await setSuccess(false);
    setProductItem(prevProd => prevProd.concat(productItemI));
    setType("");
    setProductId("");
    setName("");
    setQuantity("");
    setBaseunit("");
    setCostprice("");
    setSource("");
    setTotalamount("");
    setDate("");
    setDocumentNo("");
    setStoreId("");

    await setSuccess(true);
    // console.log(success)
    //  console.log(productItem)
  };
  const handleDate = async (date) => {
    setDate(date);
  };

  const resetform = () => {
    setType("");
    setProductId("");
    setName("");
    setQuantity("");
    setBaseunit("");
    setCostprice("");
    setSource("");
    setTotalamount("");
    setDate("");
    setDocumentNo("");
    setStoreId("");
    setProductItem([]);
  };

  const onSubmit = async (e) => {
    let confirm = window.confirm(`Are you sure you want to save this entry ?`);
    if (confirm) {
      e.preventDefault();
      setMessage('');
      setError(false);
      setSuccess(false);
      if (!date) {
        toast.error("Kindly choose date");
        return;
      }

      let productEntry = {
        date,
        documentNo,
        type,
        totalamount,
        source,
      };
      productItemI.productitems = productItem;
      productItemI.createdby = user._id;
      productItemI.transactioncategory = 'credit';

      //console.log("b4 facility",productEntry);
      if (user.currentEmployee) {
        productItemI.facility = user.currentEmployee.facilityDetail._id; // or from facility dropdown
      } else {
        toast.error("You can not add inventory to any organization");
        return;
      }
      if (state.StoreModule.selectedStore._id) {
        productItemI.storeId = state.StoreModule.selectedStore._id;
      } else {
        toast.error("You need to select a store before adding inventory");
        return;
      }
      //console.log("b4 create",productEntry);
      ProductEntryServ.create(productItemI)
        .then((res) => {
          //console.log(JSON.stringify(res))
          resetform();
          /*  setMessage("Created ProductEntry successfully") */
          setSuccess(true);
          toast.success("ProductEntry created succesfully");
          setSuccess(false);
          setProductItem([]);
          closeModal && closeModal();
        })
        .catch(err => {
          toast.error(`Error creating ProductEntry ${err}`);
        });
    }
  };
  const removeEntity = (entity, i) => {
    //console.log(entity)
    setProductItem((prev) => prev.filter((obj, index) => index !== i));
  };

  const productCreateSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'SN',
      selector: (row) => row.sn,
      sortable: true,
      inputType: 'HIDDEN',
    },
    {
      name: "Name",
      key: "type",
      description: "Enter Name",
      selector: row => row.type,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: "Quantity",
      key: "quanity",
      description: "Enter quantity",
      selector: row => row.quantity,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: "Unit",
      key: "baseunit",
      description: "Base Unit",
      selector: row => row.baseunit,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: "Cost Price",
      key: "costprice",
      description: "Enter cost price",
      selector: row => row.costprice,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: "Amount",
      key: "amount",
      description: "Enter amount",
      selector: row => row.amount,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },

    {
      name: "Actions",
      key: "costprice",
      description: "costprice",
      selector: (row, i) => (
        <p
          style={{color: "red", fontSize: "0.75rem"}}
          onClick={() => removeEntity(row, i)}
        >
          Remove
        </p>
      ),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  const DatePickerCustomInput = React.forwardRef(({value, onClick}, ref) => (
    <div
      onClick={onClick}
      ref={ref}
      style={{
        width: "100%",
        height: "48px",
        border: "1.5px solid #BBBBBB",
        borderRadius: "4px",
        display: "flex",
        alignItems: "center",
        margin: "0.75rem 0",
        fontSize: "0.85rem",
        padding: "0 15px",
        color: "#000000",
        backgroundColor: "#fff",
      }}
    >
      {value === "" ? "Pick Date" : value}
    </div>
  ));

  return (
    <Box
      sx={{
        width: "780px",
        maxHeight: "600px",
        overflowY: "auto",
      }}
    >
      <Box container>
        <Box>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Input
                /* ref={register({ required: true })} */
                value={source}
                name="supplier"
                type="text"
                onChange={e => setSource(e.target.value)}
                label="Supplier"
              />
            </Grid>
            <Grid item xs={4} sx={{margin: "0.75rem 0"}}>
              <CustomSelect
                defaultValue={type}
                name="type"
                options={["Purchase Invoice", "Initialization", "Audit"]}
                onChange={handleChangeType}
              />
            </Grid>
          </Grid>
        </Box>

        <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DatePicker
                selected={date}
                onChange={date => handleDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Pick Date"
                customInput={<DatePickerCustomInput />}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name="documentNo"
                value={documentNo}
                type="text"
                onChange={e => setDocumentNo(e.target.value)}
                label="Invoice Number"
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                value={totalamount}
                name="totalamount"
                type="text"
                onChange={async e => await setTotalamount(e.target.value)}
                label="Total Amount"
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{margin: "20px 0"}} />
        <Box
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={1}
        >
          <Box item>
            <Typography>Add Product Items</Typography>
          </Box>

          <Box item>
            <MuiButton
              variant="outlined"
              sx={{width: "100px", textTransform: "capitalize"}}
              onClick={handleClickProd}
            >
              <AddCircleOutline sx={{marginRight: "5px"}} fontSize="small" />
              Add
            </MuiButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <ProductSearchHelper
              getSearchfacility={getSearchfacility}
              clear={success}
            />
            <input
              className="input is-small"
              /* ref={register ({ required: true }) }  */ /* add array no */
              value={productId}
              name="productId"
              type="text"
              onChange={e => setProductId(e.target.value)}
              placeholder="Product Id"
              style={{display: "none"}}
            />
          </Grid>

          <Grid item xs={2}>
            <Input
              /* ref={register({ required: true })} */
              name="quantity"
              value={quantity}
              type="text"
              onChange={e => setQuantity(e.target.value)}
              label="Quantity"
            />
          </Grid>

          <Grid item xs={3}>
            <Input
              /* ref={register({ required: true })} */
              name="costprice"
              value={costprice}
              type="text"
              onChange={e => setCostprice(e.target.value)}
              label="Cost Price"
            />
          </Grid>
        </Grid>
      </Box>

      {productItem.length > 0 && (
        <Box sx={{height: "200px", widht: "300%"}}>
          <CustomTable
            title={""}
            columns={productCreateSchema}
            data={productItem}
            pointerOnHover
            highlightOnHover
            striped
          />
        </Box>
      )}

      <Box
        container
        sx={{
          width: "100%",
          display: "flex",
        }}
        mt={2}
      >
        <MuiButton
          variant="contained"
          disabled={!productItem.length > 0}
          onClick={onSubmit}
          sx={{
            width: "150px",
            height: "40px",
            textTransform: "capitalize",
            marginRight: "15px",
          }}
        >
          Add Product(s)
        </MuiButton>
        <MuiButton
          variant="outlined"
          color="error"
          sx={{width: "150px", height: "40px", textTransform: "capitalize"}}
          onClick={closeModal}
        >
          Cancel
        </MuiButton>
      </Box>
    </Box>
  );
}

export function ProductEntryList({ openCreateModal, openDetailModal }) {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  const ProductEntryServ = client.service('productentry');
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line
  const [selectedProductEntry, setSelectedProductEntry] = useState(); //
  // eslint-disable-next-line
  const { state, setState } = useContext(ObjectContext);
  // eslint-disable-next-line
  const { user, setUser } = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20); //LIMITATIONS FOR THE NUMBER OF FACILITIES FOR SERVER TO RETURN PER PAGE
  const [total, setTotal] = useState(0); //TOTAL NUMBER OF FACILITIES AVAILABLE IN THE SERVER
  const [restful, setRestful] = useState(true);
  const [next, setNext] = useState(false);

  const handleCreateNew = async () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openCreateModal();
  };
  const handleRow = async (ProductEntry) => {
    //console.log("b4",state)

    //console.log("handlerow",ProductEntry)

    await setSelectedProductEntry(ProductEntry);

    const newProductEntryModule = {
      selectedProductEntry: ProductEntry,
      show: 'detail',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openDetailModal();
  };

  const handleSearch = async (val) => {
    const field = 'source';
    //console.log(val)
    ProductEntryServ.find({
      query: {
        $or: [
          {
            source: {
              $regex: val,
              $options: 'i',
            },
          },
          {
            type: {
              $regex: val,
              $options: 'i',
            },
          },
        ],

        storeId: state.StoreModule.selectedStore._id,
        facility: user.currentEmployee.facilityDetail._id || '',
        $limit: 100,
        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((res) => {
        //console.log(res)
        setFacilities(res.data);
        setTotal(res.total);
        setMessage(' ProductEntry  fetched successfully');
        setSuccess(true);
      })
      .catch((err) => {
        //  console.log(err)
        setMessage(
          'Error fetching ProductEntry, probable network issues ' + err
        );
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      const findProductEntry = await ProductEntryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: limit,
          $skip: page * limit,
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      });

      await setTotal(findProductEntry.total);
      await setFacilities((prevstate) =>
        prevstate.concat(findProductEntry.data)
      );
      if (findProductEntry.total > findProductEntry.skip) {
        setNext(true);

        setPage((page) => page + 1);
      } else {
        setNext(false);
      }
    } else {
      if (user.stacker) {
        const findProductEntry = await ProductEntryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProductEntry.data);
      }
    }
  };

  const getNewFacilities = async () => {
    if (user.currentEmployee) {
      const findProductEntry = await ProductEntryServ.find({
        query: {
          facility: user.currentEmployee.facilityDetail._id,
          storeId: state.StoreModule.selectedStore._id,
          $limit: limit,
          //$skip:page * limit,
          /*  $limit:20, */
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then((resp) => {
          setTotal(resp.total);
          setFacilities(resp.data);
          if (resp.total > resp.data.length) {
            setNext(true);

            setPage((page) => page + 1);
          } else {
            setNext(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (user.stacker) {
        const findProductEntry = await ProductEntryServ.find({
          query: {
            $limit: 20,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProductEntry.data);
      }
    }
  };

  const getUpdatedFacilities = async () => {
    const findProductEntry = await ProductEntryServ.find({
      query: {
        facility: user.currentEmployee.facilityDetail._id,
        storeId: state.employeeLocation.locationId,
        $limit: limit,

        $sort: {
          createdAt: -1,
        },
      },
    })
      .then((resp) => {
        setTotal(resp.total);
        updatelist(resp.data);
        //setFacilities(resp.data)
        if (resp.total > resp.data.length) {
          setNext(true);
          setPage((page) => page + 1);
        } else {
          setNext(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!state.StoreModule.selectedStore) {
      toast({
        message: 'kindly select a store',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
      });
      return;
      //  getFacilities()
    }
    ProductEntryServ.on('created', (obj) => getUpdatedFacilities());
    ProductEntryServ.on('updated', (obj) => getUpdatedFacilities());
    ProductEntryServ.on('patched', (obj) => getUpdatedFacilities());
    ProductEntryServ.on('removed', (obj) => getUpdatedFacilities());
    return () => {};
  }, []);

  const updatelist = async (data) => {
    await setFacilities(data);
  };
  const updates = () => {
    // setFacilities([])
    rest1();
  };

  useEffect(() => {
    rest1();
    return () => {};
  }, [state.StoreModule.selectedStore._id]);
  //todo: pagination and vertical scroll bar

  const rest1 = async () => {
    setPage(0);
    setTotal(0);
    getNewFacilities();
  };
  const handleDelete = async (obj) => {
    let confirm = window.confirm(
      `Are you sure you want to delete this entry with Document No: ${obj.documentNo} ?`
    );
    if (confirm) {
      await ProductEntryServ.remove(obj._id)
        .then((resp) => {
          toast({
            message: 'Sucessfuly deleted ProductEntry ',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
        })
        .catch((err) => {
          toast({
            message: 'Error deleting ProductEntry ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const productEntrySchema = [
    {
      name: 'S/NO',
      key: 'sn',
      description: 'Enter name of Disease',
      selector: (row) => row.sn,
      sortable: true,
      required: true,
      inputType: 'HIDDEN',
    },
    {
      name: 'Date',
      key: 'createdAt',
      description: 'Enter Created date',
      selector: (row) => row.createdAt,
      sortable: true,
      required: true,
      inputType: 'DATE',
    },
    {
      name: 'Type',
      key: 'type',
      description: 'Enter Type',
      selector: (row) => row.type,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Source',
      key: 'source',
      description: 'Enter Source',
      selector: (row) => row.source,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Document No',
      key: 'documentNo',
      description: 'Enter Document Number',
      selector: (row) => row.documentNo,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Total Amount',
      key: 'totalamount',
      description: 'Enter Total Amount',
      selector: (row) => row.totalamount,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: 'Actions',
      key: 'action',
      description: 'Enter Action',
      selector: (row) => (
        <Button
          className="button is-info is-small"
          sx={{
            background: 'none',
            color: 'red',
            fontSize: '0.75rem',
            borderRadius: '2px',
            padding: '0.27rem 1rem',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={() => {
            handleDelete(row);
          }}
        >
          Delete
        </Button>
      ),
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
  ];

  return (
    <>
      {state.StoreModule.selectedStore ? (
        <>
          <PageWrapper
            style={{ flexDirection: 'column', padding: '0.6rem 1rem' }}
          >
            <TableMenu>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                {handleSearch && (
                  <div className="inner-table">
                    <FilterMenu onSearch={handleSearch} />
                  </div>
                )}
                <h2 style={{ marginLeft: '10px', fontSize: '0.95rem' }}>
                  Notifications
                </h2>
              </div>

              {handleCreateNew && (
                <Button
                  sx={{ fontSize: '14px', fontWeight: '600' }}
                  label="Add new "
                  onClick={openCreateModal}
                />
              )}
            </TableMenu>

            <Box
              sx={{
                width: '100%',
                height: 'calc(100vh - 100px)',
                overflowY: 'auto',
              }}
            >
              <CustomTable
                title={''}
                columns={productEntrySchema}
                data={facilities}
                pointerOnHover
                highlightOnHover
                striped
                onRowClicked={handleRow}
                progressPending={loading}
              />
            </Box>
          </PageWrapper>
        </>
      ) : (
        <div>loading... </div>
      )}
    </>
  );
}

export function ProductEntryDetail({ openModifyModal }) {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const ProductEntryServ=client.service('/ProductEntry')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const { state, setState } = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  const handleEdit = async () => {
    const newProductEntryModule = {
      selectedProductEntry: ProductEntry,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
    openModifyModal();
  };

  const ProductDetailSchema = [
    {
      name: 'S/N',
      key: 'sn',
      description: 'Serial Number',
      sortable: true,
      selector: (row) => row.sn,
      inputType: 'HIDDEN',
    },
    {
      name: 'Name',
      key: 'name',
      description: 'Enter Name',
      selector: (ProductEntry) => ProductEntry.name,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Quantity',
      key: 'quantity',
      description: 'Enter quantity',
      selector: (ProductEntry) => ProductEntry.quantity,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
      options: ['Front Desk', 'Clinic', 'Store', 'Laboratory', 'Finance'],
    },
    {
      name: 'Unit',
      key: 'baseunit',
      description: 'Enter unit',
      selector: (ProductEntry) => ProductEntry.baseunit,
      sortable: true,
      required: true,
      inputType: 'TEXT',
    },
    {
      name: 'Cost Price',
      key: 'costprice',
      description: 'Enter cost price',
      selector: (ProductEntry) => ProductEntry.costprice,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
    {
      name: "Amount",
      key: "amount",
      description: "Enter amount",
      selector: ProductEntry => ProductEntry.amount,
      sortable: true,
      required: true,
      inputType: 'NUMBER',
    },
  ];
  const handleRow = () => {};

  console.log(ProductEntry.date);

  return (
    <>
      <Box
        container
        sx={{
          width: "750px",
          maxHeight: "500px",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Input value={ProductEntry.source} label="Supplier" disabled />
          </Grid>

          <Grid item xs={4}>
            <Input value={ProductEntry.type} label="Type" disabled />
          </Grid>
        </Grid>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={4}>
            <Input
              value={
                ProductEntry.date
                  ? moment(ProductEntry.date).format("YYYY-MM-DD HH:mm:ss")
                  : "-----"
              }
              label="Date"
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              value={ProductEntry.documentNo}
              label="Invoice Number"
              disabled
            />
          </Grid>

          <Grid item xs={4}>
            <Input
              value={ProductEntry.totalamount}
              label="Total Amount"
              disabled
            />
          </Grid>
        </Grid>

        <Box sx={{width: "100%", height: "200px", overflowY: "auto"}}>
          <CustomTable
            title={""}
            columns={ProductDetailSchema}
            data={ProductEntry.productitems}
            pointerOnHover
            highlightOnHover
            striped
            onRowClicked={handleRow}
            // progressPending={loading}
          />
        </Box>
      </Box>
    </>
  );
}

export function ProductEntryModify() {
  const { register, handleSubmit, setValue, reset, errors } = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState('');
  // eslint-disable-next-line
  const ProductEntryServ = client.service('productentry');
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const { user } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const ProductEntry = state.ProductEntryModule.selectedProductEntry;

  useEffect(() => {
    setValue('name', ProductEntry.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue('ProductEntryType', ProductEntry.ProductEntryType, {
      shouldValidate: true,
      shouldDirty: true,
    });

    return () => {};
  });

  const handleCancel = async () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newProductEntryModule = {
      selectedProductEntry: {},
      show: 'create',
    };
    setState((prevstate) => ({
      ...prevstate,
      ProductEntryModule: newProductEntryModule,
    }));
  };
  const handleDelete = async () => {
    let conf = window.confirm('Are you sure you want to delete this data?');

    const dleteId = ProductEntry._id;
    if (conf) {
      ProductEntryServ.remove(dleteId)
        .then((res) => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted ProductEntry successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: 'ProductEntry deleted succesfully',
            type: 'is-success',
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch((err) => {
          // setMessage("Error deleting ProductEntry, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              'Error deleting ProductEntry, probable network issues or ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    data.facility = ProductEntry.facility;
    //console.log(data);

    ProductEntryServ.patch(ProductEntry._id, data)
      .then((res) => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated ProductEntry successfully")
        toast({
          message: 'ProductEntry updated succesfully',
          type: 'is-success',
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch((err) => {
        //setMessage("Error creating ProductEntry, probable network issues "+ err )
        // setError(true)
        toast({
          message:
            'Error updating ProductEntry, probable network issues or ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">ProductEntry Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {' '}
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register('x', { required: true })}
                    name="name"
                    type="text"
                    placeholder="Name"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-hospital"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                ProductEntry Type
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register('x', { required: true })}
                    disabled
                    name="ProductEntryType"
                    type="text"
                    placeholder="ProductEntry Type"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
          </form>

          <div className="field  is-grouped mt-2">
            <p className="control">
              <button
                type="submit"
                className="button is-success is-small"
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </button>
            </p>
            <p className="control">
              <button
                className="button is-warning is-small"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </p>
            <p className="control">
              <button
                className="button is-danger is-small"
                onClick={() => handleDelete()}
                type="delete"
              >
                Delete
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ProductSearch({ getSearchfacility, clear }) {
  const productServ = client.service('products');
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState('');
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const [productModal, setProductModal] = useState(false);

  const handleRow = async (obj) => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.name);

    // setSelectedFacility(obj)
    setShowPanel(false);
    await setCount(2);
    /* const    newfacilityModule={
            selectedFacility:facility,
            show :'detail'
        }
   await setState((prevstate)=>({...prevstate, facilityModule:newfacilityModule})) */
    //console.log(state)
  };
  const handleBlur = async (e) => {};
  const handleSearch = async (value) => {
    setVal(value);
    if (value === '') {
      setShowPanel(false);
      return;
    }
    const field = 'name'; //field variable

    if (value.length >= 3) {
      productServ
        .find({
          query: {
            //service
            [field]: {
              $regex: value,
              $options: 'i',
            },
            $limit: 10,
            $sort: {
              createdAt: -1,
            },
          },
        })
        .then((res) => {
          // console.log("product  fetched successfully")
          // console.log(res.data)
          setFacilities(res.data);
          setSearchMessage(' product  fetched successfully');
          setShowPanel(true);
        })
        .catch((err) => {
          toast({
            message: 'Error creating ProductEntry ' + err,
            type: 'is-danger',
            dismissible: true,
            pauseOnHover: true,
          });
        });
    } else {
      // console.log("less than 3 ")
      // console.log(val)
      setShowPanel(false);
      await setFacilities([]);
      // console.log(facilities)
    }
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      // console.log("success has changed",clear)
      setSimpa('');
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? 'is-active' : ''} wt100`}>
            <div className="dropdown-trigger wt100">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Product"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
                element={Input}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div className="dropdown-menu wt100">
              <div className="dropdown-content">
                {facilities.length > 0 ? (
                  ''
                ) : (
                  <div className="dropdown-item" onClick={handleAddproduct}>
                    {' '}
                    <span>Add {val} to product list</span>{' '}
                  </div>
                )}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item "
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.name}</span>
                    <span>({facility.baseunit})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header="Create New Product"
      >
        <ProductCreate />
      </ModalBox>
    </div>
  );
}
