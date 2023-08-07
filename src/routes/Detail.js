import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [contents, setContents] = useState("");
    const noteList = JSON.parse(localStorage.getItem("note-list")) || [];

    const changeTitle = (e) => setTitle(e.target.value);
    const changeContents = (e) => setContents(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: noteList.length + 1,
            title,
            contents,
        };
        const list = [data, ...noteList];
        localStorage.setItem("note-list", JSON.stringify(list));
        navigate(-1);
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const note = noteList.find((item) => item.id == id);
        if (note) {
            setTitle(note.title);
            setContents(note.contents);
        }
    }, []);

    return (
        <div>
            <button className="btn" onClick={goBack}>
                Back
            </button>
            <form onSubmit={onSubmit}>
                <input className={styles.input_box} type="text" onChange={changeTitle} value={title} />
                <textarea className={styles.textarea} rows="5" onChange={changeContents} value={contents} />
                <div className="btn_wrap">
                    <button className={`btn btn_warn`}>Delete</button>
                    <button className={`btn ${styles.right}`}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Detail;
