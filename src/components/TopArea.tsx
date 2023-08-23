import styled from "styled-components";
import { Link } from "react-router-dom";

import CircleGroup from "./CircleGroup";
import SortIcon from "../assets/icons/i_sort_g.svg";
import SearchIcon from "../assets/icons/i_search_g.svg";
import EditIcon from "../assets/icons/i_edit_g.svg";
import { ReactText, useState } from "react";

const Wrap = styled.div`
    height: 45px;
    display: flex;
    justify-content: space-between;
    button {
        background: transparent;
        display: inline-flex;
        align-items: center;
    }
    .search_btn {
        &.on {
            background: white;
            border-radius: 0.5rem;
            transition-property: width, background;
            transition-duration: 1s, 1s;
            transition-timing-function: ease;
        }
        input {
            height: 30px;
            outline: 0;
            background: none;
        }
    }
    i {
        display: inline-block;
        width: 30px;
        height: 30px;
    }
    .sort {
        background: url(${SortIcon});
    }
    .search {
        background: url(${SearchIcon});
    }
    .write {
        background: url(${EditIcon});
    }
`;

type FilterProps = {
    search: (s: string) => void;
    sort: (s: string) => void;
};

const Title = ({ search, sort }: FilterProps) => {
    const [sortOn, setSortOn] = useState(false);
    const [searchOn, setSearchOn] = useState(false);

    const handleClickSort = () => setSortOn((prev) => !prev);
    const handleClickSearch = () => setSearchOn((prev) => !prev);

    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => sort(e.target.value);
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value);

    return (
        <Wrap>
            <CircleGroup />
            <div className="center">
                <button>
                    <i className="sort" onClick={handleClickSort}></i>
                    {sortOn && (
                        <select onChange={handleChangeSelect}>
                            <option value="edited">last edited</option>
                            <option value="created">recently created</option>
                            <option value="alphabet">alphabetical</option>
                        </select>
                    )}
                </button>
                <button className={`search_btn ${searchOn ? "on" : ""}`}>
                    <i className="search" onClick={handleClickSearch}></i>
                    {searchOn && <input type="text" onChange={handleSearchInput} />}
                </button>
            </div>
            <div>
                <Link to={"/detail"}>
                    <a>
                        <i className="write"></i>
                    </a>
                </Link>
            </div>
        </Wrap>
    );
};
export default Title;
