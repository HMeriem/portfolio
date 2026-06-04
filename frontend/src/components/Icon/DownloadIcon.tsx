interface Props {
  size?: number;
}

export default function DownloadIcon({ size = 16 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 2v8" />
      <path d="M5 7l3 3 3-3" />
      <path d="M2 13h12" />
    </svg>
  );
}
