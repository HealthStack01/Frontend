import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';

interface Props {
	options: { readonly value: string; readonly label: string }[];
	placeholder?: string;
	onChange?: any;
}

const SearchAsyncSelect: React.FC<Props> = ({
	options,
	placeholder,
	onChange,
}) => {
	const [selectedOption, setSelectedOption] = useState(null);
	const filter = (inputValue: string) => {
		return options.filter(i =>
			i.label.toLowerCase().includes(inputValue.toLowerCase()),
		);
	};

	const loadOptions = (
		inputValue: string,
		callback: (
			options: { readonly value: string; readonly label: string }[],
		) => void,
	) => {
		setTimeout(() => {
			callback(filter(inputValue));
		}, 1000);
	};
	return (
		<AsyncSelect
			cacheOptions
			loadOptions={loadOptions}
			defaultOptions={options}
			placeholder={placeholder}
			value={selectedOption}
			onChange={selectedOption => {
				setSelectedOption(selectedOption);
				onChange(selectedOption);
			}}
		/>
	);
};

export default SearchAsyncSelect;
