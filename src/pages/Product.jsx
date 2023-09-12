import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Modal from '../components/Modal'
import Input from '../components/Input'
import Button from '../components/Button'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice'
import { modalFunc } from '../redux/modalSlice'
import { useLocation, useNavigate } from 'react-router-dom'



export const Product = () => {
    const {modal} = useSelector(state => state.modal);
    const {data, keyword} = useSelector(state => state.data);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const [productInfo, setProductInfo] = useState({name: '', price: '', url: ''});
    const onChangeFunc = (e, type) => {
      if (type == "url") {
        setProductInfo (prev => ({...prev, [e.target.name]: URL.createObjectURL(e.target.files[0])}));
      } else {
       setProductInfo (prev => ({...prev, [e.target.name]: e.target.value}));
      }
    };

    let loc = location?.search.split('=')[1];
    useEffect(() => {
     if(loc) {
       setProductInfo(data.find(dt => dt.id == loc));
     } else {
       setProductInfo({name: '', price: '', url: ''});
     }
    }, [loc]);
    console.log (data, "data");
    const buttonFunc = () => {
      dispatch(createDataFunc({...productInfo, id: data.length+1}));
      dispatch(modalFunc());
    }
    const buttonUpdateFunc = () => {
      dispatch(updateDataFunc({...productInfo, id: loc}));
      dispatch(modalFunc());
      navigate('/');
    }
    const contentModal = () => {
      return (
        <>
          <Input 
            value={productInfo.name}
            type={"text"} 
            placeholder={"Add Product"} 
            name={"Product Name"} 
            id={"name"} 
            onChange={e => onChangeFunc(e, 'name')} 
          />
          <Input 
            value={productInfo.price}
            type={'number'} 
            placeholder={"Add Price"} 
            name={"Price"} 
            id={"price"} 
            onChange={e => onChangeFunc(e, 'price')} 
          />
          <Input 
            type={"file"} 
            placeholder={"Select Image"} 
            name={"url"} 
            id={"url"} 
            onChange={e => onChangeFunc(e, 'url')} 
          />
          <Button btnText={loc? "Update Product" : 'Create Product'} onClick={loc ? buttonUpdateFunc : buttonFunc} />
        </>
      );
    };

    const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword));
    return (
    <div>
      <div className='flex flex-wrap items-center'>
        {
          filteredItems?.map((dt, i) => (
          <ProductCard key={i} dt={dt} />
          ))
        }

      </div>
      {modal && < Modal content={contentModal()}
      title={loc? "Update Product" : 'Create Product'} />}
    </div>
  )
}

export default Product;