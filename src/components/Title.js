import styles from "./Title.module.css";

const Title = () => {
    return (
        <div className={styles.title}>
            <h3 className={styles.title_header}>Notes App</h3>
            <p>Take your notes and never forget</p>
        </div>
    );
};
export default Title;
