const { randomUUID } = require('crypto')
const jsonfile = require('jsonfile')

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // read JSON object from file
      jsonfile.readFile('data/generated.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // send JSON object
        res.status(200).json(data)
      })
      break
    case 'POST':
      let newProduct = req.body

      // add UUID to new product
      newProduct.productId = randomUUID()

      // normalize date format
      newProduct.startDate = newProduct.startDate.replaceAll('-', '/')

      jsonfile.readFile('data/generated.json', 'utf-8', (err, data) => {
        if (err) {
          throw err
        }

        // add new record to products
        data.push(newProduct)

        // write JSON to a file
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
      // respond with new product data
      res.status(201).json({
        success: true,
        data: newProduct,
      })
      break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
