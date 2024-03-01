import { useCallback, useEffect, useState } from 'react'

function App() {
  const[length,setLength]= useState(5);
  const[password,setpassword] = useState("");
  const[numberAllowed,setnumberAllowed] = useState(false);
  const[charAllowed,setcharAllowed] = useState(false);

  const passwordGenerator=useCallback(()=>{
    let pass="";
    let str=" ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed) str+="0123456789";
    if(charAllowed) str+="`~!@#$%^&*(){}";
    for (let i = 0; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setpassword(pass);
  },[length,numberAllowed,charAllowed,setpassword]);

  function myFunction() {

    var btn = document.getElementById("btn");

    if (btn.value == "Copy") {
        btn.value = "Copied!";
        btn.innerHTML = "Copied!";
    }
    else {
        btn.value = "Copy";
        btn.innerHTML = "Copy";
    }

}
  const copyPassToClipboard=()=>{
    window.navigator.clipboard.writeText(password);
    myFunction();
  }

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,setpassword]);
  
  return (
    <>
      <div> 
      <div className='w-full max-w-md mx-auto my-48 text-orange-500 bg-gray-700 rounded-xl'>
      <h1 className=' text-white text-3xl text-center mt-7 py-7'>Password Generator</h1>  
        <div className='flex justify-center shadow-rounded-lg overflow-hidden mb-4'>
          <input type='text' placeholder='Password' value={password} readOnly className='outline-none py-1 px-3 w-full' />
          <button id='btn' className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={copyPassToClipboard} value="Copy">
            Copy
         </button>
        </div>
        <div className='flex text-sm gap-x-2 px-3 py-3'>
          <div className='flex items-center gap-x-1'>
            <input 
            type='range' 
            value={length}
            min={6}
            max={50}
            onChange={(e)=>{setLength(e.target.value)}}
            className='cursor-pointer'
            />
            <label htmlFor="setlength">Length:{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={numberAllowed}
              onChange={()=>{
                setnumberAllowed((prev)=>!prev);
              }}
            />
            <label> Number </label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input 
              type='checkbox'
              defaultChecked={charAllowed}
              onChange={()=>{
                setcharAllowed((prev)=>!prev);
              }}
            />
            <label>Character</label>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default App;
