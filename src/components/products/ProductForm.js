import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductForm = () => {
    const [types, setTypes] = useState([])
    const navigate = useNavigate()

    const [candy, update] = useState({
        name: "",
        typeId: "",
        price: ""
    })

    useEffect(
        () => {
            fetch('http://localhost:8088/types')
            .then(response => response.json())
            .then((typeArray) => {
                setTypes(typeArray)
            })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const productsToSendToAPI = {
            name: candy.name,
            typeId: candy.typeId,
            price: candy.price
        }

        return fetch('http://localhost:8088/products', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productsToSendToAPI)
        })
        .then(response => response.json())
        .then(() => {
            navigate("/products")
        })
    }

    return (
        <form className="productForm">
            <h2 className="productForm__title">New Candy</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Name of new candy:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Candy name here"
                        value={candy.name}
                        onChange={
                            (event) => {
                                const copy = {...candy} 
                                copy.name = event.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="typeId">Type of candy:</label>
                    {types.map(
                        (type) => {
                            return (
                                <div className="column" key={type.id}>

                                    <input type="radio" className="product_type" name="product_type" value={type.id}
                                        onChange={
                                            (event) => {
                                                const copy = {...candy}
                                                copy.typeId = parseInt(event.target.value)
                                                update(copy)
                                            }
                                        } />
                                        <label>{type.candy}</label>
                            </div>)
                        }
                    )}
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Price of candy:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Candy price here"
                        value={candy.price}
                        onChange={
                            (event) => {
                                const copy = {...candy}
                                copy.price = parseFloat(event.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                    Submit Candy
                </button>
        </form>
    )
}