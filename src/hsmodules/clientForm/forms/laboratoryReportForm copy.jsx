import {useForm} from "react-hook-form";
import React, {useState} from "react";

const LaboratoryReportForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  const [isHeam, setIsHeam] = useState(false);
  const [isSero, setIsSero] = useState(false);
  const [isBio, setIsBio] = useState(false);
  const [isMicro, setIsMicro] = useState(false);
  const [isUrine, setIsUrine] = useState(false);
  const [isUrinalysis, setIsUrinalysis] = useState(false);
  const [isStool, setIsStool] = useState(false);
  const [isHvs, setIsHvs] = useState(false);

  const handleHaem = () => {
    setIsHeam(!isHeam);
  };

  const handleSerology = () => {
    setIsSero(!isSero);
  };

  const handleBioChem = () => {
    setIsBio(!isBio);
  };

  const handleMicro = () => {
    setIsMicro(!isMicro);
  };

  const handleUrine = () => {
    setIsUrine(!isUrine);
  };

  const handleUrinalysis = () => {
    setIsUrinalysis(!isUrinalysis);
  };

  const handleStool = () => {
    setIsStool(!isStool);
  };

  const handleHvs = () => {
    setIsHvs(!isHvs);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Laboratory Report</p>
        </div>

        <div className="card-content vscrollable">
          <label className="label is-small" onClick={handleHaem}>
            HEAMATOLOGY
          </label>
          {isHeam && (
            <div>
              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">HB</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="hb"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">PCV</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="pcv"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">WBC</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="wbc"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">ESR</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="esr"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Platelets</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="platelets"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Rectics</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="rectics"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">RBC</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="rbc"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">MCV</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="mcv"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">MCHC</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="mchc"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">MCH</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="mch"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Neutrophils</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="neutrophils"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Lymphocytes</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="lymphocytes"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Monocytes</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="monocytes"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Eosinophils</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="eosinophils"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Basophils</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="basophils"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Pro-Myelocyte
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="proMyelocyte"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Meta-Myelocyte
                      </label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="metaMyelocyte"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Nucleated RBC
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="nucleatedRbc"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Genotype</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="genotype"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Blood Group</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="bldGroup"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <label className="label is-small" onClick={handleSerology}>
            SEROLOGY
          </label>
          {isSero && (
            <>
              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">HBsAG</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="hbsag"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">HCV</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="hcv"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">VDRL</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="vdrl"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">RPHA</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="rpha"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">COOMBS</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="coombs"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">A.S.O Titre</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="asoTitre"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">SLE</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="sle"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">R.A Factor</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="raFactor"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">B-HCG</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="bHcg"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">MANTOUX</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="mantoux"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Blood Preg. Test
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="bldPregTest"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">XYZ</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="xyz"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <label className="label is-small" onClick={handleBioChem}>
            BIOCHEMISTRY
          </label>
          {isBio && (
            <>
              <div className="columns mt-3 is-flex-wrap-wrap">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Glucose (Fasting)
                      </label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="glucoseFasting"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Glucose (Random)
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="glucoseRandom"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Urea</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="urea"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Creatinine</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="creatinine"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Uric Acid</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="uricAcid"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Sodium</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="sodium"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Potassium</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="potassium"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Bicarbonate</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="bicarbonate"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Chloride</label>
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
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Total Protein
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="totalProtein"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Albumin</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="albumin"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        T. Bilirubin
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="tBilirubin"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">D.Bilirubin</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="dBilirubin"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Cholesterol</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="cholesterol"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Triglyceride
                      </label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="triglyceride"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Phos</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="phos"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Calcium</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="calcium"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">SGOT</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="sgot"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">SGPT</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="sgpt"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">OGTT</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="ogtt"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Alk Phos</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="alkPhos"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Acid Phos</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="acidPhos"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">ADH</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="adh"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">APK</label>
                      <div className="control">
                        <input
                          {...register("input_name")}
                          name="apk"
                          className="input is-small"
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns mt-3">
                <div className="column">
                  <div className="field-body">
                    <div className="field">
                      <label className="label is-small">Amylase</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="amylase"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <label className="label is-small" onClick={handleMicro}>
            MICROBIOLOGY
          </label>
          {isMicro && (
            <div className="field">
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="urinalysisOrMicro"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Urinanalysis/Microscope</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="stoolAnalysis"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Stool Analysis</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="stoolOccult"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Stool Occult</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="semenAnalysis"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Semen Analysis</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="gramStain"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Gram Stain</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="znStain"
                  type="checkbox"
                />
                <span className="ms-2 is-small">ZN Stain</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="mantouxTest"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Mantoux Test</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="fungalStudies"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Fungal Studies</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="urine"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Urine</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="throatSwab"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Throat Swab</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="aspirateAndDischarge"
                  type="checkbox"
                />
                <span className="ms-2 is-small">
                  C/S/PUS/Aspirate/Discharge
                </span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="woundSwab"
                  type="checkbox"
                />
                <span className="ms-2 is-small">C/S Wound Swab</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="semen"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Semen</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="fluid"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Fluid</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="stool2"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Stool</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="endocerviclSwab"
                  type="checkbox"
                />
                <span className="ms-2 is-small">C/S Endocervical Swab</span>
              </label>
              <label class="checkbox me-3">
                <input {...register("input_name")} name="hvs" type="checkbox" />
                <span className="ms-2 is-small">M/C/S HVS</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="sputum"
                  type="checkbox"
                />
                <span className="ms-2 is-small">M/C/S Sputum</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="csBld"
                  type="checkbox"
                />
                <span className="ms-2 is-small">C/S Blood</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="microfilariaSkin"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Microfilaria-Skin Snip</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="otherSwab"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Other Swab (Specify)</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="faecalOccultBld"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Faecal Occult Blood</span>
              </label>
              <label class="checkbox me-3">
                <input
                  {...register("input_name")}
                  name="salmoOrshigella"
                  type="checkbox"
                />
                <span className="ms-2 is-small">Salmonella/Shigella</span>
              </label>
            </div>
          )}

          <label className="label is-small" onClick={handleUrine}>
            URINE
          </label>
          {isUrine && (
            <>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Macroscopy</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="macroscopy"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Microscopy</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="microscopy"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Pus Cells/hof
                      </label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="pusCellsOrhof"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Rbs/hpf</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="rbsOrHpf"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Yeast Cells</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="yeastCells"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Bacteria</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="bacteria"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Gasts</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="gasts"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Epith Cells</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="epithCells"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Crystals</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="crystals"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">T.V</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="tv"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field">
                <label className="label is-small">Culture Yielded</label>
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="cultureYielded"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label is-small">Malaria Parasite</label>
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="malariaParasite"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
            </>
          )}

          <label className="label is-small" onClick={handleUrinalysis}>
            URINALYSIS
          </label>
          {isUrinalysis && (
            <>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Appearance</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="appearance"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Color</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="color"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">PH</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="ph"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Protein</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="protein"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Sugar</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="sugar"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Ketones</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="ketones"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Blood</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="blood"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Billirubin</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="billirubin"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">S.G</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="sg"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Nitrite</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="nitrite"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Urobilin</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="urobilin"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Urobilinogen
                      </label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="urobilinogin"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Leucocyte</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="leucocyte"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <label className="label is-small" onClick={handleStool}>
            STOOL
          </label>
          {isStool && (
            <>
              <div className="field">
                <label className="label is-small">Macro</label>
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="macro"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label is-small">Micro</label>
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="micro"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
              <div className="field">
                <label className="label is-small">Culture</label>
                <div className="control">
                  <textarea
                    {...register("input_name")}
                    name="culture2"
                    className="textarea is-small"
                  ></textarea>
                </div>
              </div>
            </>
          )}

          <label className="label is-small" onClick={handleHvs}>
            HVS CULTURE
          </label>
          {isHvs && (
            <>
              <label className="label is-small mt-3">Wet Prep</label>

              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">
                        Pus cells' hpf
                      </label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="pusCells"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Rbcs/hpf</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="rbcsOrHpf"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Yeast Cells</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="yeastCells"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Bacteria</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="bacteria2"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Casts</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="casts"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Epith Cells</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="epithCells2"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">Crystals</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="crystals2"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field-body">
                    <div className="field is-flex">
                      <label className="label is-small mr-2">T.V</label>
                      <p className="control is-expanded">
                        <input
                          {...register("input_name")}
                          name="tv2"
                          className="input is-small"
                          type="text"
                        />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          <div className="field mt-4">
            <button className="button is-success is-small">Submit Form</button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LaboratoryReportForm;
