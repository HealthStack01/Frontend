import React from 'react'
import LocationModal from '../../components/inputs/LocationModal';

export default function AccountHome() {
    const locationOptions = []
    const open = false
    const setOpen = () => console.log('open')
    const handleSelectLocation = () => console.log('open')
    return (
        <>
        <section className="hero is-info is-fullheight">
                <div className="hero-body">
                    <div className="container has-text-centered">
                    <h1 className="title">
                       Account Module
                    </h1>
                    <h2 className="subtitle">
                        Have fun working today!
                    </h2>
                    </div>
                </div>
            </section>
            {
            <LocationModal
              locations={locationOptions}
              onSelectLocation={handleSelectLocation}
              open={open}
              setOpen={setOpen}
            />
          }
        </>
    )
}
