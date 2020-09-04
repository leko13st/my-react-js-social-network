import React, { useState } from 'react';
import styles from './Paginator.module.css';

const Paginator = ({totalUsersCount, pageSize, currentPage, onChangePage}) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i < pageCount + 1; i++)
        pages.push(i);

    let pagesBlock = 10; //кол-во страниц в одном блоке paginator'а
    let pageBlockCount = Math.ceil(pageCount / pagesBlock); //кол-во всех таких блоков
    let [pageBlockNum, setPageBlockNum] = useState(1); //хук по установке переменной выбранного блока и её изменение 

    //Проверка подходит ли страница под выбранный блок
    const confirmPage = (page) => {
        let leftBorder = (pageBlockNum - 1) * pagesBlock + 1; //левая граница блока
        let rightBorder = pageBlockNum * pagesBlock; //правая граница блока

        return page >= leftBorder && page <= rightBorder;
    }

    return (        
        <div className={styles.pages}>
            {pageBlockNum > 1 && <button className={styles.pageButton} onClick={() => setPageBlockNum(pageBlockNum - 1)}>Prev</button>}
            {
                pages
                .filter(page => confirmPage(page))
                .map(num => <span key={num} onClick={() => onChangePage(num)} className={currentPage === num ? styles.currentPage : undefined}>{num}</span>)
            }            
            {pageBlockCount > pageBlockNum && <button className={styles.pageButton} onClick={() => setPageBlockNum(pageBlockNum + 1)}>Next</button>}
        </div>
    )
}

export default Paginator;