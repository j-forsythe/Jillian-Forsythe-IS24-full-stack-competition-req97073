import products from '../../../../data/generated.json'
export default async function handler(req, res) {
  res.status(200).json(products)
}

// export default (req, res) => {
//   switch (req.method) {
//     case 'GET':
//       //...
//       break
//     case 'POST':
//       //...
//       break
//     case 'PUT':
//       //...
//       break
//     case 'DELETE':
//       //...
//       break
//     default:
//       res.status(405).end() // Method not allowed
//       break
//   }
// }
