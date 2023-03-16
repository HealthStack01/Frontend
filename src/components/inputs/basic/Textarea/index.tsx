import React, { TextareaHTMLAttributes } from 'react';
import { Controller } from 'react-hook-form';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import { TextareaField } from './styles';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string;
	errorText?: string;
	register?: any;
	placeholder?: string;
	sx?: string;
	control?: any;
	handleOnBlur?: any;
	onFocus?: any;
	required?: boolean;
	name?: string;
	important?: boolean;
	//inputRef?: any;
}

const Textarea: React.FC<TextareaProps> = ({
	label,
	placeholder,
	register,
	sx,
	control,
	handleOnBlur,
	onFocus,
	required = false,
	name,
	important,
	errorText,
	...props
}) => {
	if (control)
		return (
			<Controller
				control={control}
				name={name}
				render={({
					field: { onChange, onBlur, value, name, ref },
					fieldState: { invalid, isTouched, isDirty, error },
					formState,
				}) => (
					<div>
						<label>
							{label}
							{important && (
								<AcUnitIcon
									sx={{ color: 'red', width: '14px', height: '14px' }}
								/>
							)}
						</label>
						<TextareaField
							ref={ref}
							placeholder={placeholder}
							style={sx}
							name={name}
							value={value}
							onChange={onChange}
							onBlur={handleOnBlur}
							onFocus={onFocus}
						/>
						{errorText && (
							<label
								style={{ color: 'red', fontSize: '0.7rem', textAlign: 'left' }}>
								{errorText}
							</label>
						)}
					</div>
				)}
			/>
		);
	return (
		<div>
			<label>
				{label}
				{important && (
					<AcUnitIcon sx={{ color: 'red', width: '14px', height: '14px' }} />
				)}
			</label>
			<TextareaField
				placeholder={placeholder}
				style={sx}
				onBlur={handleOnBlur}
				onFocus={onFocus}
				{...props}
				{...register}
			/>
			{errorText && (
				<label style={{ color: 'red', fontSize: '0.7rem', textAlign: 'left' }}>
					{errorText}
				</label>
			)}
		</div>
	);
};

export default Textarea;
