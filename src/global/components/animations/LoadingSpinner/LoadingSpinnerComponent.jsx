import styles from './LoadingSpinner.module.css'

function LoadingSpinnerComponent() {
    return (
        <>
            <br />
            <div className={styles.spinnerContainer}>
                <div className={styles.loadingSpinner}></div>
            </div>
            <br />
        </>

    );
}
export default LoadingSpinnerComponent;