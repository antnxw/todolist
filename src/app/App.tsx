import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import AppBar from './AppBar.tsx'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { useUserStore } from '../entities/User/model/store/userStore.ts'

function App() {
	const { user, setUser, logout } = useUserStore()

	return (
		<>
			<AppBar username={user?.username} onLogout={logout} />
			<div style={{ marginTop: '120px' }} />
			{user ? <Todos /> : <Auth setUser={setUser} />}
		</>
	)
}

export default App
