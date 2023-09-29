import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router';
import { auth, loginWithEmailAndPassword } from '../auth/firebase';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [user,loading,error]=useAuthState(auth);
    const navigate = useNavigate();

    useEffect(()=>{
        if(loading) return;
        if(user) navigate('/countries')
    },[user,loading])

    return (
        <div>
             {/* <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'/>
            <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'/>
            <Button onClick={()=>loginWithEmailAndPassword(email,password)}>Login</Button>
            <div>
                Don't have an account?
                <Link to='/register'>Register</Link>
            </div> */}
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'}}>

            <MDBRow className='d-flex justify-content-center align-items-center h-100'>
           <MDBCol col='12'>

           <MDBCard className='m-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '400px'}}>
           <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

           <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
           <p className="text-black-50 mb-5">Please enter your email and password!</p>

           <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Email address' id='formControlLg' type='email' size="lg" value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4 mx-5 w-100' labelClass='text-black' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <MDBBtn outline className='mx-2 px-5' size='lg' onClick={()=>loginWithEmailAndPassword(email,password)}>
          Login
         </MDBBtn>
{/* 
        <div className='d-flex flex-row mt-3 mb-5'>
          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='facebook-f' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='twitter' size="lg"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-3' style={{ color: 'white' }}>
            <MDBIcon fab icon='google' size="lg"/>
          </MDBBtn>
        </div> */}

        <div>
          <p className="mb-0 mt-3">Don't have an account? <Link to='/register'>Register</Link></p>
        </div>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
</MDBRow>
</MDBContainer>
        </div>
    );
};

export default Login;