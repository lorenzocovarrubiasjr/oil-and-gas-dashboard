import React from 'react';
import { ReactComponent as MetricsIcon } from './metrics.svg';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/Chart/reducer';
import './Controller-icon.styles.scss';

const ControllerIcon = () => {
    const dispatch = useDispatch();

    const toggleMetricsButton = () => {
            dispatch({type: actions.toggleHidden})    
    };

    return (
    <div className='controller-icon' onClick={toggleMetricsButton} >
        <MetricsIcon className='metricsIcon' />
    </div>
    )
}

export default ControllerIcon;