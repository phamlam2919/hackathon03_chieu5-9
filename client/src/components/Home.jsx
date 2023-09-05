import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import "./home.css";
function Home() {
    const [users, setUsers] = useState([]);
    const listUsers = () => {
        axios
            .get(`http://localhost:3000/api/v1/users`)
            .then((res) => {
                setUsers(res.data.users);
            })
            .catch((err) => console.log(err));
    };

    // Add
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    const [newUsers, setNewUser] = useState({
        name: "",
        description: "",
    });
    const handleCreat = (e) => {
        const { name, value } = e.target;
        setNewUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };
    const handleCreateUser = () => {
        axios
            .post(`http://localhost:3000/api/v1/users`, newUsers)
            .then((res) => {
                console.log(res.data);
                listUsers();
                setShow(false);
            })
            .catch((err) => console.log(err));
    };

    // Edit
    const [editUser, setEditUser] = useState({
        id_users: null,
        name: "",
        description: "",
    });
    const handleEdit = (user) => {
        setEditUser({
            id_users: user.id_users,
            name: user.name,
            description: user.description,
        });
        handleShowEdit();
    };

    const handleUpdateUser = () => {
        axios
            .put(
                `http://localhost:3000/api/v1/users/${editUser.id_users}`,
                editUser
            )
            .then((res) => {
                console.log(res.data);
                listUsers();
                handleClose();
            })
            .catch((err) => console.log(err));
    };
    // delete
    const handleDelete = (id) => {
        axios
            .delete(`http://localhost:3000/api/v1/users/${id}`)
            .then((res) => {
                setUsers(res.data.user);
            })
            .catch((err) => console.log(err));
    };
    const [showEdit, setShowEdit] = useState(false);
    const handleClose = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    useEffect(() => {
        listUsers();
    }, []);
    return (
        <div>
            <div className="bang">
                <h1 className="user">Student List</h1>
                <div>
                    <Button variant="success" onClick={handleShow}>
                        Craete Student
                    </Button>
                    <Modal show={show} onHide={() => setShow(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>ADD STUDENT</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="them">
                                <p>Name</p>
                                <input
                                    type="text"
                                    name="name"
                                    onChange={handleCreat}
                                />

                                <p>Description</p>
                                <input
                                    type="text"
                                    name="description"
                                    onChange={handleCreat}
                                />
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                onClick={() => setShow(false)}
                            >
                                Close
                            </Button>
                            <Button
                                variant="success"
                                onClick={handleCreateUser}
                            >
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
                <Table className="striped" striped bordered hover>
                    <thead>
                        <tr className="cot">
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="cot">
                                <td>{user.id_users}</td>
                                <td>{user.name}</td>
                                <td>{user.description}</td>
                                <td className="xoa">
                                    <Button
                                        variant="primary"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Update
                                    </Button>

                                    <Button
                                        onClick={() =>
                                            handleDelete(user.id_users)
                                        }
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>

                                    <Modal
                                        show={showEdit}
                                        onHide={handleClose}
                                        animation={false}
                                    >
                                        <Modal.Header closeButton>
                                            <Modal.Title>
                                                EDIT USERS
                                            </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                            <div className="them">
                                                <p>Name</p>
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={editUser.name}
                                                    onChange={(e) =>
                                                        setEditUser({
                                                            ...editUser,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                                <p>Description</p>
                                                <input
                                                    type="text"
                                                    name="description"
                                                    value={editUser.description}
                                                    onChange={(e) =>
                                                        setEditUser({
                                                            ...editUser,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button
                                                variant="secondary"
                                                onClick={handleClose}
                                            >
                                                Close
                                            </Button>
                                            <Button
                                                variant="primary"
                                                onClick={handleUpdateUser}
                                            >
                                                Save Changes
                                            </Button>
                                        </Modal.Footer>
                                    </Modal>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Home;
