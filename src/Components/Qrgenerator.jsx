import { useState } from 'react'
import '../Assets/QrGenerator.css'
const QrGenerator = () => {
const [img, setImg]=useState("")
const [loading, setLoading]=useState(false)
const [qrdata, setQrdata]=useState("")
const [qrSize,setQrsize]=useState("150")
    function QrGenerator(){   
      setLoading("true")
      try {
        const url=`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}x${qrSize}&data=${encodeURIComponent(qrdata)}`
        setImg(url)
      } catch (error) {
        console.log("ERROR while generating QR code : "+error)
      }
      setLoading(false)
    }
    function QrDownload(){
      fetch(img).then((response) =>response.blob()).then((blob)=>{
        const link = document.createElement("a");
        link.href=URL.createObjectURL(blob)
        link.download ="QR-code.png"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }).catch((error)=>{
        console.error("Error downloading QR code", error)
      })
    }
  return (
    <div className='container'>
    <h1>QR code Generator</h1>
    {img && <img src={img} className='qrimage'/>}
    {loading && <p>please wait...</p>}
      <div>
        <label htmlFor='dataInput' >Data for QR code : </label>
        <input type='text' id='dataInput' value={qrdata} placeholder='paste the URL' onChange={(e)=>setQrdata(e.target.value)}/>
        <label htmlFor='sizeInput'>Image size (eg., 150)</label>
        <input type='text' id='sizeInput'value={qrSize} placeholder='Enter image size' onChange={(e)=>setQrsize(e.target.value)}/>
        <button className='createbtn'disabled={loading} onClick={QrGenerator}>Generate QR code</button>
        <button className='downloadbtn' onClick={QrDownload} >Download QR code</button>
      </div>
      <p className='footer'>Designed by <a href='https://www.linkedin.com/in/syedusman5/'>Syed usman</a></p>
    </div>
  )
}

export default QrGenerator
