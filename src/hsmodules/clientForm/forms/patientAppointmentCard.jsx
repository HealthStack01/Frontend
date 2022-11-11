import {useForm} from "react-hook-form";

const PatientAppointmentCard = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Patient Appointment Card</p>
        </div>
        <div className="card-content vscrollable">
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
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">First Name</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="firstName"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Registration Number</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="registrationNum"
                    className="input is-small"
                    type="number"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Other Names</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="otherNames"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date of Registration</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="registrationDate"
                    className="input is-small"
                    type="date"
                  />
                </p>
              </div>
            </div>
          </div>
          <label className="label is-small">YOUR NEXT APPOINTMENT</label>
          <div className="field">
            <label className="label is-small">Date</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="nextAppointmentDate"
                className="input is-small"
                type="date"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="label is-small">Consultation</label>
              <textarea
                {...register("input_name")}
                name="consultation"
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

export default PatientAppointmentCard;
