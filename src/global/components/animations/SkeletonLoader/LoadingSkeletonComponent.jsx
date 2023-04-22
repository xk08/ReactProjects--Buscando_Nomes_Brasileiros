import styles from './LoadingSkeleton.module.css'
///Exemplo completo: https://blog.logrocket.com/build-skeleton-screen-css/

function LoadingSkeletonComponent(props) {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonBlog}>

                {props.exibeThreeNamesCardSkeleton ?
                    <div className={styles.skeletonThreeNamesCard}></div>
                    : <div></div>
                }

                {props.exibeNameDataCardSkeleton ?
                    <div className={styles.skeletonDataCard}></div>
                    : <div></div>
                }

            </div>
        </div>

    );
}
export default LoadingSkeletonComponent;