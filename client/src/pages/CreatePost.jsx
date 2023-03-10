import React,{ useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {preview} from '../assets'
import {getRandomPropt} from '../utils'
import { FormField, Loader } from '../Components'
import { toast } from 'react-toastify';
const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({name:'', prompt:'', photo:''})
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  console.log(form)


  const handleSubmit = async(e)=>{
      e.preventDefault()
      if(form.prompt && form.photo){
        setLoading(true)
        try{
        const url = 'https://concerned-skirt-yak.cyclic.app/api/v1/post'
          const response = await fetch(url,{method:"POST",
                                      headers:{'Content-Type':'application/json'},
                                      body:JSON.stringify(form)
        })
        await response.json()
        navigate('/')
        }catch(error){
          toast.info(error)
        }finally{
          setLoading(false)
        }
      }else{
        toast.info("Please enter a propmt and generate the image")
      }
  }

  const handleChange =(e)=>{
      setForm({...form,[e.target.name]:e.target.value})
  }

  const handleSurprizeMe =(e)=>{
      const randomPrompt = getRandomPropt(form.prompt)
      setForm({...form,["prompt"]:randomPrompt})
  }
  const generateImg = async()=>{
    if(form.prompt && form.name){
      try{
        const url = 'https://concerned-skirt-yak.cyclic.app/api/v1/dalle'
        setGeneratingImg(true)
        const response = await fetch(url,{method:"POST",
                                          headers:{'Content-Type':'application/json'},
                                          body:JSON.stringify({prompt:form.prompt})
                                        })
        const data =await response.json()
        console.log(response,'aaaaa')
        setForm({...form,['photo']:`data:image/jpeg;base64,${data.photo}`})
      }catch(err){
        toast.info(err)
      }finally{
        setGeneratingImg(false)
      }
    }else{
      toast.info('Please add a prompt and your name')
    }
  }
  
  return (
    <section className='max-w-7xl mx-auto'>
        <div>
          <h1 className='font-extrabold text[#222328] text-[32px]'>Create</h1>
          <p className='mt-2 text-[#666e75] text-[16px] max-w[500px]'>Create imaginative and visually stunning images through DALL-E AI and share with community</p>
        </div>

        <form className='mt-16 max-w-3xl' onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
            <FormField 
              labelName="Your Name"
              type="text"
              name="name"
              placeholder="Jhon Doe"
              value={form.name}
              handleChange={handleChange}
              />
               <FormField 
              labelName="Propmt"
              type="text"
              name="prompt"
              placeholder='A Samurai riding a Horse on Mars, lomography.'
              value={form.prompt}
              handleChange={handleChange}
              isSurprizeMe
              handleSurprizeMe={handleSurprizeMe}
              />
              <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff]-500 focus:border-[#4649ff]-500 w-64 p-3 h-64 flex justify-center items-center ">
                {form.photo? 
                (
                  <img src={form.photo} alt={form.prompt} className="w-full h-full object-contain"/>
                )
                :
                (
                  <img src={preview} alt="preview" className="w-9/12 h-9/12 object-contain opacity-40"/>
                )}

                {
                  generatingImg && (
                    <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                      <Loader/>
                    </div>
                  )
                }
              </div>
          </div>
          <div className='mt-5 flex gap-5'>
            <button type="button" onClick={generateImg} className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center' >{generatingImg ?"Generating..." : "Generate"}</button>
          </div>
          <div>
            <p className='mt-2 text-[#666e75] text-[14px]'>
              Once you have created the image you wanted, you can share it with others in commuinity.
            </p>
            <button type='submit' className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'>{loading? "sharing...":" Share with the community"}</button>
          </div>
        </form>
    </section>
  )
}

export default CreatePost