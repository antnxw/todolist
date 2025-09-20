import AppBar from '../../../app/AppBar.tsx'
import { Outlet } from 'react-router'

const Layout = () => {
	return (
		<>
			<AppBar />
			<div style={{ marginTop: '120px' }}>
				<Outlet />
			</div>
		</>
	)
}

export default Layout
