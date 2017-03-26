import React, { PropTypes } from 'react';
import styled from 'styled-components';

const ScoreWrapper = styled.div`
	font-size: 24px;
	position: absolute;
	top: 10px;
	right: 10px;
	background-color: #eee;
	opacity: 0.6;
	padding: 5px 10px;
`;

const Score = ({ score }) => {
    return (
        <ScoreWrapper>{score} left!</ScoreWrapper>
    );
};

Score.displayName = 'Score';

Score.propTypes = {
    score: PropTypes.number,
};

export default Score;
