import styles from "./Filter.module.css";

const Filter = ({ sort }) => {
    const handleChangeSelect = (e) => {
        const value = e.target.value;
        console.log(value);
        sort(value);
    };
    return (
        <div className={styles.filter_box}>
            <input className={styles.input_box} type="text" placeholder="Search Title" />
            <select className={styles.select_box} onChange={handleChangeSelect}>
                <option value="LAST">Last updated</option>
                <option value="NAME">Name</option>
            </select>
        </div>
    );
};

export default Filter;
