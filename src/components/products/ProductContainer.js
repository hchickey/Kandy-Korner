import { useState } from "react"
import { Products } from "./Products"
import { ProductSearch } from "./ProductSearch"

export const ProductContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <ProductSearch setterFunction = {setSearchTerms}/>
        <Products searchTermsState = {searchTerms}/>
    </>
}