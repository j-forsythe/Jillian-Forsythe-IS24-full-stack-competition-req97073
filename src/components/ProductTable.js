import React from 'react'

const ProductTable = () => {
  return (
    <div className="relative rounded-xl overflow-auto">
      <div className="shadow-sm overflow-hidden">
        <table className="border-collapse table-auto w-full text-sm">
          <thead className="bg-slate-800">
            <tr>
              <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                Song
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 py-3 text-slate-400 dark:text-slate-200 text-left">
                Artist
              </th>
              <th className="border-b dark:border-slate-600 font-medium p-4 pr-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                Year
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            <tr>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                The Sliding Mr. Bones (Next Stop, Pottersville)
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                Malcolm Lockyer
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                1961
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                Witchy Woman
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 text-slate-500 dark:text-slate-400">
                The Eagles
              </td>
              <td className="border-b border-slate-100 dark:border-slate-700 p-4 pr-8 text-slate-500 dark:text-slate-400">
                1972
              </td>
            </tr>
            <tr>
              <td className="border-b border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                Shining Star
              </td>
              <td className="border-b border-slate-200 dark:border-slate-600 p-4 text-slate-500 dark:text-slate-400">
                Earth, Wind, and Fire
              </td>
              <td className="border-b border-slate-200 dark:border-slate-600 p-4 pr-8 text-slate-500 dark:text-slate-400">
                1975
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ProductTable
