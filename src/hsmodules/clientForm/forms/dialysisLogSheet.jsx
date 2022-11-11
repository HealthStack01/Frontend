import {useForm} from "react-hook-form";

const DialysisLogSheet = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Dialysis Log Sheet</p>
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
                <label className="label is-small">Date</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="date"
                    className="input is-small"
                    type="date"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">No of Dialysis</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="noOfDialysis"
                    className="input is-small"
                    type="number"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Age</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="age"
                    className="input is-small"
                    type="number"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Sex</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="sex"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Diagnosis</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="diagnosis"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Dry Weight</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="dryWgt"
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
                <label className="label is-small">Last Dialysis WT</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="lastDialysisWgt"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Current WT</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="currentWgt"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Weight Loss/Gain</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="wgtLossOrGain"
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
                <label className="label is-small">Ultra Filtration</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="ultraFiltration"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Post Dialysis WT</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="postDialysisWgt"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Weight Loss</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="wgtLoss"
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
                <label className="label is-small">Machine Type</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="macType"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Time Started</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="timeStarted"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Time Ended</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="timeEnded"
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
                <label className="label is-small">B/P</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="bP"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Pulse</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="pulseRate"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Resp</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="resp"
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
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Sp02</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="sp02"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">HIV</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hiv"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">HEP.C</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hepC"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">HEP.B</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hepB"
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
                <label className="label is-small">PVC</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="pvc"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">BLOOOD GROUP</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="bldGrp"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Pre Assessment</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="preAssessment"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Post Assessment</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="postAsssessment"
                className="textarea is-small"
              ></textarea>
            </div>
          </div>
          <label className="label is-medium mt-4">Prescription</label>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">HR of Dialysis</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="hrOfDialysis"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Type of Dialysis</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="typeOfDialysis"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Concentrate</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="conc"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Access Route</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="accessRoute"
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
                <label className="label is-small">Heparin</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="heparin"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Blood</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="bld"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Infusion</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="infusion"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Drugs</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="drugs"
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
                <label className="label is-small">Epogen</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="epogen"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Cannulation</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="cannulation"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Sodium</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="sodium"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Potassium</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="potassium"
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
                <label className="label is-small">Chloride</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="chloride"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Bicerp</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="bicerp"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Urea</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="urea"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Nurse</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="nurse"
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
                <label className="label is-small">Salvage</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="salvage"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Maintenance</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="maintenance"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">KTV</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="ktv"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">EODEMA</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="eodema"
                    className="input is-small"
                    type="text"
                  />
                </p>
              </div>
            </div>
          </div>

          {/* <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">EODEMA</label>
                <p className="control is-expanded">
                  <input {...register("input_name")} name="" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div> */}

          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default DialysisLogSheet;
