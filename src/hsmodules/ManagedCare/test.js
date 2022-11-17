export function OrganizationDetail() {
  //const { register, handleSubmit, watch, setValue } = useForm(); //errors,
  // eslint-disable-next-line
  const [error, setError] = useState(false); //,
  //const [success, setSuccess] =useState(false)
  // eslint-disable-next-line
  const [message, setMessage] = useState(''); //,
  //const facilityServ=client.service('/facility')
  //const navigate=useNavigate()
  const { user, setUser } = useContext(UserContext);
  const { state, setState } = useContext(ObjectContext);

  const facility = state.facilityModule.selectedFacility;

  const handleEdit = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'modify',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    //console.log(state)
  };
  const closeForm = async () => {
    const newfacilityModule = {
      selectedFacility: facility,
      show: 'create',
    };
    await setState((prevstate) => ({
      ...prevstate,
      facilityModule: newfacilityModule,
    }));
    console.log('close form');
  };

  return (
    <>
      <div className="card ">
        <div className="card-header">
          <p className="card-header-title">Organization Details</p>
          <button
            className="delete pushleft"
            aria-label="close"
            onClick={() => closeForm()}
          ></button>
        </div>
        <div className="card-content vscrollable">
          <fieldset>
            <div className="field ">
              <label className="label is-small">
                {' '}
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital"></i>
                </span>
                Name:{' '}
                <span className="is-small ">
                  {' '}
                  {facility.organizationDetail.facilityName}{' '}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-signs"></i>
                </span>
                Address:
                <span className="is-small ">
                  {facility.organizationDetail.facilityAddress}{' '}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-map-marker-alt"></i>
                </span>
                City:
                <span className="is-small ">
                  {facility.organizationDetail.facilityCity}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-phone-alt"></i>
                </span>
                Phone:
                <span className="is-small ">
                  {facility.organizationDetail.facilityContactPhone}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
                Email:{' '}
                <span className="is-small ">
                  {facility.organizationDetail.facilityEmail}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                {' '}
                <span className="icon is-small is-left">
                  <i className="fas fa-user-md"></i>
                </span>
                CEO:
                <span className="is-small ">
                  {facility.organizationDetail.facilityOwner}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                {' '}
                <span className="icon is-small is-left">
                  <i className="fas fa-hospital-symbol"></i>
                </span>
                Type:
                <span className="is-small ">
                  {facility.organizationDetail.facilityType}
                </span>
              </label>
            </div>
            <div className="field">
              <label className="label is-small">
                <span className="icon is-small is-left">
                  <i className="fas fa-clinic-medical"></i>
                </span>
                Category:
                <span className="is-small ">
                  {facility.organizationDetail.facilityCategory}
                </span>
              </label>
            </div>
            {user.stacker && (
              <div className="field">
                <p className="control">
                  <button
                    className="button is-success is-small"
                    onClick={handleEdit}
                  >
                    Edit
                  </button>
                </p>
              </div>
            )}
            {error && <div className="message"> {message}</div>}
          </fieldset>
        </div>
        <div className="table-container pullup ">
          <table className="table is-striped is-narrow is-hoverable is-fullwidth is-scrollable ">
            <thead>
              <tr>
                <th>
                  <abbr title="S/No">S/No</abbr>
                </th>
                <th>Organization Name</th>
                <th>
                  <abbr title="Band"> Band</abbr>
                </th>
                <th>
                  <abbr title="Address"> Address</abbr>
                </th>
                <th>
                  <abbr title="City">City</abbr>
                </th>
                <th>
                  <abbr title="Phone">Phone</abbr>
                </th>
                <th>
                  <abbr title="Email">Email</abbr>
                </th>
                <th>
                  <abbr title="Type">Type</abbr>
                </th>
                <th>
                  <abbr title="Category">Category</abbr>
                </th>
                {/* <th><abbr title="Actions">Actions</abbr></th> */}
              </tr>
            </thead>
            <tfoot></tfoot>
            <tbody>
              {facility.map(
                (facility, i) =>
                  facility.hasOwnProperty('organizationDetail') && (
                    <>
                      <tr
                        key={i}
                        onClick={() => handleRow(facility)}
                        className={
                          facility.organizationDetail?._id ===
                          (selectedFacility?._id || null)
                            ? 'is-selected'
                            : ''
                        }
                      >
                        <th>{i + 1}</th>
                        <th>{facility.organizationDetail.facilityName}</th>
                        <td>{facility.band}</td>
                        <td>{facility.organizationDetail.facilityAddress}</td>
                        <td>{facility.organizationDetail.facilityCity}</td>
                        <td>
                          {facility.organizationDetail.facilityContactPhone}
                        </td>
                        <td>{facility.organizationDetail.facilityEmail}</td>
                        <td>{facility.organizationDetail.facilityType}</td>
                        <td>{facility.organizationDetail.facilityCategory}</td>

                        {/*  <td><span   className="showAction"  >...</span></td> */}
                      </tr>
                    </>
                  )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
