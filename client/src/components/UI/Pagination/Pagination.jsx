import React, { useContext } from 'react';
import styles from './Pagination.module.css';
import { Context } from '../../../main';
import { observer } from 'mobx-react-lite';

const Page = observer(() => {
  const { newsStore } = useContext(Context);
  const pageCount = Math.ceil(newsStore.totalCount / newsStore.limit);
  const currentPage = newsStore.page;

  const handleFirstPage = () => newsStore.setPage(1);
  const handleLastPage = () => newsStore.setPage(pageCount);
  const handlePrevPage = () => newsStore.setPage(currentPage > 1 ? currentPage - 1 : 1);
  const handleNextPage = () => newsStore.setPage(currentPage < pageCount ? currentPage + 1 : pageCount);

  return (
    <div className={styles.page}>
      <button onClick={handleFirstPage} disabled={currentPage === 1} className={styles.btnPage}>
        &lt;&lt;
      </button>
      <button onClick={handlePrevPage} disabled={currentPage === 1} className={styles.btnPage}>
        &lt;
      </button>
      <span className={styles.pageInfo}>
        {currentPage} / {pageCount}
      </span>
      <button onClick={handleNextPage} disabled={currentPage === pageCount} className={styles.btnPage}>
        &gt;
      </button>
      <button onClick={handleLastPage} disabled={currentPage === pageCount} className={styles.btnPage}>
        &gt;&gt;
      </button>
    </div>
  );
});

export default Page;
