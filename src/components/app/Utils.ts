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

export { getFormStrings };
