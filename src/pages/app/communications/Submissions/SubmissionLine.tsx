import React from 'react';

import DynamicInput from '../../../../components/inputs/DynamicInput';

const SubmissionLine = ({
  control,
  interaction: { question, questionCaption, response },
}) => {
  return (
    <div className="grid grid-cols-3">
      <div className="field">
        {control ? (
          <DynamicInput
            key={question.id}
            name={question._id}
            control={control}
            label={question.caption || question.name}
            inputType={question.formInputType}
            options={question.options}
            data={{ [question._id]: response || '' }}
          />
        ) : (
          <>
            {' '}
            <div>
              <label>{questionCaption}</label>
              <p>{response || 'N/A'}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SubmissionLine;
