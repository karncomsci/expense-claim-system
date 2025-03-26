import Image from 'next/image'
import logo from '@/app/assets/images/nityo-infotech.png'


export default function Header() {
    return (
        <header>
            <nav className="bg-blue-300 border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
                <div className="flex flex-wrap justify-center items-center mx-auto max-w-screen-xl">
                <a href="#" className="flex items-center">
                    <span className="self-center text-xl  font-sans whitespace-nowrap dark:text-white">Expense Claim System</span>
                </a>
                </div>
            </nav>
        </header>
    )

    //<img src="img" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
}