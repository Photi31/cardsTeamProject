import { memo } from 'react'

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <g>
        <g>
          <path
            fill="#fff"
            d="M14 4h-3.333V2.887A1.613 1.613 0 009 1.333H7a1.613 1.613 0 00-1.667 1.554V4H2a.667.667 0 100 1.333h.667v7.334a2 2 0 002 2h6.666a2 2 0 002-2V5.333H14A.666.666 0 1014 4zM6.667 2.887c0-.107.14-.22.333-.22h2c.193 0 .333.113.333.22V4H6.667V2.887zM12 12.667a.667.667 0 01-.667.666H4.667A.667.667 0 014 12.667V5.333h8v7.334z"
          ></path>
        </g>
      </g>
    </svg>
  )
}

export const Delete = memo(Icon)
