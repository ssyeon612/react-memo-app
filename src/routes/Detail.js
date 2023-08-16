import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState(null);
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const noteList = JSON.parse(localStorage.getItem("note-list")) || [];

    const changeTitle = (e) => setTitle(e.target.value);
    const changeContents = (e) => setContents(e.target.value);

    const saveNote = () => {
        const temp = uuidv4();
        console.log("note :: {}", temp);
        let data = {
            title,
            contents,
            createdAt: id ? noteList[id].createdAt : new Date(),
            updatedAt: new Date(),
        };
        let newList = noteList;
        if (!id) {
            // create note
            newList.unshift(data);
        } else {
            // modifiy note
            noteList[id] = data;
        }
        localStorage.setItem("note-list", JSON.stringify(newList));
        navigate(-1);
    };

    const deleteNote = () => {
        const filtered = noteList.filter((val, idx, arr) => {
            if (idx != id) return arr;
        });
        localStorage.setItem("note-list", JSON.stringify(filtered));
        navigate(-1);
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const note = noteList[id];
        if (note) {
            setNote(note);
            console.log(note);
            setTitle(note.title);
            setContents(note.contents);
        }
    }, []);

    return (
        <div>
            <button className={`btn ${styles.back_btn}`} onClick={goBack}>
                &#60; Back
            </button>
            <div>
                <input className={styles.input_box} type="text" onChange={changeTitle} value={title} placeholder="note title" />
                <textarea className={styles.textarea} rows="5" onChange={changeContents} value={contents} placeholder="enter note content" />
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
