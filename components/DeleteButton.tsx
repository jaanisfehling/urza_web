export default function DeleteButton({onClick}: {onClick: () => void}) {
    return (
        <svg className="stroke-black dark:stroke-white h-8 w-8 bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover" onClick={onClick} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 6.5H20M10 6.5V4.5C10 3.94772 10.4477 3.5 11 3.5H14C14.5523 3.5 15 3.94772 15 4.5V6.5M12.5 9V17M15.5 9L15 17M9.5 9L10 17M18.5 6.5L17.571 18.5767C17.5309 19.0977 17.0965 19.5 16.574 19.5H8.42603C7.90349 19.5 7.46905 19.0977 7.42898 18.5767L6.5 6.5H18.5Z" stroke-width="1.5"/></svg>
    )
}