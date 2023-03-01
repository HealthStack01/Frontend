const PrivacyConsentNote = () => {
  return (
    <>
      <div className="content is-small mt-4">
        <h2 className="t center has-text-centered">
          Admission & Privacy Consent
        </h2>
        <ol className="mt-4 block">
          <li>
            I have read the information provided and i'm aware of my rights
            considering personal health information
          </li>
          <li>
            I understand i am not obliged to provide any information requested
            of me, but that my failure to do o may compromise the quality of the
            healthcare and treatment given to me
          </li>
          <li>
            I am aware of my right to access the information collected about me,
            except in some circumstances where access may be legimately
            withheld. I understand i will be given an explanation in these
            circumstances
          </li>
          <li>
            I understand that if my personal and health information is to be
            used for any other purpose than set out in the information provided,
            my further consent will be obtained
          </li>
          <li>
            I understand that i may notify the hospital of specific limitations
            on access or disclosure which will be documented in my health
            record.
          </li>
        </ol>
        <p>
          I also understand the benefits, and indication for this admission. I
          am aware that i can change my mind about this admission at any time
          after i have signed this consent form. I further agree with my
          Doctor's explanation regarding my diagnosis, treatment plan and/or
          procedure. I also agree to undergo the required tests and
          investigations needed to support my treatment
        </p>
        <p className="mt-4">SIGNATURE & DATE</p>
      </div>
    </>
  );
};

export default PrivacyConsentNote;
