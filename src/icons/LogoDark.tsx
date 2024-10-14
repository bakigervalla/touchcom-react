import { rem } from '@mantine/core';
import React, { memo } from 'react';

import { IconProps } from '@/common/interfaces';

const LogoDark = ({ width, height, style, ...others }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 177 37"
    style={{ width: rem(width), height: rem(height), ...style }}
    {...others}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.18931 19.3023H0.998742V13.3699H16.8482V19.3023H12.6577V36.0208H5.18931V19.3023Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24.4791 24.7382C24.4791 25.4019 24.6036 26.0241 24.8524 26.6049C25.1013 27.1856 25.4332 27.6834 25.8895 28.0982C26.3043 28.5131 26.8436 28.8864 27.3829 29.1353C27.9636 29.3842 28.5859 29.5087 29.2496 29.5087C29.9133 29.5087 30.5355 29.3842 31.1163 29.1353C31.6971 28.8864 32.1948 28.5546 32.6097 28.0982C33.0245 27.6834 33.3978 27.1441 33.6467 26.6049C33.8956 26.0241 34.0201 25.4019 34.0201 24.7382C34.0201 24.0744 33.8956 23.4522 33.6467 22.8714C33.3978 22.2907 33.066 21.7929 32.6097 21.3781C32.1948 20.9633 31.6556 20.5899 31.1163 20.341C30.5355 20.0921 29.9133 19.9677 29.2496 19.9677C28.5859 19.9677 27.9636 20.0921 27.3829 20.341C26.8021 20.5899 26.3043 20.9218 25.8895 21.3781C25.4747 21.7929 25.1013 22.3322 24.8524 22.8714C24.6035 23.4522 24.4791 24.0744 24.4791 24.7382ZM17.3439 24.7384C17.3439 23.1205 17.6757 21.5857 18.298 20.1338C18.9202 18.6819 19.7913 17.4374 20.8284 16.3589C21.9069 15.2803 23.1514 14.4507 24.6033 13.8285C26.0552 13.2062 27.59 12.8744 29.2079 12.8744C30.8257 12.8744 32.402 13.2062 33.8124 13.8285C35.2643 14.4507 36.5088 15.3218 37.5873 16.3589C38.6659 17.4374 39.4955 18.6819 40.1178 20.1338C40.74 21.5857 41.0719 23.1205 41.0719 24.7384C41.0719 26.3562 40.74 27.9325 40.1178 29.3429C39.4955 30.7948 38.6244 32.0393 37.5873 33.1178C36.5088 34.1964 35.2643 35.026 33.8124 35.6483C32.3605 36.2705 30.8257 36.6024 29.2079 36.6024C27.59 36.6024 26.0137 36.2705 24.6033 35.6483C23.1514 35.026 21.9069 34.1549 20.8284 33.1178C19.7499 32.0393 18.9202 30.7948 18.298 29.3429C17.6757 27.891 17.3439 26.3562 17.3439 24.7384Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M52.5627 36.6414C51.1521 36.6414 49.8246 36.4755 48.7044 36.1021C47.5428 35.7288 46.5472 35.1895 45.7589 34.4844C44.9292 33.7792 44.3069 32.8251 43.892 31.7465C43.4357 30.6265 43.2283 29.3406 43.2283 27.8472V13.3699H50.4883V27.4739C50.4883 28.262 50.6543 28.8843 50.9862 29.2991C51.3181 29.7139 51.8574 29.9213 52.6456 29.9213C53.4338 29.9213 53.9732 29.7139 54.3051 29.2991C54.637 28.8843 54.8029 28.262 54.8029 27.4739V13.3699H62.063V27.8057C62.063 29.2991 61.8555 30.585 61.3992 31.705C60.9428 32.8251 60.3205 33.7377 59.4908 34.4429C58.6611 35.1481 57.6654 35.7288 56.5038 36.0607C55.2593 36.434 53.9732 36.6414 52.5627 36.6414L52.5627 36.6414Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M63.9705 24.7366C63.9705 22.9114 64.3024 21.2937 64.9245 19.8418C65.5467 18.39 66.4178 17.1456 67.4963 16.0671C68.5748 15.0301 69.8607 14.2419 71.3125 13.6612C72.7644 13.122 74.2991 12.8316 75.9169 12.8316C77.2028 12.8316 78.3642 12.956 79.3598 13.2049C80.3553 13.4538 81.2264 13.7442 81.973 14.0345C82.8027 14.4079 83.5493 14.7812 84.13 15.2375L80.5627 21.5426C80.1894 21.2522 79.816 21.0033 79.3598 20.7544C78.9864 20.5885 78.5302 20.3811 77.9909 20.2152C77.4516 20.0493 76.8709 19.9663 76.1658 19.9663C75.4606 19.9663 74.7969 20.0907 74.2162 20.3396C73.6354 20.5885 73.0962 20.9204 72.6814 21.3767C72.2251 21.7914 71.8933 22.3307 71.6444 22.87C71.3955 23.4507 71.271 24.0729 71.271 24.7366C71.271 25.4003 71.3955 26.0225 71.6444 26.6032C71.8933 27.184 72.2666 27.6817 72.7229 28.0965C73.1792 28.5114 73.7184 28.8847 74.3406 29.1336C74.9628 29.3824 75.6265 29.5069 76.3317 29.5069C77.0369 29.5069 77.7006 29.4239 78.2813 29.2165C78.862 29.0506 79.3183 28.8432 79.6916 28.5943C80.1479 28.3454 80.5212 28.0551 80.8945 27.7232L84.4619 34.0283C83.8397 34.5261 83.1345 34.9824 82.3049 35.3557C81.5997 35.6875 80.6871 35.9779 79.6916 36.2268C78.6546 36.5172 77.4931 36.6416 76.2072 36.6416C74.4236 36.6416 72.8058 36.3512 71.3125 35.7705C69.8192 35.1898 68.5333 34.4016 67.4548 33.3231C66.3764 32.2861 65.5053 31.0417 64.9245 29.5484C64.3023 28.0965 63.9705 26.4788 63.9705 24.7366H63.9705Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M86.2061 13.3699H93.4652V21.086H97.5303V13.3699H104.789V36.0618H97.5303V27.6405H93.4652V36.0203H86.2061V13.3699Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.072 24.7366C107.072 22.9114 107.404 21.2937 108.026 19.8418C108.648 18.39 109.519 17.1456 110.598 16.0671C111.676 15.0301 112.962 14.2419 114.414 13.6612C115.866 13.122 117.401 12.8316 119.018 12.8316C120.304 12.8316 121.466 12.956 122.461 13.2049C123.457 13.4538 124.328 13.7442 125.075 14.0345C125.904 14.4079 126.651 14.7812 127.232 15.2375L123.664 21.5426C123.291 21.2522 122.918 21.0033 122.461 20.7544C122.088 20.5885 121.632 20.3811 121.092 20.2152C120.553 20.0493 119.972 19.9663 119.267 19.9663C118.562 19.9663 117.898 20.0907 117.318 20.3396C116.737 20.5885 116.198 20.9204 115.783 21.3767C115.327 21.7914 114.995 22.3307 114.746 22.87C114.497 23.4507 114.373 24.0729 114.373 24.7366C114.373 25.4003 114.497 26.0225 114.746 26.6032C114.995 27.184 115.368 27.6817 115.824 28.0965C116.281 28.5114 116.82 28.8847 117.442 29.1336C118.064 29.3824 118.728 29.5069 119.433 29.5069C120.138 29.5069 120.802 29.4239 121.383 29.2165C121.964 29.0506 122.42 28.8432 122.793 28.5943C123.249 28.3454 123.664 28.0551 123.996 27.7232L127.563 34.0283C126.941 34.5261 126.236 34.9824 125.406 35.3557C124.701 35.6875 123.789 35.9779 122.793 36.2268C121.756 36.5172 120.595 36.6416 119.309 36.6416C117.525 36.6416 115.907 36.3512 114.414 35.7705C112.921 35.1898 111.635 34.4016 110.556 33.3231C109.478 32.2446 108.607 31.0417 108.026 29.5484C107.445 28.0551 107.072 26.4788 107.072 24.7366H107.072Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M152.497 13.3699H158.47L164.402 22.0816L170.292 13.3699H176.266V36.0618H169.006V27.8894L164.402 34.6928L159.756 27.8894V36.0618H152.497V13.3699Z"
      fill="black"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M133.951 24.7385C133.951 25.4022 134.076 26.0244 134.325 26.6052C134.574 27.186 134.906 27.6837 135.362 28.0986C135.777 28.5134 136.316 28.8867 136.855 29.1356C137.436 29.3845 138.058 29.509 138.722 29.509C139.386 29.509 140.008 29.3845 140.589 29.1356C141.169 28.8867 141.667 28.5549 142.082 28.0986C142.497 27.6837 142.87 27.1445 143.119 26.6052C143.368 26.0244 143.492 25.4022 143.492 24.7385C143.492 24.0748 143.368 23.4525 143.119 22.8718C142.87 22.291 142.538 21.7932 142.082 21.3784C141.667 20.9636 141.128 20.5902 140.589 20.3413C140.008 20.0924 139.386 19.968 138.722 19.968C138.058 19.968 137.436 20.0924 136.855 20.3413C136.274 20.5902 135.777 20.9221 135.362 21.3784C134.947 21.7932 134.574 22.3325 134.325 22.8718C134.076 23.4525 133.951 24.0748 133.951 24.7385ZM126.816 24.7385C126.816 23.1207 127.107 21.5858 127.771 20.134C128.393 18.6821 129.264 17.4376 130.301 16.359C131.379 15.2805 132.624 14.4508 134.076 13.8286C135.528 13.2064 137.063 12.8745 138.68 12.8745C140.298 12.8745 141.833 13.2064 143.285 13.8286C144.737 14.4509 145.981 15.322 147.06 16.359C148.138 17.4376 148.968 18.6821 149.59 20.134C150.213 21.5858 150.544 23.1207 150.544 24.7385C150.544 26.3563 150.213 27.9327 149.59 29.3431C148.968 30.795 148.097 32.0394 147.06 33.118C145.981 34.1965 144.737 35.0262 143.285 35.6484C141.833 36.2706 140.298 36.6025 138.68 36.6025C137.063 36.6025 135.486 36.2706 134.076 35.6484C132.624 35.0262 131.379 34.155 130.301 33.118C129.222 32.0394 128.393 30.795 127.771 29.3431C127.107 27.8912 126.816 26.3563 126.816 24.7385Z"
      fill="#FF671D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M145.898 12.2931C141.543 9.34896 135.901 9.34896 131.545 12.2931L129.471 9.26603C135.071 5.45104 142.331 5.45104 147.973 9.26603L145.898 12.2931Z"
      fill="#FF671D"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M128.392 7.85614L126.317 4.82663C133.868 -0.277875 143.576 -0.277875 151.127 4.82663L149.053 7.85614C142.788 3.58163 134.656 3.58163 128.392 7.85614Z"
      fill="#FF671D"
    />
  </svg>
);

LogoDark.defaultProps = {
  width: 120,
  height: 25,
};

export default memo(LogoDark);
