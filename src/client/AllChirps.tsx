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
          {chirps?.map(chirp => (
                <div key={"chirp-" + chirp.id}>
                    <h3>@{chirp.user}</h3>
                    <Link to={"/" + chirp.id }>{chirp.msg}</Link>
                    <Link to={"/admin/" + chirp.id}><button>Admin</button></Link>
                </div>
          ))}
          </>
          );
  };
  
  export default AllChirps;  