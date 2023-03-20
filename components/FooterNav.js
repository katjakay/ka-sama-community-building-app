import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default function FooterNav() {
  return (
    <span className="btm-nav">
      <a href="/events">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      </a>
      <a href="/create" className="active">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </a>
      <div>
        <div className="w-8 rounded-full">
          <Link href="/community">
            <svg
              width="15"
              height="16"
              viewBox="0 0 15 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_56_561)">
                <rect width="15" height="16" fill="#2F5FFF" />
                <path
                  d="M0.845455 8V1.01818H1.69091V4.48182H1.77273L4.90909 1.01818H6.01364L3.08182 4.16818L6.01364 8H4.99091L2.56364 4.75455L1.69091 5.73636V8H0.845455ZM7.39432 8H6.50795L9.07159 1.01818H9.94432L12.508 8H11.6216L9.53523 2.12273H9.48068L7.39432 8ZM7.72159 5.27273H11.2943V6.02273H7.72159V5.27273Z"
                  fill="white"
                />
                <path
                  d="M14.2045 6.69091L11.9545 15.05H11.2182L13.4682 6.69091H14.2045Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_56_561">
                  <rect width="15" height="16" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
    </span>
  );
}
