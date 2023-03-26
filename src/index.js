import React from 'react';
import ErrorBoundary from './ErrorBoundary';
//  import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/* import reportWebVitals from './reportWebVitals'; */

ReactDOM.render(
	<React.StrictMode>
		<ErrorBoundary>
			<App />
		</ErrorBoundary>
	</React.StrictMode>,
	document.getElementById('root'),
);


