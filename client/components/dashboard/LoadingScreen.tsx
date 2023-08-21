import styles from './LoadingScreen.module.scss';

export const LoadingScreen = () => {
    return (
        <div>
            <p>Loading Results...! Please Wait</p>
        <div className={styles.loadingscreen}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            
        </div>
        </div>
    );
};

