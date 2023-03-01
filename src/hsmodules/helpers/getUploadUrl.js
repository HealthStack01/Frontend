import axios from "axios";

export const getUploadUrl = async file => {
  const token = localStorage.getItem("feathers-jwt");
  // console.log(token);
  // console.log(file);

  const response = await axios.post(
    "https://healthstack-backend.herokuapp.com/upload",
    {uri: file},
    {headers: {Authorization: `Bearer ${token}`}}
  );
  //console.log(response);
  return response.data.url;
};
