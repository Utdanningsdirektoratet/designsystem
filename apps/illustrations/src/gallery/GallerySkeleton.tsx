import { Skeleton } from '@udir-design/react';
import { GalleryIntro } from './IllustrationGallery';
import styles from './illustrationGallery.module.css';

/** Enough cards to fill a large screen. */
const PLACEHOLDER_CARDS = 8;

/**
 * The gallery's layout while login and the catalog load. The skeletons are hidden from screen
 * readers, which hear the status instead. No `aria-busy`: it would hold back that status, and the
 * whole skeleton is replaced rather than updated.
 */
export function GallerySkeleton() {
  return (
    <div className={styles.root}>
      <GalleryIntro />
      <div className={styles.toolbar}>
        <Skeleton
          variant="rectangle"
          className={styles.categoryToggle}
          width="46rem"
          height="var(--ds-size-12)"
        />
        <div className={`${styles.categorySelect} ${styles.selectPlaceholder}`}>
          {/* Text skeletons only keep their length while inline, not as grid or flex items. */}
          <span>
            <Skeleton variant="text" width={8} />
          </span>
          <Skeleton
            variant="rectangle"
            width="12rem"
            height="var(--ds-size-12)"
          />
        </div>
        <Skeleton
          variant="rectangle"
          className={styles.search}
          width="16.5rem"
          height="var(--ds-size-12)"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.summary}>
          <span>
            <Skeleton variant="text" width={34} />
          </span>
        </div>
        <div className={styles.grid}>
          {Array.from({ length: PLACEHOLDER_CARDS }, (_, index) => (
            <div key={index} className={styles.cardPlaceholder}>
              <Skeleton variant="rectangle" height="10rem" />
              <span>
                <Skeleton variant="text" width={10} />
              </span>
            </div>
          ))}
        </div>
      </div>
      <output className={styles.visuallyHidden}>
        Laster inn illustrasjonene
      </output>
    </div>
  );
}
