import React from 'react';
import styles from "./Loading.module.css";

export default function Loading() {
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center vh-100">
                <div className={styles.loading_spinner}></div>
            </div>
        </>
    )
}
