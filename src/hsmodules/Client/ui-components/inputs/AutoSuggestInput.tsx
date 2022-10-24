import { FormHelperText } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import { toast } from 'react-toastify';
import client from '../../../../feathers';
import { InputType } from '../../../app/schema/util';
import { autoSuggestStyles } from '../../../app/styles';
import Input from './basic/Input';
import { autoSuggestQuery } from './query';

/* eslint-disable */
const searchProvidedOptions = (options, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : options.filter(
        (option) =>
          (option.label || option).toLowerCase().slice(0, inputLength) ===
          inputValue,
      );
};
/* eslint-enable */

const getSuggestionValue = (suggestion) => suggestion.value || suggestion || '';

const snomedUrl = (term) =>
  `https://browser.ihtsdotools.org/snowstorm/snomed-ct/browser/MAIN/2022-03-31/descriptions?&limit=100&term=${term}&active=true&conceptActive=true&lang=english&groupByConcept=true`;

const AutoSuggestInput = ({
  defaultValue,
  label,
  readonly,
  options,
  onChange,
  error,
  inputType,
}) => {
  let Service = options.model && client.service(options.model);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const classes: any = autoSuggestStyles(defaultTheme);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div>
      {options.labelSelector
        ? options.labelSelector(suggestion)
        : suggestion.label || suggestion}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value: searchText }) => {
    if (inputType === InputType.SNOMED) {
      axios(snomedUrl(searchText))
        .then((response) => {
          const results = response.data.items.map((item) => item.term);
          setSuggestions(results);
        })
        .catch((error) => {
          console.error({ error });
          toast(`error fetching SNOMED concepts, Check your network ${error}`);
        });
      return;
    }

    if (options.length) {
      setSuggestions(searchProvidedOptions(options, searchText));
      return;
    }

    const query = autoSuggestQuery(options, searchText);
    Service.find(query)
      .then((res) => {
        setSuggestions(res.data);
      })
      .catch((error) => {
        toast(`error fetching suggestions ${error}`);
      });
  };

  const inputProps = {
    placeholder: label,
    value,
    onChange: (_, value) => setValue(value.newValue),
    readOnly: readonly,
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const setDefaultValue = () => {
    Service.get(defaultValue)
      .then((data) => {
        const label =
          (options.labelSelector && options.labelSelector(data)) || '';
        const value =
          (options.valueSelector && options.valueSelector(data)) || '';
        onChange(value);
        setValue(label);
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (defaultValue) setDefaultValue();
  }, [defaultValue]);

  return readonly ? (
    <Input value={value} defaultValue={value} disabled />
  ) : (
    <div className={classes.container}>
      <div className="MuiOutlinedInput-root MuiInputBase-root MuiInputBase-colorPrimary MuiInputBase-formControl css-9ddj71-MuiInputBase-root-MuiOutlinedInput-rooti">
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={options.labelSelector || getSuggestionValue}
          onSuggestionSelected={(_, { suggestion }) =>
            onChange(
              options.valueSelector
                ? options.valueSelector(suggestion)
                : suggestion._id,
            )
          }
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={classes}
        />
        {error && (
          <FormHelperText error>
            {(Object.values(error as any)[0] || ({} as any)).message}
          </FormHelperText>
        )}
      </div>
    </div>
  );
};

export default AutoSuggestInput;
