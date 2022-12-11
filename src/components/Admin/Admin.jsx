import React, { useContext } from 'react'
import { useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext/ProductState';
import './Admin.scss'

const Admin = () => {
    const { getCategories, getProducts, products, deleteProduct, categories } = useContext(ProductContext);

    useEffect(() => {
        getCategories();
        getProducts('', 0, 1, 9999, '');
        // eslint-disable-next-line
    }, [])

    const productsList = !products ? null : products.map(product => {
        return (
            <tr>
                <td><img src={"http://localhost:3001/" + product.img_product} alt="Product" /></td>
                <td>{ product.name }</td>
                <td>{product.Category.name}</td>
                <td>{product.price}$</td>
                <td>
                    <div className='d-flex flex-column actions'>
                        <button className='btn btn-success'>Edit <i className="fa fa-pencil" aria-hidden="true"></i></button>
                        <button onClick={() => deleteProduct(product)} className='btn btn-danger'>Delete <i className="fa fa-trash" aria-hidden="true"></i></button>
                    </div>
                </td>
            </tr>
        )
    })

    return (
        <div className='d-flex justify-content-center mt-3 mb-3'>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products ? productsList : null}
                </tbody>
            </table>
        </div>
    )
}

export default Admin