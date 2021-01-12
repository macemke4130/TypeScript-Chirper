import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Modal from "./Modal";
import { Chirp } from "./utils/types";
import dummyFunction from "./utils/types";

export interface NewChirpProps { };

const NewChirp: React.FC<NewChirpProps> = (props) => {
    const [nextId, setNextId] = useState<number>(0);
    const [modalType, setModalType] = useState<string>("none");
    const [user, setUser] = useState<string>('');
    const [msg, setMsg] = useState<string>('');

    const getNextId = async () => {
        // Exists to grab the "nextid" from Chirps.json --
        let r: Response = await fetch("/api/nextid");
        let upNext: number = await r.json();
        setNextId(upNext);
    }

    const submitChirp = async () => {
        let finalSubmit: Chirp = {
            id: nextId,
            user,
            msg
        };
        let myMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finalSubmit)
        }
        let r: Response = await fetch("/api/chirps/new", myMethod);
        setModalType("new");
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    useEffect(() => {
        getNextId();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center tall">
                <div className="col-8 d-flex flex-column align-items-center">
                    <h1>Post New Chirp</h1>
                    <div className="card full-width shadow m-2 p-3">
                        <label className="sr-only">User:</label><input type="text" placeholder="User" onChange={handleUserChange} ></input>
                        <label className="sr-only">Chirp:</label><textarea placeholder="Chirp" onChange={handleMsgChange} ></textarea>
                        <div className="d-flex full-width justify-content-between p-3">
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel</Link>
                            <button className="btn btn-primary btn-sm" onClick={submitChirp}>Submit Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal type={modalType} function={dummyFunction} user={user} msg={msg}></Modal>
        </>
    );
};

export default NewChirp;