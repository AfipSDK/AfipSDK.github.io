type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  logo: (props: IconProps) => (
    <svg width="387" height="387" viewBox="0 0 387 387" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
  <path d="M42.1945 84.4377C92.6126 65.4284 142.954 46.163 193.321 27C243.073 45.8043 292.85 64.583 342.5 83.6948C290.468 102.115 238.641 121.047 186.66 139.595C183.381 141.261 180.127 139.211 177.078 138.135C132.168 120.125 87.1045 102.473 42.1945 84.4377Z" fill="currentColor"/>
  <path d="M0 135.522C7.45512 122.226 14.6284 108.801 22.3141 95.6588C71.6818 115.923 121.459 135.138 170.93 155.095C163.398 167.571 157.275 180.842 149.589 193.216C99.9908 173.361 49.8801 154.736 0 135.522Z" fill="currentColor"/>
  <path d="M197.497 154.967C252.987 134.651 308.785 115.104 364.302 94.7878C371.987 108.263 379.366 121.918 387 135.445C333.585 155.787 280.323 176.435 226.958 196.828C217.044 182.943 207.616 168.698 197.497 154.967Z" fill="currentColor"/>
  <path d="M24.9016 166.418C65.2259 181.687 105.627 196.7 145.951 211.918C152.049 214.582 160.452 213.583 164.474 207.87C169.726 200.645 174.414 193.062 179.794 185.94C179.819 243.455 179.845 300.969 179.794 358.458C128.044 339.065 76.4982 319.184 24.9016 299.432C24.9016 255.086 24.876 210.765 24.9016 166.418Z" fill="currentColor"/>
  <path d="M220.4 217.144C262.825 200.825 305.07 183.993 347.239 167.033C347.495 211.021 347.214 255.009 347.393 298.996C295.976 319.389 244.174 338.86 192.706 359.099C192.731 299.125 192.629 239.125 192.757 179.151C202.134 191.704 209.768 205.615 220.4 217.144Z" fill="currentColor"/>
</svg>

  ),
  hamburger: (props: IconProps) => (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 20 20"
      aria-hidden="true"
      height="20px"
      width="20px"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
        clipRule="evenodd"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="0px"
      ></path>
    </svg>
  ),
  wrenchSrewdriver: (props: IconProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M11.42 15.17L17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 0 0 4.486-6.336l-3.276 3.277a3.004 3.004 0 0 1-2.25-2.25l3.276-3.276a4.5 4.5 0 0 0-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008z"
      />
    </svg>
  ),
};
