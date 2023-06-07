import React from "react";
import ErrorBoundary from "./ErrorBoundary";
//  import { createRoot } from 'react-dom/client';
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {GlobalStyle} from "./ui/styled/global";
/* import reportWebVitals from './reportWebVitals'; */

ReactDOM.render(
  <>
    <GlobalStyle />
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
    ,
  </>,

  document.getElementById("root")
);
