const DynamicFieldView = ({ field, data }) => {
  return (
    <div>
      <label>{field.description}</label>
      <p>{field.selector(data) || 'N/A'}</p>
    </div>
  );
};

export default DynamicFieldView;
