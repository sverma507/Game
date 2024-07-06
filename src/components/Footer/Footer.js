import React from 'react'
import Blink from 'react-blink-text'; 
function Footer() {
  const t=<div className=' border border-slate-600 fixed bottom-10  left-5  rounded-full  shadow-lg shadow-slate-700   z-10'>
  <a target='_blank' href="https://wa.me/+918571086458" id="body_contactwa"><strong>
  <img className='rounded-full h-12' loading="lazy"  src={require("./images.png") }alt="Whatsapp to show game on this website"/></strong></a>
  </div>
  return (
   
      <div class="text-xs mt-4 relative">
          <Blink color='blue' text={t} fontSize='20'></Blink>
            <p>
                !! DISCLAIMER:- a1satta.co is a non-commercial website. Viewing This Website Is Your Own Risk, All The
			Information Shown On Website Is Sponsored And We Warn You That Matka Gambling/Satta May Be Banned Or Illegal
			In Your Country..., We Are Not Responsible For Any Issues Or Scam..., We Respect All Country Rules/Laws...
			If You Not Agree With Our Site Disclaimer... Please Quit Our Site Right Now. Thank You.
            </p>
            <div class="">
                <div class="bg-yellow-200 text-sm p-2 text-center"><strong>2018-2023 ©️ a1satta.co. All rights reserved </strong></div>
                </div>
        </div>
    
  )
}

export default Footer
