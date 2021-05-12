import React, { useState, useEffect } from 'react'
import Button from '../../Forms/Button/Button'
import Form from '../../Forms/FormInput/Form'
import FormSelect from '../../Forms/FormSelect./FormSelect'
import './admin.scss'
import Modal from '../../Modal/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addProductStart, fetchProductsStart, deleteProductStart } from '../../../redux/Products/productsActions'

const mapState = ({productsData}) => ({
    products: productsData.products
})

const Admin = (props) => {

    const {products} = useSelector(mapState)
    const dispatch = useDispatch()

    const [hideModal, setHideModal] = useState(true);
    const [productCategory, setProductCategory] = useState('mens');
    const [productName, setProductName] = useState('');
    const [productThumbnail, setProductThumbnail] = useState('');
    const [productPrice, setProductPrice] = useState(0);

    // bir defa render etmesi için boş oluşturduk
    useEffect(() => {
        dispatch(
            fetchProductsStart()
        )
    },[])

    const toggleModal = () => setHideModal(!hideModal)

    const configModal = {
        hideModal,
        toggleModal
    }

    const resetForm = () => {
        setHideModal(true)
        setProductCategory("mens")
        setProductName("")
        setProductThumbnail("")
        setProductPrice(0)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(
            addProductStart({
                productCategory,
                productName,
                productThumbnail,
                productPrice
            })
        )
        resetForm()
    }

    return (
        <div className="admin">
            <div className="callToActions">
                <ul>
                    <li>
                        <Button onClick={() => toggleModal()}>
                            Add New Product
                        </Button>
                    </li>
                </ul>
            </div>

            <Modal {...configModal}>
                <div className="addNewProductForm">
                    <form onSubmit={handleSubmit}>
                        <h2 style={{ marginBottom: "8px" }}>
                            Add new product
                        </h2>

                        <FormSelect
                            label="category"
                            options={[{
                                value: "mens",
                                name: "Mens"
                            }, {
                                value: "womens",
                                name: "Womens"
                            }]}
                            handleChange={e => setProductCategory(e.target.value)} />

                        <Form
                            label="Name"
                            type="text"
                            value={productName}
                            handleChange={e => setProductName(e.target.value)} />

                        <Form
                            label="Main image URL"
                            type="url"
                            value={productThumbnail}
                            handleChange={e => setProductThumbnail(e.target.value)}
                        />
                        <Form
                            label="Price"
                            type="number"
                            min="0.00"
                            max="10000.00"
                            step="0.01"
                            value={productPrice}
                            handleChange={e => setProductPrice(e.target.value)} />


                        <Button type="submit">
                            Add product
                        </Button>
                    </form>
                </div>

            </Modal>

            <div className="manageProducts">
                <table border="0" cellPadding="0" cellSpacing="0" >
                    <tbody>
                        <tr>
                            <th>
                                <h1>Manage Products</h1>
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <table border="0" cellPadding="10" cellSpacing="0">
                                    <tbody>
                                        {products.map((product, index) => {
                                            const {
                                                productName,
                                                productThumbnail,
                                                productPrice,
                                                documentID
                                            } = product;
                                            return (
                                                <tr key={index}>
                                                    <td>
                                                        <img width="250" height="250" src={productThumbnail} className="thumb" />
                                                    </td>
                                                    <td>
                                                        {productName}
                                                    </td>
                                                    <td>
                                                        {productPrice}₺
                                                    </td>
                                                    <td style={{marginLeft:"25px"}}>
                                                        <Button onClick={() => dispatch(deleteProductStart(documentID))}>
                                                            Delete
                                                        </Button>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Admin
