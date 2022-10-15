   import { useForm } from "react-hook-form";

const MedicalBillingSheet = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Medical Billing Sheet</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">Name</label>
              <p className="control is-expanded">
                <input ref={register} name="name" className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Hospital No</label>
                  <p className="control is-expanded">
                    <input ref={register} name="hospNumber" className="input is-small" type="number" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Room No</label>
                  <p className="control is-expanded">
                    <input ref={register} name="roomNum" className="input is-small" type="number" />
                  </p>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field-body">
                <div className="field">
                  <label className="label is-small">Date</label>
                  <div className="control">
                    <input ref={register} name="date" className="input is-small" type="date" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">
                Registration & Consultation
              </label>
              <p className="control is-expanded">
                <input ref={register} name="regAndCosultation" className="input is-small" type="text" />
              </p>
            </div>
          </div>
          <div className="field mt-3">
            <label htmlFor="" className="label is-small">
              Paid
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="tick" type="checkbox" />
              <span className="ms-2 is-small">(please tick)</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">
              Laboratory (specify which one or each group of test)
            </label>
            <div className="control">
              <textarea ref={register} name="lab" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Cardiac Procedures etc (ECG/Echo/Holtar/Amb up/etc)
            </label>
            <div className="control">
              <textarea ref={register} name="cardiacPro" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Other Procedures: (spiro/Audio/VA/VF/etc)
            </label>
            <div className="control">
              <textarea ref={register} name="otherProcedures" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Radiology Procedures: <br /> X-ray/USS/Doppler/etc
            </label>
            <div className="control">
              <textarea ref={register} name="radioProcedures" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Nursing</label>
            <div className="control">
              <textarea ref={register} name="nursing" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Feeding</label>
            <div className="control">
              <textarea ref={register} name="feeding" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Pharmacy: <br /> Drugs/Injection/Vaccine
            </label>
            <div className="control">
              <textarea ref={register} name="pharmacy" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Specialist Consultation</label>
            <div className="control">
              <textarea ref={register} name="specialistConsultation" className="textarea is-small"></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Signature of Requester</label>
            <div className="control">
              <textarea ref={register} name="requesterSign" className="textarea is-small"></textarea>
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

export default MedicalBillingSheet;
