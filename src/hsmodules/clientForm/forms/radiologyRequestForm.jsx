import {useForm} from "react-hook-form";

const RadiologyRequestForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Radiology Request Form</p>
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
                <label className="label is-small">Tel</label>
                <p className="control is-expanded">
                  <input
                    {...register("input_name")}
                    name="telephone"
                    className="input is-small"
                    type="tel"
                  />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">
              SPECIAL RADIOGRAPHIC INFORMATION
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ivUrography"
                type="checkbox"
              />
              <span className="ms-2 is-small">Intraveneous Urography</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ascendingUrethrography"
                type="checkbox"
              />
              <span className="ms-2 is-small">Ascending Urethrography</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="percatheterAscendingUrethrography"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Percatheter Ascending Urethrography
              </span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="micturatingCytourethrography"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Micturating Cytourethrography
              </span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="cytourethrography"
                type="checkbox"
              />
              <span className="ms-2 is-small">Cytourethrography</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="sinographyOrFistulography"
                type="checkbox"
              />
              <span className="ms-2 is-small">Sinography/Fistulography</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="skeletalSurneyAdult"
                type="checkbox"
              />
              <span className="ms-2 is-small">Skeletal Surney - Adult</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="mammography"
                type="checkbox"
              />
              <span className="ms-2 is-small">Mammography</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="wellWomanPackage"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Well Woman Package (Mammo, Chest, X-ray, PAP Smear)
              </span>
            </label>
          </div>
          <span className="label is-small">
            COMPUTED TOMOGRAPHIC INFORMATION
          </span>
          <div className="field">
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctBrain"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Brain</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctFacial"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Facial</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctSinuses"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Sinuses</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctInternalAuditoryMeatus"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Internal Auditory Meatus</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctBrainOrPituitary"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Brain / Pituitary</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctBrainOrOrbitOrSinuses"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Brain / Orbit / Sinuses</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctNeck"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Neck (Thyroid Gland)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctChest"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Chest</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctAbdomen"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Abdomen</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctPelvic"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Pelvic</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctAbdomenAndPelvic"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Abdomen & Pelvic</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctCervicalSpine"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Cervical Spine</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctThoracicSpine"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Thoracic Spine</span>
            </label>
            {/* <label class="checkbox me-3">
              <input {...register("input_name")} name="ctPelvic2" type="checkbox" />
              <span className="ms-2 is-small">CT Pelvic</span>
            </label> */}
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctLumboSpine"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Lumbosacral Spine</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctTwoSpinalRegion"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Two Spinal Region</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ctThreeSpinalRegions"
                type="checkbox"
              />
              <span className="ms-2 is-small">CT Three Spinal Regions</span>
            </label>
          </div>
          <label className="label is-small">
            ROUTINE RADIOGRAPHIC INVESTIGATION
          </label>
          <div className="field">
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="skullAllView"
                type="checkbox"
              />
              <span className="ms-2 is-small">Skull - All View</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="skullApAndLateral"
                type="checkbox"
              />
              <span className="ms-2 is-small">Skull - AP & Lateral</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="sinuses"
                type="checkbox"
              />
              <span className="ms-2 is-small">Sinuses</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="mastoids"
                type="checkbox"
              />
              <span className="ms-2 is-small">Mastoids</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="temporomandibularJoints"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Temporomandibular Joints (TMJ)
              </span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="cervicalSpineAllViews"
                type="checkbox"
              />
              <span className="ms-2 is-small">Cervical Spine - All Views</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="dorsalSpine"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Dorsal Spine (Thraoracic Spine)
              </span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="thoracolumnerSpine"
                type="checkbox"
              />
              <span className="ms-2 is-small">Thoracolumner Spine</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="lumbosacralSpineAL"
                type="checkbox"
              />
              <span className="ms-2 is-small">
                Lumbosacral Spine (AP & Lateral)
              </span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="oneOrBothHip"
                type="checkbox"
              />
              <span className="ms-2 is-small">One Hip / Both Hip</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="chestAL"
                type="checkbox"
              />
              <span className="ms-2 is-small">Chest (Ap & Lateral)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="chestApOnly"
                type="checkbox"
              />
              <span className="ms-2 is-small">Chest (Ap Only)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="abdomenSupineErect"
                type="checkbox"
              />
              <span className="ms-2 is-small">Abdomen (Supine & Erect)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="abdomenOneView"
                type="checkbox"
              />
              <span className="ms-2 is-small">Abdomen (One View)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="shoulderJoint"
                type="checkbox"
              />
              <span className="ms-2 is-small">Shoulder Joint</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="forearmRadiusAndUlner"
                type="checkbox"
              />
              <span className="ms-2 is-small">Forearm (Radius & Ulner)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="wristJoint"
                type="checkbox"
              />
              <span className="ms-2 is-small">Wrist Joint</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="hand" type="checkbox" />
              <span className="ms-2 is-small">Hand</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="femur" type="checkbox" />
              <span className="ms-2 is-small">Thigh - Femur</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="knee" type="checkbox" />
              <span className="ms-2 is-small">Knee Joint</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="leg" type="checkbox" />
              <span className="ms-2 is-small">Leg - Tibia & Fibular</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="ankleJoint"
                type="checkbox"
              />
              <span className="ms-2 is-small">Ankle Joint</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="foot" type="checkbox" />
              <span className="ms-2 is-small">Foot</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="postNasalSpace"
                type="checkbox"
              />
              <span className="ms-2 is-small">Post - Nasal Space</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="risserTest"
                type="checkbox"
              />
              <span className="ms-2 is-small">Risser Test</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="pelvic"
                type="checkbox"
              />
              <span className="ms-2 is-small">Pelvic</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="mandible"
                type="checkbox"
              />
              <span className="ms-2 is-small">Mandible</span>
            </label>
            <label class="checkbox me-3">
              <input {...register("input_name")} name="orbit" type="checkbox" />
              <span className="ms-2 is-small">Orbit</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="neckSoftTissue"
                type="checkbox"
              />
              <span className="ms-2 is-small">Neck (Soft Tissue)</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="sacrum"
                type="checkbox"
              />
              <span className="ms-2 is-small">Sacrum / Coccyx</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="clavicle"
                type="checkbox"
              />
              <span className="ms-2 is-small">Clavicle</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="patellaViews"
                type="checkbox"
              />
              <span className="ms-2 is-small">Patella Views</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="scapula"
                type="checkbox"
              />
              <span className="ms-2 is-small">Scapula</span>
            </label>
            <label class="checkbox me-3">
              <input
                {...register("input_name")}
                name="thoracicInlet"
                type="checkbox"
              />
              <span className="ms-2 is-small">Thoracic Inlet</span>
            </label>
          </div>
          <span className="label mt-4 is-small">ULTRASOUND</span>
          <span className="label mt-4 is-small">MRI</span>
          <div className="field">
            <label className="is-small label">DOCTOR'S NAME</label>
            <div className="control">
              <textarea
                {...register("input_name")}
                name="mriDrName"
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

export default RadiologyRequestForm;
