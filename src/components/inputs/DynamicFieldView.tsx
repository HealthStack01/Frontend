const DynamicFieldView = ({ field, data }) => {
  console.debug({ field, data });
  return (
    <div>
      <label>{field.description}</label>
      <p>{field.selector(data) || 'N/A'}</p>
    </div>
  );
};

export default DynamicFieldView;
