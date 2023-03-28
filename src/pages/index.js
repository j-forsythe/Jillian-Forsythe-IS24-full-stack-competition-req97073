import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ProductTable from '@/components/ProductTable'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>
          BC Government Ministry of Citizens&apos; Services Information
          Management Branch (IMB)
        </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.description}>
        <h2>Products</h2>
        <Link href="/product/new">Add new product</Link>
      </div>
      <ProductTable />
    </>
  )
}
