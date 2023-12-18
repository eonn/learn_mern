import React from 'react'

import { Route, Routes } from 'react-router-dom'

// We will create these two pages in a moment

import HomePage from './pages/HomePage';
import RegisterUser from './pages/RegisterUser';
import InterfacePage from './pages/InterfacePage';
import FormPage from './pages/FormPage';

export default function App() {

return (
	<Routes>
		<Route exact path="/" element={ <HomePage/> } />
		<Route path="/Register" element={ <RegisterUser/> } />
		<Route path="/Interface" element={ <InterfacePage/> } />
		<Route path="/FormPage" element={ <FormPage/> } />
	</Routes>
)
}