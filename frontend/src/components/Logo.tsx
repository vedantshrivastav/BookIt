const Logo = () => {
  return (
    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="relative h-10 w-10 bg-foreground rounded-md flex items-center justify-center">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C9.87827 2 7.84344 2.84285 6.34315 4.34315C4.84285 5.84344 4 7.87827 4 10C4 14.5 10 22 12 22C14 22 20 14.5 20 10C20 7.87827 19.1571 5.84344 17.6569 4.34315C16.1566 2.84285 14.1217 2 12 2Z"
            fill="white"
          />
          <circle cx="12" cy="10" r="3" fill="currentColor" className="text-foreground" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight">highway</span>
        <span className="font-bold text-lg leading-tight">delite</span>
      </div>
    </div>
  );
};

export default Logo;
