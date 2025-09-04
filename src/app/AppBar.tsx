import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { Avatar, Stack, Tooltip } from '@mui/material'
import { ExitToApp } from '@mui/icons-material'

type AppBarProps = {
	username: string | undefined
	onLogout: () => void
}

const ButtonAppBar = ({ username, onLogout }: AppBarProps) => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
						<MenuIcon />
					</IconButton>
					<Stack direction={'row'} spacing={2} style={{ flexGrow: 1 }}>
						<Typography variant="h6" component="div">
							Todos
						</Typography>
						<Typography variant="h6" component="div">
							About
						</Typography>
					</Stack>

					{username ? (
						<Stack direction="row" spacing={2} alignItems="center">
							<Button
								color="inherit"
								onClick={onLogout}
								startIcon={<ExitToApp />}
								sx={{
									'&:hover': {
										backgroundColor: 'rgba(255, 255, 255, 0.1)',
									},
								}}
							>
								Exit
							</Button>
							<Tooltip title={username}>
								<Avatar src={''} alt={username}>
									{username && username.length > 0 ? username.charAt(0).toUpperCase() : 'U'}
								</Avatar>
							</Tooltip>
						</Stack>
					) : (
						<Button color="inherit">Login</Button>
					)}
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default ButtonAppBar
