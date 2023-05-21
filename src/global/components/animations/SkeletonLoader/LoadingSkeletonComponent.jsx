import styles from './LoadingSkeleton.module.css'
import { Grid } from "@mui/material";
///Exemplo completo: https://blog.logrocket.com/build-skeleton-screen-css/

function LoadingSkeletonComponent(props) {
    return (
        <div className={styles.skeletonContainer}>
            <div className={styles.skeletonBlog}>
                <Grid container spacing={2}>

                {props.exibeThreeNamesCardSkeleton &&
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className={styles.skeletonThreeNamesCard}></div>
                    </Grid>
                }

                {props.exibeNameDataCardSkeleton &&
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                    <div className={styles.skeletonDataCard}></div>
                    </Grid>
                }

                </Grid>
            </div>
        </div>

    );
}
export default LoadingSkeletonComponent;