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
            options={options}
            defaultInputValue={defaultValue}
            placeholder={placeholder}
            value={value}
            onInputChange={onInputChange}
            onChange={onChange}
            isClearable
            isLoading={isLoading}
            styles={{
              menuPortal: base => ({...base, zIndex: 9999, color: "#2d2d2d"}),
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: "100%",
                minHeight: "34px",
                borderRadius: "10px",
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
