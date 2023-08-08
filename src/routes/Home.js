import { Link } from "react-router-dom";

import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

function Home() {
    const [notes, setNotes] = useState([]);
    const noteList = localStorage.getItem("note-list");

    const sortList = (type) => {
        let newList = [];
        switch (type) {
            case "DATE":
                newList = JSON.parse(noteList).reverse();
                break;
            case "NAME":
                newList = [...notes].sort((a, b) => (a.title > b.title ? 1 : -1));
                break;
        }
        setNotes(newList);
    };

    const search = (text) => {
        if (!text) return notes;
        const filtered = notes.filter((item) => {
            return item.title.includes(text);
        });
        setNotes(filtered);
    };
    useEffect(() => {
        if (noteList) {
            setNotes(JSON.parse(noteList).reverse());
        }
    }, []);
    return (
        <div>
            <Filter search={search} sort={sortList} />
            {notes.length < 1 ? (
                <div className={styles.empty}>
                    <h3>no data</h3>
                </div>
            ) : (
                <ul className={styles.list_box}>
                    {notes.map((note, index) => (
                        <Link key={index} to={`/detail/${index}`}>
                            <li className={styles.list__item}>
                                <h3 className={styles.title}>{note.title}</h3>
                                <p className={styles.contents}>{note.contents}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}

            <div className="btn_wrap">
                <Link to={"/detail"}>
                    <button className={`btn ${styles.btn}`}>Create Note</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
