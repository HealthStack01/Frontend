{
  <>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <label className="label is-small" name="firstname" type="text">
              First Name"{" "}
            </label>
            <label>{client.firstname}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-hospital"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <label className="label is-small" name="middlename" type="text">
              {" "}
              Middle Name{" "}
            </label>
            <label>{client.middlename}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-map-signs"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="lastname" type="text">
              Last Name"
            </label>
            <label>{client.lastname}</label>
            <span className="icon is-small is-left">
              <i className=" fas fa-user-md "></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="dob" type="text">
              Date of Birth"{" "}
            </label>
            <label>{client.dob}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="gender" type="text">
              Gender"{" "}
            </label>
            <label>{client.gender}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="maritalstatus" type="text">
              Marital Status"{" "}
            </label>
            <label>{client.maritalstatus}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="mrn" type="text">
              Medical Records Number"{" "}
            </label>
            <label>{client.mrn}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="religion" type="text">
              Religion"{" "}
            </label>
            <label>{client.religion}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="profession" type="text">
              Profession"{" "}
            </label>
            <label>{client.profession}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label
              className="label is-small"
              {...register("x", {required: true})}
              name="phone"
              type="text"
            >
              {" "}
              Phone No"
            </label>
            <label>{client.phone}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-phone-alt"></i>
            </span>
          </p>
        </div>

        <div className="field">
          <p className="control has-icons-left">
            <label
              className="label is-small"
              {...register("x", {required: true})}
              name="email"
              type="email"
            >
              Email"{" "}
            </label>
            <label>{client.email}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div className="field">
      <p className="control has-icons-left">
        <label className="label is-small" name="address" type="text">
          Residential Address"{" "}
        </label>
        <label>{client.address}</label>
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="city" type="text">
              Town/City"{" "}
            </label>
            <label>{client.city}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="lga" type="text">
              Local Govt Area"{" "}
            </label>
            <label>{client.lga}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="state" type="text">
              State"{" "}
            </label>
            <label>{client.state}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="country" type="text">
              Country"{" "}
            </label>
            <label>{client.country}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="bloodgroup" type="text">
              Blood Group"{" "}
            </label>
            <label>{client.bloodgroup}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="genotype" type="text">
              Genotype"{" "}
            </label>
            <label>{client.genotype}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="disabilities" type="text">
              Disabilities"{" "}
            </label>
            <label>{client.disabilities}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>

    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="allergies" type="text">
              Allergies"{" "}
            </label>
            <label>{client.allergies}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="comorbidities" type="text">
              Co-mobidities"{" "}
            </label>
            <label>{client.comorbidities}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="field">
      <p className="control has-icons-left">
        <label className="label is-small" name="clientTags" type="text">
          Tags"{" "}
        </label>
        <label>{client.clientTags}</label>
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div className="field">
      <p className="control has-icons-left">
        <label className="label is-small" name="specificDetails" type="text">
          Specific Details about patient"{" "}
        </label>
        <label>{client.specificDetails}</label>
        <span className="icon is-small is-left">
          <i className="fas fa-envelope"></i>
        </span>
      </p>
    </div>
    <div className="field is-horizontal">
      <div className="field-body">
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="nok_name" type="text">
              Next of Kin Full Name"
            </label>
            <label>{client.nok_name}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-clinic-medical"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="nok_phoneno" type="text">
              Next of Kin Phone Number"
            </label>
            <label>{client.nok_phoneno}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-clinic-medical"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label className="label is-small" name="nok_email" type="email">
              Next of Kin Email"{" "}
            </label>
            <label>{client.nok_email}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <label
              className="label is-small"
              name="nok_relationship"
              type="text"
            >
              Next of Kin Relationship"{" "}
            </label>
            <label>{client.nok_relationship}</label>
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
          </p>
        </div>
      </div>
    </div>
    <div className="field  is-grouped mt-2">
      <p className="control">
        <button type="submit" className="button is-success is-small">
          Save
        </button>
      </p>
      <p className="control">
        <button
          className="button is-warning is-small"
          onClick={e => e.target.reset()}
        >
          Cancel
        </button>
      </p>
      {/*  <p className="control">
    <button className="button is-danger is-small" onClick={()=>handleDelete()} type="delete">
       Delete
    </button>
</p> */}
    </div>
  </>;
}
