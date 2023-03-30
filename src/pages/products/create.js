import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ProductForm from '@/components/ProductForm'

const NewProduct = () => {
  const [hasError, setHasError] = useState(false)
  const [productAdded, setProductAdded] = useState(false)
  const router = useRouter()

  // send new product data to API
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
        // inform user product added successfully
        setProductAdded(true)
        router.push('/')
      })
      .catch((error) => {
        console.error('Error:', error)
        setHasError(true)
      })
  }

  return (
    <>
      <Link href="/">&lt;&nbsp;Back</Link>
      <h1>New Product</h1>
      <ProductForm
        handleSubmit={createProduct}
        submitSuccess={productAdded}
        submitError={hasError}
      />
    </>
  )
}

export default NewProduct
