import ProductForm from '@/components/ProductForm'
import { Formik, Field, Form } from 'formik'
import Link from 'next/link'
const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
}
const NewProduct = () => (
  <>
    <Link href="/">&lt;&nbsp;Back</Link>
    <ProductForm />
  </>
)

export default NewProduct
