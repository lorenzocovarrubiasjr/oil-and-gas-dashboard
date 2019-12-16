import React from 'react';
import Switch, { SwitchClassKey, SwitchProps } from '@material-ui/core/Switch';
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
        <Day className="inner-icon"/>
        <Switch
          checked={NightDayStatus}
          onChange={toggleNightDayMode}
          value={NightDayStatus}
          color="primary"
          inputProps={{ 'aria-label': 'primary checkbox' }}
          className="inner-icon"
        />
        <Night className="inner-icon"/>
      </div>
    );
  }