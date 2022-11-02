import {useForm} from "react-hook-form";

const LaboratoryObservationChart = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Laboratory Observation Chart</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Name</label>
            <p className="control is-expanded">
              <input
                {...register}
                name="name"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Reg. No</label>
            <p className="control is-expanded">
              <input
                {...register}
                name="regNumber"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Date & Time</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="dateAndTime"
                    className="input is-small"
                    type="date"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Temp</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="temp"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">P</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="p"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">R</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="r"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">B/P</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="bldPre"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">FH</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="fh"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Fluid Intake</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="fluidIntake"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Fluid Output</label>
                <p className="control is-expanded">
                  <input
                    {...register}
                    name="fluidOutput"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Contractions Frequency & Strength
            </label>
            <p className="control is-expanded">
              <input
                {...register}
                name="contractions"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Remark</label>
            <div className="control">
              <textarea
                {...register}
                name="remark"
                className="textarea is-small"
              ></textarea>
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

export default LaboratoryObservationChart;
