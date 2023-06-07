import React, {InputHTMLAttributes} from "react";
import {Controller, UseFormRegisterReturn} from "react-hook-form";
import Select from "react-select";
import "./styles.scss";

interface componentProps {
  options: {label: string; value: string; [key: string]: any}[] | [];
  placeholder: string;
  defaultValue?: string;
  control?: any;
  name: string;
  error?: string;
  multiple?: boolean;
  disabled?: boolean;
}

const ReactCustomSelectComponent = ({
  options,
  placeholder,
  defaultValue = "",
  name,
  control,
  error,
  multiple,
  disabled,
}: componentProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <div className="react-custom-select-container">
          <Select
            isMulti={multiple}
            isDisabled={disabled}
            options={options}
            defaultInputValue={defaultValue}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isClearable
            styles={{
              menuPortal: base => ({...base, zIndex: 9999, color: "#2d2d2d"}),
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                minHeight: "34px",
                borderRadius: "3px",
                borderColor: error
                  ? "#f03030"
                  : state.isFocused
                  ? "#E2E8F0"
                  : "#E2E8F0",
                // zIndex: 9999,
              }),
            }}
            menuPortalTarget={document.body}
            // styles={{menuPortal: base => ({...base, zIndex: 9999})}}
            // menuPortalTarget={document.querySelector("body")}
          />
          {error && <span className="custom-select-error-text">{error}</span>}
        </div>
      )}
    />
  );
};

export default ReactCustomSelectComponent;
