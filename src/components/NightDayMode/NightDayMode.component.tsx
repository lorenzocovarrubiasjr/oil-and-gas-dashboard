import React from 'react';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid';
import { ReactComponent as Day} from './sunny-day.svg';
import { ReactComponent as Night } from './moon-phase-outline.svg';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/Chart/reducer';
import './NigthDayMode.styles.scss';

const NightDay = (state: IState) => {
    const { NightDayMode }  = state.chart;
    return NightDayMode
  }

export default function NightDayMode() {
   const NightDayStatus = useSelector(NightDay);
   const dispatch = useDispatch();
  
   const toggleNightDayMode = () => {
    dispatch({type: actions.NightDayModeToggle})    
};
  
    return (
      <div className="day-night-toggle">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item><Day className="day-icon"/></Grid>
          <Grid item>
          <Switch
            checked={NightDayStatus}
            onChange={toggleNightDayMode}
            value={NightDayStatus}
            color="primary"
            inputProps={{ 'aria-label': 'primary checkbox' }}
            className="switch-icon"
          /></Grid>
          <Grid item><Night className="night-icon"/></Grid>
        </Grid>
      </div>
    );
  }