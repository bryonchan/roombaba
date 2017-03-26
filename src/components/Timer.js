import React, { PropTypes } from 'react';
import styled from 'styled-components';

const TimerWrapper = styled.div`
	font-size: 15px;
	position: absolute;
	bottom: 0px;
	left: 0px;
	background-color: #eee;
	opacity: 0.6;
	padding: 5px 5px;
`;

const Timer = ({ time }) => {
    return (
        <TimerWrapper>{time/1000} secs</TimerWrapper>
    );
};

Timer.displayName = 'Timer';

Timer.propTypes = {
    time: PropTypes.number,
};

export default Timer;
