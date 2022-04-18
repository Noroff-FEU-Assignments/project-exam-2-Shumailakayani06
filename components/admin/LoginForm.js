import React from 'react';
import { AUTH_URL } from '../../utils/urls';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { userLoginSchema } from '../../utils/yupSchemas';
import axios from 'axios';
import { useHistory } from "react-router-dom"



const LoginForm = () => {
   
  const [auth, setAuth] = useContext(AuthContext);

 
  const loginUser = async (data) => {
    const responseData = await axios.post(AUTH_URL, {
      identifier: data.email,
      password: data.password,
    });

    console.log('Response Data: ', responseData);

   
    setAuth(responseData.data);
    
    
  };


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(userLoginSchema),
  });

  const submitForm = (data) =>{
      console.log('DATA :', data);
   
    loginUser(data).catch(console.error);
   console.log(auth);
   

  }

  return (
    <div className='form_inputs'>
      <form onSubmit={handleSubmit(submitForm)}>
      <div> <input type='text' 
        name='email'
         placeholder='Your email...' 
         {...register("email", { required: true })} 
         className='input'
         />
          <div className='loginError'>{errors.email && <span>{errors.email.message}</span>}</div>
          </div> 
       <div>
        <input
          type='password'
          placeholder='Your password...'
          {...register('password')}
          className='input'
        />
         <div className='loginError'>{errors.password && <span>{errors.password.message}</span>}</div>
       </div>
    
       <div>
        <input type="checkbox" id="scales" name="scales" className='check'/>
        <label for="scales">Remember me</label>
       </div>

        <button>Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;