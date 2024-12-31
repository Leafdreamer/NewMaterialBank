import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from "./Context";

function AdminPanel() {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState([]);
    const [newWarehouse, setNewWarehouse] = useState([]);
    const [warehouseTBU, setWarehouseTBU] = useState([]);
    const [warehouseTBD, setWarehouseTBD] = useState([])


    const fetchWarehouses = async () => {
        try {
          const warResponse = await fetch('http://localhost:5096/api/Warehouses', {
            method: 'GET', // or 'POST', 'PUT', etc.
            headers: {
              'Content-Type': 'application/json',
              },
            });
      
          if (!warResponse.ok) {
            throw new Error('Network response was not ok');
          }
      
          const warData = await warResponse.json(); // assuming the response is JSON
          setWarehouses(warData);
          console.log(warData);
    
          setLoading(false);
    
    
        } catch (error) {
          setError(error.message);		
          console.error(error);
          setLoading(false)
        }
      };

    useEffect(() => {
        fetchWarehouses();
        }, []);

    const handleCreateUser = async (event) => {
        event.preventDefault();
        try 
        {
          const response = await fetch(`http://localhost:5096/api/Users`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          });

          console.log(response)
      
          if (!response.ok) {
            throw new Error(`Failed to create user.`);
          }
      
          navigate('/materials');
        } 
        catch (error) 
        {
          setError(`Failed to create user.`);
        }
    }

    const handleCreateWarehouse = async (event) => {
        event.preventDefault();
        try 
        {
          const response = await fetch(`http://localhost:5096/api/Warehouses`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newWarehouse),
          });

          console.log(response)
      
          if (!response.ok) {
            throw new Error(`Failed to create warehouse.`);
          }
      
          navigate('/materials');
        } 
        catch (error) 
        {
          setError(`Failed to create warehouse.`);
        }
    }

    const handleUpdateWarehouse = async (event) => {
        event.preventDefault();
        try {
          const response = await fetch(`http://localhost:5096/api/Warehouses/${warehouseTBU.id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(warehouseTBU),
          });
      
          if (!response.ok) {
            throw new Error('Failed to rename the warehouse.');
          }
      
          navigate('/materials');
        } catch (error) {
          setError(`${error}`);
        }
      };

      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this warehouse?");
        if (confirmDelete) {
          try {
            const response = await fetch(`http://localhost:5096/api/Warehouses/${warehouseTBD.id}`, {
              method: 'DELETE', 
              headers: {
                'Content-Type': 'application/json',
              },
            });
            navigate('/materials');
          } catch (error) {
            console.error("Error deleting warehouse:", error);
          }
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`); // Debugging: Logging input changes
        setWarehouseTBU((prevWarehouse) => ({
          ...prevWarehouse,
          [name]: value,
        }));
      };

    if (loading) return <p>Loading...</p>;
    if (error) return (
        <div className="mt-4">
          <p>{error}</p>
          <button
            type="button"
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
            onClick={() => navigate('/materials')}>
            Return to List
          </button>
        </div>
       );

    if (AppContext.email == '' || AppContext.admin == false) return (
        <div className="mt-4">
            <h1>Access Denied. Only Admins may access this page.</h1>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
              onClick={() => navigate('/')}>
              Return to Login
              </button>
            </div>
            );


    return (
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                onClick={() => navigate('/materials')}>
                Return
            </button>
          </div>
      
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Create User</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newUser.password !== newUser.confirmPassword) {
                  alert("Passwords do not match!");
                  return;
                }
                handleCreateUser(e);
              }}
              className="flex gap-4 items-center"
            >
              <input
                type="email"
                placeholder="E-mail"
                name="email"
                className="border p-2 rounded w-1/4"
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, email: e.target.value }))
                }
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="border p-2 rounded w-1/3"
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, password: e.target.value }))
                }
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                className="border p-2 rounded w-1/4"
                onChange={(e) =>
                  setNewUser((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create User
              </button>
            </form>
          </div>
      
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Create Warehouse</h2>
            <form onSubmit={handleCreateWarehouse} className="flex gap-4 items-center">
              <input
                type="text"
                placeholder="Warehouse Name"
                className="border p-2 rounded w-2/3"
                onChange={(e) =>
                  setNewWarehouse((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Create Warehouse
              </button>
            </form>
          </div>
      
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Rename Warehouse</h2>
            <form onSubmit={handleUpdateWarehouse} className="flex gap-4 items-center">
              <select
                name="id"
                className="border p-2 rounded w-1/3"
                onChange={(e) =>
                  setWarehouseTBU((prev) => ({ ...prev, id: e.target.value }))
                }
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="New Name"
                name="name"
                className="border p-2 rounded w-1/3"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Rename Warehouse
              </button>
            </form>
          </div>
      
          <div>
            <h2 className="text-xl font-semibold mb-2">Delete Warehouse</h2>
            <div className="flex gap-4 items-center">
              <select
                name="id"
                className="border p-2 rounded w-2/3"
                onChange={(e) =>
                  setWarehouseTBD((prev) => ({ ...prev, id: e.target.value }))
                }
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete Warehouse
              </button>
            </div>
          </div>
        </div>
      );
    
}

export default AdminPanel;