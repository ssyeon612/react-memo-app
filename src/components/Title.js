import styles from "./Title.module.css";

const Title = () => {
    return (
        <div className={styles.title}>
            <h3 className={styles.title_header}>Note</h3>
            <p>Take your notes</p>
        </div>
    );
};
export default Title;
