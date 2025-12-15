import { Route, Routes } from 'react-router'
import App from './App.tsx'
import About from '../entities/App/ui/About.tsx'
import NotFound from '../entities/App/ui/NotFound.tsx'
import Layout from '../entities/App/ui/Layout.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import ProtectedRoute from '../entities/User/ui/ProtectedRoute.tsx'
import { ROUTES } from '../shared/constants/Routes.ts'

const AppRoutes = () => {
	return (
		<Routes>
			<Route
				element={
					<ProtectedRoute>
						<Layout />
					</ProtectedRoute>
				}
			>
				<Route index element={<App />} />
				<Route path={ROUTES.auth} element={<Auth />} />
				<Route path={ROUTES.about} element={<About />} />
				<Route path={'*'} element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default AppRoutes
