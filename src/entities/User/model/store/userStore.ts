import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UserType } from '../userType.ts'
import { autoLogin } from '../../../../shared/util/autoLogin.ts'

type UserState = {
	user: UserType | null
	setUser: (user: UserType | null) => void
	logout: () => void
}

export const useUserStore = create<UserState>()(
	devtools((set) => ({
		user: autoLogin(),
		setUser: (user) => set({ user }),
		logout: () => {
			localStorage.removeItem('access_token')
			set({ user: null })
		},
	}))
)
