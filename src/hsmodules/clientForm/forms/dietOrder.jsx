import {useForm} from "react-hook-form";

const DietOrder = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Diet Order</p>
        </div>
        <div className="card-content vscrollable">
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="dietDate"
                    className="input is-small"
                    type="date"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Room</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="room"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
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
          <div className="field">
            <label className="label is-small">Form Completed By</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="formCompletedBy"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Diet Type</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="dietType"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Breakfast</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="breakfast"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Lunch</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="lunch"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Dinner</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="dinner"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Comments</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="comments"
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

export default DietOrder;
