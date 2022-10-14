
import React, {useState, useEffect} from 'react';
import { useParams } from "react-router-dom";
import Axios from "axios";


function Detalje() {

const [oneUser, setOneUser] = useState([])
let { id } = useParams();

useEffect(() => {

    Axios.get("http://localhost:3001/detalje/" + id).then((res) => {
      console.log(res.data);
      setOneUser(res.data);

    });

  }, []);


  return(

    <div>
      En bruger
  
            <h1>{oneUser.userName}</h1>
            <p>{oneUser.userMail}</p>
            <p>{oneUser.userAge}</p>   
            <hr></hr>
    </div>
  );

}
export default Detalje