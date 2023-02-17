import React, { useEffect, useState } from "react";
const AuthContext1 = React.createContext();
import axios from "axios";
export const AuthContext = (props) => {
  const [loggedin, setLoggedin] = useState(false);
  const [user, setUser] = useState([]);
  const [loggedinLoading, setLoggedinLoading] = useState();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setLoggedinLoading(false);

      return;
    }
    setLoggedinLoading(true);
    const headers = {
      token: localStorage.getItem("token"),
    };
    axios
      .get("http://localhost:7000/", { headers })
      .then((response) => {
        if (!response.data.LoggedinUser) {
          setLoggedinLoading(false);
          return;
        }
        setLoggedin(true);
        setLoggedinLoading(false);
        setUser(response.data.LoggedinUser);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  return (
    <div>
      <AuthContext1.Provider value={{ loggedin, user, loggedinLoading }}>
        {props.children}
      </AuthContext1.Provider>
    </div>
  );
};

export default AuthContext1;
