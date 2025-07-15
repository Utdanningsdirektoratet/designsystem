import { Skeleton, Spinner } from '@udir-design/react/alpha';
import classes from './Loading.module.css';

export const Loading = () => {
  return (
    <>
      <Skeleton variant="rectangle" width="250px" />
      <Skeleton variant="rectangle" width="250px" />
      <div className={classes.dataBox}>
        <Spinner data-size="lg" aria-label="laster inn" />
      </div>
    </>
  );
};
