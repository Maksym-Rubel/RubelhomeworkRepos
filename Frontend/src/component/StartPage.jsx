import React, { useContext, useEffect, useState } from 'react'
import "./StartPage.css"
import OneSubject from './OneSubject'
import { Link } from 'react-router-dom';
import { CounterContext } from '../context/currenthome.jsx';
import axios from 'axios';
import { returnUserclass } from '../services/returnUser.servicse.js';
import { accountService } from '../services/account.service.js';
import { userRole } from '../services/userRole.service.js';
import EditWindow from './EditWindow.jsx';

export default function StartPage() {
  const [ResObj, SetRes] = useState([]);
  const [ResObjCont, SetResCont] = useState([]);

  const [ObjName, SetObjName] = useState([]);
  const { datetimeValue, setdatetimeValue } = useContext(CounterContext);
  const { Email, setEmail, ItemIdCt, setItemId, EditMenu, setEditMenu } = useContext(CounterContext);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => { GetItems() }, [Email])
  useEffect(() => {
    // console.log("Edit", EditMenu)
    document.body.style.overflowY = EditMenu ? "hidden" : "auto";
    document.documentElement.style.overflowY = EditMenu ? "hidden" : "auto";

  }, [EditMenu])
  // function getDate() {
  //   let DateTop = new Date();
  //   let getDay = DateTop.getDate()
  //   let getMonth = DateTop.getMonth();
  //   return getDay + "." + ((getMonth + 1) < 10 ? "0" + (getMonth + 1) : (getMonth + 1));
  // }
  async function GetItems() {
    var data = await fetch(`https://6641f30f331c.ngrok-free.app/api/Homework/GeHomeWorkItems?dateTime=${datetimeValue.format("YYYY-MM-DD")}`);
    var res = await data.json();
    if (res != null) {
      SetRes(res.filter(m => m.isControlWork == false));
      SetResCont(res.filter(m => m.isControlWork == true));

    }
  }
  async function GetItem() {

    // console.log("Token:", localStorage.getItem("token"));





    axios.get(`${API_URL}/api/Items/GetAllItem`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`

      }
    }).then((res) => {

      SetObjName(res.data);


    }).catch((error) => {
      if (error.response == 403) {

        const refreshed = returnUserclass.returnUser();

        if (refreshed) {
          return GetItem();

        }

      }
      else {
        console.log("Get Item Fail")
      }

    }
    );



  }
  function GetItemName(ItemId) {
    if (ItemId == null) {
      console.log("Null")
    }
    var arr = [...ObjName];
    var modelarr = arr.filter(m => m.id == ItemId)[0];

    return modelarr?.name
    // console.log(modelarr.name)
  }
  useEffect(() => {
    // console.log(datetimeValue.format("YYYY-MM-DD"))
    GetItems();
    GetItem();
  }, [datetimeValue])
  // useEffect(() => {
  //   GetItemName(1)
  // }, [ObjName])
  return (
    <>
      {EditMenu ? <EditWindow></EditWindow> : null}
      <div className={EditMenu ? "StartPage-classEdit" : 'StartPage-class'}>
        <div className='Option-class'>
          <div className='Fift-classNext'>
            <img src='../public/imgs/TungTungSahur.png'></img>

          </div>
          <div className='Fift-class'>
            <h1>Домашнє завдання</h1>

          </div>

        </div>
        <div className='OsnovnaInfo-class'>
          <div className='HomeWork-class'>
            <div className='HomeWorkDiv-class'>
              <p>Домашні завдання</p>
              {userRole.get() == "admin" ?

                <Link className='LinkBtnLink' to="/AddHome">

                  <p>+</p>

                </Link> : ""}
            </div>
            {
              ResObj?.length > 0 ? ResObj?.map((item) => (
                <OneSubject Id={item.id} key={item.id} Title={`${GetItemName(item.itemId)}`} ItemId={item.itemId} Description={item.decription} />

              ))

                :
                <div className='HomeworkNull'>
                  <p>домашнього немає</p>

                </div>
            }

          </div>
          <div className='HomeWork-class'>

            <p>Контрольні роботи</p>
            {
              ResObjCont?.length > 0 ? ResObjCont?.map((item) => (
                <OneSubject Id={item.id} key={item.id} Title={`${GetItemName(item.itemId)}`} ItemId={item.itemId} Description={item.decription} />

              ))
                //
                :
                <div className='HomeworkNull'>
                  <p>контрольних немає</p>
                </div>
            }
          </div>

        </div>
      </div>
    </>


  )
}
