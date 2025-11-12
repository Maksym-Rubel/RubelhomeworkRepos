import React, { useState } from 'react'
import "./HomeWorkForm.css"
import { useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import AxiosInstance from '../Interceptors';
import { tokenService } from '../services/token.service';
import MessageWindow from './MessageWindow';
export default function HomeWorkForm() {

  const [ItemId, SetItemId] = useState(1);
  const [Desc, SetDesc] = useState("");
  const [Dates, SetDates] = useState('');
  const [ResObj, SetRes] = useState([]);
  const [IsControl, SetIsControl] = useState(false);
  const [Message, SetMessage] = useState(false);
  const [MessageError, SetMessageError] = useState(false);


  const API_URL = process.env.VITE_API_URL;


  async function GetItems() {
    axios.get(`${API_URL}/api/Items/GetAllItem`, {
      headers: {
        Authorization: `Bearer ${tokenService.get()}`

      }
    }).then((res) => SetRes(res.data))
  }
  function MessageTimeout() {
    SetMessage(true)
    setTimeout(() => SetMessage(false), 1000);
  }
  function MessageErrorTimeout() {
    SetMessageError(true)
    setTimeout(() => SetMessageError(false), 1000);
  }

  useEffect(() => {
    console.log(ResObj);
  }, [ResObj])
  useEffect(() => {
    console.log(ItemId);
  }, [ItemId])
  useEffect(() => {
    GetItems();
  }, [])


  async function CreateHome() {
    var homework = {
      itemId: ItemId,
      decription: Desc,
      homeWorkDate: Dates,
      IsControlWork: IsControl
    }
    try {
      var res = await axios.post(`${API_URL}/api/Homework/CreateHomeWork`, homework, {
        headers: {
          Authorization: `Bearer ${tokenService.get()}`

        }
      });
      if (res.status == 200) {
        console.log(res.status);
        MessageTimeout();
      }
      else
        MessageErrorTimeout();



    } catch (error) {
      MessageErrorTimeout();
      console.log(error)
    }
  }

  return (
    <>
      {Message ? <MessageWindow IsError={false}></MessageWindow> : ""}
      {MessageError ? <MessageWindow IsError={true}></MessageWindow> : ""}

      <div className='FormBackground'>
        <label>
          Id предмета
          <select className='Select-class' onChange={(e) => SetItemId(e.target.value)} name="languages" id="lang">
            {
              ResObj?.map((item) => (
                <option value={item.id} key={item.id} >{item.name}</option>
              ))
            }
          </select>
        </label>
        <label>
          Опис домашнього
          <input type='text' value={Desc} onChange={(e) =>
            SetDesc(e.target.value)} placeholder='параграф...'></input>
        </label>
        <label>
          Дату дз
          <input className='DateInpt' value={Dates} onChange={(e) =>
            SetDates(e.target.value)} type='date' placeholder='дата...'></input>
        </label>
        <label>
          Це контрольна?
          <div className='CheckboxInp'>
            <input className='Checkbox' value={IsControl} onChange={() => SetIsControl(prev => !prev)} type='checkbox'></input>
          </div>
        </label>
        <input className='CreateBtn' onClick={() => CreateHome()} type="button" value={"Створити"} />
      </div>
    </>

  )
}
