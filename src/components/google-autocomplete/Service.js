const useGooglePlaceAutoComplete = () => {
  const initAutoComplete = async (input, callback) => {
    let autoComplete = new window.google.maps.places.Autocomplete(input, {
      // limit to North America for now
      componentRestrictions: {country: ["ng"]},
      fields: ["address_component", "geometry"],
      types: ["address"],
    });
    autoComplete.addListener("place_changed", callback);

    return autoComplete;
  };

  const getFullAddress = async autoComplete => {
    const place = autoComplete.getPlace();

    let address,
      locality,
      adminArea1Short,
      adminArea1Long,
      countryShort,
      countryLong,
      postalCode = "";

    // Get each component of the address from the place details,
    for (const component of place.address_components) {
      const componentType = component.types[0];

      if (componentType === "street_number") {
        address = component.long_name;
      }
      if (componentType === "") {
        address = `${address || ""} ${component.long_name}`;
      }
      if (componentType === "locality") {
        locality = component.long_name;
      }
      if (componentType === "administrative_area_level_1") {
        adminArea1Short = component.short_name;
        adminArea1Long = component.long_name;
      }
      if (componentType === "postal_code") {
        postalCode = component.long_name;
      }
      if (componentType === "postal_code_suffix") {
        postalCode = `${postalCode}-${component.long_name}`;
      }
      if (componentType === "country") {
        countryShort = component.short_name;
        countryLong = component.long_name;
      }
    }

    let resAddress = {
      address: address,
      lga: locality,
      state: adminArea1Long,
      country: countryLong,
      postalCode: postalCode,
      adminArea1Short: adminArea1Short,
      countryShort: countryShort,
    };

    return resAddress;
  };

  return {
    initAutoComplete,
    getFullAddress,
  };
};

export default useGooglePlaceAutoComplete;
