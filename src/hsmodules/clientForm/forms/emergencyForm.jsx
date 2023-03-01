import {useForm} from "react-hook-form";

const EmergencyForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Emergency Form</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Staff Name</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="staffName"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Staff ID No</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="staffIdNum"
                className="input is-small"
                type="number"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Date of Encounter</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="dateOfEncounter"
                className="input is-small"
                type="date"
              />
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Presenting Complain</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="presentingComplain"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Examination Findings</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="examFindings"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Investigation Diagnosis</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="investigationDiag"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Drugs Given</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="drugsGiven"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Doctor's Name</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="docName"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Patient Name</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="patientName"
                    className="input is-small"
                    type="text"
                  />
                </div>
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

export default EmergencyForm;
