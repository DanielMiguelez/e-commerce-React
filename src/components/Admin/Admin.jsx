import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext/ProductState';
import './Admin.scss'

const Admin = () => {
    const { getCategories, getProducts, products, deleteProduct } = useContext(ProductContext);
    const [ search, setSearch ] = useState('')

    useEffect(() => {
        getCategories();
        getProducts(search, 0, 1, 9999, '');
        // eslint-disable-next-line
    }, [search])

    const productsList = !products ? null : products.map((product, idx) => {
        return (
            <tr key={idx}>
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
        <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3 admin-container'>
            <div className='admin-header'><span>Admin</span></div>
            <div className="admin-form"><form><input className='form-control' type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter product by name..." /></form></div>
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