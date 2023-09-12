import React, { useState } from 'react';
import {BsThreeDots} from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { deleteDataFunc, updateDataFunc} from '../redux/dataSlice';
import { modalFunc } from '../redux/modalSlice';
import { useNavigate } from 'react-router-dom';



const ProductCard = ({dt}) => {
  const [openEdit, setOpenEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate(`/?update=${dt?.id}`);

  const updateFunc = () => {
    dispatch(modalFunc());
    setOpenEdit(false);
    // dispatch(updateDataFunc(dt));
  }
  return (
    <div className='w-[200px] h-[200px] relative m-2 rounded-md'>
      <img className='w-full h-full rounded-md' src={dt?.url} alt={dt?.name} />
      <div className='absolute left-0 bottom-0 bg-indigo-600 text-white w-full px-2'>
        <div className='text-lg font-semibold'>{dt?.name}</div>
        <div>{dt?.price}$</div>
      </div>
      <div onClick={() => setOpenEdit(!openEdit)} className='absolute right-2 top-0 '>
        <BsThreeDots color='white' size={24}/>
      </div>
      {
        openEdit && (
           <div className='bg-black border border-white text-white absolute right-2 top-5 p-2 text-sm'>
            <div onClick={() => dispatch(deleteDataFunc(dt?.id))} className='cursor-pointer '>Delete</div>
            <div onClick={() => dispatch(updateFunc())} className='cursor-pointer '>Update</div>
          </div>
        )
      }
    </div>
  );
}

export default ProductCard