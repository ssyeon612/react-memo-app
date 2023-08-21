import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";
import Button from "../components/Button";

type noteType = {
    id: string;
    title: string;
    contents: string;
    createdAt: Date;
    updatedAt: Date;
};

function Home() {
    const [notes, setNotes] = useState<noteType[]>([]);
    const noteList = JSON.parse(localStorage.getItem("note-list") || "{}");

    const sortList = (sortBy: string): void => {
        let newList: noteType[] = [];
        switch (sortBy) {
            case "edited":
                newList = [...notes].sort((a: noteType, b: noteType) => (a.updatedAt < b.updatedAt ? 1 : -1));
                break;
            case "created":
                newList = [...notes].sort((a: noteType, b: noteType) => (a.createdAt < b.createdAt ? 1 : -1));
                break;
            case "alphabet":
                newList = [...notes].sort((a: noteType, b: noteType) => (a.title > b.title ? 1 : -1));
                break;
        }
        setNotes(newList);
    };

    const search = (text: string): void => {
        const filtered = noteList.filter((item: noteType) => {
            return item.title.includes(text) || item.contents.includes(text);
        });
        setNotes(filtered);
    };

    useEffect(() => {
        if (noteList) setNotes(noteList);
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
                    {notes.map((note: noteType) => (
                        <Link key={note.id} to={`/detail/${note.id}`}>
                            <li className={styles.list__item}>
                                <h3 className={styles.title}>{note.title}</h3>
                                <p className={styles.contents}>{note.contents}</p>
                            </li>
                        </Link>
                    ))}
                </ul>
            )}

            <div className={styles.btn_wrap}>
                <Link to={"/detail"}>
                    {/* <button className={`btn ${styles.btn}`}>Create Note</button> */}
                    <Button $right>Create Note</Button>
                </Link>
            </div>
        </div>
    );
}

export default Home;
