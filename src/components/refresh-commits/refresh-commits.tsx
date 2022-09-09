import React, { useEffect, useState } from 'react';
import { RefreshCommitsButtonWrapper } from './styles';


interface RefreshCommitsProps {
    onRefresh: () => void;
}

const COUNTER_SECONDS = 30;

export const RefreshCommits = ({ onRefresh }: RefreshCommitsProps) => {
    const [counter, setCounter] = useState(COUNTER_SECONDS);
    useEffect(() => {
        const interval = setInterval(() => {
            setCounter((prevState) => {
                const newState = prevState - 1;
                if (newState === 0) {
                    onRefresh();
                    return COUNTER_SECONDS;
                }
                return newState;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onRefreshHandler = () => {
        setCounter(COUNTER_SECONDS);
        onRefresh();
    }

    return (
        <RefreshCommitsButtonWrapper>
            <button onClick={onRefreshHandler}>Refresh</button> <span>{counter}</span>
        </RefreshCommitsButtonWrapper>
    )
}
