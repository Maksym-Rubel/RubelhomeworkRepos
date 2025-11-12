import React, { useContext } from 'react'
import "./OneSubject.css"
import axios from 'axios';
import { tokenService } from '../services/token.service';
import { CounterContext } from '../context/currenthome';
import { userRole } from '../services/userRole.service';
import EditWindow from './EditWindow';
import { ColorPicker } from '../services/color.service';




export default function OneSubject({ Id, Title, Description, ItemId }) {
    const { Email, setEmail, ItemIdCt, setItemId, EditMenu, setEditMenu, ItemTitle, setItemTitle,ItemIdItem, setItemIdItem } = useContext(CounterContext);
    const API_URL = process.env.VITE_API_URL;

    function FirstLetter(Title) {
        return String(Title).slice(0, 1);
    }
    function Desc(Description) {
        return String(Description).length > 30 ? String(Description).slice(0, 30) + "..." : Description;
    }

    function RemoveItem(Id) {

        axios.delete(`${API_URL}/api/Homework/RemoveItem?Id=${Id}`, {
            headers:
            {
                Authorization: `Bearer ${tokenService.get()}`
            }
        }).then(res => {
            if (res.status == 204) {
                setEmail(`${Id}`)
            }
        })
    }
    function SetHomeWOrk() {
        setEditMenu(true);
        setItemId(Id);
        setItemTitle(Title);
        setItemIdItem(ItemId);
    }

    return (
        <>

            <div className='SubjectBack-class'>
                <div className='DivFist'>
                    <button className='BtnClassEdit' onClick={() =>
                        SetHomeWOrk()
                    }>
                        <div className='Subject-class'>
                            <div className='CircleName-class' style={{ backgroundColor: ColorPicker.getBackColor(ItemId) }}>
                                <p style={{ color: ColorPicker.getFontColor(ItemId) }}>{FirstLetter(Title)}</p>
                            </div>

                        </div>
                    </button>
                    <div className='SubjectText-class'>
                        <h3>{Title}</h3>

                        <p>{Desc(Description)}</p>
                    </div>
                </div>
                {userRole.get() == "admin" ? <div className='NextBtn'>
                    <button className='EditBtn'>
                        <img className='Im32' src="/public/imgs/pencil.png" alt="" />
                    </button>
                    <button onClick={() => RemoveItem(Id)} className='RemoveBtn'>
                        <img className='Im32' src="/public/imgs/delete.png" alt="" />
                    </button>
                </div>
                    : ""}


            </div >



        </>

    )
}
