import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [userList, setUserList] = useState([]);
    const [currentUser, setCurrentUser] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const userFetch = async () => {
		try {
		  const response = await fetch('http://localhost:5096/api/Materials?type=u', {
			method: 'GET', // or 'POST', 'PUT', etc.
			headers: {
				'Content-Type': 'application/json',
			  },
		  });
	  
		  if (!response.ok) {
			throw new Error('Network response was not ok');
		  }
	  
		  const data = await response.json(); // assuming the response is JSON
          setUserList(data);
		  console.log(data);


		} catch (error) {
		  setError(error.message);		
		  console.error('There has been a problem with your fetch operation:', error);
		}
	  };

    const userCheck = () => {
        for (let i = 0; i < userList.length; i++) {
            if ((userList[i].email == "admin@email.com") && (userList[i].password == "1234"))
            {
                setCurrentUser(userList[i]);
                break;
            }
        }

        if (currentUser != [])
            navigate('/')
        else
            setError("Email or password is incorrect.")

    }
}

export default Login;