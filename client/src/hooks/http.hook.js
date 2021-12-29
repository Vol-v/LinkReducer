import { useCallback, useState } from "react"


export const useHttp = () => {
    const [loading, setLoading] = useState(false) //Нужно чтобы кнопка регистрации и логина не нажимались пока идет загрузка
    const [error, setError] = useState(null);
    const request = useCallback(async (url,method = "GET",body=null,headers = {}) => { //т.к функция асинхронная, ее надо обернуть в юзколбэк чтобы реакт не входил в рекурсию
        setLoading(true)
        try{
            if (body){
                body = JSON.stringify(body) // нужно чтобы при POST в Payload отправлялись данные в формате строки а не Object
                headers['Content-Type'] = 'application/json' // Нужно для указания что по сети передается json 
            }
            const response = await fetch(url,{method,body,headers})// браузерный метод
            const data = await response.json();
            if (!response.ok)
            {
                throw new Error(data.message || "Something went wrong...")
            }
            setLoading(false)
            return data
        }catch(e){
            setLoading(false)
            setError(e.message)
            throw e;
        }
    },[])

    const clearError = useCallback(() => setError(null),[]);
    return {loading,request,error,clearError}
}