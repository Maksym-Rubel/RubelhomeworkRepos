import React, { use, useContext, useEffect, useRef, useState } from 'react'
import "./EditWindow.css"
import { ColorPicker } from '../services/color.service'
import { CounterContext } from '../context/currenthome';
import axios from 'axios';
export default function EditWindow() {
    const { Email, setEmail, ItemIdCt, setItemId, EditMenu, setEditMenu,ItemTitle, setItemTitle,ItemIdItem, setItemIdItem } = useContext(CounterContext);

    const API_URL = import.meta.env.VITE_API_URL;
    const [ObjectFet, setObjectFet] = useState([]);

    useEffect(() => {
        getOneHomeWorkItem()
    }, [])

   function FirstLetter(Title) {
        return String(Title).slice(0, 1);
    }
    async function getOneHomeWorkItem() {
        try {
            var res = await axios.get(`${API_URL}/api/Homework/GetOneHomework?id=${ItemIdCt}`)
  
            setObjectFet(res.data)
        } catch (error) {
            console.log(error);
        }



    }


    return (
        <>
            <div className='Back'></div>
            <div className='EditBack'>
                <div className='Display-class'>
                    <div className='DivFist'>

                        <div className='Subject-class23'>
                            <div className='CircleName-class' style={{ backgroundColor: ColorPicker.getBackColor(ItemIdItem) }}>
                                <p style={{ color: ColorPicker.getFontColor(ItemIdItem) }}>{FirstLetter(ItemTitle)}</p>
                            </div>

                        </div>

                        <div className='SubjectText-class'>
                            <h3>{ItemTitle}</h3>

                        </div>
                    </div>

                    <button className='BtnExit' onClick={() => setEditMenu(false)} ></button>

                </div>

                <div className='DivSecond'>

                    <p>{ObjectFet.decription}</p>
                    {/* <textarea className='TextArea'></textarea> */}
                </div>
            </div>
        </>

    )
}
