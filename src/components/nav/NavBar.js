import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"
import "./NavBar.css"
// using link to go from one page to another page on the nav bar
export const NavBar = () => {
    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)
    
    if (kandyUserObject.staff) {
        // return employee view
        return <EmployeeNav />
    }
    else {
        //return customer views
        return <CustomerNav/>
    }

}

