import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { AnonymousOnly } from '../utils/anonymous_only'
import { AuthenticatedOnly } from '../utils/authenticated-only'
import { AvatarEdit } from '../pages/avatar-edit/avatar-edit'
import { getCookie } from '../utils/get-cookie'
import { Index } from '../pages/index/index'
import { Login } from '../pages/login/login'
import { Profile } from '../pages/profile/profile'
import { refreshSessionThunk } from '../features/session/model/thunks/refresh-session'
import { retrieveUserThunk } from '../features/user/model/thunks/retrieve-user'
import { SignUp } from '../pages/sign-up/sign-up'
import { useAppDispatch, useAppSelector } from '../hooks'

import AppStyling from './app.module.css'


function App() {
	const dispatch = useAppDispatch()
	const accessToken = useAppSelector(state => state.session.accessToken)

	useEffect(
		() => {
			const refreshToken = getCookie('refreshToken')

			if (refreshToken) {
				const refreshSessionBody = {refresh_token: refreshToken}

				dispatch(refreshSessionThunk(refreshSessionBody))
			}
		}, [dispatch]
	)

	useEffect(
		() => {
			if (accessToken) dispatch(retrieveUserThunk(accessToken))
		}, [dispatch, accessToken]
	)

	return (
		<main className={AppStyling.main}>
			<BrowserRouter>
				<Routes>
					<Route element={<AuthenticatedOnly />}>
						<Route path='/' element={<Index />} />
						<Route path='/edit-avatar' element={<AvatarEdit />} />
						<Route path='/profile' element={<Profile />} />
					</Route>
					<Route element={<AnonymousOnly />}>
						<Route path='/login' element={<Login />} />
						<Route path='/sign-up' element={<SignUp />} />
					</Route>		
				</Routes>
			</BrowserRouter>
		</main>
	);
}

export default App;
