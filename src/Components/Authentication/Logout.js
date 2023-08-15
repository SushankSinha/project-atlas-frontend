import axios from 'axios';
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'

function Logout (){

    const navigate = useNavigate();

    async function userLogout(){
        try {
            const response = await axios.get('http://localhost:7000/logout', {
                method: 'GET',
                headers : {
                    Accept: 'applicationjson',
                    "Content-Type" : 'applicationjson'
                },
                credentials : 'include'
            })

            navigate('/login', {replace:true} );
            
            if(response.status !== 200){
                const error = new Error(response.error);
                throw error;
            }

        } catch (error) {
            
        }
        
    }

    useEffect(()=>{
        userLogout()
    }, [])

  return (
    <div>Logout</div>
  )
}

export default Logout