import React from 'react'
import "./MessageWindow.css"
export default function MessageWindow({ IsError }) {
    return (

        !IsError
            ?
            <div className='MessageDiv-class'>
                <div className='ImgMessage'></div>
                <div className='TextMessage'>
                    <p>Дані успішно додано</p>
                </div>

            </div>
            :
            <div className='MessageDiv-classError'>
                <div className='ImgMessageError'></div>
                <div className='TextMessage'>
                    <p>Помилка</p>
                </div>

            </div>

    )
}
