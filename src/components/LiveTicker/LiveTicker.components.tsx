
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { IState } from '../../store';
import { useSelector } from 'react-redux';
import './LiveTicker.styles.scss';

const useStyles = makeStyles({
  card: {
    minWidth: 50,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
  },
  title: {
    fontSize: 12,
  },
  pos: {
    marginBottom: 5,
  },
});

const metricToggler = (state: IState) => {
    const { toggler }  = state.chart;
    return toggler
  }

  const getLatestOilTemp = (state: IState) => {
    const { latestOilTempM }  = state.chart;
    return latestOilTempM;
  }

  const getLatestInjValveOpen = (state: IState) => {
    const { latestinjValveOpenM }  = state.chart;
    return latestinjValveOpenM;
  }

  const getLatestTubingPressure = (state: IState) => {
    const { latesttubingPressureM }  = state.chart;
    return latesttubingPressureM;
  }

  const getLatestFlareTemp = (state: IState) => {
    const { latestflareTempM }  = state.chart;
    return latestflareTempM;
  }

  const getLatestCasingPressure = (state: IState) => {
    const { latestcasingPressureM }  = state.chart;
    return latestcasingPressureM;
  }

  const getLatestWaterTemp = (state: IState) => {
    const { latestwaterTempM }  = state.chart;
    return latestwaterTempM;
  }

export default function LiveTicker(metric: object) {
    const classes = useStyles();
    const selectedMetrics = useSelector(metricToggler);
    const oilTempMeasurements = useSelector(getLatestOilTemp);
    const injValveOpenMeasurements = useSelector(getLatestInjValveOpen);
    const tubingPressureMeasurements = useSelector(getLatestTubingPressure);
    const flareTempMeasurements = useSelector(getLatestFlareTemp);
    const casingPressureMeasurements = useSelector(getLatestCasingPressure);
    const waterTempMeasurements = useSelector(getLatestWaterTemp);

    let oilTempClass = 'metricCard column';
    if (selectedMetrics.oilTemp !== true) {
        oilTempClass += ' hidden'
    };
    let injValveOpenClass = 'metricCard column';
    if (selectedMetrics.injValveOpen !== true) {
        injValveOpenClass += ' hidden'
    };
    let tubingPressureClass = 'metricCard column';
    if (selectedMetrics.tubingPressure !== true) {
        tubingPressureClass += ' hidden'
    };
    let flareTempClass = 'metricCard column';
    if (selectedMetrics.flareTemp !== true) {
        flareTempClass += ' hidden'
    };
    let casingPressureClass = 'metricCard column';
    if (selectedMetrics.casingPressure !== true) {
        casingPressureClass += ' hidden'
    };
    let waterTempClass = 'metricCard column';
    if (selectedMetrics.waterTemp !== true) {
        waterTempClass += ' hidden'
    };

  return (
    <div className="live-ticker-grid">
        <div className="live-ticker-row">
            <Grid container direction='row' justify="flex-start" alignItems="center">
                <Grid item>
                <Card className={`${classes.card} ${oilTempClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {oilTempMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {oilTempMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {oilTempMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>                
                </Grid>
                <Grid item>

                
                <Card className={`${classes.card} ${injValveOpenClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {injValveOpenMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {injValveOpenMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {injValveOpenMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>                

                <Card className={`${classes.card} ${tubingPressureClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {tubingPressureMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {tubingPressureMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {tubingPressureMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={`${classes.card} ${flareTempClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {flareTempMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {flareTempMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {flareTempMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={`${classes.card} ${casingPressureClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {casingPressureMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {casingPressureMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {casingPressureMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>
                <Card className={`${classes.card} ${waterTempClass}`}>
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            {waterTempMeasurements.metric}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {waterTempMeasurements.value}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        {waterTempMeasurements.unit}
                        </Typography>
                    </CardContent>
                </Card>
                </Grid>
        </div>
    </div>      
  );
}
