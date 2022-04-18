import React from 'react';
import Heading from "../components/elements/Heading";
import LoginForm from '../components/admin/LoginForm';

const Login = () => {
    return ( 
    <div className='login_div'>
          <Heading content="Login Page"/>
        <div className='form'>
            <div className='form_div'>
                <div>
                    <h2>Log In</h2>
                </div>
             <LoginForm />
           </div>
        </div>
    </div>
     );
}
 
export default Login;