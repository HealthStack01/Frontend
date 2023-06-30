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
  isLoading: boolean;
  label?: string;
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
  isLoading,
  label,
}: componentProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({field: {onChange, value}}) => (
        <div className="react-custom-select-container">
          {label && <p className="label">{label}</p>}
          <Select
            isMulti={multiple}
            isDisabled={disabled}
            options={options}
            defaultInputValue={defaultValue}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            isClearable
            isLoading={isLoading}
            styles={{
              menuPortal: base => ({...base, zIndex: 9999, color: "#2d2d2d"}),

              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                height: "2.2rem",
                minHeight: "2.2rem",
                borderRadius: "3px",
                background: state.isDisabled ? "#f8f8f8" : "#ffffff",
                color: state.isDisabled ? "#2d2d2d !important" : "red",
                borderColor: error
                  ? "#f03030"
                  : state.isFocused
                  ? "#E2E8F0"
                  : "#E2E8F0",
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
