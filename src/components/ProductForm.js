import React from 'react'

import {
  Formik,
  Field,
  Form,
  FieldArray,
  isSubmitting,
  setIsSubmitting,
} from 'formik'

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
}

const ProductForm = ({
  productData = undefined,
  handleSubmit = () => {},
  submitSuccess = false,
}) => {
  return (
    <>
      <Formik
        initialValues={
          productData ?? {
            productId: '',
            productName: '',
            productOwnerName: '',
            Developers: [''],
            scrumMasterName: '',
            startDate: '',
            methodology: 'Agile',
          }
        }
        onSubmit={(values) => {
          handleSubmit(values)
          setIsSubmitting(false)
        }}
      >
        {({ values }) => (
          <Form>
            <label className={styles.label} htmlFor="productName">
              Product Name
            </label>
            <Field
              className={styles.field}
              id="productName"
              name="productName"
              required
            />

            <label className={styles.label} htmlFor="productOwnerName">
              Product Owner
            </label>
            <Field
              className={styles.field}
              id="productOwnerName"
              name="productOwnerName"
              required
            />

            <label className={styles.label} htmlFor="scrumMasterName">
              Scrum Master
            </label>
            <Field
              className={styles.field}
              id="scrumMasterName"
              name="scrumMasterName"
              required
            />

            <label className={styles.label} htmlFor="Developers">
              Developers
            </label>
            <FieldArray
              id="Developers"
              name="Developers"
              required
              render={(arrayHelpers) =>
                values.Developers.map((developer, index) => (
                  <div key={index}>
                    <Field
                      name={`Developers.${index}`}
                      className={styles.field}
                      required
                    />
                    {values.Developers.length > 1 && index > 0 && (
                      <button
                        type="button"
                        className="p-4"
                        onClick={() => arrayHelpers.remove(index)} // remove a developer from the list
                      >
                        -
                      </button>
                    )}
                    <button
                      type="button"
                      className="p-4"
                      onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                    >
                      +
                    </button>
                  </div>
                ))
              }
            />
            <label className={styles.label} htmlFor="startDate">
              Start Date
            </label>
            <Field
              className={styles.field}
              id="startDate"
              name="startDate"
              type="date"
              required
            />
            <div role="group" aria-labelledby="methodology">
              <label className={styles.label} htmlFor="methodology">
                Methodology
              </label>
              <label className="mr-4">
                <Field value="Agile" type="radio" name="methodology" />
                Agile
              </label>
              <label>
                <Field
                  //   className={styles.field}
                  value="Waterfall"
                  type="radio"
                  name="methodology"
                  required
                />
                Waterfall
              </label>
            </div>

            <div className="mt-8">
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {submitSuccess && <p>Product {productData ? 'Updated' : 'Added'}!</p>}
    </>
  )
}

export default ProductForm
