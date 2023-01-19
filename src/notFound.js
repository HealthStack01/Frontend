import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
export default function NotFound() {
	const navigate = useNavigate();

	return (
		<>
			<NotFoundImageOverlay>
				<NotFoundImageContainer imageUrl='https://i.imgur.com/U3vTGjX.png' />
				<NotFoundImageText>Oops! You seem to be lost.</NotFoundImageText>
				<Button onClick={() => navigate('/app')}>Go Home</Button>
			</NotFoundImageOverlay>
			                  
		</>
	);
}

export const NotFoundImageOverlay = styled.div`
	height: 60vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const NotFoundImageContainer = styled.div`
	display: inline-block;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
	background-size: cover;
	background-position: center;
	width: 40vh;
	height: 40vh;
`;

export const NotFoundImageText = styled.h5`
	font-size: 28px;
	color: #004e98;
`;
