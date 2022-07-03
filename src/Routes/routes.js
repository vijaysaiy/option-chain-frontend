import React from 'react';
import { Redirect } from "react-router-dom";
import Dashboard from '../components/dashboard/Dashboard';
import Login from '../components/Auth/Login'; 
// import Register from '../components/Auth/Register';

const authRoutes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
	{ path: "/", component: () => <Redirect to="/dashboard" /> }
]

const nonAuthRoutes = [
  { path: '/login', exact: true, name: 'Login' , component : Login},
  // { path: '/register', name: 'Registration', component: Register }
]


export { authRoutes, nonAuthRoutes };
