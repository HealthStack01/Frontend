import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { toast } from 'react-toastify';

import client from '../../feathers';

const searchProvidedOptions = (options, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : options.filter(
        (option) =>
        (option.label || option).toLowerCase().slice(0, inputLength) ===
          inputValue
      );
};

const getSuggestionValue = (suggestion) => suggestion.value || suggestion || '';

const AutoSuggestInput = ({ label, options, onChange }) => {
  let Service = options.model && client.service(options.model);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div>
      {options.labelSelector
        ? options.labelSelector(suggestion)
        : suggestion.label || suggestion}
    </div>
  );

  const onSuggestionsFetchRequested = ({ value: searchText }) => {
    if (options.length) {
      setSuggestions(searchProvidedOptions(options, searchText));
    } else {
      Service.find({
        query: {
          $or: options.or.map((field) => ({
            [field]: {
              $regex: searchText,
              $options: 'i',
            },
          })),
          //facility: user.currentEmployee.facilityDetail._id,
        },
        $limit: 10,
        $sort: {
          createdAt: -1,
        },
      })
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
  return (
    <>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={options.labelSelector || getSuggestionValue}
        onSuggestionSelected={(_, { suggestion }) =>
          onChange(
            options.valueSelector
              ? options.valueSelector(suggestion)
              : suggestion._id
          )
        }
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </>
  );
};

export default AutoSuggestInput;
