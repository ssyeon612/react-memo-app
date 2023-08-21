import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Detail.module.css";
import { v4 as uuidv4 } from "uuid";
import Button from "../components/Button";
import styled from "styled-components";

const TitleInput = styled.input`
    width: 100%;
    border-radius: 0.3rem;
    padding: 0.5rem;
    margin: 0.5rem 0;
    &:focus {
        background-color: white;
        outline: none;
        border: 1px solid lightblue;
    }
`;

const Textarea = styled.textarea`
    width: 100%;
    height: 250px;
    margin-bottom: 0.5rem;
    padding: 0.5rem;
    &:focus {
        outline: none;
        border: 1px solid lightblue;
    }
`;

type noteType = {
    id: string;
    title: string;
    contents: string;
    createdAt: Date;
    updatedAt: Date;
};

function Detail() {
    let navigate = useNavigate();
    const { id } = useParams();
    const [note, setNote] = useState<noteType>({ id: "", title: "", contents: "", createdAt: new Date(), updatedAt: new Date() });
    let noteList: noteType[] = JSON.parse(localStorage.getItem("note-list") || "{}");

    const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) =>
        setNote((preveState) => {
            return { ...preveState, title: e.target.value };
        });
    const changeContents = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setNote((preveState) => {
            return { ...preveState, contents: e.target.value };
        });

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
            const filtered = noteList.filter((val: noteType) => val.id !== note.id);
            newList = [data, ...filtered];
        }
        localStorage.setItem("note-list", JSON.stringify(newList));
        navigate(-1);
    };

    const deleteNote = () => {
        const filtered = noteList.filter((val: noteType, idx: number, arr: noteType[]) => {
            if (val.id !== id) return arr;
        });
        localStorage.setItem("note-list", JSON.stringify(filtered));
        navigate(-1);
    };

    const goBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        const noteStorage = localStorage.getItem("note-list");
        if (noteStorage) noteList = JSON.parse(noteStorage);
        if (id) {
            const found = noteList.find((item: noteType) => item.id === id) as noteType;
            setNote(found);
        }
    }, []);

    return (
        <div>
            <Button onClick={goBack}>&#60; Back</Button>
            <div>
                <TitleInput type="text" onChange={changeTitle} value={note.title} placeholder="note title" />
                <Textarea rows={5} onChange={changeContents} value={note.contents} placeholder="enter note content" />
                {id && (
                    <Button onClick={deleteNote} color="#BB2525">
                        Delete
                    </Button>
                )}
                <Button $right onClick={saveNote}>
                    Save
                </Button>
            </div>
        </div>
    );
}

export default Detail;
