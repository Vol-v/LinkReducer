import React, { useContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';

export const CreatePage = () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState("")
    const {request} = useHttp()
    const navigate = useNavigate()

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const pressHandler = async event => {
        if (event.key === "Enter"){
            try {
                const data = await request('/api/link/generate',"POST",{from:link},{
                    authorization: 'Bearer '+auth.token
                })
                navigate('/detail/'+data.link._id)
            }catch(e){

            }
        }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input placeholder="Enter link" 
                    id="link" type="text" 
                    className="white-input" 
                    onChange={e => setLink(e.target.value)} 
                    onKeyPress = {pressHandler}
                    value ={link} 
                    style={{color : "#b51313", backgroundColor : "#115e067a"}} />
                </div>
                <label htmlFor="link"></label>
            </div>
        </div>
    )
}