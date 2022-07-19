import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./customers.css"

export const CustomerDetails = () => {

    const {userId} = useParams()
    const [customer, updateCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${userId}`)
            .then(response => response.json())
            .then((data) => {
                const singleCustomer = data[0]
                updateCustomer(singleCustomer)
            })
        },
        [userId]
    )


    return  <section className="customer">
            <header className="customer__header">{customer?.user?.fullName}</header>
            <div>Email: {customer?.user?.email}</div>
            <div>Loyalty Number: {customer?.loyaltyNumber}</div>
            </section>
}