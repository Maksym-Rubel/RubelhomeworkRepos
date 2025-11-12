import * as React from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/uk';
import "./SideBar.css"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import ItemsSelectView from './ItemsSelectView';
import { CounterContext } from '../context/currenthome.jsx';
import { useEffect } from 'react';
import { useContext } from 'react';
export default function SideBar() {
  const [value, setValue] = React.useState(dayjs().add(1, 'day'));
  const { datetimeValue, setdatetimeValue } = useContext(CounterContext);
  const [FirstRaz, setFirstRaz] = React.useState(true);


  const API_URL = import.meta.env.VITE_API_URL;


  const [Datas, setData] = React.useState([]);

  async function DateOnChange(newvalue) {

    let newDate = newvalue.format("YYYY-MM-DD");
    let DateDay = new Date(newDate);


    let response = await fetch(`https://48454bbf28fe.ngrok-free.app/api/Items/GetDayItems?dateTime=${newDate}&WeekDay=${DateDay.getDay()}`);
    console.log("New value:", response);

    const txt = await response.text();
    console.log("New value:", txt);

    let data = await response.json();
    setData(data);
    setValue(newvalue);
    setdatetimeValue(newvalue)
    console.log("New value:", data);



  }
  useEffect(() => {
    async function fetchDate() {
      let DateDay = new Date(value);

      let response = await fetch(`https://48454bbf28fe.ngrok-free.app/api/Items/GetDayItems?dateTime=${value.format("YYYY-MM-DD")}&WeekDay=${DateDay.getDay()}`);
      console.log("New value:", response);
      const txt = await response.text();
      console.log("New value:", txt);
      let data = await response.json()
      setData(data);
      console.log("New value:", data);

    }
    fetchDate();
  }, [value]);

  useEffect(() => { DateOnChange(value) }, [])

  return (
    <div className='SideBar-class'>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='uk'>

        <DateCalendar value={value} onChange={(newValue) => DateOnChange(newValue)} sx={{ width: '100%' }} />

      </LocalizationProvider>
      <h3 id='ParyId'>Пари</h3>
      <div className='BackItems'>
        {

          Datas.length > 0 ? Datas.map((item, index) => (

            <ItemsSelectView index={index} {...item}></ItemsSelectView>



          )) : <div className='HomeworkNull'>
            <p>пар не знайдено</p>
          </div>
        }
      </div>


    </div>

  )

}