import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <p>&copy; {new Date().getFullYear()} SIDRA-CHAIN INVESTMENT. All Rights Reserved.</p>
            <style jsx>{`
                .footer {
                    background-color: #000;
                    color: #FFD700;
                    text-align: center;
                    padding: 1rem;
                    margin-top: 2rem;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
