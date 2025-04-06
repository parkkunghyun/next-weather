import React from 'react'
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import SearchBar from './SearchBar';

type Props = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onSubmit: React.FormEventHandler<HTMLFormElement>;
    location?: string;
  }
  
  function Navbar({ value, onChange, onSubmit, location }: Props) {
    return (
      <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
          <div className='mx-auto h-[80px] w-full flex justify-between items-center max-w-7xl px-3'>
              <div className='flex items-center justify-center gap-2'>
                  <h2 className='text-gray-500 text-3xl'>Weather</h2>
                  <MdWbSunny className='text-3xl mt-1 text-yellow-300'/>
              </div>
  
              <section className='flex gap-2 items-center'>
                  <MdMyLocation className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'/>
                  <IoLocation className='text-3xl '/>
                  <p className='text-slate-900/80 text-sm'>{location}</p>
  
                  <div>
                      <SearchBar value={value} onChange={onChange} onSubmit={onSubmit}/>
                  </div>
              </section>
          </div>
      </nav>
    )
  }

  export default Navbar;