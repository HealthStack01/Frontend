import { useEffect, useState, useContext, lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PageLoaderComponent from '../../components/page-loader/page-loader';

// const Login = lazy(() => import('../auth/'));
const Login = () => {
	return <>Login</>;
};
const ModuleRoutes = () => {
	return (
		<>
			<Suspense fallback={<PageLoaderComponent />}>
				<Routes>
					<Route
						index
						element={<Login />}
					/>
				</Routes>
			</Suspense>
		</>
	);
};

export default ModuleRoutes;
