import { Formik, Form, Field } from 'formik'
import React from 'react'

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block appearance-none ml-4 mr-8',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
}

const SearchProducts = ({ onSearch, onClear }) => {
  return (
    <Formik
      initialValues={{
        attribute: 'scrumMasterName',
        query: '',
      }}
      onSubmit={async (values) => {
        onSearch(values)
      }}
      onReset={onClear}
    >
      <Form className="flex mt-4">
        <label className={styles.label} htmlFor="attribute">
          Search by:
        </label>
        <Field as="select" name="attribute" className={styles.field}>
          <option value="scrumMasterName">Scrum Master Name</option>
          <option value="Developers">Developers</option>
        </Field>

        <label className={styles.label} htmlFor="query">
          Query
        </label>
        <Field
          id="query"
          name="query"
          placeholder="Jane Doe"
          className={styles.field}
          required
        />

        <button type="submit" className={styles.button}>
          Search
        </button>
        <button type="reset" className={`${styles.button} ml-4`}>
          Clear
        </button>
      </Form>
    </Formik>
  )
}

export default SearchProducts
