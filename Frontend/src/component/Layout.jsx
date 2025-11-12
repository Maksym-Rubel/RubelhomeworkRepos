import React from 'react'
import "./Layout.css"


import { Outlet } from 'react-router-dom'
import FooterMain from './FooterMain'
import SideBar from './SideBar'
import HeaderMain1 from './HeaderMain1'

export default function Layout() {
    return (
        <>
            <div className='GridLayout-class'>
                <header className='header-class'>
                    <HeaderMain1></HeaderMain1>
                </header>
                <main>
                    <Outlet></Outlet>
                </main>
                <aside>
                    <SideBar></SideBar>
                </aside>
                <footer>
                    <FooterMain></FooterMain>
                </footer>
            </div>

        </>
    )
}
