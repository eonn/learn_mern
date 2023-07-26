import React from 'react'

import { Route, Routes } from 'react-router-dom'

// We will create these two pages in a moment

import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import RegisterUser from './pages/RegisterUser';

export default function App() {

return (
	<Routes>
		<Route exact path="/" element={ <HomePage/> } />
		<Route path="/:id" element={ <UserPage/> } />
		<Route path="/Register" element={ <RegisterUser/> } />
	</Routes>
)
}