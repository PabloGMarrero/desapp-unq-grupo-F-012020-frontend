import React from 'react';
import RegisterUser from '../components/Register/RegisterUser'
import {withRouter} from 'react-router';
import NavBarResponsive from '../components/Navbar/NavBarResponsive'

const RegisterUserView = () => {
    return (   
        <div>
            <NavBarResponsive></NavBarResponsive>
            <RegisterUser></RegisterUser>
        </div>      
    )         
}

export default withRouter(RegisterUserView);