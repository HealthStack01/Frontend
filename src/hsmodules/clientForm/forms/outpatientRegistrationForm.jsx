import {useForm} from "react-hook-form";

const OutpatientRegistrationForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Patient Registration Form</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Full Name</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="fullName"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">State of Origin</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="stateOfOrigin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Nationality</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="nationality"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Address</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="address"
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
                <label className="label is-small">Date of Birth</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="dob"
                    className="input is-small"
                    type="date"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Gender</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="gender"
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
                <label className="label is-small">Mobile Phone</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="phone"
                    className="input is-small"
                    type="tel"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Email</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="email"
                    className="input is-small"
                    type="email"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Occupation</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="occupation"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Religion</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="religion"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <label className="label is-small">MARITAL STATUS</label>
          <label class="checkbox me-3">
            <input {...register("input_name")} name="single" type="checkbox" />
            <span className="ms-2 is-small">Single</span>
          </label>
          <label class="checkbox me-3">
            <input {...register("input_name")} name="married" type="checkbox" />
            <span className="ms-2 is-small">Married</span>
          </label>
          <label class="checkbox me-3">
            <input {...register("input_name")} name="others" type="checkbox" />
            <span className="ms-2 is-small">Others</span>
          </label>
          <div className="field">
            <label className="label is-small">Place of Work</label>
            <p className="control is-expanded">
              <textarea
                {...register("input_name")}
                name="placeOfWork"
                className="textarea is-small"
                type="text"
              ></textarea>
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Employer Address</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="employerAddress"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <label className="label is-small">ALLERGIES</label>
          <div className="field w-100 mt-3">
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="allegies"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="allegies"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <label className="label is-small">
            HAVE YOU HAD ANY OF THE FOLLOWING?
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="chestPain"
              type="checkbox"
            />
            <span className="ms-2 is-small">Chest Pain</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="hrtDisease"
              type="checkbox"
            />
            <span className="ms-2 is-small">Heart Disease</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="migranes"
              type="checkbox"
            />
            <span className="ms-2 is-small">Migranes</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="infection"
              type="checkbox"
            />
            <span className="ms-2 is-small">Infection</span>
          </label>
          <label class="checkbox me-3">
            <input {...register("input_name")} name="cancer1" type="checkbox" />
            <span className="ms-2 is-small">Cancer</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="insomnia"
              type="checkbox"
            />
            <span className="ms-2 is-small">Insomnia</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="diabetesOrHypertension"
              type="checkbox"
            />
            <span className="ms-2 is-small">Diabetes/Hypertension</span>
          </label>
          <div className="field">
            <label className="label is-small">If yes, state type</label>
            <p className="control is-expanded">
              <textarea
                {...register("input_name")}
                name="types"
                className="textarea is-small"
                type="text"
              ></textarea>
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Patient Next of Kin</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="nextOfKin"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Address</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="nextOfKinAdd"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Mobile Phone</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="nextOfKinPhone"
                    className="input is-small"
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Relationship</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="relationship"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">SOCIAL HISTORY</label>
          <div className="field w-100 mt-3">
            <label className="label is-small">Do you drink Alcohol?</label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="drinkAlcoholYes"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="drinkAlcoholNo"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">Do you use Tobacco?</label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="tobaccoYes"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="tobaccoNo"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <label className="label is-small">FAMILY HISTORY</label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="diabetic"
              type="checkbox"
            />
            <span className="ms-2 is-small">Diabetic</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="hypertensive"
              type="checkbox"
            />
            <span className="ms-2 is-small">Hypertensive</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="familyCancer"
              type="checkbox"
            />
            <span className="ms-2 is-small">Cancer</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="arthritis"
              type="checkbox"
            />
            <span className="ms-2 is-small">Arthritis</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="hrtProblems"
              type="checkbox"
            />
            <span className="ms-2 is-small">Heart Problems</span>
          </label>
          <label class="checkbox me-3">
            <input {...register("input_name")} name="stroke" type="checkbox" />
            <span className="ms-2 is-small">Stroke</span>
          </label>
          {/* <label class="checkbox me-3">
            <input {...register("input_name")} name="" type="checkbox" />
            <span className="ms-2 is-small">Stroke</span>
          </label> */}
          <div className="field">
            <label className="label is-small">Others</label>
            <div className="control">
              <input
                {...register("input_name")}
                name="others"
                className="input is-small"
                type="text"
              />
            </div>
          </div>{" "}
          <label className="label is-small">
            HAVE YOU DONE ANY SURGERY BEFORE?
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="surgeryYes"
              type="checkbox"
            />
            <span className="ms-2 is-small">Yes</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="surgeryNo"
              type="checkbox"
            />
            <span className="ms-2 is-small">No</span>
          </label>
          <label className="label is-small">If yes, state type?</label>
          <textarea
            {...register("input_name")}
            name="typeSurg"
            className="textarea is-small"
            type="text"
          ></textarea>
          <div className="field">
            <label className="label is-small mt-4">
              List any medications you are currently taking
            </label>
            <div className="control">
              <div className="field">
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="medications"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="privatePatient"
              type="checkbox"
            />
            <span className="ms-2 is-small">Private Patient?</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="corporatePatient"
              type="checkbox"
            />
            <span className="ms-2 is-small">Corporate Patient?</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="insurance"
              type="checkbox"
            />
            <span className="ms-2 is-small">HMO/Health Insurance</span>
          </label>
          <label className="label is-small">
            HOSPITAL BILLS TO BE SETTLED BY
          </label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Name of Payee</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="payeeName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Phone Number</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="payeePhone"
                    className="input is-small"
                    type="tel"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Email</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="payeeEmail"
                    className="input is-small"
                    type="email"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">Corporate Patient</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Name of Payee (Company)
                </label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="corporatePayeeName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Phone Number</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="corporatePayeePhone"
                    className="input is-small"
                    type="tel"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Office Address</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="corporatePayeeAdd"
                    className="input is-small"
                    type="tel"
                  />
                </div>
              </div>
            </div>
          </div>
          <label className="label is-small">
            Authorisation Letter Attached
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="authLetterYes"
              type="checkbox"
            />
            <span className="ms-2 is-small">Yes</span>
          </label>
          <label class="checkbox me-3">
            <input
              {...register("input_name")}
              name="authLetterNo"
              type="checkbox"
            />
            <span className="ms-2 is-small">No</span>
          </label>
          <label className="label is-small">HMO/HEALTH INSURANCE</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Name</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="insuranceName"
                    className="input is-small"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Phone Number</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="insurancePhone"
                    className="input is-small"
                    type="tel"
                  />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Email</label>
                <div className="control">
                  <input
                    {...register("input_name")}
                    name="insuranceEmail"
                    className="input is-small"
                    type="email"
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

export default OutpatientRegistrationForm;
