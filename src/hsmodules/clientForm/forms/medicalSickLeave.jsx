import "../_style.css";
import {useForm} from "react-hook-form";

const MedicalSickLeave = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Medical Sick Leave</p>
        </div>
        <div className="card-content vscrollable">
          <div className="content mt-4">
            <p className="label is-small mb-4 has-text-centered">
              TO WHOM IT MAY CONCERN
            </p>
            <p className="label is-small">
              This is to certify that
              <input
                {...register("input_name")}
                name="name"
                className="dotted_bottom"
                type="text"
                id=""
              />{" "}
              <br />
              Address
              <input
                {...register("input_name")}
                className="dotted_bottom"
                type="text"
                name="address"
                id=""
              />{" "}
              <br /> Was examined and treated at our Hospital on{" "}
              <input
                {...register("input_name")}
                name="hospital"
                className="dotted_bottom"
                type="date"
                id=""
              />{" "}
              <br /> with the following Diagnosis{" "}
            </p>
            <div className="field">
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="diagnosis"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
            <p className="label is-small mt-3">
              and would need Medical Attention/Bed Rest for
              <input
                {...register("input_name")}
                name="medicalAttention"
                className="dotted_bottom"
                type="text"
                id=""
              />{" "}
              days in order to ensure total recurperation
            </p>
          </div>
          <div className="field has-text-right mt-4">
            <label className="label is-small">Attending Physician</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="physician"
                className="input is-small dotted_bottom"
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

export default MedicalSickLeave;
