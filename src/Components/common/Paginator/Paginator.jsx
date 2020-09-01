import React from 'react';
import styles from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onChangePage}) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i < pageCount + 1; i++)
        pages.push(i);
    debugger
    return (
        <div className={styles.pages}>
            {
                pages.map(num => <span onClick={() => onChangePage(num)} className={currentPage === num ? styles.currentPage : undefined}>{num}</span>)
            }
        </div>
    )
}

export default Paginator;