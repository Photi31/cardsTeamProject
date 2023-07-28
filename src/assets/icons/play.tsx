import { memo } from 'react'

function Icon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
      <g>
        <g fill="#fff">
          <path d="M8 1.333a6.667 6.667 0 100 13.334A6.667 6.667 0 008 1.333zm0 12A5.334 5.334 0 118 2.666a5.334 5.334 0 010 10.667z"></path>
          <path d="M8.227 4.967a1.133 1.133 0 00-1.234-.2 1.067 1.067 0 00-.666.986v4.494a1.067 1.067 0 00.666.986c.145.066.302.1.46.1a1.16 1.16 0 00.774-.3l2.44-2.246a1.068 1.068 0 000-1.574l-2.44-2.246zm-.56 4.766V6.267L9.54 8 7.667 9.733z"></path>
        </g>
      </g>
    </svg>
  )
}

export const Play = memo(Icon)
