import {useForm} from "react-hook-form";

const PressureAreasTreatmentChart = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Pressure Areas Treatment Chart</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Date & Time</label>
            <div className="control">
              <input
                {...register}
                name="repositioningDateAndTime"
                className="input is-small"
                type="datetime-local"
              />
            </div>
          </div>
          <label className="label is-small">Repositioning (using Codes)</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">From</label>
                <div className="control">
                  <input
                    {...register}
                    name="repositioningFrom"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">To</label>
                <div className="control">
                  <input
                    {...register}
                    name="repositioningTo"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Pressure Area Treatment</label>
            <div className="control">
              <textarea
                {...register}
                name="pressureAreaTxt"
                className="textarea is-small"
                type="number"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Skin Inspection Comments</label>
            <div className="control">
              <textarea
                {...register}
                name="skinInspectionComments"
                className="textarea is-small"
                type="number"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Name/Signature</label>
            <div className="control">
              <input
                {...register}
                name="nameOrSignature"
                className="input is-small"
                type="text"
              />
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

export default PressureAreasTreatmentChart;
