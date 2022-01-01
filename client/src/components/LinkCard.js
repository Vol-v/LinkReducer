import React from 'react';

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>

            <p>Your link: <a href = {link.to} target = "_blank" rel = "noopener noreferrer">{link.to}</a></p> 
            {/* target = "_blank" - чтобы ссылка открывалась в новом окне
            rel нужен для корректной работы React https://www.w3schools.com/TAGS/att_a_rel.asp*/}
            <p>From: <a href = {link.from} target = "_blank" rel = "noopener noreferrer">{link.from}</a></p>
            <p>Amount of clicks: <strong>{link.clicks}</strong> </p>
            <p>Date of creation: <strong>{new Date(link.date).toLocaleDateString()}</strong> </p>
            

        </>
    )
} 