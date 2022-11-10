import {useForm} from "react-hook-form";

const DiabetesMelitus = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card">
          <div className="card-header">
            <p className="card-header-title">Diabetes Melitus Flowsheet</p>
          </div>
          <div className="card-content vscrollable">
            <div className="field">
              <label className="label is-small">Name</label>
              <p className="control is-expanded">
                <input
                  {...register("input_name")}
                  name="name"
                  className="input is-small"
                  type="text"
                />
              </p>
            </div>
            <div className="columns">
              <div className="column">
                <div className="field">
                  <label className="label is-small">D.O.B</label>
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
                  <label className="label is-small">MR#</label>
                  <p className="control is-expanded">
                    <input
                      {...register("input_name")}
                      name="mr#"
                      className="input is-small"
                      type="text"
                    />
                  </p>
                </div>
              </div>
            </div>
            <p className="control is-expanded mt-3">
              Patient Learning Need/Goal
            </p>
            <div className="content mt-3">
              <ol>
                <li>
                  <strong>General Facts About Diabetes Mellitus</strong>
                  <ul>
                    <li>
                      <strong>What is Diabetes Melitus?</strong>
                    </li>
                    <li>
                      <strong>
                        Basic Pathophysiology of Type I/ Type II Diabetes
                        Mellitus?
                      </strong>
                    </li>
                    <li>
                      <strong>Normal and Abnormal Glucose Levels?</strong>
                    </li>
                    <li>
                      <strong>Normal and Abnormal HgbAIC Levels?</strong>
                    </li>
                    <li>
                      <strong>Results and Significance of DCCT Report</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="patientNeedDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="learnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="dmEduc"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="otherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Dietary Management</strong>
                  <ul>
                    <li>
                      <strong>Weight Reduction Targets</strong>
                    </li>
                    <li>
                      <strong>How to follow ADA Dietary</strong>
                    </li>
                    <li>
                      <strong>Guildlnes</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="mgtOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Treatment of DM w/Oral Hypoglycemic Agents</strong>
                  <ul>
                    <li>
                      <strong>
                        Type & Action of Drugs (incl, onset, peak & duration)
                      </strong>
                    </li>
                    <li>
                      <strong>Dosages</strong>
                    </li>
                    <li>
                      <strong>
                        Interactions, Side effects & Adverse reactions
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="txtDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="txtLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="txtDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="txtOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Treatment of DM w/Oral Hypoglycemic Agents</strong>
                  <ul>
                    <li>
                      <strong>
                        Type & Action of insulin (incl, onset, peak & duration)
                      </strong>
                    </li>
                    <li>
                      <strong>Dosages</strong>
                    </li>
                    <li>
                      <strong>
                        Interactions, Side effects & Adverse reactions
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Proper Technique of Insulin injection (w pt. demo)
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="oralDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="oralLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="oralDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="oralOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Hypoglycemia & Hyperglycemia</strong>
                  <ul>
                    <li>
                      <strong>Signs and Symptoms</strong>
                    </li>
                    <li>
                      <strong>Treatment of Hypoglycemia</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="glycemiaDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="glycemiaLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="glycemiaDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="glycemiaOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Blood Glucose Monitoring (BGM)</strong>
                  <ul>
                    <li>
                      <strong>
                        Use of Fingerstick Glucometer(w pt. demonstration)
                      </strong>
                    </li>
                    <li>
                      <strong>Urine testing for keynotes</strong>
                    </li>
                    <li>
                      <strong>Diary Keeping</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="bgmDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="bgmLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="bgmDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="bgmOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Exercise</strong>
                  <ul>
                    <li>
                      <strong>Benefits of Exercise</strong>
                    </li>
                    <li>
                      <strong>
                        Pt. Exercise limits & ability to perform ADLs
                      </strong>
                    </li>
                    <li>
                      <strong>
                        Types of Exercise & Location of Exercise Programs
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="execDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="execLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="execDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="execOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Complications of Diabetes Mellitus</strong>
                  <ul>
                    <li>
                      <strong>
                        Cardiovascular Events (esp. w/smoking, HTN, Cholesterol)
                      </strong>
                    </li>
                    <li>
                      <strong>Blindness</strong>
                    </li>
                    <li>
                      <strong>Infection of Limb or Loss</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="compliDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="compliLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="compliDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="compliOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Prevention of Complications of Mellitus</strong>
                  <ul>
                    <li>
                      <strong>Personal Hygeiene (incl skin & footcare)</strong>
                    </li>
                    <li>
                      <strong>Benefit of Opthalmologic exam</strong>
                    </li>
                    <li>
                      <strong>Benefits of Regular Podiatry</strong>
                    </li>
                    <li>
                      <strong>Benefits of Annual Dental Exam</strong>
                    </li>
                    <li>
                      <strong>
                        Recognition of Signs & Symptoms of infection
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="prevDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="prevLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="prevDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="prevOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Managing Sick Days and Illness</strong>
                  <ul>
                    <li>
                      <strong>When to call a Nurse or Physician</strong>
                    </li>
                    <li>
                      <strong>
                        Adjustment of Food & Medication to illness
                      </strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="mgtDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="mgtOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Psychological Adjustment</strong>
                  <ul>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="psychoDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="psychoLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="psychoDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="psychoOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>
                    Patient Responsibility in the Care of Diabetes
                  </strong>
                  <ul>
                    <li>
                      <strong>
                        Importance of Compliance w/Diet & Medication
                      </strong>
                    </li>
                    <li>
                      <strong>Adjustment of Regular Follow-up</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="careDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="careLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="careDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="careOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Family Education</strong>
                  <ul>
                    <li>
                      <strong>
                        Signs & Symptoms of Hypoglycemia & Hyperglcemia
                      </strong>
                    </li>
                    <li>
                      <strong>Emergency treatment of Hyperglycemia</strong>
                    </li>
                    <li>
                      <strong>ADA Dietary Guidelines</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="famDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="famLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="famDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="famOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Smoking</strong>
                  <ul>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="smokingDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="smokingLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="smokingDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="smokingOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
                <li className="mt-3">
                  <strong>Miscellaneous</strong>
                  <ul>
                    <li>
                      <strong>
                        Spares & Acquisition of Diabetic Equip & Supplies
                      </strong>
                    </li>
                    <li>
                      <strong>Benefits & Repsonsibilities of care</strong>
                    </li>
                    <div className="columns mt-4">
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Date</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="esDate"
                              className="input is-small"
                              type="date"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">Learn Level</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="esLearnLevel"
                              className="input is-small"
                              type="number"
                            />
                          </p>
                        </div>
                      </div>
                      <div className="column">
                        <div className="field">
                          <label className="label is-small">DM Educ.</label>
                          <p className="control is-expanded">
                            <input
                              {...register("input_name")}
                              name="esDmEdu"
                              className="input is-small"
                              type="text"
                            />
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="field">
                      <div className="control">
                        <textarea
                          {...register("input_name")}
                          name="esOtherInfo"
                          className="textarea is-small"
                        ></textarea>
                      </div>
                    </div>
                  </ul>
                </li>
              </ol>
            </div>
            <div className="field mt-4">
              <button className="button is-success is-small">
                Submit Form
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default DiabetesMelitus;
