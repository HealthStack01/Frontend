import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { defaultTheme } from 'react-autosuggest/dist/theme';
import { toast } from 'react-toastify';

import client from '../../feathers';

const useStyles = makeStyles(() => {
  return {
    container: {
      margin: 'auto',
      width: '100%',
      //backgroundColor: theme.background.default,
    },
    innerTableContainer: {
      width: '100%',
      height: 'calc(100vh - 190px)',
      //  borderRadius: theme.shape.borderRadius,
      // backgroundColor: theme.background.paper,
    },
    react_autosuggest__container: {
      position: 'relative',
      width: '100%',
    },
    react_autosuggest__input: {
      minWidth: 'auto',
      width: '96%',
      height: '1.4375em',
      marginBottom: '0.6rem',
      boxSizing: 'content-box',
      padding: '10px 20px',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: '300',
      fontSize: '16px',
      border: '1px solid #aaa',
      borderRadius: '4px',
    },
    react_autosuggest__input__focused: {
      outline: 'none',
    },
    react_autosuggest__input__open: {
      borderBottomLeftRadius: '0',
      borderBottomRightRadius: '0',
    },
    react_autosuggest__suggestions_container__open: {
      display: 'block',
      position: 'absolute',
      top: '51px',
      width: '100%',
      border: '1px solid #aaa',
      backgroundColor: '#fff',
      fontFamily: 'Helvetica, sans-serif',
      fontWeight: '300',
      fontSize: '16px',
      borderBottomLeftRadius: '4px',
      borderBottomRightRadius: '4px',
      zIndex: '2',
    },
    react_autosuggest__suggestions_list: {
      margin: '0',
      padding: '0',
      listStyleType: 'none',
    },
    react_autosuggest__suggestion: {
      cursor: 'pointer',
      padding: '10px 20px',
    },
    react_autosuggest__suggestion__highlighted: {
      backgroundColor: '#ddd',
    },
  };
});
const searchProvidedOptions = (options, value) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : options.filter((option) => (option.label || option).toLowerCase().slice(0, inputLength) === inputValue);
};

const getSuggestionValue = (suggestion) => suggestion.value || suggestion || '';

const AutoSuggestInput = ({ label, options, onChange }) => {
  let Service = options.model && client.service(options.model);
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => (
    <div>{options.labelSelector ? options.labelSelector(suggestion) : suggestion.label || suggestion}</div>
  );

  const onSuggestionsFetchRequested = ({ value: searchText }) => {
    if (options.length) {
      setSuggestions(searchProvidedOptions(options, searchText));
    } else {
      const query = {};
      if (options.or) {
        query['$or'] = options.or.map((field) => ({
          [field]: {
            $regex: searchText,
            $options: 'i',
          },
        }));
      }
      if (options.field) {
        query[options.field] = {
          $regex: searchText,
          $options: 'i',
        };
      }
      Service.find({
        query: {
          ...query,
          //facility: user.currentEmployee.facilityDetail._id,
          $limit: 10,
          $sort: {
            createdAt: -1,
          },
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
  const classes = useStyles();
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
          theme={{
            ...defaultTheme,
            container: classes.react_autosuggest__container,
            input: classes.react_autosuggest__input,
            inputOpen: classes.react_autosuggest__input__open,
            inputFocused: classes.react_autosuggest__input__focused,
            // suggestionsContainer: classes.react_autosuggest__suggestions_container,
            suggestionsContainerOpen: classes.react_autosuggest__suggestions_container__open,
            suggestionsList: classes.react_autosuggest__suggestions_list,
            suggestion: classes.react_autosuggest__suggestion,
            suggestionHighlighted: classes.react_autosuggest__suggestion__highlighted,
          }}
        />
      </div>
    </div>
  );
};

export default AutoSuggestInput;
