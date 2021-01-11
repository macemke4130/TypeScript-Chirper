import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Chirp } from "./utils/types";
import Modal from "./Modal";
// import './styles.css';

export interface AdminProps { };

const Admin: React.FC<AdminProps> = (props) => {
    const { id } = useParams<{ id: string }>();
    const [user, setUser] = useState<string>('');
    const [msg, setMsg] = useState<string>('');
    const [modalType, setModalType] = useState<string>("none");

    const getSingleChirp = async () => {
        let r: Response = await fetch("/api/chirps/" + id);
        let singleChirpJson: Chirp = await r.json();
        setUser(singleChirpJson.user);
        setMsg(singleChirpJson.msg);
    };

    const editChirp = async () => {
        let editedChirp: Chirp = {
            id: Number(id),
            user: user,
            msg: msg
        };
        
        let myMethod = {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(editedChirp)
        }
        console.log(editedChirp);
        let put: Response = await fetch("/api/chirps/" + id, myMethod);
        showModal();

    };

    const showModal = () => { 
        setModalType("edit");
    };

    const destroyChirp = async () => {
        setModalType("destroy");
    }

    const confirmDestroy = async () => {
        console.log("Confirm Destroy");
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMsg(e.target.value);
    };

    useEffect(() => {
        getSingleChirp();
    }, []);

    return (
        <>
            <h1>Admin Panel</h1>
            <label className="sr-only">User:</label><input type="text" value={user} onChange={handleUserChange} ></input>
            <label className="sr-only">Chirp:</label><input type="text" value={msg} onChange={handleMsgChange} ></input>
            <button onClick={editChirp}>Submit Edit</button>
            <Link to={"/"}><button>Cancel Edit</button></Link>
            <button onClick={destroyChirp}>Delete Chirp</button>

            <Modal type={modalType} confirmDestroy={confirmDestroy} user={user} msg={msg}></Modal>
        </>
    );
};

export default Admin;  