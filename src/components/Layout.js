import React from 'react'
import styles from '@/styles/Home.module.css'

const Layout = ({ children }) => {
  return (
    <>
      <header className={styles.description}>
        <h1 className="w-full pb-4">
          BC Government Ministry of Citizens&apos; Services Information
          Management Branch (IMB)
        </h1>
      </header>
      <main className={styles.main}>{children}</main>
    </>
  )
}

export default Layout
