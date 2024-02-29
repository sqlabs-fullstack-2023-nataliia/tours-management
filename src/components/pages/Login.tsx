import React, { useState } from 'react'
import { FcGoogle } from "react-icons/fc";
import { auth, database, googleProvider } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';

const Login = () => {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false)
  const [isOtherOptions, setIsOtherOptions] = useState(false)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  

  const handleLogin = async () => {
    // TODO validation
    if (email !== '' && password !== '') {
      setIsLoading(true)
      await signInWithEmailAndPassword(auth, email, password)
          .then(result => {
              navigate("/");
              setIsLoading(false)
          })
          .catch(error => {
              let errMessage = "";
              switch (error.message) {
                  case "Firebase: Error (auth/invalid-credential).":
                      errMessage = "Username not exist";
                      break;
                  default: break;
              }
              setIsLoading(false)
              console.log(error.message);
              //toast.error(errMessage);
          })
  } else {
      //toast.error("Please provide email and password");
  }
  }

  const handleSignup = async () => {
    // TODO validation
    if (email !== '' && password !== '') {
      setIsLoading(true)
      await createUserWithEmailAndPassword(auth, email, password)
          .then(result => {

              addDoc(collection(database, "accounts"), {
                  uid: result.user.uid,
                  firstName: firstName,
                  lastName: lastName,
                  role: 'user'
              })
                  .then(account_created => {
                      navigate("/")
                      setIsLoading(false)
                  })
                  .catch((error) => {
                      console.log(error.message);
                      setIsLoading(false)
                  })
          })
          .catch(error => {
              let errMessage = '';
              switch (error.message) {
                  case "Firebase: Error (auth/invalid-credential).":
                      errMessage = "Username not exist";
                      break;
                  default: break;
              }
              console.log(error.message);
              setIsLoading(false)
              //toast.error(errMessage);
          })
  } else {
      //toast.error("Please provide email and password");
  }
  }

  const handleSigninGoogle = async () => {
    setIsLoading(true)
    await signInWithPopup(auth, googleProvider)
    .then(result => {
        navigate("/");
        console.log(result);
        setIsLoading(false)
    })
    .catch(error => {
      console.log(error.message)
      setIsLoading(false)
        //toast.error(error.message);
    })
  }

  return (
    <div className='container mt-4'>
      <h1 className='d-flex justify-content-center'>{isOtherOptions ? "Sign in" : "Login"}</h1>
      {
        isLoading ? (
        <div className='container d-flex justify-content-center'>
          <div className="spinner-border text-secondary" role="status"></div>
        </div>
        ) 
        : (
          <>
            <div className="row">
        {
          isOtherOptions &&
          <>
          <div className="col col-md-3 col-0"></div>
          <div className="col col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">First name</label>
              <input onChange={(e) => setFirstName(e.target.value)} type="email" className="form-control" placeholder=""/>
            </div>
          </div>
          <div className="col col-md-3 col-0"></div>
          <div className="col col-md-3 col-0"></div>
          <div className="col col-md-6 col-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Last Name</label>
              <input onChange={(e) => setLastName(e.target.value)} type="test" className="form-control" placeholder=""/>
            </div>
          </div>
          <div className="col col-md-3 col-0"></div>
          </>
        }
        <div className="col col-md-3 col-0"></div>
        <div className="col col-md-6 col-12">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
            <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" placeholder=""/>
          </div>
        </div>
        <div className="col col-md-3 col-0"></div>
        <div className="col col-md-3 col-0"></div>
        <div className="col col-md-6 col-12">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
            <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" placeholder=""/>
          </div>
        </div>
        <div className="col col-md-3 col-0"></div>
      </div>

      <div className="row">

        {
          isOtherOptions 
          ? (
            <>
            <div className="col col-md-4 col-2"></div>
            <div className="col col-md-4 col-8">
              <div className="mb-3">
                <button onClick={handleSignup} type="button" className="btn btn-warning mx-3" style={{width: '100%'}}>Signup</button>
              </div>
            </div>
            <div className="col col-md-4 col-2"></div>

            <div className="col col-md-4 col-2"></div>
              <div className="col col-md-4 col-8">
                <div className="mb-3">
                  <button onClick={handleSigninGoogle} type="button" className="btn btn-outline-danger mx-3" style={{width: '100%'}}>Signin with google <FcGoogle/></button>
                </div>
              </div>
            <div className="col col-md-3 col-2"></div>
            </>
          ) 
          : (
            <>
            <div className="col col-md-4 col-2"></div>
            <div className="col col-md-4 col-8">
              <div className="mb-3">
                <button onClick={handleLogin} type="button" className="btn btn-success mx-3" style={{width: '100%'}}>Login</button>
              </div>
            </div>
            <div className="col col-md-4 col-2"></div>
    
            <div className="col col-md-4 col-2"></div>
            <div className="col col-md-4 col-8">
              <div className="mb-3">
                <button onClick={() => setIsOtherOptions(!isOtherOptions)} type="button" className="btn btn-outline-secondary mx-3" style={{width: '100%'}}>Other options</button>
              </div>
            </div>
            <div className="col col-md-4 col-2"></div>
            </>
          )
        }

        

      </div>
          </>
        )
      }
    </div>
  )
}

export default Login
