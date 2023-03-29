import React, { useState, useEffect, useRef } from 'react'
import { camelCaseToSentence } from '@/utils/camelCaseToSentence'
import Link from 'next/link'
import DeleteProduct from './DeleteProduct'
import SearchProducts from './SearchProducts'

const ProductTable = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [tableHeaders, setTableHeaders] = useState([])
  const productList = useRef({})

  const handleDeleteProduct = (productId) => {
    // send delete request
    fetch(`/api/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        console.log('Succesfully deleted')
        // remove product from state to avoid refetching
        let updatedList = data.filter(
          (product) => product.productId !== productId,
        )
        setData(updatedList)
        // update stored list
        productList.current = updatedList
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleSearch = (values) => {
    const { attribute, query } = values

    // if attribute is array (such as developers) check if query is included in array otherwise check string against string
    const searchData = data.filter((product) =>
      Array.isArray(product[attribute])
        ? product[attribute].includes(query)
        : product[attribute] === query,
    )
    setData(searchData)
  }

  const handleClear = () => {
    // reset data to stored list
    setData(productList.current)
  }

  // get all products on render
  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
        // store full list in ref for resets
        productList.current = data
        // set table headers based on data object keys
        setTableHeaders(Object.keys(data[0]))
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No product data</p>

  return (
    <>
      <SearchProducts onSearch={handleSearch} onClear={handleClear} />
      <p className="py-4 center">Total Products: {data.length}</p>
      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm">
          <table className="border-collapse table-auto w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                {tableHeaders.map((name, index) => (
                  <th
                    className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left"
                    key={index}
                  >
                    {camelCaseToSentence(name)}
                  </th>
                ))}
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {data.length > 0 ? (
                /* iterate over each product */
                data?.map((item) => (
                  <tr key={item.productId}>
                    {
                      /* iterate over each product attribute */
                      Object.values(item).map((attribute, index) => (
                        <td
                          className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                          key={index}
                        >
                          {
                            /* if attribute is an array transform into comma separated string */
                            Array.isArray(attribute)
                              ? attribute.join(', ')
                              : attribute
                          }
                        </td>
                      ))
                    }
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <div className=" flex flex-col items-center">
                        <Link
                          href={`/products/edit/${item.productId}`}
                          className="mb-4"
                        >
                          Edit
                        </Link>
                        <DeleteProduct
                          productName={item.productName}
                          onDeleteProduct={() =>
                            handleDeleteProduct(item.productId)
                          }
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={tableHeaders.length + 1}
                    className="w-full border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductTable
