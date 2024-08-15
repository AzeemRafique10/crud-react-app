import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/users";

const TodoList = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    axios
      .get(API)
      .then((responce) => setUsers(responce.data))
      .catch((error) => console.error(error));
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleSubmit = () => {
    if (editingId) {
      axios
        .put(`http://localhost:5000/users/${editingId}`, { name, age })
        .then((response) => {
          setUsers(
            users.map((user) => (user._id === editingId ? response.data : user))
          );
          setEditingId(null);
          setName("");
          setAge("");
      console.log("User Updated");

        })
        .catch((error) => console.error(error));
    } else {

      axios
        .post("http://localhost:5000/users", { name, age })
        .then((response) => {
          setUsers([...users, response.data]);
          
          setName("");
          setAge("");
      console.log("User created")

        })
        .catch((error) => console.error(error));
    }
  };

  const handleEdit = (user) => {
    setEditingId(user._id);
    setName(user.name);
    setAge(user.age);
    
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/users/${id}`)
      .then(() => {
        setUsers(users.filter((user) => user._id !== id));
        console.log('deleted successfully')
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="container ">
      <h2 className="text-2xl text-center text-blue-700 font-bold">
        TODO List
      </h2>
      <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Your name</label>
          <input
            type="name"
            id="name"
            maxLength={13}
            value={name}
            onChange={handleNameChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name here"
            required
          />
        </div>
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">Your age</label>
          <input
            type="age"
            id="age"
            value={age}
            maxLength={3}
            onChange={handleAgeChange}
            placeholder="Enter your age"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {editingId ? "Update" : "Submit"}
        </button>
      </form>
      <br />
      <div className=" rounded-lg ">
        <div className="title font-semibold text-2xl">
          <p>NAME</p>
          <p>AGE</p>
          <p>ACTION</p>
        </div>
        <ul className="">
          {users.map((user) => (
            <div key={user._id} className=" font-semibold text-2xl">
              <div className="cstm border-1 rounded-xl m-1 p-1 border-sky-500 ">
                <h2>{user.name}</h2>
                <h2>{user.age}</h2>
                <div className="bton gap-2">
                  <button
                    className="btn btn-primary "
                    onClick={() => handleEdit(user)}
                  >
                    edit
                  </button>
                  <button
                    className="btn btn-danger "
                    onClick={() => handleDelete(user._id)}
                  >
                    ❌
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoList;
