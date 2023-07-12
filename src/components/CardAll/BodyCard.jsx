import React from 'react'

const BodyCard = (props) => {
  return (
    <div className='flex justify-end items-start w-[260px] max-sm:w-[200px] '>
      <div className=''>{props.value === "-1" ?"لايوجد بيانات" :props.value ? props.value :"لايوجد بيانات"  }</div>
      <div className='text-Brown font-semibold  '><pre className='w-fit'>{props.name}</pre></div>
    </div>
  )
}

export default BodyCard