import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import TopArea from "../components/TopArea";

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
    height: 450px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
    padding: 1.5rem 3rem;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20%, auto));
    grid-gap: 1rem;
`;

const ListItem = styled.li<{ bgColor: string }>`
    width: 10rem;
    height: 15rem;
    background-color: ${(props) => props.bgColor || "#e6d6d4"};
    box-shadow: 4px 3px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 0.8rem;
    cursor: pointer;
    position: relative;
    .ttl {
        font-weight: 500;
        margin-bottom: 0.3rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    .con {
        height: 12rem;
        font-size: 0.8rem;
        word-break: break-all;
        overflow: hidden;
    }
    .tape {
        display: block;
        position: absolute;
        background: rgba(235, 237, 234, 0.6);
        width: 70px;
        height: 25px;
        transform: rotate(6deg);
        top: -12px;
        left: 50px;
    }
`;

const Title = styled.h3`
    color: #6c6c6c;
    font-family: Inter;
    font-size: 35px;
    font-style: italic;
    font-weight: 500;
    text-align: center;
    padding: 1rem 0;
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
    const noteList = JSON.parse(localStorage.getItem("note-list") || "[]");

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
        // if (Object.keys(noteList).length > 0) setNotes(noteList);
        if (noteList.length > 0) setNotes(noteList);
    }, []);

    return (
        <div>
            <TopArea search={search} sort={sortList} />
            <Title>Take Notes</Title>
            {/* <Filter search={search} sort={sortList} /> */}
            {notes.length < 1 ? (
                <Empty>
                    <h3>no data</h3>
                </Empty>
            ) : (
                <ListBox>
                    {notes.map((note: noteType) => (
                        <Link key={note.id} to={`/detail/${note.id}`}>
                            <ListItem bgColor={`hsl(${Number(Math.random() * 10) * 36}, 16%, 75%)`}>
                                <span className="tape"></span>
                                <h3 className="ttl">{note.title}</h3>
                                <p className="con">{note.contents}</p>
                            </ListItem>
                        </Link>
                    ))}
                </ListBox>
            )}
        </div>
    );
}

export default Home;
