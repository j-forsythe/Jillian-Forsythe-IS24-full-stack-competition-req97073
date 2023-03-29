const jsonfile = require('jsonfile')

export default function handler(req, res) {
  const { productId } = req.query

  switch (req.method) {
    case 'GET':
      if (productId) {
        jsonfile.readFile('data/generated.json', 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          // find product from id
          let product = data?.find((product) => product.productId === productId)

          if (product) {
            // modify date format for html input
            product.startDate = product?.startDate.replaceAll('/', '-')
            // send JSON object
            res.status(200).json(product)
          } else {
            // product not found
            res.status(404).end()
          }
        })
      }
      break
    case 'PUT':
      let editProduct = req.body

      // normalize date format
      editProduct.startDate = editProduct.startDate.replaceAll('-', '/')

      jsonfile.readFile('data/generated.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find index of product to update
        const index = data.findIndex((p) => p.productId === productId)

        // if index is found replace data with updated product
        if (index !== -1) {
          data[index] = editProduct
        } else {
          // product not found
          res.status(500).end()
        }

        // write updated JSON to file
        jsonfile.writeFile(
          'data/generated.json',
          data,
          { spaces: 4 },
          (err) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          },
        )
      })
      res.status(200).json({
        success: true,
        data: editProduct,
      })
      break
    case 'DELETE':
      jsonfile.readFile('data/generated.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find product from id
        const index = data.findIndex((p) => p.productId === productId)
        data.splice(index, 1)

        // write updated JSON to file
        jsonfile.writeFile(
          'data/generated.json',
          data,
          { spaces: 4 },
          (err) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          },
        )
      })
      res.status(204).end()
      break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
