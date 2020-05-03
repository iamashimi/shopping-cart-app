import axios from "axios";

export const addProduct = (newProduct) => {
  return axios
    .post(`http://localhost:3000/admin/add-product`, {
      title: newProduct.title,
      description: newProduct.description,
      price: newProduct.price,
      quantity: newProduct.quantity,
      imagePath: newProduct.imagePath,
    })
    .catch((err) => {
      console.log(err);
    });
};
