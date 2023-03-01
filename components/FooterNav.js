'use client';

export default function FooterNav() {
  return (
    <span className="btm-nav">
      <a href="/">
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
      <a className="active">
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
      <div className="avatar">
        <div className="w-8 rounded-full">
          <img
            src="https://cdn.shopify.com/s/files/1/0632/4659/8402/files/JUNACO_SEPT_2020_53_d019cd72-9817-4cd7-a9d2-da75f8268227.jpg?v=1652992090&width=750"
            alt="avatar user"
          />
        </div>
      </div>
    </span>
  );
}
