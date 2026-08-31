import type { FC } from 'react';
import styles from './index.module.scss';
import EditHeader from './EditHeader';
const Edit: FC = () => {
  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>component</div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>canvas</div>
          </div>
          <div className={styles.right}>props</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
