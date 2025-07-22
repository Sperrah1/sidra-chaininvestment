import React from 'react';
import Link from 'next/link';

const MobileMenu = ({ isOpen, toggleMenu }) => {
    return (
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
            <ul>
                <li><Link href="/dashboard" onClick={toggleMenu}>Dashboard</Link></li>
                <li><Link href="/deposit" onClick={toggleMenu}>Deposit</Link></li>
                <li><Link href="/withdraw" onClick={toggleMenu}>Withdraw</Link></li>
                <li><Link href="/profile" onClick={toggleMenu}>Profile</Link></li>
                <li><Link href="/transactions" onClick={toggleMenu}>Transactions</Link></li>
                <li><Link href="/chat" onClick={toggleMenu}>Chat</Link></li>
            </ul>
            <style jsx>{`
                .mobile-menu {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 70%;
                    height: 100%;
                    background-color: #000;
                    color: #FFD700;
                    padding: 2rem 1rem;
                    transition: right 0.3s ease-in-out;
                    z-index: 999;
                }
                .mobile-menu.open {
                    right: 0;
                }
                ul {
                    list-style: none;
                    padding: 0;
                }
                li {
                    margin-bottom: 1.5rem;
                }
                a {
                    color: #FFD700;
                    text-decoration: none;
                    font-size: 1.2rem;
                }
            `}</style>
        </div>
    );
};

export default MobileMenu;
