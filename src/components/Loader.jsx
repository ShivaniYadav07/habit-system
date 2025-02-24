const Loader = () => {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
  width="100"
  height="100"
  viewBox="0 0 100 100"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <circle
    cx="50"
    cy="50"
    r="40"
    stroke="url(#gradient)"
    strokeWidth="8"
    strokeLinecap="round"
    strokeDasharray="220"
    strokeDashoffset="220"
  >
    <animate
      attributeName="strokeDashoffset"
      values="220; 0"
      dur="2s"
      repeatCount="indefinite"
    />
  </circle>
  <polyline
    points="30,50 45,65 75,35"
    stroke="url(#gradient)"
    strokeWidth="8"
    fill="none"
    strokeLinecap="round"
    strokeDasharray="50"
    strokeDashoffset="50"
  >
    <animate
      attributeName="strokeDashoffset"
      values="50; 0"
      dur="1s"
      begin="1s"
      repeatCount="indefinite"
    />
  </polyline>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="#e91e63" />
      <stop offset="100%" stopColor="#9c27b0" />
    </linearGradient>
  </defs>
</svg>

      </div>
    );
  };
  
  export default Loader;
  