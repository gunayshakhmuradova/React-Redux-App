import React from 'react'
import {MdPostAdd} from 'react-icons/md'
import { useDispatch } from 'react-redux';
import { modalFunc } from '../redux/modalSlice'
import { sortingDataFunc } from '../redux/dataSlice'
import { searchDataFunc } from '../redux/dataSlice'


export const Header = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex items-center justify-between bg-indigo-600 text-white px-4 py-3">
      <div className="text-3xl">React App</div>
      <div className='flex items-center gap-5'>
        <div className='text-black'>
          <select onChange={(e) => dispatch(sortingDataFunc(e.target.value))} className='h-10 rounded-lg' name="" id="">
            <option value="asc">
              Asc
            </option>
            <option value="desc">
              Desc
            </option>
          </select>
        </div>
          <input onChange={(e) => dispatch(searchDataFunc(e.target.value))} className='h-10 rounded-lg px-4 text-black' type="text" placeholder='Search'/>
        <div onClick={() => dispatch(modalFunc())} className='bg-indigo-800 w-10 h-10 rounded-full flex items-center justify-center'>
          <MdPostAdd size={24}/>
        </div>
      </div>
    </div>
  )
}
