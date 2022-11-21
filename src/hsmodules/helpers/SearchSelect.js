/* eslint-disable */
import React, { useState, useContext, useEffect, useRef } from 'react';
import { DebounceInput } from 'react-debounce-input';

import DebouncedInput from './ui-components/inputs/DebouncedInput';
import { useForm } from 'react-hook-form';
//import {useNavigate} from 'react-router-dom'
import { UserContext, ObjectContext } from '../../context';
import { toast } from 'bulma-toast';

import { Box, Card, Collapse, Grow } from '@mui/material';
import Input from '../../components/inputs/basic/Input';
import ModalBox from '../../components/modal';

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

export default function SearchSelect({
  service,
  clear,
  CreateModal,
  data,
  setData,
  placeholder,
}) {
  const { user } = useContext(UserContext);
  const [results, setResults] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');
  // eslint-disable-next-line
  // eslint-disable-next-line
  const [chosen, setChosen] = useState(false);
  // eslint-disable-next-line
  const [count, setCount] = useState(0);
  const inputEl = useRef(null);
  const [val, setVal] = useState('');
  const [productModal, setProductModal] = useState(false);

  const dropDownRef = useRef(null);

  const handleRow = async obj => {
    setChosen(true);
    setData(obj);

    setShowPanel(false);
  };

  const handleSearch = async value => {
    setVal(value);
    if (value === '') {
      setShowPanel(false);

      setResults([]);
      return;
    }
    const field = 'name'; //field variable
    service
      .find({
        query: {
          //service
          name: {
            $regex: value,
            $options: 'i',
          },
          facility: user.currentEmployee.facilityDetail._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setResults(res.data);
        setSearchMessage(' Data  fetched successfully');
        setShowPanel(true);
      })
      .catch(err => {
        toast({
          message: 'Error creating Services ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  const handleAddproduct = () => {
    setProductModal(true);
  };
  const handlecloseModal = () => {
    setProductModal(false);
    handleSearch(val);
  };
  useEffect(() => {
    if (clear) {
      setData('');
    }
    return () => {};
  }, [clear]);

  useOnClickOutside(dropDownRef, () => setShowPanel(false));

  const onSearch = async e => {
    const value = e.target.value;

    await service
      .find({
        query: {
          //service
          name: {
            $regex: value,
            $options: 'i',
          },
          // facility: user.currentEmployee.facilityDetail._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
        },
      })
      .then(res => {
        setResults(res.data);
        setSearchMessage(' Data  fetched successfully');
        setShowPanel(true);
      })
      .catch(err => {
        toast({
          message: 'Error creating Services ' + err,
          type: 'is-danger',
          dismissible: true,
          pauseOnHover: true,
        });
      });
  };

  return (
    <div>
      <div className='field'>
        <div className='control has-icons-left  '>
          <div
            className={`dropdown ${showPanel ? 'is-active' : ''}`}
            style={{ width: '100%' }}
          >
            <div
              className='dropdown-trigger'
              style={{ width: '100%', position: 'relative' }}
            >
              <DebounceInput
                className='input is-small '
                type='text'
                placeholder={placeholder}
                value={data?.name}
                minLength={3}
                debounceTimeout={400}
                // onChange={e => handleSearch(e.target.value)}
                onChange={e => onSearch(e)}
                inputRef={inputEl}
                element={Input}
              />

              <Grow in={showPanel}>
                <Card>
                  <Box
                    ref={dropDownRef}
                    container
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      maxHeight: '150px',
                      overflowY: 'scroll',
                      zIndex: '5',
                      position: 'absolute',
                      background: '#ffffff',
                      width: '100%',
                      border: '1px solid lightgray',
                      zIndex: '500',
                    }}
                  >
                    {results.length > 0 ? (
                      results.map((row, i) => (
                        <Box
                          item
                          key={i}
                          onClick={() => handleRow(row)}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 8px',
                            width: '100%',
                            minHeight: '50px',
                            borderTop: i !== 0 ? '1px solid gray' : '',
                            cursor: 'pointer',
                            zIndex: '100',
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.75rem',
                            }}
                          >
                            {row.name} - {row.category}
                          </span>
                        </Box>
                      ))
                    ) : (
                      <Box
                        className='dropdown-item'
                        onClick={handleAddproduct}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '0 8px',
                          width: '100%',
                          minHeight: '50px',
                          borderTop: '1px solid gray',
                          cursor: 'pointer',
                          zIndex: '100',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.75rem',
                          }}
                        >
                          Add {val} to service list
                        </span>{' '}
                      </Box>
                    )}
                  </Box>
                </Card>
              </Grow>
            </div>
          </div>
        </div>
      </div>

      <ModalBox
        open={productModal}
        onClose={handlecloseModal}
        header='Create Service'
      >
        {CreateModal}
      </ModalBox>
    </div>
  );
}
