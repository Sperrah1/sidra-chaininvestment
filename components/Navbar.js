import React from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>SIDRA-CHAIN</div>
      <div className={styles.navLinks}>
        <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
        <Link href="/profile" className={styles.navLink}>Profile</Link>
        <Link href="/contact" className={styles.navLink}>Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
