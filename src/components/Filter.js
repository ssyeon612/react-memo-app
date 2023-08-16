import styles from "./Filter.module.css";

const Filter = ({ search, sort }) => {
    const handleSearchInput = (e) => search(e.target.value);
    const handleChangeSelect = (e) => sort(e.target.value);

    return (
        <div className={styles.filter_box}>
            <input className={styles.input_box} type="text" placeholder="search" onChange={handleSearchInput} />
            <select className={styles.select_box} onChange={handleChangeSelect}>
                <option value="edited">last edited</option>
                <option value="created">recently created</option>
                <option value="alphabet">alphabetical</option>
            </select>
        </div>
    );
};

export default Filter;
