import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import detalje from "./components/detalje";

function App() {
  const [userName, setUserName] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userAge, setUserAge] = useState(0);

  const [newUserName, setNewUserName] = useState("");
  const [newUserMail, setNewUserMail] = useState("");
  const [newUserAge, setNewUserAge] = useState(0);

  const [userList, setUserList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((res) => {
      setUserList(res.data);
    });
  }, []);

  const addToUserlist = () => {
    Axios.post("http://localhost:3001/addOne", {
      userName: userName,
      userMail: userMail,
      userAge: userAge,
    });
    window.location.reload(false);
  };

  const UpdateUser = (id) => {
    Axios.patch("http://localhost:3001/" + id, {
      newUserName: newUserName,
      newUserMail: newUserMail,
      newUserAge: newUserAge,
    });
    window.location.reload(false);
  };

  const DeleteUser = (id) => {
    Axios.delete("http://localhost:3001/" + id).then((res) => {
      console.log(res.data);
      window.location.reload(false);
    });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Brugernavn"
        onChange={(Event) => {
          setUserName(Event.target.value);
        }}
      />

      <input
        type="text"
        placeholder="mailAdr"
        onChange={(Event) => {
          setUserMail(Event.target.value);
        }}
      />

      <input
        type="number"
        placeholder="Alder"
        onChange={(Event) => {
          setUserAge(Event.target.value);
        }}
      />

      <button onClick={addToUserlist}>Opret bruger</button>

      <hr />
      <h2>Brugerliste</h2>

      <Router>
        <div>
          {userList.map((val, key) => {
            return (
              <div key={key}>
                <Link to={"/detalje/" + val._id}>{val.userName}</Link>
              </div>
            );
          })}
          <Route path="/detalje/:id" component={detalje} />
        </div>
      </Router>

      {userList.map((val, key) => {
        return (
          <div key={key}>
            <h1>{val.userName}</h1>
            <p>{val.userMail}</p>
            <p>{val.userAge}</p>

            <h3>Opdater bruger</h3>
            <input
              type="text"
              placeholder="Nyt navn..."
              onChange={(Event) => setNewUserName(Event.target.value)}
            ></input>
            <input
              type="text"
              placeholder="Ny mail..."
              onChange={(Event) => setNewUserMail(Event.target.value)}
            ></input>
            <input
              type="number"
              placeholder="Nyt alder..."
              onChange={(Event) => setNewUserAge(Event.target.value)}
            ></input>
            <button onClick={() => UpdateUser(val._id)}>Rediger bruger</button>
            <hr />
            <button onClick={() => DeleteUser(val._id)}>Slet bruger</button>
            <hr />
            <hr />
          </div>
        );
      })}
    </div>
  );
}

export default App;
