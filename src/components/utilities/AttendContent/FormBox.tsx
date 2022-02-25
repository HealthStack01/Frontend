import React, { useState } from 'react';
import { useObjectState } from '../../../context/context';
import { FlexBox } from '../../../styles/global';
import { BottomWrapper, FullDetailsWrapper } from '../../app/styles';
import Button from '../../buttons/Button';
import Input from '../../inputs/basic/Input';
import CustomSelect from '../../inputs/basic/Select';

const TestData = [
  {
    documentName: 'Clinical Note',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Lab Result',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Doctor Note',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Nursing Note',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Vital Signs',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Progress Note',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
      { type: 'radio' },
      { type: 'checkbox' },
    ],
  },
  {
    documentName: 'Lab Order',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
    ],
  },
  {
    documentName: 'Prescription',
    form: [
      { title: 'Search Order', type: 'text' },
      { type: 'text', title: 'Note' },
      { type: 'select', options: ['In-house', 'External'] },
    ],
  },
];

const Document = ({ onClick }) => {
  const [values, setValues] = useState({});
  const { resource } = useObjectState();
  let docName = resource.selectedDocumentation;
  const data = TestData.filter(function (TestData) {
    return TestData.documentName === docName;
  });

  return (
    <>
      <div>
        <FlexBox className="row">
          <h4>{docName}</h4>

          <button
            onClick={onClick}
            style={{
              borderRadius: '32px',
              background: '#f3f3f3',
              border: 'none',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              margin: '1rem 0',
            }}
          >
            <i className="bi bi-x"></i>
          </button>
        </FlexBox>

        <FullDetailsWrapper className="small">
          <div>
            {TestData.map((data, index) => {
              if (data.documentName == docName) {
                return (
                  <>
                    {data.form.map((formData) => {
                      if (formData.type === 'text') {
                        return (
                          <Input
                            label={formData.title}
                            name={formData.title}
                            size="small"
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                              })
                            }
                          />
                        );
                      }
                      if (formData.type === 'select') {
                        return (
                          <CustomSelect
                            label={formData.title}
                            name={formData.title}
                            onChange={(e) =>
                              setValues({
                                ...values,
                                [e.target.name]: e.target.value,
                              })
                            }
                            options={formData.options}
                          />
                        );
                      }
                    })}
                  </>
                );
              }
            })}

            <button
              style={{
                borderRadius: '32px',
                background: '#f3f3f3',
                border: 'none',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                margin: '1rem 0',
              }}
              type="submit"
              onClick={onClick}
            >
              +
            </button>
          </div>
          {/* <CustomTable
            columns={columnLab}
            data={labData}
            pointerOnHover
            highlightOnHover
            striped
          /> */}
        </FullDetailsWrapper>
        <BottomWrapper>
          <Button
            label="Close without Saving"
            background="#ECF3FF"
            color="#0364FF"
          />
          <Button label="Create " />
        </BottomWrapper>
      </div>
    </>
  );
};

export default Document;
