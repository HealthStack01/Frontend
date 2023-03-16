/* eslint-disable */
import React, {useState, useContext, useEffect, useRef} from "react";
import client from "../../feathers";
import {DebounceInput} from "react-debounce-input";
import {useForm} from "react-hook-form";
//import {useNavigate} from 'react-router-dom'
import {UserContext, ObjectContext} from "../../context";
import {toast} from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";
import {Box, Grid} from "@mui/material";
import Input from "../../components/inputs/basic/Input";
import GlobalCustomButton from "../../components/buttons/CustomButton";

// eslint-disable-next-line
const searchfacility = {};

export default function Product() {
  const {state} = useContext(ObjectContext); //,setState
  // eslint-disable-next-line
  const [selectedProduct, setSelectedProduct] = useState();
  //const [showState,setShowState]=useState() //create|modify|detail

  return (
    <section className="section remPadTop">
      {/*  <div className="level">
            <div className="level-item"> <span className="is-size-6 has-text-weight-medium">Product  Module</span></div>
            </div> */}
      <div className="columns ">
        <div className="column is-8 ">
          <ProductList />
        </div>
        <div className="column is-4 ">
          {state.ProductModule.show === "create" && <ProductCreate />}
          {state.ProductModule.show === "detail" && <ProductDetail />}
          {state.ProductModule.show === "modify" && (
            <ProductModify Product={selectedProduct} />
          )}
        </div>
      </div>
    </section>
  );
}

export function ProductCreate({closeModal}) {
  const {register, handleSubmit, setValue} = useForm(); //, watch, errors, reset
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const [facility, setFacility] = useState();
  const ProductServ = client.service("products");
  //const navigate=useNavigate()
  const {user} = useContext(UserContext); //,setUser
  // eslint-disable-next-line
  const [currentUser, setCurrentUser] = useState();

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
    //setFacility(user.activeProduct.FacilityId)//
    if (!user.stacker) {
    }
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setMessage("");
    setError(false);
    setSuccess(false);
    // data.createdby=user._id
    // console.log(data);
    if (user.currentEmployee) {
      // data.facility=user.currentEmployee.facilityDetail._id  // or from facility dropdown
    }
    ProductServ.create(data)
      .then(res => {
        //console.log(JSON.stringify(res))
        e.target.reset();
        /*  setMessage("Created Product successfully") */
        setSuccess(true);
        toast.success("Product created succesfully");

        setSuccess(false);
      })
      .catch(err => {
        toast.error("Error creating Product");
      });
  };

  return (
    <>
      <Box sx={{width: "600px"}}>
        <Grid container spacing={1} pt={1} mb={2}>
          <Grid item xs={12}>
            <Input
              label="Product Category"
              name="category"
              type="text"
              register={register("category", {required: true})}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Product Name"
              name="name"
              type="text"
              register={register("name", {required: true})}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              label="Product Base Unit"
              name="baseunit"
              type="text"
              register={register("baseunit", {required: true})}
            />
          </Grid>
        </Grid>

        <Box sx={{display: "flex"}}>
          <GlobalCustomButton
            onClick={handleSubmit(onSubmit)}
            sx={{marginRight: "10px"}}
            color="success"
          >
            Create Product
          </GlobalCustomButton>
          <GlobalCustomButton
            onClick={closeModal}
            variant="outlined"
            color="error"
          >
            Cancel
          </GlobalCustomButton>
        </Box>
      </Box>
    </>
  );
}

export function ProductList() {
  // const { register, handleSubmit, watch, errors } = useForm();
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  const ProductServ = client.service("products");
  //const navigate=useNavigate()
  // const {user,setUser} = useContext(UserContext)
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [selectedProduct, setSelectedProduct] = useState(); //
  // eslint-disable-next-line
  const {state, setState} = useContext(ObjectContext);
  // eslint-disable-next-line
  const {user, setUser} = useContext(UserContext);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(20);
  const [total, setTotal] = useState(0);
  const [restful, setRestful] = useState(true);

  const handleCreateNew = async () => {
    const newProductModule = {
      selectedProduct: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductModule: newProductModule,
    }));
    //console.log(state)
  };
  const handleRow = async Product => {
    //console.log("b4",state)

    //console.log("handlerow",Product)

    await setSelectedProduct(Product);

    const newProductModule = {
      selectedProduct: Product,
      show: "detail",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductModule: newProductModule,
    }));
    //console.log(state)
  };

  const handleSearch = val => {
    const field = "name";
    console.log(val);
    ProductServ.find({
      query: {
        [field]: {
          $regex: val,
          $options: "i",
        },
        // facility:user.currentEmployee.facilityDetail._id || "",
        $limit: 20,
        $sort: {
          name: 1,
        },
      },
    })
      .then(res => {
        // console.log(res)

        setFacilities(res.data);
        setTotal(res.total);

        setMessage(" Product  fetched successfully");
        setSuccess(true);
      })
      .catch(err => {
        console.log(err);
        setMessage("Error fetching Product, probable network issues " + err);
        setError(true);
      });
  };

  const getFacilities = async () => {
    if (user.currentEmployee) {
      //    console.log(page,limit)

      const findProduct = await ProductServ.find({
        query: {
          // facility:user.currentEmployee.facilityDetail._id,
          $limit: limit,
          $skip: page * limit,
          $sort: {
            createdAt: -1,
          },
        },
      });
      await setFacilities(prevstate => prevstate.concat(findProduct.data));
      await setTotal(findProduct.total);
      // console.log(findProduct)
      setPage(page => page + 1);
      // await setFacilities(findProduct.data) original
    } else {
      if (user.stacker) {
        const findProduct = await ProductServ.find({
          query: {
            $limit: 200,
            $sort: {
              createdAt: -1,
            },
          },
        });

        await setFacilities(findProduct.data);
      }
    }
    /*   .then((res)=>{
                console.log(res)
                    setFacilities(res.data)
                    setMessage(" Product  fetched successfully")
                    setSuccess(true)
                })
                .catch((err)=>{
                    setMessage("Error creating Product, probable network issues "+ err )
                    setError(true)
                }) */
  };

  useEffect(() => {
    if (user) {
      getFacilities();
    } else {
      /* const localUser= localStorage.getItem("user")
                    const user1=JSON.parse(localUser)
                    console.log(localUser)
                    console.log(user1)
                    fetchUser(user1)
                    console.log(user)
                    getFacilities(user) */
      // setFacilities(prevstate=>prevstate.concat(findProduct.data)
    }

    ProductServ.on("created", obj => rest());
    ProductServ.on("updated", obj => rest());
    ProductServ.on("patched", obj => rest());
    ProductServ.on("removed", obj => rest());
    return () => {};
  }, []);

  const rest = async () => {
    // console.log("starting rest")
    await setRestful(true);
    await setPage(0);
    //await  setLimit(2)
    await setTotal(0);
    await setFacilities([]);
    await getFacilities();
    //await  setPage(0)
    await setRestful(false);
  };
  //todo: pagination and vertical scroll bar

  return (
    <>
      {user ? (
        <>
          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <div className="field">
                  <p className="control has-icons-left  ">
                    <DebounceInput
                      className="input is-small "
                      type="text"
                      placeholder="Search Products"
                      minLength={3}
                      debounceTimeout={400}
                      onChange={e => handleSearch(e.target.value)}
                    />
                    <span className="icon is-small is-left">
                      <i className="fas fa-search"></i>
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="level-item">
              {" "}
              <span className="is-size-6 has-text-weight-medium">
                List of Products{" "}
              </span>
            </div>
            <div className="level-right">
              <div className="level-item">
                <div className="level-item">
                  <div
                    className="button is-success is-small"
                    onClick={handleCreateNew}
                  >
                    New
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="table-container pullup vscrola" id="scrollableDiv">
            <InfiniteScroll
              dataLength={facilities.length}
              next={getFacilities}
              hasMore={total > facilities.length}
              loader={<h4>Loading...</h4>}
              scrollableTarget="scrollableDiv"
            >
              <table className="table is-striped is-narrow is-hoverable is-fullwidth  ">
                <thead>
                  <tr>
                    <th>
                      <abbr title="Serial No">S/No</abbr>
                    </th>
                    <th>Name</th>

                    <th>
                      <abbr title="Base Unit">Base Unit</abbr>
                    </th>
                    <th>
                      <abbr title="Last Name">Product Category</abbr>
                    </th>
                    <th>
                      <abbr title="Actions">Actions</abbr>
                    </th>
                  </tr>
                </thead>
                <tfoot></tfoot>
                <tbody>
                  {facilities.map((Product, i) => (
                    <tr key={Product._id} onClick={() => handleRow(Product)}>
                      <th>{i + 1}</th>
                      <th>{Product.name}</th>
                      <td>{Product.baseunit}</td>
                      <td>{Product.category}</td>

                      <td>
                        <span className="showAction">...</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </InfiniteScroll>
          </div>
        </>
      ) : (
        <div>loading</div>
      )}
    </>
  );
}

export function ProductDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(""); //,
  //const ProductServ=client.service('/Product')
  //const navigate=useNavigate()
  //const {user,setUser} = useContext(UserContext)
  const {state, setState} = useContext(ObjectContext);

  const Product = state.ProductModule.selectedProduct;

  const handleEdit = async () => {
    const newProductModule = {
      selectedProduct: Product,
      show: "modify",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductModule: newProductModule,
    }));
    //console.log(state)
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Product Details</p>
        </div>
        <div className="card-content vscrollable">
          <table>
            <tbody>
              <tr>
                <td>
                  <label className="label is-small">
                    {" "}
                    <span className="icon is-small is-left">
                      <i className="fas fa-hospital"></i>
                    </span>
                    Name:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="name">
                    {" "}
                    {Product.name}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-signs"></i>
                    </span>
                    Base Unit:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft" name="ProductType">
                    {Product.baseunit}{" "}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <label className="label is-small">
                    <span className="icon is-small is-left">
                      <i className="fas fa-map-marker-alt"></i>
                    </span>
                    Product Category:
                  </label>
                </td>
                <td>
                  <span className="is-size-7 padleft " name="ProductCity">
                    {Product.category}
                  </span>
                </td>
              </tr>
              {/*         <tr>
            <td>
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>Phone:           
                    
                        </label>
                        </td>
                        <td>
                        <span className="is-size-7 padleft "  name="ProductContactPhone" >{Product.phone}</span>
                        </td>
                  </tr>
                    <tr><td>
            
            <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>Email:                     
                    
                         </label></td><td>
                         <span className="is-size-7 padleft "  name="ProductEmail" >{Product.email}</span>
                         </td>
             
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i></span>Department:
                    
                    </label></td>
                    <td>
                    <span className="is-size-7 padleft "  name="ProductOwner">{Product.department}</span>
                    </td>
               
                </tr>
                    <tr>
            <td>
            <label className="label is-small"> <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>Departmental Unit:              
                    
                </label></td>
                <td>
                <span className="is-size-7 padleft "  name="ProductType">{Product.deptunit}</span>
                </td>
              
                </tr> */}

              {/*   <div className="field">
             <label className="label is-small"><span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>Category:              
                    <span className="is-size-7 padleft "  name= "ProductCategory">{Product.ProductCategory}</span>
                </label>
                 </div> */}
            </tbody>
          </table>

          <div className="field mt-2">
            <p className="control">
              <button
                className="button is-success is-small"
                onClick={handleEdit}
              >
                Edit
              </button>
            </p>
          </div>
          {error && <div className="message"> {message}</div>}
        </div>
      </div>
    </>
  );
}

export function ProductModify() {
  const {register, handleSubmit, setValue, reset, errors} = useForm(); //watch, errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  // eslint-disable-next-line
  const [success, setSuccess] = useState(false);
  // eslint-disable-next-line
  const [message, setMessage] = useState("");
  // eslint-disable-next-line
  const ProductServ = client.service("products");
  //const navigate=useNavigate()
  // eslint-disable-next-line
  const {user} = useContext(UserContext);
  const {state, setState} = useContext(ObjectContext);

  const Product = state.ProductModule.selectedProduct;

  useEffect(() => {
    setValue("name", Product.name, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("baseunit", Product.baseunit, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setValue("category", Product.category, {
      shouldValidate: true,
      shouldDirty: true,
    });
    /* setValue("phone", Product.phone,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("email", Product.email,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("department", Product.department,  {
                shouldValidate: true,
                shouldDirty: true
            })
            setValue("deptunit", Product.deptunit,  {
                shouldValidate: true,
                shouldDirty: true
            }) */
    /*   setValue("ProductCategory", Product.ProductCategory,  {
                shouldValidate: true,
                shouldDirty: true
            }) */

    return () => {};
  });

  const handleCancel = async () => {
    const newProductModule = {
      selectedProduct: {},
      show: "create",
    };
    await setState(prevstate => ({
      ...prevstate,
      ProductModule: newProductModule,
    }));
    //console.log(state)
  };

  const changeState = () => {
    const newProductModule = {
      selectedProduct: {},
      show: "create",
    };
    setState(prevstate => ({...prevstate, ProductModule: newProductModule}));
  };
  const handleDelete = async () => {
    let conf = window.confirm("Are you sure you want to delete this data?");

    const dleteId = Product._id;
    if (conf) {
      ProductServ.remove(dleteId)
        .then(res => {
          //console.log(JSON.stringify(res))
          reset();
          /*  setMessage("Deleted Product successfully")
                setSuccess(true)
                changeState()
               setTimeout(() => {
                setSuccess(false)
                }, 200); */
          toast({
            message: "Product deleted succesfully",
            type: "is-success",
            dismissible: true,
            pauseOnHover: true,
          });
          changeState();
        })
        .catch(err => {
          // setMessage("Error deleting Product, probable network issues "+ err )
          // setError(true)
          toast({
            message:
              "Error deleting Product, probable network issues or " + err,
            type: "is-danger",
            dismissible: true,
            pauseOnHover: true,
          });
        });
    }
  };

  /* ()=> setValue("firstName", "Bill", , {
            shouldValidate: true,
            shouldDirty: true
          })) */
  const onSubmit = (data, e) => {
    e.preventDefault();

    setSuccess(false);
    // console.log(data)
    //  data.facility=Product.facility
    //console.log(data);

    ProductServ.patch(Product._id, data)
      .then(res => {
        //console.log(JSON.stringify(res))
        // e.target.reset();
        // setMessage("updated Product successfully")
        toast({
          message: "Product updated succesfully",
          type: "is-success",
          dismissible: true,
          pauseOnHover: true,
        });

        changeState();
      })
      .catch(err => {
        //setMessage("Error creating Product, probable network issues "+ err )
        // setError(true)
        toast({
          message: "Error updating Product, probable network issues or " + err,
          type: "is-danger",
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Product Details-Modify</p>
        </div>
        <div className="card-content vscrollable">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="field">
              <label className="label is-small">
                {" "}
                Name
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input  is-small"
                    {...register("x", {required: true})}
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
                Base Unit
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input is-small "
                    {...register("x", {required: true})}
                    name="baseunit"
                    type="text"
                    placeholder="Base Unit"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-signs"></i>
                  </span>
                </p>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                Product Category
                <p className="control has-icons-left">
                  <input
                    className="input is-small"
                    {...register("x", {required: true})}
                    disabled
                    name="category"
                    type="text"
                    placeholder="Product Category"
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                </p>
              </label>
            </div>
            {/*<div className="field">
            <label className="label is-small">Phone
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="phone" type="text" placeholder="Phone No"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-phone-alt"></i>
                    </span>
                </p>
                </label>
                 </div>
            <div className="field">
            <label className="label is-small">Email
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="email" type="email" placeholder="Product Email"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                    </span>
                </p>
                </label>
                </div>
            <div className="field">
            <label className="label is-small">Department
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="department" type="text" placeholder="Department"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-user-md"></i>
                    </span>
                </p>
                </label>
                {errors.department && <span>This field is required</span>}
                </div>
            <div className="field">
            <label className="label is-small">Departmental Unit
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="deptunit" type="text" placeholder="Departmental Unit"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-hospital-symbol"></i>
                    </span>
                </p>
                </label>
                </div> */}
            {/*  <div className="field">
            <label className="label is-small">Category
                <p className="control has-icons-left">
                    <input className="input is-small" {...register("x",{required: true})} name="ProductCategory" type="text" placeholder="Product Category"/>
                    <span className="icon is-small is-left">
                    <i className="fas fa-clinic-medical"></i>
                    </span>
                </p>
                </label>
            </div> */}
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
            {/*  <p className="control">
                    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
                       Delete
                    </button>
                </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export function InputSearch({getSearchfacility, clear}) {
  const ProductServ = client.service("products");
  // const facilityServ=client.service('facility')
  const [facilities, setFacilities] = useState([]);
  // eslint-disable-next-line
  const [searchError, setSearchError] = useState(false);
  // eslint-disable-next-line
  const [showPanel, setShowPanel] = useState(false);
  // eslint-disable-next-line
  const [searchMessage, setSearchMessage] = useState("");
  // eslint-disable-next-line
  const [simpa, setSimpa] = useState("");
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);

  const handleRow = async obj => {
    await setChosen(true);
    //alert("something is chaning")
    getSearchfacility(obj);

    await setSimpa(obj.facilityName);

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
  const handleBlur = async e => {
    if (count === 2) {
      console.log("stuff was chosen");
    }

    /*  console.log("blur")
         setShowPanel(false)
        console.log(JSON.stringify(simpa))
        if (simpa===""){
            console.log(facilities.length)
            setSimpa("abc")
            setSimpa("")
            setFacilities([])
            inputEl.current.setValue=""
        }
        console.log(facilities.length)
        console.log(inputEl.current) */
  };
  const handleSearch = async val => {
    const field = "facilityName"; //field variable

    if (val.length >= 3) {
      ProductServ.find({
        query: {
          //service
          [field]: {
            $regex: val,
            $options: "i",
          },
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
        .then(res => {
          console.log("facility  fetched successfully");
          setFacilities(res.data);
          setSearchMessage(" facility  fetched successfully");
          setShowPanel(true);
        })
        .catch(err => {
          console.log(err);
          setSearchMessage(
            "Error searching facility, probable network issues " + err
          );
          setSearchError(true);
        });
    } else {
      console.log("less than 3 ");
      console.log(val);
      setShowPanel(false);
      await setFacilities([]);
      console.log(facilities);
    }
  };
  useEffect(() => {
    if (clear) {
      setSimpa("");
    }
    return () => {};
  }, [clear]);
  return (
    <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div className={`dropdown ${showPanel ? "is-active" : ""}`}>
            <div className="dropdown-trigger">
              <DebounceInput
                className="input is-small "
                type="text"
                placeholder="Search Facilities"
                value={simpa}
                minLength={1}
                debounceTimeout={400}
                onBlur={e => handleBlur(e)}
                onChange={e => handleSearch(e.target.value)}
                inputRef={inputEl}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {searchError && <div>{searchMessage}</div>}
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility._id}
                    onClick={() => handleRow(facility)}
                  >
                    <span>{facility.facilityName}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
