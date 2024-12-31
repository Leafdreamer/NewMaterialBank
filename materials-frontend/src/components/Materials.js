import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import AppContext from "./Context";
import App from "../App";

function Materials() {
	const [materials, setMaterials] = useState([]);
	const [warehouses, setWarehouses] = useState([]);
	const [filter, setFilter] = useState('');
	const [sortMethod, setSortMethod] = useState({key: 'updatedAt', direction: 'ascending'})
	const [currentWarehouse, setCurrentWarehouse] = useState()
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
		  const matResponse = await fetch('http://localhost:5096/api/Materials', {
			method: 'GET', // or 'POST', 'PUT', etc.
			headers: {
				'Content-Type': 'application/json',
			  },
		  });
	  
		  if (!matResponse.ok) {
			throw new Error('Network response was not ok');
		  }

		  if (matResponse.status == 204) {
			throw new Error('No materials were found. At all. Ask the backend specialist for help.')
		  }
		  
		  const matData = await matResponse.json(); // assuming the response is JSON
		  setMaterials(matData);
		  console.log(matData);

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
		  setCurrentWarehouse(warData[0].id)
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
	  }, []); // Call fetchData when the component mounts

	  if (loading) return <p>Loading...</p>;
	  if (error) return (
		<div className="mt-4">
		  <p>{error}</p>
		  <button
			type="button"
			className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-2"
			onClick={() => navigate('/')}>
			Return to Login
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


	  // New List with Sorted Materials
	  const sortedMaterials = [...materials].sort((a,b) => {
		if (a[sortMethod.key] < b[sortMethod.key]) {
			return sortMethod.direction === 'ascending' ? -1 : 1;
		}
		if (a[sortMethod.key] > b[sortMethod.key]) {
			return sortMethod.direction === 'ascending' ? 1 : -1;
		}
		return 0;
	  });

	  const requestSorting = (key) => {
		let direction = 'ascending';
		if (sortMethod.key === key && sortMethod.direction === 'ascending') {
			direction = 'descending';
		}
		setSortMethod({key, direction});
	  };

	  // Filtered materials based on the filter input IT WORKS NOW YIPPEE now also updated to work with sorting
	  const filteredMaterials = sortedMaterials.filter(material =>
		(material.warehouseNo == currentWarehouse) && (material.name.toLowerCase().includes(filter.toLowerCase()) || material.type.toLowerCase().includes(filter.toLowerCase()) || material.description.toLowerCase().includes(filter.toLowerCase()) || material.amount.toString().toLowerCase().includes(filter.toLowerCase()))
	  );

	  // Arrow icons which are neat and user-friendly
	  const getSortIcon = (key) => {
		if (sortMethod.key !== key) return null;
		return sortMethod.direction === 'ascending' ? ' | Λ' : ' | V';
	  };

	  const handleLogout = () => {
		AppContext.email = '';
		AppContext.admin = false;
		navigate('/');
	  };

	  const handleWarehouseChange = (e) => {
		setCurrentWarehouse(e.target.value);
	  };

	return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
		  <div className="flex justify-between items-center mb-4">
			<input
			  type="text"
			  placeholder="Filter materials..."
			  value={filter}
			  onChange={(e) => setFilter(e.target.value)}
			  className="border rounded px-4 py-2 text-gray-700 w-1/3"/>
			  <h1>Welcome, {AppContext.email}!</h1>
			{AppContext.admin && (
        		<button
          		onClick={() => navigate('/adminpanel')}
          		className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          		Admin Panel
        		</button>
      		)}
			<button
			  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
			  onClick={() => navigate('/create')}>
			  Create New Material
			</button>
			<button
			  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
			  onClick={() => handleLogout()}>
			  Logout
			</button>
		  </div>
	
		  {error && <p className="text-red-500">{error}</p>}

		  <div style={{display: 'flex', justifyContent: 'center'}}>
		  	<text>Displaying information from {currentWarehouse} - </text> &nbsp;
		  
		  	<select onChange={handleWarehouseChange}>
		  	{
				warehouses.map((warehouse) => (
					<option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
				))
		  	}
		  	</select>
			
		  </div>
		  

		  {/* <div className="flex justify-between items-center mb-4">
		   <button
			  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			  onClick={() => setCurrentWarehouse(1)}>
			  Warehouse 1
		   </button>
		   <button
			  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			  onClick={() => setCurrentWarehouse(2)}>
			  Warehouse 2
		   </button>
		   <button
			  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
			  onClick={() => setCurrentWarehouse(3)}>
			  Warehouse 3
		   </button>
		  </div>
		  */}

		  <br></br>
		  
	
		  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      	    <tr>
        	    <th
        	      scope="col"
            	  className="px-6 py-3 cursor-pointer"
            	  onClick={() => requestSorting('name')}>
            	Name {getSortIcon('name')}
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
              	onClick={() => requestSorting('type')}>
              	Type {getSortIcon('type')}
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
              	onClick={() => requestSorting('amount')}>
              	Amount {getSortIcon('amount')}
            	</th>
				<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
              	onClick={() => requestSorting('description')}>
              	Description {getSortIcon('description')}
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
              	onClick={() => requestSorting('createdAt')}>
              	Created At {getSortIcon('createdAt')}
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
              	onClick={() => requestSorting('updatedAt')}>
              	Updated At {getSortIcon('updatedAt')}
            	</th>
            	<th scope="col" className="px-6 py-3">Actions</th>
          	</tr>
        	</thead>
			<tbody className="border-collapse border border-slate-400 border-spacing-3">
			  {filteredMaterials.length > 0 ? (
				filteredMaterials.map((material) => {
				  const formattedCreatedAt = new Date(material.createdAt).toLocaleString();
				  const formattedUpdatedAt = new Date(material.updatedAt).toLocaleString();
	
				  return (
					<tr key={material.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
					  <td className="px-6 py-4">{material.name}</td>
					  <td className="px-6 py-4">{material.type}</td>
					  <td className="px-6 py-4">{material.amount}</td>
					  <td className="px-6 py-4">{material.description}</td>
					  <td className="px-6 py-4">{formattedCreatedAt}</td>
					  <td className="px-6 py-4">{formattedUpdatedAt}</td>
					  <td className="px-6 py-4">
						<button
						  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
						  onClick={() => navigate(`/update/${material.id}`)}>
						  Edit
						</button>
						<button
						  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
						  onClick={() => navigate(`/changelogs/${material.id}`)}>
						  View Changelogs
						</button>
					  </td>
					</tr>
				  );
				})
			  ) : (
				<tr>
				  <td colSpan="7" className="px-6 py-4 text-center">No materials found</td>
				</tr>
			  )}
			</tbody>
		  </table>
		</div>
	  );
	};

export default Materials;