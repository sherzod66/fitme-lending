import { create } from 'zustand'

import { IUser } from '../types/user.types'

type Store = {
	user: IUser | null
}

export const useAuth = create<Store>(() => ({
	user: null
}))

export const setUser = (user: IUser | null) => useAuth.setState({ user })
