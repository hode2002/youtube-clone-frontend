import { ModeToggle } from '@/components/ModeToggle';
import React from 'react';

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">YouTube Clone</h1>
            <input
                type="text"
                placeholder="Search"
                className="p-2 rounded bg-gray-700 text-white"
            />
            <ModeToggle />
        </header>
    );
};

export default Header;
