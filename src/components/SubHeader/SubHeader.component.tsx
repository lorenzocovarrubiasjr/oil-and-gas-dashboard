import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ControllerIcon from '../Controller-Icon/Controller-Icon.component';
import ControllerSelect from '../Contoller-Select/Controller-Select.component';
import NightDayMode from '../NightDayMode/NightDayMode.component';
import LiveTicker from '../LiveTicker/LiveTicker.components';

import './SubHeader.styles.scss';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

const SubHeader = () => {
    const classes = useStyles();

    

    return (
        <div className={classes.root}>
            <Grid container 
                direction="row"
                justify="center"
                alignItems="center" 
                spacing={1}>
                <Grid item xs={12} sm={12} md={6} lg={7}>
                    <LiveTicker />
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={2}>
                    <NightDayMode />
                </Grid>
                <Grid item xs={6} sm={6} md={2} lg={3}>
                    <ControllerIcon />
                </Grid>
            </Grid>
        </div>
    );
   
};

export default SubHeader;