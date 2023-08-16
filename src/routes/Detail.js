import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { v4 as uuidv4 } from "uuid";

function Detail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState({ title: "", contents: "" });
    const noteList = JSON.parse(localStorage.getItem("note-list")) || [];

    const changeTitle = (e) => setNote({ ...note, title: e.target.value });
    const changeContents = (e) => setNote({ ...note, contents: e.target.value });

    const saveNote = () => {
        let data = {
            id: id ? id : uuidv4(),
            title: note.title,
            contents: note.contents,
            createdAt: id ? note.createdAt : new Date(),
            updatedAt: new Date(),
        };
        let newList = noteList;
        if (!id) {
            // create note
            newList.unshift(data);
        } else {
            // modifiy note
            const filtered = noteList.filter((val) => val.id != note.id);
            newList = [data, ...filtered];
        }
        localStorage.setItem("note-list", JSON.stringify(newList));
        navigate(-1);
    };

    const deleteNote = () => {
        const filtered = noteList.filter((val, idx, arr) => {
            if (val.id != id) return arr;
        });
        localStorage.setItem("note-list", JSON.stringify(filtered));
        navigate(-1);
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        if (id) {
            const found = noteList.find((item) => item.id === id);
            setNote(found);
        }
    }, []);

    return (
        <div>
            <button className={`btn ${styles.back_btn}`} onClick={goBack}>
                &#60; Back
            </button>
            <div>
                <input className={styles.input_box} type="text" onChange={changeTitle} value={note.title} placeholder="note title" />
                <textarea className={styles.textarea} rows="5" onChange={changeContents} value={note.contents} placeholder="enter note content" />
                <div className="btn_wrap">
                    {id && (
                        <button className={`btn btn_warn`} onClick={deleteNote}>
                            Delete
                        </button>
                    )}
                    <button className={`btn ${styles.right}`} onClick={saveNote}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Detail;
