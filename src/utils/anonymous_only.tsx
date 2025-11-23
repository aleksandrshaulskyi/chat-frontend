import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import { useAppSelector } from '../hooks'


export function AnonymousOnly(): ReactElement {
    const {userIsLoading, userData} = useAppSelector(state => state.user)

    if (!userIsLoading && userData) {
        return <Navigate to='/' replace />
    }

    return <Outlet />
}
