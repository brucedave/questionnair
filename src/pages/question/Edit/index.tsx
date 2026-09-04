import type { FC } from 'react';
import styles from './index.module.scss';
import EditHeader from './EditHeader';
import ComponentProp from './ComponentProp';
import EditCanvas from './EditCanvas';
import { getQuestionService } from '../../../services/question';
import useLoadQuestionData from '../../../hooks/useLoadQuestionData';
import { useState, useEffect } from 'react';
import LeftPanel from './LeftPanel';
import { useParams } from 'react-router-dom';
const Edit: FC = () => {
  const { id } = useParams();

  const { data, loading, error } = useLoadQuestionData();
  console.log(data);

  return (
    <div className={styles.container}>
      <EditHeader />
      <div className={styles['content-wrapper']}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas />
            </div>
          </div>
          <div className={styles.right}>
            <ComponentProp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
