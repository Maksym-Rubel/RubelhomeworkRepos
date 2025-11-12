import dayjs from "dayjs";
import { createContext, useState } from "react"


const initialState =
{
    datetimeValue: dayjs(),
    setdatetimeValue: () => { },
    Email: "Hello",
    setEmail: () => { },
    ItemIdCt: 0,
    setItemId: () => { },
    EditMenu: false,
    setEditMenu: () => { },
    ItemTitle: "none",
    setItemTitle: () => { },
    ItemIdItem: 0,
    setItemIdItem: () => { },
}


export const CounterContext = createContext(initialState);


export const CounterProvider = ({ children }) => {
    const [datetimeValue, setdatetimeValue] = useState(initialState.datetimeValue);
    const [Email, setEmail] = useState(initialState.Email);
    const [ItemIdCt, setItemId] = useState(initialState.ItemIdCt);
    const [EditMenu, setEditMenu] = useState(initialState.EditMenu);
    const [ItemTitle, setItemTitle] = useState(initialState.ItemTitle);
    const [ItemIdItem, setItemIdItem] = useState(initialState.ItemIdItem);







    return (
        <CounterContext.Provider value={{ datetimeValue, setdatetimeValue, Email, setEmail, ItemIdCt, setItemId, EditMenu, setEditMenu, ItemTitle, setItemTitle, ItemIdItem, setItemIdItem }}>
            {children}
        </CounterContext.Provider>
    );
}