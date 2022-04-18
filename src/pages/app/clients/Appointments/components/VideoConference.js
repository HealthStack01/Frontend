import React, { useState } from 'react';
import { Jutsu } from 'react-jutsu';

const VideoConference = ({ clientName, roomId, onClose }) => {
  const [password] = useState('');

  return clientName && roomId ? (
    <div className="mt-2">
      <Jutsu
        roomName={roomId}
        displayName={clientName}
        password={password}
        onMeetingEnd={() => onClose()}
        loadingComponent={<p>loading ...</p>}
        errorComponent={
          <>
            <p>Oops, something went wrong</p>{' '}
          </>
        }
        containerStyles={{ width: '100%', height: '250px' }}
      />
      <p className="bckgrnd">
        {`Kindly share link with client and other collaborators: https://meet.jit.si/${roomId}`}
      </p>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default VideoConference;
