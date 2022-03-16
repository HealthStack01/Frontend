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

const loadSuccess = (artifactName) => `${artifactName} fetched successfully`;

const loadError = (artifactName, errorObj) => {
  return `Error Cliical fetching ${artifactName}, probable network issues ${errorObj}`;
};

export { getFormStrings, loadError, loadSuccess };
