import React, { useEffect, useState } from 'react';
import ProductAPI from '../API/ProductAPI';
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';


const UpDateProduct = () => {


  const navigate = useNavigate()
  const { id } = useParams();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [short_desc, setShort_desc] = useState();
  const [long_desc, setLong_desc] = useState();
  const [file, setFile] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await ProductAPI.getDetail(id);
      if (response.message) {
        console.log(response.message);
      } else {
        setName(response.product.name);
        setPrice(response.product.price);
        setCategory(response.product.category);
        setShort_desc(response.product.short_desc);
        setLong_desc(response.product.long_desc);
      }
    };
    fetchData();
  }, []);

  //upload img len firebase and send form
  const handleSubmit = async (e) => {
    e.preventDefault()

    let formData = new FormData()
    file.forEach(a => {
      formData.append("files", a);
    });
    formData.append('id', id)
    formData.append('name', name)
    formData.append('price', price)
    formData.append('category', category)
    formData.append('short_desc', short_desc)
    formData.append('long_desc', long_desc)
    const response = await axios(
      {
        method: "PUT",
        // url: 'https://nodejs-assign3.onrender.com/admin/edit',
        url: 'http://localhost:5000/admin/edit',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('token_user')
        }

      })
    console.log(response.data);
    if (response.data.message === 'oke') {
      navigate('/products')
    } else {
      console.log(response);
    }
  }

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(prev => {
        const file = [...prev, e.target.files[0]]
        if (file.length > 4) {
          file.splice(0, 1)
        }
        return file
      })
    }
  }
  const valueFile = () => {
    let value = []
    file.forEach(file => { value.push(file.name) })
    return value
  }

  return (
    <div className='card-body'>
      <h3 className='card-title'>Edit Product</h3>

      <form style={{ width: '50%', marginLeft: '40px' }}>
        <div className='form-group'>
          <label>Product Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
            type='text'
            name='name'
            className='form-control'
            placeholder='Enter Product Name'
          />
        </div>
        <div className='form-group'>
          <label> Price</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            name='price '
            type='number'
            className='form-control'
            placeholder='Enter Price'
          />
        </div>
        <div className='form-group'>
          <label>Category</label>
          <input
            value={category}
            onChange={(e) => setCategory(e.target.value.trim())}
            name='category'
            type='text'
            className='form-control'
            placeholder='Enter Category'
          />
        </div>
        <div class='form-group'>
          <label>Short Description</label>
          <textarea
            value={short_desc}
            onChange={(e) => setShort_desc(e.target.value.trim())}
            name='short_desc'
            class='form-control'
            rows='3'
            placeholder='Enter Short Description'></textarea>
        </div>
        <div class='form-group'>
          <label>Long Description</label>
          <textarea
            value={long_desc}
            onChange={(e) => setLong_desc(e.target.value.trim())}
            name='long_desc'
            class='form-control'
            rows='6'
            placeholder='Enter Long Description'></textarea>
        </div>
        <div class='form-group'>
          <label for='exampleFormControlFile1'>
            Upload image (4 images)
          </label>
          <input
            onChange={(e) => handleFileChange(e)}
            name='file'
            type='file'
            class='form-control-file'
            id='exampleFormControlFile1'
            multiple
          />
          {valueFile() && <p>{valueFile().join(', ')}</p>}
        </div>
        <button onClick={handleSubmit} className='btn btn-primary'>
          Submit
        </button>
      </form >
    </div >
  );
};

export default UpDateProduct;