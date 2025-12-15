import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import { Avatar, Menu, MenuItem, Stack, ToggleButton, Tooltip, useColorScheme } from '@mui/material'
import { Nightlight, WbSunny } from '@mui/icons-material'
import MenuIcon from '@mui/icons-material/Menu'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from './store.ts'
import { NavLink, useLocation, useNavigate } from 'react-router'
import { removeUser, selectUser } from '../entities/User/model/store/userStore.ts'
import { selectTodosStats } from '../entities/Todo/model/store/selectors/todoSelectors.ts'
import { ROUTES } from '../shared/constants/Routes.ts'

const ButtonAppBar = () => {
	const { mode, setMode } = useColorScheme()
	const user = useAppSelector(selectUser)
	const dispatch = useAppDispatch()
	const todosStats = useAppSelector(selectTodosStats)
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
	const navigate = useNavigate()
	const location = useLocation() //взял location из роутера
	const isAuthPage = location.pathname === ROUTES.auth //коррект проверка

	if (!mode) {
		return null
	}

	//скрыть АппБар на /auth
	if (isAuthPage) {
		return null
	}

	const handleUserLogout = () => {
		dispatch(removeUser())
		localStorage.removeItem('access_token')
		setAnchorEl(null)
		navigate(ROUTES.auth)
	}

	const handleToggle = () => {
		setMode(mode === 'light' ? 'dark' : 'light')
	}

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget as HTMLElement)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						{user && (
							<Typography variant="h6" component="div">
								Todos: {todosStats.undone}/{todosStats.total}
							</Typography>
						)}
						<Typography variant="h6" component="div">
							<NavLink
								to="/"
								style={({ isActive }) => ({
									color: 'inherit',
									textDecoration: isActive ? 'underline' : 'none',
								})}
							>
								Home
							</NavLink>
						</Typography>
						<Typography variant="h6" component="div">
							<NavLink
								to={ROUTES.about}
								style={({ isActive }) => ({
									color: 'inherit',
									textDecoration: isActive ? 'underline' : 'none',
								})}
							>
								About
							</NavLink>
						</Typography>
					</Stack>

					<Stack direction={'row'} spacing={2}>
						<ToggleButton
							value={mode}
							onChange={handleToggle}
							sx={{
								borderRadius: '12px',
								boxShadow: 3,
							}}
						>
							{mode === 'dark' ? <WbSunny /> : <Nightlight />}
						</ToggleButton>
						{user ? (
							<>
								<Tooltip title={user.username}>
									<Avatar
										src={''}
										alt={user.username}
										sx={{
											marginTop: '5px !important',
											textTransform: 'capitalize',
											cursor: 'pointer',
										}}
										onClick={handleMenu}
									>
										{user.username[0]}
									</Avatar>
								</Tooltip>
								<Menu
									id="menu-appbar"
									anchorEl={anchorEl}
									anchorOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									keepMounted
									transformOrigin={{
										vertical: 'top',
										horizontal: 'right',
									}}
									open={Boolean(anchorEl)}
									onClose={handleClose}
								>
									<MenuItem onClick={handleUserLogout}>Log out</MenuItem>
								</Menu>
							</>
						) : (
							<Button color="inherit" onClick={() => navigate(ROUTES.auth)}>
								Login
							</Button>
						)}
					</Stack>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
