import React from "react";
import { FaRegCircleUser } from "react-icons/fa6";

const NavSm = () => {
    return (
        <>
        <div className="items-center justify-between flex w-full md:hidden">
        <div className="w-28">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                 alt="logo" className="w-full h-full" />
            </div>
            <div className="flex items-center gap-3">
                
                <button className=" text-white bg-zomato-400 px-3 py-1 rounded-full">Use App</button>
                <span className="border p-2 border-grey-300 rounded-full text-zomato-400">
                <FaRegCircleUser  />
                </span>
            </div>
            </div>
        </>
    );

}

const NavMd = () => {
    return (
        <div className="w-full items-center gap-3 hidden md:flex">
            <div className="w-28">
                <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                 alt="logo" className="w-full h-full" />
            </div>
            <div className="w-full flex items-center gap-3 bg-white shadow-md p-3 border border-gray-200 rounded">
                <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="w-full focus:outline-none" />
            </div>
        </div>
    );
}

const NavLg = () => {
    return (
        <div className="container mx-auto px-20">
            <div className="flex w-full items-center gap-3">
                <div className="w-28">
                    <img src="https://b.zmtcdn.com/web_assets/b40b97e677bc7b2ca77c58c61db266fe1603954218.png"
                     alt="logo" className="w-full h-full" />
                </div>
                <div className="w-full flex items-center gap-3 bg-white shadow-md p-3 border border-gray-200 rounded">
                    <input type="text" placeholder="Search for restaurant, cuisine or a dish" className="w-full focus:outline-none" />
                </div>
                <div className="flex items-center gap-3">
                    <button className="text-gray-500 text-xl hover:text-gray-800">Log in</button>
                    <button className="text-gray-500 text-xl hover:text-gray-800">Sign up</button>

                </div>
            </div>
        </div>
    );
}

const Navbar = () => {
    const [width, setWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
        <nav className="p-4 flex bg-white shadow-md items-center ">
            {width <= 768 ? <NavSm /> : width <= 1024 ? <NavMd /> : <NavLg />}
        </nav>
        </>
    );
}

export default Navbar;