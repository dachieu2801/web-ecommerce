import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const NewProduct = () => {


  const navigate = useNavigate()
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState();
  const [short_desc, setShort_desc] = useState();
  const [long_desc, setLong_desc] = useState();
  const [file, setFile] = useState([]);
  const [err, setErr] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (name && price && category && short_desc && long_desc && file.length === 4) {
      setErr('')

      let formData = new FormData()
      file.forEach(a => {
        formData.append("files", a);
      });
      formData.append('name', name)
      formData.append('price', price)
      formData.append('category', category)
      formData.append('short_desc', short_desc)
      formData.append('long_desc', long_desc)

      const response = await axios(
        {
          method: "POST",
          url: 'https://nodejs-assign3.onrender.com/admin/create',
          data: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': localStorage.getItem('token_user')
          }
        })
      console.log(response);

      if (response.data.message === 'oke') {
        navigate('/products')
      } else {
        console.log(response);
      }
    } else {
      if (file.length !== 4) {
        setErr('Please choose 4 img ')
      } else {
        setErr('Please enter all fields')
      }
    }
  }
  console.log(file);

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
    file.forEach(val => { value.push(val.name) })
    return value
  }

  return (

    <div className='card-body'>
      <h3 className='card-title'>Create Product</h3>

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
        {err && <span style={{ color: 'orange', marginLeft: 25 }}>{err}</span>}
      </form >
    </div >
  );
};

export default NewProduct;