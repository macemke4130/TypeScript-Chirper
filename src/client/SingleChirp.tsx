import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Chirp } from "./utils/types";

export interface SingleChirpProps { };

const SingleChirp: React.FC<SingleChirpProps> = (props) => {
  const { id } = useParams<{ id: string }>();

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
      <div className="container d-flex flex-column align-items-center justify-content-center tall">
        <div className="col-8 d-flex flex-column align-items-center">
          <div className="card full-width shadow m-2 p-3">
            <h3>@{chirp?.user}</h3>
            <p>{chirp?.msg}</p>
          </div>
          <Link to={"/"}><button className="btn btn-primary btn-sm">Return Home</button></Link>
        </div>

      </div>

    </>
  );
};

export default SingleChirp;  