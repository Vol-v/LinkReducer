import { useState,useEffect, useContext } from "react"
import React from 'react'
import { useHttp } from '../hooks/http.hook';
import { useMessage } from "../hooks/message.hook";
import { AuthContext } from '../context/AuthContext';

// class AuthPage extends React.Component{
//     render(){
//         <div>
//             <h1>Auth Page</h1>
//         </div>
//     }
// }
// export default AuthPage;
export const AuthPage = () => {
    const message = useMessage()
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({email: "", password: ""})

    const changeHandler = event =>{
        setForm({...form,[event.target.id]:event.target.value}) //https://www.w3schools.com/react/react_usestate.asp
                                                                  //Берем id элемента который email или password и меняем
    }
    const {loading,request,error,clearError} = useHttp()

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register","POST",{...form}) // используем proxy в package.json
            message(data.message)
        } catch(e){

        }

    }
    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login","POST",{...form}) // используем proxy в package.json
            auth.login(data.token,data.userId)
        } catch(e){

        }

    }
    useEffect(() =>{
        window.M.updateTextFields()
    },[])
    useEffect(() => {
        
        message(error)
        clearError()
    }, [error])// плохо, но пока не знаю как исправить

    return (
        <div class="row">
            <div class="col s6 offset-s3">
                <h1>Vol-v link reducer</h1>

                <div class="col s12 m6">
                    <div class="card cyan darken-4">
                        <div class="card-content white-text">
                            <span class="card-title">Authentification</span>
                            <div className="input-field">
                                <input placeholder="Enter email" id="email" type="text" className = "white-input" onChange={changeHandler}/>
                            </div>
                            <div className="input-field">
                                <input placeholder="Enter password" id="password" type="password"  className = "white-input" onChange={changeHandler}/>

                            </div>
                        </div>
                        <div class="card-action">
                            <button className="btn teal darken-4" style={{ marginRight: 10 }} disabled = {loading} onClick = {loginHandler}>Login</button> {/* style сделан на скорую руку, потом надо переделать*/}
                            <button className="btn blue-grey darken-2" onClick = {registerHandler} disabled = {loading}>Register</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}