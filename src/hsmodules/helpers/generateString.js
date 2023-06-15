export const generateRandomString = length => {
  let result = "";
  const characters =
    "A1YB5N3Z1C2DEFGH2IJKLMN3X4OPOQRSE4TULV5W7XYZSCMI00F12B368HW4TRP56A7DJG8KQ99UV";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};
