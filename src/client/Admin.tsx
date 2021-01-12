import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { Chirp } from "./utils/types";
import Modal from "./Modal";

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
        let put: Response = await fetch("/api/chirps/" + id, myMethod);
        showModal();

    };

    const showModal = () => {
        setModalType("edit");
    };

    const destroyChirp = () => {
        setModalType("destroy");
    }

    const confirmDestroy = async () => {
        setModalType("destroyed");
        setUser("DELETED!");
        setMsg("DELETED!");
        let myMethod = {
            method: 'DELETE'
        }
        let destroy: Response = await fetch("/api/chirps/" + id, myMethod);
    }

    const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser(e.target.value);
    };

    const handleMsgChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMsg(e.target.value);
    };

    useEffect(() => {
        getSingleChirp();
    }, []);

    return (
        <>
            <div className="container d-flex flex-column align-items-center justify-content-center tall">
                <div className="col-8 d-flex flex-column align-items-center">
                    <h1>Admin Panel</h1>
                    <div className="card full-width shadow m-2 p-3">
                        <label>User</label><input type="text" value={user} onChange={handleUserChange} ></input>
                        <div className="p-2"></div>
                        <label>Chirp</label><textarea value={msg} onChange={handleMsgChange} ></textarea>
                        <div className="d-flex full-width justify-content-between p-3">
                            <button className="btn btn-primary btn-sm" onClick={editChirp}>Submit Edit</button>
                            <Link to={"/"} className="btn btn-info btn-sm">Cancel Edit</Link>
                            <button className="btn btn-danger btn-sm" onClick={destroyChirp}>Delete Chirp</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal type={modalType} function={confirmDestroy} user={user} msg={msg}></Modal>
        </>
    );
};

export default Admin;  