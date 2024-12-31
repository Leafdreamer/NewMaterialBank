import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import AppContext from "./Context";

function ChangelogsID() {
    const { id } = useParams();
    const [material, setMaterial] = useState([]);
    const [changelogs, setChangelogs] = useState([]);
    const [error, setError] = useState(null);
	const [sortMethod, setSortMethod] = useState('ascending')
    const [loading, setLoading] = useState(true);
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
          setChangelogs(data.changelogs);
		  console.log(data.changelogs);
		  setLoading(false);


		} catch (error) {
		  setError(error.message);		
		  console.error(error);
		  setLoading(false)
		}
	  };
	  
	  useEffect(() => {
		fetchData();
	  }, [id]); // Call fetchData when the component mounts

	  // New List with Sorted Materials
	  const sortedChangelogs = [...changelogs].sort((a,b) => {
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
		if (sortMethod.direction === 'ascending') {
			direction = 'descending';
		}
		setSortMethod(direction);
	  };

	  // Arrow icons which are neat and user-friendly
	  const getSortIcon = (key) => {
		if (sortMethod.key !== key) return null;
		return sortMethod.direction === 'ascending' ? ' | Λ' : ' | V';
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

            <div className="flex justify-between items-center mb-4">
				&nbsp; <h1>Currently viewing changelogs for {material.name}</h1>
			    <button
			    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
			    onClick={() => navigate('/materials')}>
			    Return to List
			    </button> &nbsp;
		  </div>
	
		  {error && <p className="text-red-500">{error}</p>}
	
		  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      	    <tr>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer">
              	Changelog
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer">
              	Editor
            	</th>
            	<th
              	scope="col"
              	className="px-6 py-3 cursor-pointer"
				onClick={requestSorting}>
              	Edit Time {getSortIcon('editTime')}
            	</th>
          	</tr>
        	</thead>
			<tbody className="border-collapse border border-slate-400 border-spacing-3" style={{ whiteSpace: 'pre-line' }}>
			  {sortedChangelogs.length > 0 ? (
				sortedChangelogs.map((changelog) => {
				  const formattedEditTime = new Date(changelog.editTime).toLocaleString();
	
				  return (
					<tr key={changelog.formattedEditTime} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
					  <td className="px-6 py-4">{changelog.logData}</td>
					  <td className="px-6 py-4">{changelog.editor.email}</td>
					  <td className="px-6 py-4">{formattedEditTime}</td>
					</tr>
				  );
				})
			  ) : (
				<tr>
				  <td colSpan="7" className="px-6 py-4 text-center">No changelogs found</td>
				</tr>
			  )}
			</tbody>
		  </table>
		</div>
	  );

}


export default ChangelogsID;