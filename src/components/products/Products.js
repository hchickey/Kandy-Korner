import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./products.css"


export const Products = () => {
    const [candies, setCandy] = useState([])
    const [filteredCandies, setFiltered] = useState([])
    const [topPriced, setTopPriced] = useState(false)
    const navigate = useNavigate()

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch('http://localhost:8088/products?_expand=type&_sort=name')
            .then(response => response.json())
            .then((productArray) => {
                setCandy(productArray)
                setFiltered(productArray)
            })
        },
        [] // when this array is empty, you are observing initial component state
    )

    useEffect(
        () => {
            if (topPriced) {
                const expensiveCandy = candies.filter(candy => candy.price > 2)
                setFiltered(expensiveCandy)
            }
            else {
                setFiltered(candies)
            }
        },
        [topPriced]
    )

    useEffect(
        () => {
            if (kandyUserObject.staff) {
                // for employees
                setFiltered(candies)
            }
            else {
                // for customers
                setFiltered(candies)
            }
        },
        [candies]
    )

    return <>
    {
        kandyUserObject.staff
        ? <>
        <button className="pricedButton" onClick={ () => { setTopPriced(true) } } >Top Priced</button>
        <button className="showCandies" onClick={ () => { setTopPriced(false) }}>All Candies</button>
        <button className="createCandy" onClick={ () => navigate("/product/create")}>Add Candy</button>
        </>
        : ""
    }
    <h2>List of Products</h2>

    <article className="products">
        {
            filteredCandies.map(
                (candy) => {
                    return <section className="product" key={'product--${product.id}'}>
                        <header>Candy: 🍬{candy.name}</header>
                        <footer>Price: ${candy.price}</footer>
                        <footer>Product Type: {candy.type.candy}</footer>
                    </section>
                }
            )
        }
    </article>
 </>
}