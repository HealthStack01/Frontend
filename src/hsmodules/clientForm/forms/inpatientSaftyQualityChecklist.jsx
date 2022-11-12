import {useForm} from "react-hook-form";

const InpatientSafetyQualityChecklist = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">
            Inpatient Safety Quality Checklist
          </p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Patient Name</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="patientName"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Date</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="date"
                className="input is-small"
                type="date"
              />
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Hospital No</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="hospitalNum"
                className="input is-small"
                type="number"
              />
            </p>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Provided patient education, information on diagnosis and symptom
              management (State topic) Teach-back used to validate patient and
              family understanding
            </label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="patientEducation"
                />
                <span className="ms-2 is-small">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="patientEducation"
                />
                <span className="ms-2 is-small">No</span>
              </label>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Remark</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="remarks"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>

          <div className="field-body">
            <div className="field">
              <label className="label is-small">Item Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="itemDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default InpatientSafetyQualityChecklist;
