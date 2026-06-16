import React, { useState, useEffect } from "react";
import axios from "axios";
import './crudtask.css';

// const API_URL = "http://localhost:8000/users";

function Crud() {
    const [data, setData] = useState([]);
    const [newData, setNewdata] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    const [editId, setEditId] = useState(null);

    // FETCH DATA
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:8000/users");
            setData(res.data);
        } catch (error) {
            console.log("fetch error", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // ADD / UPDATE
    const handleAdd = async (e) => {
        e.preventDefault();

        if (!newData.firstName || !newData.lastName || !newData.email) return;

        try {
            if (editId) {
                await axios.put(`${"http://localhost:8000/users"}/${editId}`, newData);
                setEditId(null);
            } else {
                await axios.post("http://localhost:8000/users", newData);
            }

            setNewdata({ firstName: "", lastName: "", email: "" });
            fetchData();
        } catch (error) {
            console.log("save error", error);
        }
    };

    // DELETE
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${"http://localhost:8000/users"}/${id}`);
            fetchData();
        } catch (error) {
            console.log("delete error", error);
        }
    };

    // EDIT
    const handleEdit = (user) => {
        setNewdata({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        });
        setEditId(user.id);
    };

    return (
        <>
            <form onSubmit={handleAdd}>
                <h1>Employee Data</h1>

                <input
                    type="text"
                    placeholder="First Name"
                    value={newData.firstName}
                    onChange={(e) =>
                        setNewdata({ ...newData, firstName: e.target.value })
                    }
                />

                <input
                    type="text"
                    placeholder="Last Name"
                    value={newData.lastName}
                    onChange={(e) =>
                        setNewdata({ ...newData, lastName: e.target.value })
                    }
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={newData.email}
                    onChange={(e) =>
                        setNewdata({ ...newData, email: e.target.value })
                    }
                />

                <button type="submit">
                    {editId ? "Update Data" : "Add Data"}
                </button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map((d) => (
                        <tr key={d.id}>
                            <td>{d.firstName}</td>
                            <td>{d.lastName}</td>
                            <td>{d.email}</td>
                            <td className="btn">
                                <button className="Update" onClick={() => handleEdit(d)}>
                                    Update
                                </button>
                                <button className="Delete"onClick={() => handleDelete(d.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default Crud;
