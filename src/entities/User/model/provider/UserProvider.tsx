import { type PropsWithChildren, useState } from 'react'
import type { UserType } from '../userType.ts'
import { autoLogin } from '../../../../shared/util/autoLogin.ts'
import { UserContext } from './UserContext.tsx'

export const UserProvider = ({ children }: PropsWithChildren) => {
	const userFromLS = autoLogin()
	const [user, setUser] = useState<UserType | undefined>(userFromLS)

	const handleSetUser = (user?: UserType) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user))
			setUser(user)
		} else {
			localStorage.removeItem('user')
			setUser(undefined)
		}
	}

	return (
		<UserContext.Provider value={{ user: user, setUser: handleSetUser }}>
			{children}
		</UserContext.Provider>
	)
}
