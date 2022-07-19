import { Outlet, Route, Routes } from "react-router-dom"
import { CustomerDetails } from "../customers/CustomerDetails"
import { CustomerList } from "../customers/CustomerList"
import { EmployeeForm } from "../employees/EmployeeForm"
import { EmployeeList } from "../employees/EmployeeList"
import { LocationList } from "../locations/LocationList"
import { ProductContainer } from "../products/ProductContainer"
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
				<Route path="products/search" element={ <ProductContainer /> } />
				<Route path="employees" element={ <EmployeeList /> } />
				<Route path="employee/create" element={ <EmployeeForm /> } />
				<Route path="customers" element={ <CustomerList /> } />
				<Route path="customers/:userId" element={ <CustomerDetails /> } />
		</Route>
	</Routes>
	)	
}

