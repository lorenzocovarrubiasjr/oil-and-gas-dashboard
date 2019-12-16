import React from 'react';
import ControllerIcon from '../Controller-Icon/Controller-Icon.component';
import ControllerSelect from '../Contoller-Select/Controller-Select.component';
import NightDayMode from '../NightDayMode/NightDayMode.component';
import './SubHeader.styles.scss';

const SubHeader = () => {
    return (
    <div className="subheader">
        <NightDayMode />
        <ControllerIcon />
        <ControllerSelect />
    </div>
    );
   
};

export default SubHeader;