import {useForm} from "react-hook-form";

const OutpatientBillingSheet = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Outpatient Billing Sheet</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Name of Patient</label>
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
                <label className="label is-small">Hospital Number</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hospNumb"
                    className="input is-small"
                    type="number"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Date</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="date"
                    className="input is-small"
                    type="date"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Registration</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="regDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="regTariff"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="regOfficerName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="regSign"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="consultDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="consultTariff"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="consultOfficerName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="consultSign"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Specaialist Consultation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="specialistDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="specialistTariff"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="specialistOfficerName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="specialistSign"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Rehab</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="rehabDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="rehabTariff"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="rehabOfficerName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="rehabSign"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Laboratory Investigation</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="labDescription"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="labTarriff2"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="labOfficerName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="labSign"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Pharmacy</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="descPharm"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="tarriffPharm"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="pharmacist"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="signPharm"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Nursing Charge</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="descriptionNurse"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="tarriffNurse"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="nurse"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="signNurse"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Feeding</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="descFeeding"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="tarriffFeeding"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="officerFeeding"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="signFeeding"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Others</label>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Description</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="descOthers"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Tariff</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="tarriffOthers"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="officerOthers"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Signature</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="signOthers"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Total</label>
          <div className="field">
            <div className="control">
              <input
                {...register("input_name")}
                name="total"
                className="input is-small"
                type="text"
              />
            </div>
          </div>
          <div className="columns mt-4">
            <div className="column">
              <div className="field">
                <label className="label is-small">Charge</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="charge"
                    className="input is-small"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Payment</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="totalPay"
                    className="input is-small"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Billing Officer</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="billingOfficer"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Balance Due</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="balDue"
                    className="input is-small"
                    type="number"
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

export default OutpatientBillingSheet;
