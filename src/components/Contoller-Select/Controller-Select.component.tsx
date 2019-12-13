import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import { actions } from '../../Features/Chart/reducer';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const getMeasurements = (state: IState) => {
  const { measurements }  = state.chart;
  return measurements
}

const getToggler = (state: IState) => {
  const { toggler }  = state.chart;
  return toggler
}

const toggle = (state: IState) => {
  const { toggle }  = state.chart;
  return toggle
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

export default function ControllerSelect() {
	const measurements = useSelector(getMeasurements);
	const toggler = useSelector(getToggler);
	const toggled = useSelector(toggle);
	const dispatch = useDispatch();
	const oilTempStatus: boolean = toggler['oilTemp'];
	const injValveOpenStatus: boolean = toggler['injValveOpen']
	const tubingPressureStatus: boolean = toggler['tubingPressure']
	const flareTempStatus: boolean = toggler['flareTemp']
	const casingPressureStatus:boolean = toggler['casingPressure']
	const waterTempStatus: boolean = toggler['waterTemp']

	const metric_names: string[] = []
	for (let [key, value] of Object.entries(measurements)) {
		metric_names.push(key)
	}

	const handleChangeSelected = (value: string) => {
		switch (value) {
			case "oilTemp":
				dispatch({type: actions.selectOilTemp});
				break;
			case "injValveOpen":
				dispatch({type: actions.selectInjValveOpen});
				break;
			case "tubingPressure":
				dispatch({type: actions.selectTubingPressure});
				break;
			case "flareTemp":
				dispatch({type: actions.selectFlareTemp});
				break;
			case "casingPressure":
				dispatch({type: actions.selectCasingPressure});
				break;
			case "waterTemp":
				dispatch({type: actions.selectWaterTemp});
				break; 
			}
	}

  return (
	  <div className='metric-dropdown'>
		{toggled === true ? (
			<List className='togglerList'>
				<ListItem key={1} role={undefined} dense button onClick={() =>handleChangeSelected("oilTemp")}> 
					<ListItemIcon>
						<Checkbox edge="start" checked={oilTempStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"oilTemp"} primary={"oilTemp"} />
				</ListItem>
				<ListItem key={2} role={undefined} dense button onClick={() =>handleChangeSelected("injValveOpen")}> 
					<ListItemIcon>
						<Checkbox edge="start" checked={injValveOpenStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"injValveOpen"} primary={"injValveOpen"} />
				</ListItem>
				<ListItem key={3} role={undefined} dense button onClick={() =>handleChangeSelected("tubingPressure")}> 
					<ListItemIcon>
						<Checkbox edge="start" checked={tubingPressureStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"tubingPressure"} primary={"tubingPressure"} />
				</ListItem>
				<ListItem key={4} role={undefined} dense button onClick={() =>handleChangeSelected("flareTemp")}> 
					<ListItemIcon>
						<Checkbox edge="start" checked={flareTempStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"flareTemp"} primary={"flareTemp"} />
				</ListItem>
				<ListItem key={5} role={undefined} dense button onClick={() =>handleChangeSelected("casingPressure")}> 
					<ListItemIcon>
						<Checkbox edge="start" checked={casingPressureStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"casingPressure"} primary={"casingPressure"} />
				</ListItem>
				<ListItem key={6} role={undefined} dense button onClick={() =>handleChangeSelected("waterTemp")} > 
					<ListItemIcon>
						<Checkbox edge="start" checked={waterTempStatus} tabIndex={-1} disableRipple
						/>
					</ListItemIcon>
					<ListItemText id={"waterTemp"} primary={"waterTemp"} />
				</ListItem>
			</List>
		) : (
				<div className="hidden"></div>
			  )
		  }
	  </div>
		
  );
}