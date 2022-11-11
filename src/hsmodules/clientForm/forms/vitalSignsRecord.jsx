import {useForm} from "react-hook-form";

const VitalSignsRecord = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Vital Signs Record</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Patient's Name</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="patientName"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Month</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="month"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Hospital Number</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hospitalNumber"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Ward</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="ward"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Hosp. Day</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hospitalDay"
                    className="input is-small"
                    type="date"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Post-OP Day</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="postOpDay"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date & Time</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="dateAndTime"
                    className="input is-small"
                    type="datetime-local"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Temp</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="temp"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Pulse</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="pulse"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Resp</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="resp"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Blood Pressure</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="bloodPressure"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Oxygen SAT</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="oxygenSat"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Weight</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="weight"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Height</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="height"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Pain Score</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="painScore"
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

export default VitalSignsRecord;
