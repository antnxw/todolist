import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Auth from '../entities/User/ui/Auth.tsx'
import Todos from '../entities/Todo/ui/Todos.tsx'
import { selectUser } from '../entities/User/model/store/userStore.ts'
import { useAppSelector } from './store.ts'

function App() {
	const user = useAppSelector(selectUser)

	return <>{user ? <Todos /> : <Auth />}</>
}

export default App
