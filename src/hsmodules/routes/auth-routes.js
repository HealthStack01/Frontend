import {lazy, Fragment} from "react";
import {Route} from "react-router-dom";

import Login from "../auth";
import IndividualSignup from "../auth/IndividualSignup";
import Signup from "../auth/Signup";

const ForgotPassword = lazy(() => import("../auth/ForgotPassword"));
const CreatePassword = lazy(() => import("../auth/CreatePassword"));

export const authRoutes = [
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/signupindividual",
    Component: IndividualSignup,
  },
  {
    path: "/forgot-password",
    Component: ForgotPassword,
  },
  {
    path: "/create-password",
    Component: CreatePassword,
  },
];
