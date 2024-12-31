import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from './Context';

function Update() {
    const { id } = useParams();
    const [material, setMaterial] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = async () => {
		try {
		  const response = await fetch(`http://localhost:5096/api/Materials/${id}`, {
	        method: 'GET',
		  });
	  
		  if (!response.ok) {
			  throw new Error('Network response was not ok');
		  }
	  
		  const data = await response.json();
		  setMaterial(data);
		  console.log(data);

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
		  fetchData();
	  }, [id]);


      const handleUpdate = async (event) => {
        event.preventDefault();
        material.updatedAt = new Date().toISOString(); 
        var otherEmail = encodeURIComponent(AppContext.email);
        var user = '';

        try 
        {
            const response = await fetch('http://localhost:5096/api/Users/email?email=' + otherEmail, {
                method: 'GET', 
                headers: {
                  'Content-Type': 'application/json',
                },
            });
            user = await response.json();
        } 
        catch (error) 
        {
          setError(`Failed to validate user.`);
        }

      
        try {
          const response = await fetch(`http://localhost:5096/api/Materials/${id}?userID=${user.id}`, {
            method: 'PUT', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(material),
          });
      
          if (!response.ok) {
            throw new Error('Failed to update the material');
          }
      
          navigate('/materials');
        } catch (error) {
          setError(`${error}`);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`); // Debugging: Logging input changes
        setMaterial((prevMaterial) => ({
          ...prevMaterial,
          [name]: value,
        }));
      };

      const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this material?");
        if (confirmDelete) {
          try {
            const response = await fetch(`http://localhost:5096/api/Materials/${id}`, {
              method: 'DELETE', 
              headers: {
                'Content-Type': 'application/json',
              },
            });
            navigate('/materials');
          } catch (error) {
            console.error("Error deleting material:", error);
          }
        }
      };


     if (loading) return <p>Loading...</p>;
     if (!material) return <p>Material not found</p>;
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
     if (AppContext.email == '') return (
      <div className="mt-4">
        <h1>Access Denied. Please log in to continue.</h1>
        <button
        type="button"
        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
        onClick={() => navigate('/')}>
        Login
        </button>
      </div>
      );


     return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <form onSubmit={handleUpdate}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Warehouse No.</th>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                  <th scope="col" className="px-6 py-3">Description</th>
                </tr>
              </thead>
              <tbody className="border-collapse border border-slate-400 border-spacing-3">
                <tr>
                  <td className="px-6 py-4">
                    <select
                    value={material.warehouseNo}
                    name="warehouseNo"
                    onChange={handleChange}>
		  	            {
				              warehouses.map((warehouse) => (
					            <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
				              ))
		  	            }
		  	            </select>
                    
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="name"
                      value={material.name || ''}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <select 
                      value={material.type}
                      name="type"
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full">
                        <option value={"Metal"}>Metal</option>
                        <option value={"Ceramic"}>Ceramic</option>
                        <option value={"Plastic"}>Plastic</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="number"
                      name="amount"
                      value={material.amount || ''}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="description"
                      value={material.description || ''}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Created At</th>
                  <th scope="col" className="px-6 py-3">Updated At</th>
                </tr>
              </thead>
              <tbody className="border-collapse border border-slate-400 border-spacing-3">
                <tr>
                  <td className="px-6 py-4">
                    {new Date(material.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(material.updatedAt).toLocaleString()}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
              <button
                type="button"
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
                onClick={() => navigate('/materials')}
              >
                Cancel
              </button>
            </div>
            <br></br>
            <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleDelete(material.id)}
              >
                Delete
              </button>
          </form>
        </div>
      );
    };
    

    export default Update;