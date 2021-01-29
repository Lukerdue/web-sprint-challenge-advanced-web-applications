import React, { useState } from "react";
import { axiosWithAuth } from '../helpers/axiosWithAuth'

function AddColor({addColor}){
    const [color, setColor] = useState({
        color: "",
        code: {hex: ""},
        id: 0
    })

    function submit(e){
        e.preventDefault();
        axiosWithAuth().post("http://localhost:5000/api/colors", color)
        .then(res=>{
            addColor(res.data)
        })
        .catch(res=>{
            console.log("there was a problem with your request")
        })
    }
    return (
        <form onSubmit={submit}>
            <label>Color
                <input type="text" name="color" onChange={(e)=>{
                    setColor({...color, color: e.target.value})
                }}
                value={color.color}/>
            </label>
            <label>Code
                <input type="text" name="hex" onChange={(e)=>{
                    setColor({...color, code: {hex: e.target.value}})
                }}
                value={color.code.hex}/>
            </label>
            <button>Add</button>
        </form>
    )
}
export default AddColor