import React, {useEffect, useRef} from "react";
import {useForm} from "react-hook-form";
import {GoogleInput} from "../inputs/basic/Input";
//import "./home.scss";

import useGooglePlaceAutoComplete from "./Service";

function GoogleAddressInput({label, register, getSelectedAddress}) {
  const addressInputRef = useRef();
  const googleAutoCompleteSvc = useGooglePlaceAutoComplete();
  let autoComplete = "";

  const {
    setFocus,
    setValue,
    formState: {errors},
  } = useForm({});

  const handleAddressSelect = async () => {
    const address = await googleAutoCompleteSvc.getFullAddress(autoComplete);
    //addressInputRef.current.value = address.address;
    getSelectedAddress(address);

    // console.log(addressObj);
    // addressInputRef.current.value = addressObj.address;
    // setValue("address1", addressObj.address);
    // setValue(
    //   "location",
    //   `${addressObj.locality}, ${addressObj.adminArea1Long}`
    // );
    // setValue("country", addressObj.countryLong);
    // setValue("postalCode", addressObj.postalCode);
    // setFocus("address2");
  };

  useEffect(() => {
    async function loadGoogleMaps() {
      // initialize the Google Place Autocomplete widget and bind it to an input element.
      // eslint-disable-next-line
      autoComplete = await googleAutoCompleteSvc.initAutoComplete(
        addressInputRef.current,
        handleAddressSelect
      );
    }
    loadGoogleMaps();
  }, []);

  return (
    <div className="container">
      <GoogleInput
        label={label}
        inputRef={addressInputRef}
        register={register}
        placeholder=""
      />
    </div>
  );
}

export default GoogleAddressInput;
