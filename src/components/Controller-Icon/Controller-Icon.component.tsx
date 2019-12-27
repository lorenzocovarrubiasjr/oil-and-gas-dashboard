import React from 'react';
import { ReactComponent as MetricsIcon } from './metrics.svg';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ControllerSelect from '../Contoller-Select/Controller-Select.component';
import { useDispatch } from 'react-redux';
import { actions } from '../../Features/Chart/reducer';
import './Controller-icon.styles.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }),
);

const ControllerIcon = () => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const toggleMetricsButton = () => {
            dispatch({type: actions.toggleHidden})    
    };

    return (
    <div onClick={toggleMetricsButton} >
        <Fab variant="extended" className='controller-icon'>
        <MetricsIcon className={`metricsIcon ${classes.extendedIcon}`} />
        Metrics
      </Fab>
        <ControllerSelect />
    </div>
    )
}

export default ControllerIcon;