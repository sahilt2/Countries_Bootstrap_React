import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {useAuthState} from "react-firebase-hooks/auth"
import { auth, registerWithEmailAndPassword } from '../auth/firebase';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';

const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [name,setName]=useState('');
    const [user,loading,error]=useAuthState(auth);
    const navigate = useNavigate();

    const register =()=>{
        if(!name)alert("Please enter name")
        registerWithEmailAndPassword(name,email,password)
    }

    useEffect(()=>{
        if(loading) return;
        if(user) navigate('/countries')
    },[user,loading])

    return (
        <div>
            {/* <input 
            type="text" 
            value={name} 
            onChange={(e)=>setName(e.target.value)}
            placeholder='Full Name'/>
            <input 
            type="email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Email'/>
            <input 
            type="password" 
            value={password} 
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Password'/>
            <Button onClick={register}>Register</Button>
            <div>
                Already have an account?
                <Link to="/login">Login</Link>
            </div> */}
            <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)'}} >
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px', borderRadius:'1rem'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create an account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' type='text' value={name}onChange={(e)=>setName(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' type='email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' type='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='password'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg' onClick={register}>Register</MDBBtn>
          <div>
          <p className="mb-0"> Already have an account?
                <Link to="/login">Login</Link></p>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
        </div>
    );
};

export default Register;