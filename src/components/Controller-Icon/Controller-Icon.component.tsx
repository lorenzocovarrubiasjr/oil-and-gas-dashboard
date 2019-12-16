import React from 'react';
import { ReactComponent as MetricsIcon } from './metrics.svg';
import Chip from '@material-ui/core/Chip';
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
         <Chip
        label="Select Metrics"
        icon={<MetricsIcon className='metricsIcon' />}
        clickable
        color="primary"
        />  
    </div>
    )
}

export default ControllerIcon;