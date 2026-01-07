import AppBar from '../../../app/AppBar.tsx'
import { Outlet } from 'react-router'
import ErrorHandler from './ErrorHandler.tsx'

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '120px' }}>
				<ErrorHandler>
					<Outlet />
				</ErrorHandler>
			</div>
		</>
	)
}

export default Layout
