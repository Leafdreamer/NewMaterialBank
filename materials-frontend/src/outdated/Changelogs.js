import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import AppContext from "./Context";

function Changelogs() {
    const [materials, setMaterials] = useState([]);
    const [changelogs, setChangelogs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = async () => {
		try {
		  const response = await fetch('http://localhost:5096/api/Materials', {
			method: 'GET', // or 'POST', 'PUT', etc.
			headers: {
				'Content-Type': 'application/json',
			  },
		  });
	  
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
	  
		  const data = await response.json(); // assuming the response is JSON
		  setMaterials(data);
          setChangelogs(data.changelogs);
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


      return (
		<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
	
		  {error && <p className="text-red-500">{error}</p>}
		  
	
		  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
    		<thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      	    <tr>
        	    <th
        	      scope="col"
            	  className="px-6 py-3 cursor-pointer">
            	Material Name
            	</th>
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
              	className="px-6 py-3 cursor-pointer">
              	Edit Time
            	</th>
          	</tr>
        	</thead>
			<tbody className="border-collapse border border-slate-400 border-spacing-3">
			  {materials.length > 0 ? (
				changelogs.map((material) => {
				  const formattedEditTime = new Date(material.changelogs.editTime).toLocaleString();
	
				  return (
					<tr key={material.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
					  <td className="px-6 py-4">{material.name}</td>
					  <td className="px-6 py-4">{material.changelogs.logData}</td>
					  <td className="px-6 py-4">{material.changelogs.editor}</td>
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


export default Changelogs;