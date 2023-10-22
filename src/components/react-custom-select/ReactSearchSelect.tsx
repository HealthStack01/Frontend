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
  onInputChange: any;
  isLoading?: boolean;
  disabled?: boolean;
  label?: string;
}

const ReactCustomSearchSelectComponent = ({
  options,
  placeholder,
  defaultValue = "",
  name,
  control,
  error,
  multiple,
  onInputChange,
  isLoading,
  disabled,
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
            onInputChange={onInputChange}
            onChange={onChange}
            isClearable
            isLoading={isLoading}
            styles={{
              menuPortal: base => ({
                ...base,
                zIndex: 999999999,
                color: "#2d2d2d",
              }),
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

export default ReactCustomSearchSelectComponent;
