import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';

export interface ModalProps {
    type: string,
    confirmDestroy: any,
    user: string,
    msg: string
};

const Modal: React.FC<ModalProps> = (props) => {
    if (props.type === "edit") {
        return (
            <>
                <div className="modal-container">
                    <div className="my-pop-up">
                        <h2>Chirp has been updated</h2>
                        <p>User: {props.user}</p>
                        <p>Chirp: {props.msg}</p>
                        <Link to={"/"}><button>Return Home</button></Link>
                    </div>
                </div>
            </>
        );
    } else if (props.type === "destroy") {
        return (
            <>
                <div className="modal-container">
                    <div className="my-pop-up">
                        <h2>Delete Chrip?</h2>
                        <h4>Are you sure you want to delete this Chirp?</h4>
                        <p>User: {props.user}</p>
                        <p>Chirp: {props.msg}</p>
                        <Link to={"/"}><button>Cancel</button></Link>
                        <button onClick={props.confirmDestroy}>Yes</button>
                    </div>
                </div>
            </>
        );
    } else if (props.type === "destroyed") {
        return (
            <>
                <div className="modal-container">
                    <div className="my-pop-up">
                        <h2>Chirp Deleted</h2>
                        <Link to={"/"}><button>Return Home</button></Link>
                    </div>
                </div>
            </>
        );
    } else if (props.type === "none") {
        return (
            <>
                
            </>
        );
    }

};

export default Modal;