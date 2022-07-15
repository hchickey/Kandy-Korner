import { Outlet, Route, Routes } from "react-router-dom"
import { LocationList } from "../locations/LocationList"
import { ProductForm } from "../products/ProductForm"
import { Products } from "../products/Products"


export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>Kandy Korner</h1>
					<div>The one place that makes you feel like a kid again</div>

					<Outlet />
				</>
			}>

				<Route path="locations" element={ <LocationList /> } />
				<Route path="products" element={ <Products /> } />
				<Route path="product/create" element={ <ProductForm /> } />
		</Route>
	</Routes>
	)	
}

