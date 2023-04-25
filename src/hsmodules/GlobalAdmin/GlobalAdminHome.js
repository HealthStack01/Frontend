/* eslint-disable */
import React, { useState, useEffect, useContext } from 'react';
import { UserContext, ObjectContext } from '../../context';
import { Outlet } from 'react-router-dom';
// import ModalBox from "../../components/modal";
// import { Box } from "@mui/material";

export default function GlobalAdminHome({ children }) {
	// const [activeModal, setActiveModal]=useState("modal is-active ")
	const { state, setState } = useContext(ObjectContext);
	const [showModal, setShowModal] = useState(false);
	const { user, setUser } = useContext(UserContext);
	const [selectedClinic, setSelectedClinic] = useState();


	return (
		<section className='section remPadTop'>
			
			<section className='hero is-info is-fullheight'>
				<div className='hero-body'>
					
				</div>
				<div className='layout__content-main'>
			
					<Outlet />
				</div>
			</section>
		</section>
	);
}
