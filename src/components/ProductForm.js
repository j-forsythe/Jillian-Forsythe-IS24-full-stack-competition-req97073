import React, { Fragment } from 'react'

import { Formik, Field, Form, FieldArray } from 'formik'

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
  submitError = false,
}) => (
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
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ values, isSubmitting }) => (
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
                <Fragment key={index}>
                  <Field
                    name={`Developers.${index}`}
                    className={`${styles.field} ${index === 0 ? 'mb-6' : ''}`}
                    required
                  />
                  {
                    /* There must always be one developer */
                    values.Developers.length > 1 && index > 0 && (
                      <button
                        type="button"
                        className="p-4"
                        onClick={() => arrayHelpers.remove(index)} // remove a developer from the list
                      >
                        -
                      </button>
                    )
                  }
                  {
                    /* Max developers is five */
                    values.Developers.length < 5 &&
                      index >= values.Developers.length - 1 && (
                        <button
                          type="button"
                          className="p-4"
                          onClick={() => arrayHelpers.insert(index + 1, '')} // insert an empty string at a position
                        >
                          +
                        </button>
                      )
                  }
                </Fragment>
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
    {submitError && (
      <p>
        There was an error {productData ? 'updating' : 'adding'} the product.
        Please try again later.
      </p>
    )}
  </>
)

export default ProductForm
