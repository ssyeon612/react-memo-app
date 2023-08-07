import { Link } from "react-router-dom";

import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

function Home() {
    const [notes, setNotes] = useState([]);

    const sortList = (value) => {
        const sortList = [...notes].sort((a, b) => (a.title > b.title ? 1 : -1));
        setNotes(sortList);
    };
    useEffect(() => {
        setNotes(JSON.parse(localStorage.getItem("note-list")));
    }, []);
    return (
        <div>
            <Filter sort={sortList} />
            <ul className={styles.list_box}>
                {notes.map((note) => (
                    <Link key={note.id} to={`/detail/${note.id}`}>
                        <li className={styles.list__item}>
                            <h3 className={styles.title}>{note.title}</h3>
                            <p className={styles.contents}>con</p>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="btn_wrap">
                <Link to={"/detail"}>
                    <button className={`btn ${styles.btn}`}>Create Note</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
