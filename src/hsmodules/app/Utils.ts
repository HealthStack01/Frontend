const getFormStrings = (id) => {
  if (!id) {
    return {
      action: 'create',
      message: ' created successfully',
    };
  } else {
    return {
      action: 'update',
      message: ' updated successfully',
    };
  }
};

const randomString = (length) => {
  let result = '';
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
};

const loadSuccess = (artifactName) => `${artifactName} fetched successfully`;

const loadError = (artifactName, errorObj) => {
  return `Error Cliical fetching ${artifactName}, probable network issues ${errorObj}`;
};

export { getFormStrings, loadError, loadSuccess, randomString };
