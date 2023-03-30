import React, { useState, useEffect } from 'react'
import ProductForm from '@/components/ProductForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

const EditProduct = () => {
  const router = useRouter()
  const { productId } = router.query
  const [data, setData] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [productUpdated, setProductUpdated] = useState(false)

  // send updated product data
  const updateProduct = (values) => {
    fetch(`/api/products/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        // if call is successful update state to inform user
        setProductUpdated(true)
        router.push('/')
      })
      .catch((error) => {
        console.error('Error:', error)
        setHasError(true)
      })
  }

  // fetch product data on render to pre-populate form
  useEffect(() => {
    setLoading(true)
    if (productId) {
      fetch(`/api/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => console.error(error))
    }
    setLoading(false)
  }, [productId])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No product data</p>

  return (
    <>
      <Link href="/">&lt;&nbsp;Back</Link>
      <h1>Editing {data.productName}</h1>
      <ProductForm
        productData={data}
        submitSuccess={productUpdated}
        handleSubmit={updateProduct}
        submitError={hasError}
      />
    </>
  )
}

export default EditProduct
