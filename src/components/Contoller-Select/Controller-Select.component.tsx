import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
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

  const metric_names = []
  for (let [key, value] of Object.entries(measurements)) {
      metric_names.push(key)
  }
  const classes = useStyles();
  //const [checked, setChecked] = React.useState([0]);

  // const handleToggle = (value: number) => () => {
  //   const currentIndex = checked.indexOf(value);
  //   const newChecked = [...checked];

  //   if (currentIndex === -1) {
  //     newChecked.push(value);
  //   } else {
  //     newChecked.splice(currentIndex, 1);
  //   }

  //   setChecked(newChecked);
  // };

  //onClick={handleToggle(value)}

  return (
	  <div className='metric-dropdown'>
		{toggled === true ? (
			<List className={classes.root}>
				{metric_names.map(value => {
					const labelId = `checkbox-list-label-${value}`;
					return (
					<ListItem key={value} role={undefined} dense button > 
					<ListItemIcon>
					<Checkbox
						edge="start"
						checked={false}
						tabIndex={-1}
						disableRipple
						inputProps={{ 'aria-labelledby': labelId }}
					/>
					</ListItemIcon>
					<ListItemText id={labelId} primary={`${value }`} />
					<ListItemSecondaryAction>
					<IconButton edge="end" aria-label="comments">
					</IconButton>
					</ListItemSecondaryAction>
					</ListItem>
					);
				})}
			</List>
		) : (
				<div className="hidden"></div>
			  )
		  }
	  </div>
		
  );
}