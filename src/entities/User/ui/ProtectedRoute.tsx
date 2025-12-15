import { type FC, type PropsWithChildren } from 'react'
import { Navigate, useLocation } from 'react-router'
import { useAppSelector } from '../../../app/store.ts'
import { selectUser } from '../model/store/userStore.ts'
import { ROUTES } from '../../../shared/constants/Routes.ts'

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
	const user = useAppSelector(selectUser)
	const location = useLocation() //взял location из роутера
	const isAuthUrl = location.pathname === ROUTES.auth //коррект проверка

	//пользователь не авторизован — редирект на /auth
	if (!user && !isAuthUrl) {
		return <Navigate to={ROUTES.auth} replace />
	}

	if (user && isAuthUrl) {
		return <Navigate to={ROUTES.root} replace />
	}

	//если авторизован — пропускаем
	return <>{children}</>
}

export default ProtectedRoute
