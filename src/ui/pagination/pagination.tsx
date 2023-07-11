import { KeyboardEvent } from 'react'

import clsx from 'clsx'

import { ArrowLeft } from 'assets/icons/arrow-left'
import { ArrowRight } from 'assets/icons/arrow-right'

import s from './pagination.module.scss'
import { usePagination, DOTS } from './usePagination'

type Props = {
  onPageChange: (page: number) => void
  totalCount: number
  siblingCount?: number
  currentPage: number
  pageSize: number
  className?: string
}

export const Pagination = (props: Props) => {
  const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, className } = props

  const paginationRange =
    usePagination({
      currentPage,
      totalCount,
      siblingCount,
      pageSize,
    }) || []

  const onNext = () => {
    onPageChange?.(currentPage + 1)
  }

  const onPrevious = () => {
    onPageChange?.(currentPage - 1)
  }

  let lastPage = paginationRange[paginationRange.length - 1]

  const onKeySubmit = (e: KeyboardEvent<HTMLLIElement>, cb: () => void) => {
    if (e.code === 'Enter' || e.code === 'Space') cb()
  }

  return (
    <ul className={clsx(s.container, className)}>
      <li
        tabIndex={currentPage !== 1 ? 0 : undefined}
        className={clsx(s.item, currentPage === 1 ? s.disabled : '')}
        onClick={onPrevious}
        onKeyDown={e => onKeySubmit(e, onPrevious)}
      >
        <ArrowLeft />
      </li>

      {paginationRange.map((pageNumber, index) => {
        if (pageNumber === DOTS) {
          return (
            <li key={index} className={clsx(s.item, s.dots)}>
              ...
            </li>
          )
        }

        return (
          <li
            key={index}
            tabIndex={pageNumber !== currentPage ? 0 : undefined}
            className={clsx(s.item, pageNumber === currentPage && s.selected)}
            onClick={() => onPageChange?.(Number(pageNumber))}
            onKeyDown={e => onKeySubmit(e, () => onPageChange(Number(pageNumber)))}
          >
            {pageNumber}
          </li>
        )
      })}
      <li
        tabIndex={currentPage !== lastPage ? 0 : undefined}
        className={clsx(s.item, currentPage === lastPage ? s.disabled : '')}
        onClick={onNext}
        onKeyDown={e => onKeySubmit(e, onNext)}
      >
        <ArrowRight />
      </li>
    </ul>
  )
}
