import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../../services/firebaseConfig';

const Logout = () => {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    logout()
  }, [])

  const logout = async () => {
    setIsLoading(true)
    await auth.signOut();
    setIsLoading(false)
    navigate("/")
  }
  
  return (
    <div className='container d-flex justify-content-center'>
      {
        isLoading && <div className="spinner-border text-secondary" role="status"></div>
      }
    </div>
  )
}

export default Logout
