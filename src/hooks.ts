import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux'
import { appDispatch, rootState } from './store'


export const useAppDispatch: () => appDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<rootState> = useSelector
