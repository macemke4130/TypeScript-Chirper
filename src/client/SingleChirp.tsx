import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

export interface SingleChirpProps { };

export interface Chirp {
    id: number,
    user: string,
    msg: string
  }

const SingleChirp: React.FC<SingleChirpProps> = (props) => {
    // const { id } = useParams();
    const test = useParams();
    const id = test.id;
    
    const [chirp, setSingleChirp] = useState<Chirp>(null);

    const getSingleChirp = async () => {
        let r = await fetch("/api/chirps/1");
        let singleChirpJson = await r.json();
        setSingleChirp(singleChirpJson);
        console.log(singleChirpJson);
      };

      useEffect(() => {
        getSingleChirp();
      }, []);

      return (
          <>
          {/* {chirp.msg} */}
          </>
          );
  };
  
  export default SingleChirp;  