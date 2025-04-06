import { cn } from '@/utils/cn';
import React from 'react'
import { FaSearch } from "react-icons/fa";

type Props = {
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
    onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
}

function SearchBar({className, value, onChange, onSubmit}: Props) {
  return (
    <form onSubmit={onSubmit}
        className={cn("flex relative items-center justify-center h-10", className)}>
        <input 
        value={value}
        onChange={onChange}
        className='px-4 py-2 w-[230px] border border-gray-300 
            rounded-l-md focus:outline-none focus:border-blue-500 h-full'
        type="text"  placeholder='위치를 입력해주세요.'/>
        <button type='submit' className='px-4 py-[9px] bg-blue-500  text-white rounded-r-md focus:outline-none hover:bg-blue-600 whitespace-nowrap h-full'>
            <FaSearch className=''/>
        </button>
    </form>
  )
}

export default SearchBar