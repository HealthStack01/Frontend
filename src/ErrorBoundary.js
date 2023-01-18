import React from 'react';
import styled from 'styled-components';

export default class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false };
	}

	static getDerivedStateFromError(error) {
		// Update state so the next render will show the fallback UI.
		return { hasError: true };
	}

	render() {
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return (
				<ErrorImageOverlay>
					<ErrorImageContainer imageUrl='https://i.imgur.com/yW2W9SC.png' />
					<ErrorImageText>Sorry this page is broken</ErrorImageText>
				</ErrorImageOverlay>
			);
		}

		return this.props.children;
	}
}

export const ErrorImageOverlay = styled.div`
	height: 60vh;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

export const ErrorImageContainer = styled.div`
	display: inline-block;
	background-image: ${({ imageUrl }) => `url(${imageUrl})`};
	background-size: cover;
	background-position: center;
	width: 40vh;
	height: 40vh;
`;

export const ErrorImageText = styled.h5`
	font-size: 28px;
	color: #2f8e89;
`;
