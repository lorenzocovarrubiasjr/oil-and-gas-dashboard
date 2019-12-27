import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Typography from '@material-ui/core/Typography';
import { TransitionProps } from '@material-ui/core/transitions';
import { IState } from '../../store';
import { useDispatch, useSelector } from 'react-redux'; 
import { actions } from '../../Features/Chart/reducer';
import Icon from '@material-ui/core/Icon';
import './Hello.styles.scss';

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getHello = (state: IState) => {
    const { hello } = state.chart;
    return hello;

}

export default function Hello() {
  const helloToggle = useSelector(getHello);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch({type: actions.toggleHello});
  };

  return (
    <div>
      <Dialog
        open={helloToggle}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className='popUp'
      >
        <DialogTitle id="alert-dialog-slide-title" className="popUpTitle">{"H-LLo J-Wo"}</DialogTitle>
        <Icon className="fas fa-laptop-code laptop" style={{ fontSize: 70 }}/>
        <Typography variant="body2" className="popUp-text" gutterBottom>
            JWo, I want to thank you for the opportunity to have an assessment that is both challenging and rewarding! 
                <br/>
            I recently graduated from Byte Academy, where <Typography variant="overline" >Christie Loyd</Typography> is the director. I had zero experience with GraphQL, Urql, Redux, & Typescript. 
            But, figuring it out has helped me feel like I can accomplish any coding task set before me. I love React and would love to continue growing in React until I reach Jedi status <Icon className="fas fa-jedi jedi" style={{ fontSize: 12 }}/>. Once again, thank you for the opportunity, I do not take your time for granted. 
            <br/>
            <br/>
            Happy Holidays <Icon className="fas fa-holly-berry jedi" style={{ fontSize: 12 }}/>, <br/>
            Lorenzo Covarrubias
        </Typography>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}