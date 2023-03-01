import {useForm} from "react-hook-form";

const SurgicalBookletConsentForm = ({onSubmit}) => {
  const {register, handleSubmit} = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="card">
        <div className="card-header">
          <p className="card-header-title">Surgical Booklet Consent Form</p>
        </div>
        <div className="card-content vscrollable">
          <div className="field">
            <p className="control label is-small">Full Name</p>
            <input
              type="text"
              name="fullName"
              {...register("input_name")}
              id=""
              className="is-small input"
            />
          </div>
          <div className="columns mt-3">
            <div className="column">
              <div className="field">
                <p className="control label is-small">Full Name</p>
                <input
                  type="text"
                  name="fullNameAgain"
                  {...register("input_name")}
                  id=""
                  className="is-small input"
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <p className="control label is-small">Date of Birth</p>
                <input
                  type="date"
                  name="dateOfBirth"
                  {...register("input_name")}
                  id=""
                  className="is-small input"
                />
              </div>
            </div>
            <div className="column">
              <div className="field">
                <p className="control label is-small">Responsible Consultant</p>
                <input
                  type="text"
                  name="responsibleConsultant"
                  {...register("input_name")}
                  id=""
                  className="is-small input"
                />
              </div>
            </div>
          </div>
          <div className="content mt-4">
            <p className="label is-small">
              Name of proposed procedure or course of treatment (include brief
              explanation if medical term not clear)
              <textarea
                className="textarea dotted_bottom mt-3"
                type="text"
                name="proposedProcedure"
                {...register("input_name")}
                id=""
              ></textarea>{" "}
              <br />
              Statement of health professional (to be filled in by health
              professional with appropriate knowledge of proposed procedure, as
              specified in consent policy) <br /> <br />I have explained the
              procedure to the patient in particular: <br /> <br /> The intended
              benefits{" "}
              <textarea
                className="textarea dotted_bottom mt-3"
                type="text"
                name="statementOfHealthProfessional"
                {...register("input_name")}
                id="statementOfHealthProfessional"
              ></textarea>{" "}
              <br /> Serious or frequently occuring risks{" "}
              <textarea
                className="textarea dotted_bottom mt-3"
                type="text"
                {...register("input_name")}
                name="seriousOrFrequentlyOccuringRisks"
                id=""
              ></textarea>{" "}
              <br /> Any extra procedures which may become necessary during the
              procedure
            </p>{" "}
            <div className="field">
              <label class="checkbox me-3">
                <input
                  type="checkbox"
                  {...register("input_name")}
                  name="bloodTransfusion"
                />
                <span className="ms-2 is-small">Blood transfusion</span>
              </label>
              <label class="checkbox me-3">
                <input
                  type="checkbox"
                  {...register("input_name")}
                  name="otherProcedure"
                />
                <span className="ms-2 is-small">
                  other procedure (please specify)
                </span>
              </label>
              <textarea
                className="textarea dotted_bottom mt-3"
                type="text"
                name="extraProcedureInfo"
                {...register("input_name")}
                id=""
              ></textarea>{" "}
            </div>
          </div>
          <div className="field-body mt-3">
            <div className="field">
              <p className="label is-small">
                I have also discussed what the procedure is likely to involve,
                the benefits and risks of any available alternative treatments
                (including no treatment) and any particular concerns of this
                patient <br /> <br />
                <label class="checkbox me-3">
                  <input
                    type="checkbox"
                    {...register("input_name")}
                    name="patientConsentGiven"
                  />
                  <span className="ms-2 is-small">
                    The following leaflet/tape has been provided (if applicable)
                    <input
                      className="dotted_bottom"
                      type="text"
                      name="leafletOrTape"
                      {...register("input_name")}
                      id=""
                    />{" "}
                    <br /> <br />
                  </span>
                </label>
                This process will involves{" "}
                <label class="checkbox me-3 ms-3">
                  <input
                    type="checkbox"
                    name="generalOrRegionalAnaesthesia"
                    {...register("input_name")}
                  />
                  <span className="ms-2 is-small">
                    general and/or regional anaesthesia
                  </span>
                </label>
                <label class="checkbox me-3">
                  <input
                    type="checkbox"
                    name="localAnaesthesia"
                    {...register("input_name")}
                  />
                  <span className="ms-2 is-small">local anaesthesia</span>
                </label>
                <label class="checkbox me-3">
                  <input
                    type="checkbox"
                    name="sedation"
                    {...register("input_name")}
                  />
                  <span className="ms-2 is-small">sedation</span>
                </label>{" "}
                <br /> <br />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Signature
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="signatureForAnaesthesia"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Date
                <input
                  className="dotted_bottom"
                  type="dateOfAnaesthesia"
                  {...register("input_name")}
                  name="date"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Name (print)
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="nameOfAnaesthesian"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Job Title
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="jobTitleOfAnaesthesian"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="field">
            <p className="label is-small">
              <span className="label is-small">Contact Detail</span>
              <input
                className="dotted_bottom"
                type="text"
                {...register("input_name")}
                name="contactDetail"
                id=""
              />
            </p>
          </div>
          <div className="field">
            <p className="label is-small">
              <span className="label is-small">
                Statement of interpreter (where appropriate) <br />I have
                interpreted the information above to the patient to the best of
                my ability and in a way in which i believe s/he can understand.
              </span>{" "}
              <br />
            </p>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Signature
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="interpreterSignature"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Date
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="interpreterDate"
                  name=""
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Name (print)
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="interpreterName"
                  id=""
                />
              </p>
            </div>
          </div>
          <label htmlFor="" className="label is-small">
            State of Patient
          </label>
          <div className="field">
            <p className="label is-small">
              Please read this form carefully. If you have any further
              questions, do ask- we are here to help you. You have the right to
              change your mind at any time, including after you have signed this
              form <br /> <br />
              I agree to the procedure or course of treatment described on this
              form. <br /> <br /> I understand that you cannot give me a
              guarantee that a particular person will perfoem the procedure. The
              person will, however, have appropriate experience. <br /> <br />I
              understand that i will have the opportunity to discuss the details
              of the anaesthesia with an anaesthetist before the procedure,
              unless the urgency of my situation prevents this. (including
              moderate and deep sedation). <br /> <br /> I have understand that
              any additional procedure to those described on this form will only
              be carried out if it is necessary to save my life or to prevent
              serious harm to my health <br /> <br />I have been told about
              additional procedure which may become necessary during my
              treatment. I have listed below any procedure which i do not wish
              to be carried out without further discussion.
            </p>
          </div>
          <p className="label is-small">
            It has been explained to me the issues or other samples may be
            obtained for diagnosis.
          </p>
          <textarea
            className="textarea dotted_bottom mt-3"
            type="text"
            name="issuesExplained"
            {...register("input_name")}
            id=""
          ></textarea>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Patient's Signature
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="text"
                  name="patientSignature"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Date
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="date"
                  name="patientDate"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Name (print)
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="text"
                  name="parentOrNextofKinName"
                  id=""
                />
              </p>
            </div>
          </div>{" "}
          <p className="label is-small">
            Parents or guardian's signature (for minors) or next of kin for
            those unable to consent
          </p>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Patient's Signature
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="text"
                  name="parentOrNextofKinSignature"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Date
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="date"
                  name="parentOrNextofKinDate"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Name (print)
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="text"
                  name="healthProfessionalName"
                  id=""
                />
              </p>
            </div>
          </div>{" "}
          <p className="label is-small">
            Confirmation of Consent (to be completed by a health professional
            when the patient is admitted for the procedure, if the patient has
            signed the form in advance)
          </p>
          <p className="label is-small mt-4">
            On behalf of the team treating the patient, I have confirmed with
            the patient that s/he has no further questions and wishes the
            procedure to go ahead
          </p>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Signature
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="text"
                  name="healthProfessionalSignature"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Date
                <input
                  className="dotted_bottom"
                  {...register("input_name")}
                  type="date"
                  name="healthProfessionalDate"
                  id=""
                />
              </p>
            </div>
          </div>
          <div className="columns mt-3">
            <div className="column">
              <p className="label is-small">
                Name (print)
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="healthProfessionalNamePrint"
                  id=""
                />
              </p>
            </div>
            <div className="column">
              <p className="label is-small">
                Job Title
                <input
                  className="dotted_bottom"
                  type="text"
                  {...register("input_name")}
                  name="healthProfessionalJobTitle"
                  id=""
                />
              </p>
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

export default SurgicalBookletConsentForm;
