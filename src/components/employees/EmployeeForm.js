import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const EmployeeForm = () => {
    const [locations, setLocations] = useState([])
    const navigate = useNavigate()

    const [employee, update] = useState({
        startDate: "",
        payRate: "",
        locationId: "",
        userId: "",
        fullName: "",
        email: "",
        isStaff: true
    })

    const localKandyUser = localStorage.getItem("kandy_user")
    const kandyUserObject = JSON.parse(localKandyUser)

    useEffect(
        () => {
            fetch(`http://localhost:8088/locations`)
                .then(response => response.json())
                .then((locationArray) => {
                    setLocations(locationArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const employeeToSendToAPI = {
            userId: 0,
            startDate: employee.startDate,
            payRate: employee.payRate,
            locationId: employee.locationId
        }
        const userToSendToAPI = {
            fullName: employee.fullName,
            email: employee.email,
            isStaff: true
        }

        return fetch(`http://localhost:8088/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userToSendToAPI)
        })
            .then(response => response.json())
            .then((newUser) => {
                employeeToSendToAPI.userId = newUser.id
                return fetch(`http://localhost:8088/employees`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(employeeToSendToAPI)
                })
            })
            .then(() => navigate("/employees"))
    }

    return (
        <form className="employeeForm">
            <h2 className="employeeForm__title">New Employee</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Full name of new Employee:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Full employee name here"
                        value={employee.fullName}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.fullName = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Email address of new Employee:</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Employee email here"
                        value={employee.email}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.email = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationId">Store location:</label>
                    <select
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.locationId = parseInt(evt.target.value)
                                update(copy)
                            }
                        }>
                        <option value={0}>Select Location</option>
                        {locations.map(
                            (location) => {
                                return (
                                    <option key={location.id} className="employee_location" name="employee_location" value={location.id}>
                                        {location.address}
                                    </option>)
                            }
                        )
                        } </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="price">Hourly rate of employee:</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Employee rate here"
                        value={employee.payRate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.payRate = parseFloat(evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Start date of employee:</label>
                    <input
                        type="date"
                        className="form-control"
                        placeholder="Employee starting date here"
                        value={employee.startDate}
                        onChange={
                            (evt) => {
                                const copy = { ...employee }
                                copy.startDate = (evt.target.value)
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Submit Employee
            </button>
        </form>
    )
    }
