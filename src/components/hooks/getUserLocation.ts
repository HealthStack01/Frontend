import {useState, useEffect} from "react";

export const GetUserLocation = () => {
  const [position, setPosition] = useState({longitude: "", latitude: ""});
  const [error, setError] = useState(null);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  const onLocationErrors = err => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  };

  const onLocationSuccess = position => {
    setPosition(prev => ({
      ...prev,
      longitude: position.coords.longitude,
      latitude: position.coords.latitude,
    }));
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({name: "geolocation"})
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(onLocationSuccess);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(
              onLocationSuccess,
              onLocationErrors,
              options
            );
          } else if (result.state === "denied") {
            //What happens if user rejects location
          }
          result.onchange = function () {
            console.log(result.state);
          };
        });
    } else {
      alert("Sorry Not available!");
    }
  }, [navigator]);

  return {...position, error};
};
