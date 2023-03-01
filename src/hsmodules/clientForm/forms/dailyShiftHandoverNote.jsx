import {useForm} from "react-hook-form";

const DailyShiftHandoverNote = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Daily Shift Handover Note</p>
        </div>
        <div className="card-content vscrollable">
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
          <div className="field">
            <label className="label is-small">Name of Nurse</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="nameOfNurse"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="grid">
            <div className="field">
              <label className="label is-small">Time of Report</label>
              <div className="control">
                <input
                  {...register("input_name")}
                  name="timeOfReport"
                  className="input is-small"
                  type="datetime-local"
                />
              </div>
            </div>
            <div className="field">
              <label className="label is-small">Admission Date</label>
              <div className="control">
                <input
                  {...register("input_name")}
                  name="admissionDate"
                  className="input is-small"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Anticipated Date of Discharge
            </label>
            <div className="control">
              <input
                {...register("input_name")}
                name="anticipatedDateOfDischarge"
                className="input is-small"
                type="date"
              />
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">
                Physician/Specialists Consultation
              </label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="phyOrSpeciConsultation"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">ID Bracelet on wrist?</label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="idBracelet"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="idBracelet"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <div className="field mt-4">
            <label className="label is-small">
              Date/Time last seen by Physician
            </label>
            <div className="control">
              <input
                {...register("input_name")}
                name="lastSeen"
                className="input is-small"
                type="datetime-local"
              />
            </div>
          </div>
          <div className="field-body">
            <div className="field">
              <label className="label is-small">Allergy</label>
              <p className="control is-expanded">
                <input
                  {...register("input_name")}
                  name="allergy"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">
              Code Status/CODE BLUE event?
            </label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="codeBlueEvent"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="codeBlueEvent"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">Patient Family Concerns</label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="patientFamilyConcerns"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">
                Medications (pertinent issues / effectiveness)
              </label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="medicationsIssues"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <label className="label is-small">
                Recent Intervention / Effectiveness
              </label>
              <div className="control">
                <textarea
                  {...register("input_name")}
                  name="recentInterventionOrEffectiveness"
                  className="textarea is-small"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="columns mt-2">
            <div className="column">
              <div className="field">
                <label className="label is-small">Abnormal Labs</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="abnormalLabs"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Vital Signs</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="vitalSigns"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Pain Status (Score)</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="painStatus"
                    className="input is-small"
                    type="number"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              IV infusions in last 24 hours or blood product
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="ivInfusions"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Drains/Tubes in situ</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="drains"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Wounds/Dressing</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="woundsOrDressing"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field w-100 mt-3">
            <label className="label is-small">Decubitus ulcer present?</label>
            <div className="control">
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="ulcerPresent"
                />
                <span className="ms-2">Yes</span>
              </label>
              <label className="radio">
                <input
                  {...register("input_name")}
                  type="radio"
                  name="ulcerPresent"
                />
                <span className="ms-2">No</span>
              </label>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Neurological/Mental Status
                </label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="mentalStatus"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Breathing/Respiratory</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="breathing"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Cardiovascular</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="cardio"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">GI</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="gastro"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Urinary tract status</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="urinaryTractStatus"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Fluid input/output</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="fluidInputOrOutput"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Musculoskeletal</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="musculoSkeletal"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Immunization status</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="immunization"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Assistive Devices (mobility aids / speech aids
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="assistiveDevices"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Skin (edema, sore areas, blisters?)
                </label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="skin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Bone pain or joint pain
                </label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="pain"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">Others</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="others"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Any swellings? Type, Location, Color, Edema, Temp, Charge in size
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="swelling"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Level of consciousness, Speech, Pattern, Dementia, Confusion,
              Depression
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="level"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Cough (description... Dry?)
                </label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="cough"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Temp</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="temp"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Shortness of Breath, difficulty breathing, orthopnea
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="breathing"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Respiratory rate</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="respiratoryRate"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Pulse Oximetry</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="pulseOxi"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Oxygen/litres</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="oxygen"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Patient / Family Education: Topics addressed
            </label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="patientFamilyEdu"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">Name of persons educated</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="educatedPerson"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field mt-3">
            <label className="label is-small">
              Latest vital signs (state time taken)
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="latestVitalSigns"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <label className="label is-small">Pulse</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="pulse"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Respirations</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="respirations"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Q2 Sat</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="q2Sat"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              Heart Rate Regulatory SOB (Shortness of Breath?) edema
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="hrtRate"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">
              Appetite changes, Diet type, Thickened liquids, TPN Weight
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="appetiteChanges"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">
              Abdominal tenderness, Distention, Vomitting, Nausea
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="abdominalTenderness"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">
              Catheter urine color dysuria frequency, Last UTIO
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="catheterUrine"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">
              Risk identified and mitigated e.g Fall risk status
            </label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="risks"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Others</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="others"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <p className="control is-expanded mt-3">
            Discuss only elements that have recently changed or are pertinent to
            this patient
          </p>
          <div className="content mt-3">
            <ol>
              <li>
                <strong>Situation</strong>
              </li>
              <p>
                What do you think is going on with the patient <br />
                Do you have concerns about this patient? If yes, are they mild,
                moderate or severe? <br /> Discharge planning issues or concerns
                that needs to be addressed <br />
                Any incidents in past 24 hours e.g. clinical errors, delayed
                medications, cancelled surgery, drug reaction etc. (please fill
                out all relevant incident forms if so).
              </p>
              <div className="field">
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="situation"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
              <li className="mt-3">
                <strong>Assessment</strong>
              </li>
              <p>
                Care / issues requiring follow-up <br />
                Medication orders requiring completion / follow up <br />{" "}
                Pending treatment/tests
                <br />
                Issues/items left undone that requires follow-up e.g outstandng
                results <br />
                Complaints by patient or relative (signs of unmet needs)
              </p>
              <div className="field">
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="careOrIssues"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
              <li className="mt-3">
                <strong>Recommendation</strong>
              </li>
              <p>
                System: Discuss only systems pertinent to the patient <br />
                Patient admitting physician, admitting diagnosis/secondary
                diagnosis <br /> Most current/pertinent issues.
              </p>
              <div className="field">
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="recommendations"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
            </ol>
          </div>
          <div className="field">
            <label className="label is-small">Room</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="room"
                className="input is-small"
                type="number"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">
              Any special post discharge needs? e.g. home care, mobility, rehab?
            </label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="specialPost"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Other comments</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="otherComments"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Handed over by</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="handedOverBy"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Taken over by</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="takenOverBy"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Signature</label>
            <p className="control is-expanded">
              <input
                {...register("input_name")}
                name="signature"
                className="input is-small"
                type="text"
              />
            </p>
          </div>
          <div className="field mt-3">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DailyShiftHandoverNote;
