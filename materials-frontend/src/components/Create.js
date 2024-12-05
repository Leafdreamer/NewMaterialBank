import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Create() {
    const [material, setMaterial] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

	const handleCreate = async (event) => {
        event.preventDefault();
        material.createdAt = new Date().toISOString();
        material.updatedAt = new Date().toISOString(); 
      
        try {
          const response = await fetch(`http://localhost:5096/api/Materials`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(material),
          });
      
          if (!response.ok) {
            throw new Error(`Failed to create the material.`);
          }
      
          navigate('/');
        } catch (error) {
          setError(`Failed to create the material.`);
        }
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`); // Debugging: Logging input changes
        setMaterial({ ...material, [name]: value }); // Update state for each input field
      };


     if (error) return <p>{error}</p>;


     return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <form onSubmit={handleCreate}>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Name</th>
                  <th scope="col" className="px-6 py-3">Type</th>
                  <th scope="col" className="px-6 py-3">Tags</th>
                  <th scope="col" className="px-6 py-3">Amount</th>
                </tr>
              </thead>
              <tbody className="border-collapse border border-slate-400 border-spacing-3">
                <tr>
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
                    <input
                      type="text"
                      name="type"
                      value={material.type || ''}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <input
                      type="text"
                      name="tags"
                      value={material.tags || ''}
                      onChange={handleChange}
                      className="border rounded px-2 py-1 w-full"
                    />
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
                onClick={() => navigate('/')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      );
    };
    

    export default Create;