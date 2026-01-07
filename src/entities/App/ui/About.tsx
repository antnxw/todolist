import { Button, Container, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router'

const About = () => {
	const navigate = useNavigate()

	return (
		<Container maxWidth={'sm'}>
			<Stack spacing={2}>
				<Typography variant="h2" component="div">
					About
				</Typography>
				<Typography variant="h6" component="div">
					version 0.0.2
				</Typography>
				<Button variant={'contained'} onClick={() => navigate(-1, { state: { isAboutPage: true } })}>
					Go back
				</Button>
			</Stack>
		</Container>
	)
}

export default About
