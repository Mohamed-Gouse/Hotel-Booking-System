import React from 'react'

function InputField({type, name, value, setValue }) {
  return (
    <input type={type}  name={name} className='form-control' value={value} onChange={setValue} />
  )
}

export default InputField