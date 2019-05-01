import React from 'react'
import { Link } from 'react-router-dom'

const navTabs = [
    { name: 'Home', path: '/home'},
    { name: 'Products', path: '/products'},
    { name: 'User', path: '/login'},
    { name: 'Cart', path: '/cart'},

]

const Nav = () => {

    return (
        <ul>
            {
                navTabs.map( tab => {
                    return (
                        <Link key={ tab.name } to={ tab.path }>
                            <li>
                                {tab.name}
                            </li>
                        </Link>
                    )
                })
            }
        </ul>
    )
}

export default Nav
