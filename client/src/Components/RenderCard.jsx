import React from 'react'
import Card from './Card'

const RenderCard =({data, title}) =>{
    if(data.length>0){
        return data.map((post)=>{
            return <Card key={post._id} {...post}/>
        })
    }

    return(
        <h2 className='mt-5 font-bold text-[#6469ff] tet-xl uppercase'>
            {title}
        </h2>
    )
}
export default RenderCard