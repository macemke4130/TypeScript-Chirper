import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Chirp } from "./utils/types";

export interface SingleChirpProps { };

const SingleChirp: React.FC<SingleChirpProps> = (props) => {
    const { id } = useParams<{id: string}>();

    const [chirp, setSingleChirp] = useState<Chirp>(null);

    const getSingleChirp = async () => {
        let r = await fetch("/api/chirps/" + id);
        let singleChirpJson = await r.json();
        setSingleChirp(singleChirpJson);
      };

      useEffect(() => {
        getSingleChirp();
      }, []);

      return (
          <>
          <h2>@{chirp?.user}</h2>
          <h2>{chirp?.msg}</h2>
          <Link to={"/"}><button>Return Home</button></Link>
          </>
          );
  };
  
  export default SingleChirp;  