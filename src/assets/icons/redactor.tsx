import { memo } from 'react'

const Icon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <g clipPath="url(#clip0_5918_2436)">
        <g>
          <g fill="#fff">
            <path d="M12.667 13.333H3.333a.667.667 0 100 1.334h9.334a.666.666 0 100-1.334z"></path>
            <path d="M3.333 12h.06l2.78-.253c.305-.03.59-.165.807-.38l6-6a1.28 1.28 0 00-.047-1.807l-1.826-1.827a1.333 1.333 0 00-1.774-.046l-6 6c-.215.217-.35.502-.38.806l-.286 2.78a.667.667 0 00.666.727zm6.847-9.333L12 4.487l-1.333 1.3L8.88 4l1.3-1.333zm-5.933 5.94L8 4.88l1.8 1.8-3.733 3.733-2 .187.18-1.993z"></path>
          </g>
        </g>
      </g>
      <defs>
        <clipPath id="clip0_5918_2436">
          <path fill="#fff" d="M0 0H16V16H0z"></path>
        </clipPath>
      </defs>
    </svg>
  )
}

export const Redactor = memo(Icon)
