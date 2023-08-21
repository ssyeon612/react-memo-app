import styles from "./Filter.module.css";
import styled from "styled-components";

const FilterWrap = styled.div`
    display: flex;
    margin-bottom: 1rem;
`;

const TextInput = styled.input`
    width: 60%;
    padding: 0.5rem;
    border-radius: 0.3rem;
    background-color: lightgrey;
    margin-right: 0.5rem;
    &:focus {
        outline: none;
        background-color: white;
        border: 1px solid lightblue;
    }
`;

const SelectBox = styled.select`
    width: 40%;
    padding: 0.5rem;
    border-radius: 0.3rem;
    cursor: pointer;
`;

type FilterProps = {
    search: (s: string) => void;
    sort: (s: string) => void;
};

const Filter = ({ search, sort }: FilterProps) => {
    const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => search(e.target.value);
    const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => sort(e.target.value);

    return (
        <FilterWrap>
            <TextInput type="text" placeholder="search" onChange={handleSearchInput} />
            <SelectBox onChange={handleChangeSelect}>
                <option value="edited">last edited</option>
                <option value="created">recently created</option>
                <option value="alphabet">alphabetical</option>
            </SelectBox>
        </FilterWrap>
    );
};

export default Filter;
