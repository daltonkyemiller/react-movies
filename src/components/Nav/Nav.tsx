import React from 'react';

type NavProps = {};

const Nav = ({}: NavProps) => {
    return (
        <nav className={`text-2xl`}>
            <ul className={`flex p-3`}>
                <li className={``}>
                    <a href={`/`}>BRAND</a>
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
