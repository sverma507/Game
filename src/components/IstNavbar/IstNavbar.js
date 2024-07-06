import React from 'react'
import Blink from 'react-blink-text'; 
import { useNavigate } from 'react-router-dom'
function IstNavbar() {
    const navigate= useNavigate()
    return (
        <div className=' border border-slate-400'>
            <div className='flex justify-between p-4 bg-stone-700'>
                <div onClick={()=>{navigate('/')}}  className='py-2 border border-slate-600 hover:cursor-pointer hover:bg-slate-100 w-44 bg-yellow-300 text-bold text-xs md:text-xl rounded-full text-center' >Home</div>
                <div onClick={()=>{navigate('/custommonthlychart')}} className='py-2 border border-slate-600 hover:cursor-pointer hover:bg-slate-100 w-44 bg-yellow-300 text-bold text-xs md:text-xl rounded-full text-center' >Chart</div>
                <div onClick={()=>{navigate('/contact')}}  className='py-2 border border-slate-600 hover:cursor-pointer hover:bg-slate-100 w-44 bg-yellow-300 text-bold text-xs md:text-xl rounded-full text-center' >Contact</div>
                <div onClick={()=>{navigate('/admin')}} className='py-2 border border-slate-600 hover:cursor-pointer hover:bg-slate-100 w-44 bg-yellow-300 text-bold text-xs md:text-xl rounded-full text-center' >Login</div>
            </div>
            <div className=" bg-stone-700 text-white p-4 h-20" >
                <marquee >
                    <p >सावधान। मार्केट में बहुत से लोग हमारी original A1satta वेबसाइट की कॉपी कर रहे है , ये original A1satta वेबसाइट है जिसपे सभी गेम के सुपरफास्ट रिजल्ट जिसमे delhi bazar satta king , sadar bazar satta , gali satta king satta ,a7satta king ,sadar bazar satta king result ,sadar bazar satta chart,sadar bazar satta king 2021 , satta king 7 ,dwarka satta king , db satta result , satta king dl and play bazaar , all play bazaar 786 games और gaziabad गेम रिजल्ट मिलता है और यहाँ पे satta king से related सारी गेम्स के रिजल्ट डाले जाते है ,Gwalior satta king , shree ganesh satta king , agra satta king और super delhi satta aur delhi bazar ka result aur dl satta की सारी हलचल और अपडेटेड satta chart २०२२ का sirf A1satta पर । इसलिए नकली साइट से सावधान। satta king और satta king matka की दुनिया में सबसे तेज़ और अपडेटेड वेबसाइट है delhi bazar satta chart 2022 aur disawar satta king 2022 और 2023 चार्ट के लिए chart section पे क्लिक करे</p>
                </marquee>
            </div>
            <div className='h-28 bg-yellow-300 font-bold  text-2xl flex justify-center items-center'>
            <Blink color='black' text='A1 SATTA' fontSize='20'> </Blink>
            </div>
            <div className='text-white bg-stone-700 h-20 border-b-2 border-slate-800 flex justify-center items-center'>
            SHRI GANESH SATTA KING | SATTA KING SHRI GANESH | SHRI GANESH RESULT YEARLY CHART 2023
            </div>
        </div>
    )
}

export default IstNavbar
