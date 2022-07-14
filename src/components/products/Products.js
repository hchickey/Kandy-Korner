import { useEffect, useState } from "react";
import "./products.css"


export const Products = () => {
    const [candies, setCandy] = useState([])
    const [topPriced, setTopPriced] = useState(false)

    useEffect(
        () => {
            fetch('http://localhost:8088/products')
            .then(response => response.json())
            .then((productArray) => {
                setCandy(productArray)
            })
        },
        []
    )

    useEffect(
        () => {
            if (topPriced) {
                const expensiveCandy = candies.filter(candy => candy.price > 2)
                setCandy(expensiveCandy)
            }
            else {
                setCandy(candies)
            }
        },
        [topPriced]
    )

    return <>
    {
        <button className="pricedButton" onClick={ () => { setTopPriced(true) } } >Top Priced</button>
    }
    <h2>List of Products</h2>

    <article className="products">
        {
            candies.map(
                (candy) => {
                    return <section className="product" key={'product--${product.id}'}>
                        <header>🍬{candy.name}</header>
                        <footer>Price: ${candy.price}</footer>
                    </section>
                }
            )
        }
    </article>
 </>
}