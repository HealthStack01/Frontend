   import { useForm } from "react-hook-form";

const GreenDiagnosticCentre = ({onSubmit}) => {

  const { register, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Green Diagnostic Centre</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <label className="label is-small">Name</label>
            <p className="control is-expanded">
              <input ref={register} name="name" className="input is-small" type="text" />
            </p>
          </div>
          <div className="field">
            <label className="label is-small">Hospital No</label>
            <p className="control is-expanded">
              <input ref={register} name="hospitalNum" className="input is-small" type="text" />
            </p>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Age</label>
                <p className="control is-expanded">
                  <input ref={register} name="age" className="input is-small" type="number" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Sex</label>
                <p className="control is-expanded">
                  <input ref={register} name="sex" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Nature of Specimen</label>
                <p className="control is-expanded">
                  <input ref={register} name="natureOfSpecimen" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label is-small">Clinician</label>
                <p className="control is-expanded">
                  <input ref={register} name="clinician" className="input is-small" type="text" />
                </p>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">
                  Date & Time of Collection
                </label>
                <div className="control">
                  <input ref={register} name="dateAndTimeOfCollection" className="input is-small" type="datetime" />
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label is-small">Clinical Summary</label>
                <p className="control is-expanded">
                  <input ref={register} name="clinicalSummary" className="input is-small" type="text" />
                </p>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label is-small">Haematology</label>
            <label class="checkbox me-3">
              <input ref={register} name="cbcOrfbc" type="checkbox" />
              <span className="ms-2 is-small">CBC/FBC</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="esr" type="checkbox" />
              <span className="ms-2 is-small">ESR</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="bldGrp" type="checkbox" />
              <span className="ms-2 is-small">Blood Group</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="malariaParasite" type="checkbox" />
              <span className="ms-2 is-small">Malaria Parasite</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="plateletCount" type="checkbox" />
              <span className="ms-2 is-small">Platelet Count</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="genotype" type="checkbox" />
              <span className="ms-2 is-small">Genotype</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="urinalysis" type="checkbox" />
              <span className="ms-2 is-small">Urinalysis</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="stoolAnalysis" type="checkbox" />
              <span className="ms-2 is-small">Stool Analysis</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="protein" type="checkbox" />
              <span className="ms-2 is-small">Protein (Urin24hrs)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="liqProfile" type="checkbox" />
              <span className="ms-2 is-small">Liquid Profile</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cholesterol" type="checkbox" />
              <span className="ms-2 is-small">Cholesterol</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="trygleceride" type="checkbox" />
              <span className="ms-2 is-small">Trygleceride</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="crp" type="checkbox" />
              <span className="ms-2 is-small">CRP</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ecg" type="checkbox" />
              <span className="ms-2 is-small">ECG</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="chestXray" type="checkbox" />
              <span className="ms-2 is-small">Chest Xray</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="echocardio" type="checkbox" />
              <span className="ms-2 is-small">Echocardiography</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="xray" type="checkbox" />
              <span className="ms-2 is-small">Xray</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ctScan" type="checkbox" />
              <span className="ms-2 is-small">CT Scan(128 slice)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="mri" type="checkbox" />
              <span className="ms-2 is-small">MRI</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="mammogram" type="checkbox" />
              <span className="ms-2 is-small">Mammogram</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Clinical Chemistry</label>
            <label class="checkbox me-3">
              <input ref={register} name="bgFasting" type="checkbox" />
              <span className="ms-2 is-small">Blood Glucose Fasting</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="bgRandom" type="checkbox" />
              <span className="ms-2 is-small">Blood Glucose, Random</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="bg2Hr" type="checkbox" />
              <span className="ms-2 is-small">Blood Glucose 2hr pp</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="oGlucoseTolerance" type="checkbox" />
              <span className="ms-2 is-small">Oral glucose tolerance</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="proteinTotalAndAlbumin" type="checkbox" />
              <span className="ms-2 is-small">Protein, Total & Albumin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="liverFxnTexts" type="checkbox" />
              <span className="ms-2 is-small">Liver Function Tests</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="hbA1c" type="checkbox" />
              <span className="ms-2 is-small">HbA1c</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cPeptide" type="checkbox" />
              <span className="ms-2 is-small">C-Peptide</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cholesterolTotal" type="checkbox" />
              <span className="ms-2 is-small">Cholesterol Total</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="alkPhos" type="checkbox" />
              <span className="ms-2 is-small">Alk. Phos</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="gammaGt" type="checkbox" />
              <span className="ms-2 is-small">Gamma-GT</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ast" type="checkbox" />
              <span className="ms-2 is-small">AST (GOT)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="alt" type="checkbox" />
              <span className="ms-2 is-small">ALT (GPT)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="electrolytes" type="checkbox" />
              <span className="ms-2 is-small">Electrolytes</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="urea" type="checkbox" />
              <span className="ms-2 is-small">Urea</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="creatinine" type="checkbox" />
              <span className="ms-2 is-small">Creatinine</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="amylase" type="checkbox" />
              <span className="ms-2 is-small">Amylase</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="lipase" type="checkbox" />
              <span className="ms-2 is-small">Lipase</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="uricAcid" type="checkbox" />
              <span className="ms-2 is-small">Uric Acid</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="calcium" type="checkbox" />
              <span className="ms-2 is-small">Calcium</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="inorgPhos" type="checkbox" />
              <span className="ms-2 is-small">Inorg Phosphorus</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="mg" type="checkbox" />
              <span className="ms-2 is-small">Magnesium</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="li" type="checkbox" />
              <span className="ms-2 is-small">Lithium</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="creatinineClearance" type="checkbox" />
              <span className="ms-2 is-small">Creatinine clearance 24hrs</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Hormonal Assays</label>
            <label class="checkbox me-3">
              <input ref={register} name="fsh" type="checkbox" />
              <span className="ms-2 is-small">FSH</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="lh" type="checkbox" />
              <span className="ms-2 is-small">LH</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="prolactin" type="checkbox" />
              <span className="ms-2 is-small">Prolactin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="testosterone" type="checkbox" />
              <span className="ms-2 is-small">Testosterone</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="estradiol" type="checkbox" />
              <span className="ms-2 is-small">Estradiol, E2</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cortisol" type="checkbox" />
              <span className="ms-2 is-small">Cortisol</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="dheas" type="checkbox" />
              <span className="ms-2 is-small">DHEAS</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="thyroidFxnText" type="checkbox" />
              <span className="ms-2 is-small">Thyroid Function test</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="antiThyroidAntibody" type="checkbox" />
              <span className="ms-2 is-small">Anti Thyroid Antibody</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="pth" type="checkbox" />
              <span className="ms-2 is-small">PTH</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="progesterone" type="checkbox" />
              <span className="ms-2 is-small">117-OH Progesterone</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="bhcg" type="checkbox" />
              <span className="ms-2 is-small">BHCG</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="insulin" type="checkbox" />
              <span className="ms-2 is-small">Insulin</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Cytology/Histology</label>
            <label class="checkbox me-3">
              <input ref={register} name="papSmear" type="checkbox" />
              <span className="ms-2 is-small">Pap Smear</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="fluidCytology" type="checkbox" />
              <span className="ms-2 is-small">Fluid Cytology</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Tumor Markers</label>
            <label class="checkbox me-3">
              <input ref={register} name="psa" type="checkbox" />
              <span className="ms-2 is-small">PSA</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ca125" type="checkbox" />
              <span className="ms-2 is-small">CA-125</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ca19" type="checkbox" />
              <span className="ms-2 is-small">CA-19.9</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ca15" type="checkbox" />
              <span className="ms-2 is-small">CA-15.3</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cea" type="checkbox" />
              <span className="ms-2 is-small">CEA</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="alphaFetoProtein" type="checkbox" />
              <span className="ms-2 is-small">Alpha Feto Protein</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="BenceJonesProtein" type="checkbox" />
              <span className="ms-2 is-small">Bence Jones Protein</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Special Test</label>
            <label class="checkbox me-3">
              <input ref={register} name="tTests" type="checkbox" />
              <span className="ms-2 is-small">T3, T4, TSH </span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="fLP" type="checkbox" />
              <span className="ms-2 is-small">FSH, LH Prolactin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="totalTesto" type="checkbox" />
              <span className="ms-2 is-small">Total Testosterone</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="bHcg" type="checkbox" />
              <span className="ms-2 is-small">B-HCG</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="progesterone2" type="checkbox" />
              <span className="ms-2 is-small">Progesterone</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="estradiol2" type="checkbox" />
              <span className="ms-2 is-small">Estradiol (E2)</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="dheas2" type="checkbox" />
              <span className="ms-2 is-small">DHEAS</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ansOrdna" type="checkbox" />
              <span className="ms-2 is-small">ANS/DNA</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="totalIggOrIgm" type="checkbox" />
              <span className="ms-2 is-small">Torch IgG/Igm</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="acp" type="checkbox" />
              <span className="ms-2 is-small">APP/CEA/PSA</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="fAcid" type="checkbox" />
              <span className="ms-2 is-small">Folic Acid</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ferritin" type="checkbox" />
              <span className="ms-2 is-small">Ferritin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="digoxin" type="checkbox" />
              <span className="ms-2 is-small">Digoxin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="cortisol2" type="checkbox" />
              <span className="ms-2 is-small">Cortisol</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="insulin2" type="checkbox" />
              <span className="ms-2 is-small">Insulin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="vitB12" type="checkbox" />
              <span className="ms-2 is-small">Vitamin B12</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="vitD" type="checkbox" />
              <span className="ms-2 is-small">Vitamin D</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="dnaPaternityTest" type="checkbox" />
              <span className="ms-2 is-small">DNA Paternity Test</span>
            </label>
          </div>
          <div className="field">
            <label className="label is-small">Cardiac Markers</label>
            <label class="checkbox me-3">
              <input ref={register} name="myoglobin" type="checkbox" />
              <span className="ms-2 is-small">Myoglobin</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ckMb" type="checkbox" />
              <span className="ms-2 is-small">CK-MB</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="troponinI" type="checkbox" />
              <span className="ms-2 is-small">Troponin I</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="troponinT" type="checkbox" />
              <span className="ms-2 is-small">Troponin T</span>
            </label>
            <label class="checkbox me-3">
              <input ref={register} name="ck" type="checkbox" />
              <span className="ms-2 is-small">CK</span>
            </label>
          </div>
          <div className="field">
            <label className="is-small label">Others(Pls specify)</label>
            <div className="control">
              <textarea ref={register} name="others" className="textarea is-small"></textarea>
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

export default GreenDiagnosticCentre;
