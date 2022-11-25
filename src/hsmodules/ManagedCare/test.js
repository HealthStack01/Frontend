import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

export default function Tags() {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Multiple values"
            placeholder="Favorites"
          />
        )}
      />
      <Autocomplete
        multiple
        id="tags-outlined"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        defaultValue={[top100Films[13]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="filterSelectedOptions"
            placeholder="Favorites"
          />
        )}
      />

    </Stack>
  );
}

   <div>
      <div className="field">
        <div className="control has-icons-left  ">
          <div
            className={`dropdown ${showPanel ? 'is-active' : ''}`}
            style={{ width: '100%' }}
          >
            <div className="dropdown-trigger" style={{ width: '100%' }}>
              <DebounceInput
                type="text"
                placeholder="Search Provider"
                value={simpa}
                minLength={3}
                debounceTimeout={400}
                onBlur={(e) => handleBlur(e)}
                onChange={(e) => handleSearch(e.target.value)}
                inputRef={inputEl}
                style={{
                  width: '100%',
                  padding: '1rem .5rem',
                  borderRadius: '4px',
                  border: '1.5px solid rgba(0, 0, 0, 0.6)',
                }}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-search"></i>
              </span>
            </div>
            {/* {searchError&&<div>{searchMessage}</div>} */}
            <div className="dropdown-menu" style={{ width: '100%' }}>
              <div className="dropdown-content">
                {/* {facilities.length > 0 ? (
                  ''
                ) : (
                  <div
                    className="dropdown-item"  onClick={handleAddproduct} 
                  >
                    {" "}
                    <span>
                      {val} is not on your provider facility list
                    </span>{" "}
                  </div>
                )} */}

                {facilities.map((facility, i) => (
                  <div
                    className="dropdown-item"
                    key={facility.organizationDetail._id}
                    onClick={() => handleRow(facility.organizationDetail)}
                    style={{ cursor: 'pointer' }}
                  >
                    <span>
                      {facility.organizationDetail.facilityName},
                      {facility.organizationDetail.facilityCity}{' '}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={`modal ${productModal ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Facility</p>
            <button
              className="delete"
              aria-label="close"
              onClick={handlecloseModal}
            ></button>
          </header>
          <section className="modal-card-body">
            <StoreList standalone="true" />
            <FacilityCreate />
          </section>
          <footer className="modal-card-foot">
                                        <button className="button is-success">Save changes</button>
                                        <button className="button">Cancel</button>
                                        </footer>
        </div>
      </div> */}