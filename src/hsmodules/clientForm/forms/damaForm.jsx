import "../_style.css";
import {useForm} from "react-hook-form";

const DamaForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Dama Form</p>
        </div>
        <div className="card-content vscrollable">
          <div className="content mt-4">
            <p className="label is-small">
              This is to certify that, I{" "}
              <input
                {...register("input_name")}
                className="dotted_bottom"
                type="text"
                name="name"
                id=""
              />{" "}
              a patient at{" "}
              <input
                {...register("input_name")}
                className="dotted_bottom"
                type="text"
                name="personalInfo"
                id=""
              />{" "}
              (fill in the name of te hospital), am refusing at my own
              insistence and without authority of and against the advice of my
              attending physician(s). <br /> <br />
              I,{" "}
              <input
                {...register("input_name")}
                className="dotted_bottom"
                type="text"
                name="nameAgain"
                id=""
              />{" "}
              request to leave against medical advice. The medical
              risks/benefits have been explained to me by the physician and i
              understand those risks. <br /> <br /> I hereby release the
              hospital, its administration, personnel, and my attending and or
              resident physician(s) from any responsibility for all
              consequences, which may result by my leaving under these
              circumstances
            </p>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">MEDICAL RISKS</label>
              <p className="label is-small">
                Death{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="risks1"
                  id=""
                />{" "}
                Additional pain and/or suffering{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="risks2"
                  id=""
                />{" "}
                Permanent disability/disfigurement{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="risks3"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small mt-3">MEDICAL BENEFITS</label>
              <p className="label is-small">
                History/physical examination, further additional testing and
                treatments radiological imaging such as: <br /> CAT Scan{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="xrays"
                  id=""
                />{" "}
                X-rays{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="ultrasound"
                  id=""
                />{" "}
                Ultrasound (Sonogram){" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="labTesting"
                  id=""
                />{" "}
                Laboratory Testing{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="potentialAdmin"
                  id=""
                />{" "}
                Potential Admission and / or follow-up{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="medictions"
                  id=""
                />{" "}
                medications as indicated for infection, Pain, Blood Pressure,
                etc{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="others1"
                  id=""
                />{" "}
                Others{" "}
                <input
                  {...register("input_name")}
                  className="dotted_bottom"
                  type="text"
                  name="others2"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Patient Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="patientSign"
                    className="input is-small dotted_bottom"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="patDate"
                    className="input is-small dotted_bottom"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Physician Name/Signature
                </label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="physicianNameOrSignature"
                    className="input is-small dotted_bottom"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="physicianDate"
                    className="input is-small dotted_bottom"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Witness Name/Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="witnessNameOrSign"
                    className="input is-small dotted_bottom"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="witnessDate"
                    className="input is-small dotted_bottom"
                    type="date"
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

export default DamaForm;
