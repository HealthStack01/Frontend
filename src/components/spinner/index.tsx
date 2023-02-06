import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = () => {
	return (
		<div>
			<Circles
				height='22'
				width='22'
				color='#fff'
				ariaLabel='circles-loading'
				wrapperStyle={{}}
				wrapperClass=''
				visible={true}
			/>
		</div>
	);
};

export default Spinner;
