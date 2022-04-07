import { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import { toast } from 'react-toastify';

import client from '../../context/feathers';
import { autoSuggestStyles } from '../../pages/app/styles';
import Input from './basic/Input';
import { autoSuggestQuery } from './query';

const searchProvidedOptions = (options, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : options.filter((option) => (option.label || option).toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = (suggestion) => suggestion.value || suggestion || '';

const AutoSuggestInput = ({ defaultValue, label, options, onChange }) => {
  let Service = options.model && client.service(options.model);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const classes: any = autoSuggestStyles(defaultTheme);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div>{options.labelSelector ? options.labelSelector(suggestion) : suggestion.label || suggestion}</div>
  );

  const onSuggestionsFetchRequested = ({ value: searchText }) => {
    if (options.length) {
      setSuggestions(searchProvidedOptions(options, searchText));
    } else {
      Service.find(autoSuggestQuery(options, searchText))
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((error) => {
          toast(`error fetching suggestions ${error}`);
        });
    }
  };

  const inputProps = {
    placeholder: label,
    value,
    onChange: (_, value) => setValue(value.newValue),
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const setDefaultValue = () => {
    Service.get(defaultValue)
      .then((data) => {
        const label = (options.labelSelector && options.labelSelector(data)) || '';
        const value = (options.valueSelector && options.valueSelector(data)) || '';
        onChange(value);
        setValue(label);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (defaultValue) setDefaultValue();
  }, [defaultValue]);

  return (
    <div className={classes.container}>
      <div className="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-rooti">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={options.labelSelector || getSuggestionValue}
          onSuggestionSelected={(_, { suggestion }) =>
            onChange(options.valueSelector ? options.valueSelector(suggestion) : suggestion._id)
          }
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={classes}
          renderInputComponent={(params) => <Input {...params} label="Search" placeholder="" />}
        />
      </div>
    </div>
  );
};

export default AutoSuggestInput;
