import { Card, Heading, Skeleton, Spinner, Tabs } from '../../../alpha';
import classes from './Loading.module.css';

export const Loading = () => {
  return (
    <Tabs.Panel value="tab4" className={classes.loading}>
      <div className={classes.cards}>
        <Card variant="tinted" className={classes.center}>
          <Spinner data-size="lg" aria-label="laster inn" />
        </Card>
        <Card variant="tinted" className={classes.center}>
          <Spinner data-size="lg" aria-label="laster inn" />
        </Card>
      </div>
      <div className={classes.skeletonContainer}>
        <Skeleton height="150px" />
        <div className={classes.skeleton}>
          <Skeleton variant="circle" width="30px" height="30px" />
          <Heading>
            <Skeleton variant="text">En medium tittel</Skeleton>
          </Heading>
        </div>
        <Skeleton variant="text" width={160} />
      </div>
    </Tabs.Panel>
  );
};
