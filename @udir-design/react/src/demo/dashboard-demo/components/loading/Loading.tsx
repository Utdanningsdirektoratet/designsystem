import { Skeleton, Spinner } from '@udir-design/react/alpha';
import classes from './Loading.module.css';

export const Loading = () => {
  return (
    <>
      <Skeleton variant="rectangle" width="15.625rem" />
      <Skeleton variant="rectangle" width="15.625rem" />
      <div className={classes.dataBox}>
        <Spinner data-size="lg" aria-label="laster inn" />
      </div>
    </>
  );
};
