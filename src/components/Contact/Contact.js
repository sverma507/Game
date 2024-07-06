import React from 'react'

function Contact() {
  return (
    <div className=' flex justify-center items-center m-2'>
      <div class=" w-2/4 border-dashed rounded-3xl bg-yellow-300 border-4 p-2 text-xl border-blue-600 text-center">
                <p><strong>🙏🏿नमस्कार साथियो 🙏🏿</strong></p>
                <p><strong>अपनी गेम का रिजल्ट हमारी web साइट पर लगवाने के लिए संपर्क करें।&nbsp; &nbsp;</strong></p>
                <p><strong>----DevaBhai----</strong></p>
                <div className=' h-20 flex justify-center items-center'>

                    <a target='_blank' href="https://wa.me/+918571086458" id="body_contactwa"><strong>
                        <img className='rounded-full h-16' loading="lazy"  src={require("./images.png") }alt="Whatsapp to show game on this website"/></strong></a>
                </div>
                
                <p className='text-sm'>NOTE: &nbsp; इस नंबर पर लीक गेम नही मिलता गेम लेने वाले भाई कॉल या मैसेज न करें।</p>
            </div>
    </div>
  )
}

export default Contact
