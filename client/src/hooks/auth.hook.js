import { useState,useCallback,useEffect} from 'react';


export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const storageName = 'userData'

    const login = useCallback((jwtToken,id)=>{
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName,JSON.stringify({userId: id,token: jwtToken})) //стандартный браузерный компонент
    },[])
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageName)
    },[])
    useEffect(() => { //Если при запуске приложения уже есть локальные данные. для этого логин в useCallback - чтобы использовать его в useEffect
        const data = JSON.parse(localStorage.getItem(storageName))
        if (data && data.token){
            login(data.token,data.userId)
        }
    }, [login])

    return {login,logout,token,userId}
}