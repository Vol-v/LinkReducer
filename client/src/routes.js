import React from 'react'
import {Routes,Route} from 'react-router-dom' // раньше был Switch и Redirect, в новой версии реакт-дома это Routes
import { LinksPage } from './pages/LinksPage'; // авто импорт с помощю расширения вскода
import { CreatePage } from './pages/CreatePage';
import { DetailPage } from './pages/DetailPage';
import { AuthPage } from './pages/AuthPage';
export const useRoutes = (isAuthenticated) => {
    if (isAuthenticated){
        return (
            <Routes>
                <Route path = "/links" exact element = {<LinksPage/>}/>
                <Route path = "/create" exact element = {<CreatePage/>}/>
                <Route path = "/detail/:id" exact element = {<DetailPage/>}/>
                <Route path = "*" exact element = {<CreatePage/>}/>
            </Routes>
        )
    }
    return (
        <Routes>
            <Route path = "/" element = {<AuthPage />}/> 
            <Route path="*" element={<AuthPage />} />
        </Routes>
    )
}