function Svg({ d, className, strokeWidth = 2 }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={d} />
    </svg>
  );
}

export const FootballIcon = ({ className, strokeWidth = 1.75 }) => <Svg className={className} strokeWidth={strokeWidth} d="M15 9l-6 6M10 12l2 2M12 10l2 2M8 21a5 5 0 0 0 -5 -5M16 3c-7.18 0 -13 5.82 -13 13a5 5 0 0 0 5 5c7.18 0 13 -5.82 13 -13a5 5 0 0 0 -5 -5M16 3a5 5 0 0 0 5 5" />;
export const ArrowUpRightIcon = () => <Svg className="icon" d="M17 7l-10 10M8 7l9 0l0 9" />;
export const ArrowRightIcon = () => <Svg className="icon" d="M5 12l14 0M13 18l6 -6M13 6l6 6" />;
export const ArrowLeftIcon = () => <Svg className="icon" d="M5 12l14 0M5 12l6 6M5 12l6 -6" />;
export const ArrowUpIcon = () => <Svg className="icon" d="M12 5l0 14M18 11l-6 -6M6 11l6 -6" />;
export const MapPinIcon = () => <Svg strokeWidth={1.75} d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0" />;
export const InfoIcon = () => <Svg strokeWidth={1.75} d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0M12 9h.01M11 12h1v4h1" />;
export const TvIcon = () => <Svg strokeWidth={1.75} d="M3 9a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2l0 -9M16 3l-4 4l-4 -4" />;
