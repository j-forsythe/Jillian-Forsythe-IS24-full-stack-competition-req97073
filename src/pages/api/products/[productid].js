import products from '../../../../data/generated.json'
export default function handler(req, res) {
  const { productid } = req.query
  const product = products.find((product) => product.productId === productid)
  res.status(200).json(product)
}
