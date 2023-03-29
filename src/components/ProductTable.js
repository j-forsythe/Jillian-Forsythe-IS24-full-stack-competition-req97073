import React, { useState, useEffect } from 'react'
import { camelCaseToSentence } from '@/utils/camelCaseToSentence'
import Link from 'next/link'

const ProductTable = () => {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [tableHeaders, setTableHeaders] = useState([])

  useEffect(() => {
    setLoading(true)
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
      .catch((error) => console.error(error))
  }, [])

  useEffect(() => {
    if (data && !tableHeaders.length) {
      setTableHeaders(Object.keys(data[0]))
    }

    return () => {}
  }, [data, tableHeaders])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No product data</p>

  return (
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
            {data?.map((item) => (
              <tr key={item.productId}>
                {Object.values(item).map((attribute, index) => (
                  <td
                    className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400"
                    key={index}
                  >
                    {typeof attribute === 'object'
                      ? attribute.join(', ')
                      : attribute}
                  </td>
                ))}
                <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                  <Link href={`/products/edit/${item.productId}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="py-4 center">Total Products: {data.length}</p>
      </div>
    </div>
  )
}

export default ProductTable
