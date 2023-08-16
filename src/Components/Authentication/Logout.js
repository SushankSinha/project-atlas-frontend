import axios from 'axios';
import React, {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import serverURL from '../global'

function Logout (){

    const navigate = useNavigate();

    async function userLogout(){
        try {
            const response = await axios.get(`https://atlas-tool-server.onrender.com/logout`, {
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
    })

  return (
    <div>Logout</div>
  )
}

export default Logout