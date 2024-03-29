export default function RefreshButton({onClick}: {onClick: () => void}) {
    return (
        <svg className="stroke-black dark:stroke-white h-8 w-8 bg-white dark:bg-std-blue border rounded-sm border-std-blue dark:border-transparent hover:bg-sky-100 dark:hover:bg-std-blue-hover" onClick={onClick} viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 4.5H12.5C8.08172 4.5 4.5 8.08172 4.5 12.5C4.5 15.6631 6.33576 18.3975 9 19.6958M11.5 20.5H12.5C16.9183 20.5 20.5 16.9183 20.5 12.5C20.5 9.33688 18.6642 6.60253 16 5.30423" strokeWidth="1.5"/><path d="M14 17.5619L11.5 20.5L14.5 23.0619M11 7.43811L13.5 4.50001L10.5 1.93811" strokeWidth="1.5"/></svg>
    )
}