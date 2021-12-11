import React from "react";
import { useState, useEffect } from "react";
import moment from "moment";
function Admin() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    get();
  }, []);
  const get = async () => {
    const info = await fetch("/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await info.json();

    setUser(res);
    console.log(res);
  };
  return (
    <div>
      <div className="container-fluid">
        {user.map((e, index) => {
          const format = [moment(`${e.createdAt}`).format("h:mm:ss"),moment(`${e.updatedAt}`).format("h:mm:ss")];
          const time = format.map((e)=>{
            const timeString = e; 
            const arr = timeString.split(":"); 
            return arr[0] * 3600 + arr[1] * 60 + +arr[2]; 
          })
          const diff = parseInt((time[1]-time[0])/60);
          return (
            <div className="row">
              <div className="container col-md-2 border border-dark ">
                {index + 1}
              </div>
              <div className="container col-md-2 border border-dark ">
                {e.group}
              </div>
              <div className="container col-md-2 border border-dark ">
                {moment(`${e.createdAt}`).format("LTS")}
              </div>
              <div className="container col-md-2 border border-dark ">
                {e.solution.length}
              </div>
              <div className="container col-md-2 border border-dark ">
                {moment(`${e.updatedAt}`).format("LTS")}
              </div>
              <div className="container col-md-2 border border-dark ">
                {diff}{" "}mins
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;
