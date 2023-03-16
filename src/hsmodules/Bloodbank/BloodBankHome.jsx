/* eslint-disable */
import React from 'react';
import { Outlet } from 'react-router-dom';


export default function BloodBankHome({ children }) {
	return (
		<section className='section remPadTop'>
			<section className='hero is-info is-fullheight'>
				<div className='layout__content-main'>
					<Outlet />
				</div>
			</section>
		</section>
	);
}
