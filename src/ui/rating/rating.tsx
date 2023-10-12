import { FC, ReactNode, useState } from 'react'

import { clsx } from 'clsx'

import Star from 'assets/icons/star'
import StarOutline from 'assets/icons/star-outline'

import s from './rating.module.scss'

type Props = {
  grade?: number
  controlled?: boolean
  onClick?: (grade: number) => void
}
export const Rating: FC<Props> = ({ onClick, grade = 0, controlled }) => {
  const [mouseOverId, setMouseOverId] = useState<number>(0)

  const starCount = 5
  const outlineStars = starCount - grade
  const stars = [...Array(grade).fill(<Star />), ...Array(outlineStars).fill(<StarOutline />)]

  return (
    <div className={s.stars}>
      {stars.map((star, id) => {
        const style = clsx(id + 1 <= mouseOverId && s.overStar)
        const starClickHandle = () => {
          if (grade === 1 && mouseOverId === 1) {
            onClick?.(0)
          } else {
            onClick?.(id + 1)
          }
        }

        return (
          <StarItem
            key={id}
            id={id + 1}
            starType={star}
            onClick={starClickHandle}
            onMouseEnter={controlled ? setMouseOverId : undefined}
            onMouseLeave={controlled ? setMouseOverId : undefined}
            className={style}
          />
        )
      })}
    </div>
  )
}

type StarItemProps = {
  id: number
  starType: ReactNode
  className?: string
  onClick: (id: number) => void
  onMouseEnter?: (id: number) => void
  onMouseLeave?: (id: number) => void
}
export const StarItem: FC<StarItemProps> = ({
  onMouseEnter,
  onMouseLeave,
  className,
  starType,
  onClick,
  id,
}) => {
  const style = clsx(s.starItem, className)

  return (
    <div
      className={style}
      onMouseEnter={() => onMouseEnter?.(id)}
      onMouseLeave={() => onMouseLeave?.(0)}
      onClick={() => onClick(id)}
    >
      {starType}
    </div>
  )
}
