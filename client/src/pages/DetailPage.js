import React, { useContext, useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import { useCallback } from 'react';
import { useHttp } from '../hooks/http.hook';
import { AuthContext } from '../context/AuthContext';
import { LinkCard } from '../components/LinkCard';
import { Loader } from '../components/Loader';

export const DetailPage = () =>{
    const {token} = useContext(AuthContext)
    const {request,loading} = useHttp()
    const [link,setLink] = useState(null)
    const linkId = useParams().id //берем из routes.js
    
    const getLink = useCallback( async () => {
        try {
            const fetched = await request('/api/link/'+linkId,'GET',null, {
                authorization: 'Bearer '+ token
            }) //получаем ссылку по id из базы
            setLink(fetched)
        }catch (e) {}
    },[token,linkId,request])

    useEffect( () => {
        getLink()
    },[getLink]) // в useEffect проверяем, что компонент готов

    if (loading) {
        return <Loader />
    }

    return (
        <div>
        { !loading && link && <LinkCard link = {link}/> }
        </div>
    )
}