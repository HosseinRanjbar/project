import React, { useContext, useMemo, useState } from 'react'
import { ProductsContext } from '../../pages/Home/context/ProductsContext'
import { getLocal, setLocal } from '../../utils/common'
import Button from '../Button'
import Loading from '../Loading/Loading'
import './styles/Pagination.css'

const Pagination = ({

}) => {

    const {
        productsData,
        productsLoading,
        productsError,
        productsfetchData
    } = useContext(ProductsContext)

    const [currentPage, setCurrentPage] = useState(() => {
        const localPagination = getLocal('pagination') || {};
        return productsData?.pagination?.currentPage || localPagination.currentPage || 1;
    });

    const totalPages = useMemo(() => {
        return productsData?.pagination?.totalPages ||
            getLocal('pagination')?.totalPages ||
            1;
    }, [productsData, getLocal]);


    const handlePageChange = (page) => {
        setCurrentPage(page?.target?.innerText);
        const params = getPaginationParams(page?.target?.innerText);
        productsfetchData(null, params, null, null);
    };

    const getPaginationParams = (page) => {
        const pagination = getLocal('pagination') || {};
        const categoriesChecked = getLocal('categoriesChecked') || [];
        const search = getLocal('search') || '';

        return {
            page,
            limit: pagination.itemsPerPage,
            category: categoriesChecked[0] || '',
            search,
        };
    };

    return (
        <div className='pagination-container'>
            {productsLoading && <Loading className="loading-pagination" />}

            <div className='page-container'>
                {currentPage > 3 ? <Button
                    defaultButton
                    className='page'
                    onClick={(v) => {
                        handlePageChange(v)
                    }}

                >1
                </Button> : null}

                {currentPage > 3 ? <div>...</div> : null}

                {currentPage > 2 ? <Button
                    defaultButton
                    className='page'
                    onClick={(v) => {
                        handlePageChange(v)

                    }}

                >{+currentPage - 2}
                </Button> : null}

                {currentPage > 1 ? <Button
                    defaultButton
                    className='page'
                    onClick={(v) => {
                        handlePageChange(v)
                    }}

                >{+currentPage - 1}
                </Button> : null}

                {!isNaN(currentPage) && <Button
                    defaultButton
                    className='page current-page'
                    onClick={(v) => {
                        handlePageChange(v)
                    }}

                >{Number(currentPage)}
                </Button>}

                {totalPages > currentPage ? <Button
                    defaultButton
                    className='page'
                    onClick={(v) => {
                        handlePageChange(v)
                    }}

                >{+currentPage + 1}
                </Button> : null}

                {totalPages > currentPage + 1 ? <Button
                    defaultButton
                    className='page'
                    onClick={(v) => {
                        handlePageChange(v)
                    }}
                >{+currentPage + 2}

                </Button> : null}

                {totalPages > currentPage + 2 ? <div>...</div> : null}

                {totalPages > currentPage + 2 ?
                    (
                        <Button
                            defaultButton
                            className='page'
                            onClick={(v) => {
                                handlePageChange(v)
                            }}
                        >{totalPages}</Button>
                    )

                    : null}
            </div>
        </div>
    )
}

export default Pagination