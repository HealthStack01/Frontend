import {useForm} from "react-hook-form";

const ContinuationSheet = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Continuation Sheet</p>
        </div>
        <div className="card-content vscrollable">
          <div className="grid mt-3">
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Surname</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="surname"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="field-body">
              <div className="field">
                <label className="label is-small">Firstname</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="firstname"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">Date & Time</label>
              <div className="control">
                <input
                  {...register("input_name")}
                  name="dateAndTime"
                  className="input is-small"
                  type="datetime-local"
                  id=""
                />
              </div>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">Description/Remark</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="descOrRemark"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">Signature</label>
            <p className="control">
              <input
                {...register("input_name")}
                name="signature"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ContinuationSheet;
