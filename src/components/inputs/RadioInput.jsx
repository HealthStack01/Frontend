import React from 'react';

const RadioInput = ({ options, value, onChange }) => {
	return (
		<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
			{options.map(option => (
				<div key={option.value}>
					<input
						type='radio'
						value={option.value}
						checked={option.value === value}
						onChange={onChange}
					/>
					{option.label}
				</div>
			))}
		</div>
	);
};

export default RadioInput;
