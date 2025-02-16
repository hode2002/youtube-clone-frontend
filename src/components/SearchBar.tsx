import SearchInput from '@/components/SearchInput';
import React from 'react';

const SearchBar = () => {
    return (
        <div className="hidden flex-1 items-center justify-center md:flex">
            <SearchInput />
        </div>
    );
};

export default SearchBar;
