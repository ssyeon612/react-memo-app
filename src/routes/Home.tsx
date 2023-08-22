import { Link } from "react-router-dom";
import Filter from "../components/Filter";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import styled from "styled-components";

const Empty = styled.div`
    text-align: center;
    font-size: 1.2rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 280px;
`;

const ListBox = styled.ul`
    height: 280px;
    overflow-y: scroll;
`;

const ListItem = styled.li`
    background-color: white;
    padding: 0.8rem;
    border-radius: 0.3rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    .ttl {
        font-weight: 500;
        margin-bottom: 0.3rem;
    }
    .con {
        font-size: 0.8rem;
    }
`;

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
                <Empty>
                    <h3>no data</h3>
                </Empty>
            ) : (
                <ListBox>
                    {notes.map((note: noteType) => (
                        <Link key={note.id} to={`/detail/${note.id}`}>
                            <ListItem>
                                <h3 className="ttl">{note.title}</h3>
                                <p className="con">{note.contents}</p>
                            </ListItem>
                        </Link>
                    ))}
                </ListBox>
            )}

            <Link to={"/detail"}>
                <Button $right>Create Note</Button>
            </Link>
        </div>
    );
}

export default Home;
