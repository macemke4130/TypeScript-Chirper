import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Chirp } from "./utils/types";

export interface AllChirpsProps { };

const AllChirps: React.FC<AllChirpsProps> = (props) => {
  const [chirps, setAllChirps] = useState<Chirp[]>(null);

  const getAllChirps = async () => {
    let r = await fetch("/api/chirps/");
    let allChirpsJson = await r.json();
    setAllChirps(allChirpsJson);
  };

  useEffect(() => {
    getAllChirps();
  }, []);

  return (
    <>
      <div className="container d-flex flex-column align-items-center">
        <Link to={"/new"} className="btn btn-primary btn-lg">New Chirp</Link>
        {chirps?.reverse().map(chirp => (
          <div key={"chirp-" + chirp.id} className="col-6">
            <div className="card shadow m-2 p-3">
              <h3>@{chirp.user}</h3>
              <p>{chirp.msg}</p>
              <div className="d-flex justify-content-between align-items-center">
                <small><Link to={"/" + chirp.id}>permalink</Link></small>
                <Link to={"/admin/" + chirp.id}><button className="btn btn-primary btn-sm">Admin</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllChirps;  