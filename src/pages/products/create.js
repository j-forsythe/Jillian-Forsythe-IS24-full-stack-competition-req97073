import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'

const NewProduct = () => {
  const [productAdded, setProductAdded] = useState(false)

  const createProduct = (values) => {
    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        setProductAdded(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <>
      <Link href="/">&lt;&nbsp;Back</Link>
      <h1>New Product</h1>
      <ProductForm handleSubmit={createProduct} submitSuccess={productAdded} />
    </>
  )
}

export default NewProduct
