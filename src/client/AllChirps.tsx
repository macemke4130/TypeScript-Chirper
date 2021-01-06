import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export interface AllChirpsProps { };

export interface Chirps {
    id: number,
    user: string,
    msg: string
  }

const AllChirps: React.FC<AllChirpsProps> = (props) => {
    const [chirps, setAllChirps] = useState<Chirps[]>(null);

    const getAllChirps = async () => {
        let r = await fetch("/api/chirps/");
        let allChirpsJson = await r.json();
        setAllChirps(allChirpsJson);
        console.log(allChirpsJson);
      };

      useEffect(() => {
        getAllChirps();
      }, []);

      return (
          <>
          {chirps?.map(chirp => (
                <div><Link to={"/" + chirp.id }>{chirp.msg}</Link></div>
          ))}
          </>
          );
  };
  
  export default AllChirps;  