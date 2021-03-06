import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from '../helpers/axiosWithAuth';
import AddColor from "./AddColor";
import EditMenu from './EditMenu';

const initialColor = {
  color: "",
  code: { hex: "" },
  id: 0
};

const ColorList = ({ colors, updateColors }) => {
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    axiosWithAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(res=>{
      const newColors = colors.filter(color=>{
        if(color.id !== res.data.id){
          return color
        }
      })
      newColors.push(res.data)
      updateColors(newColors)
    })
    .catch(drama=>{
      console.log(drama)
    })
  }

  const deleteColor = color => {
    console.log(color)
    axiosWithAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
    .then(res=>{
      const newColors = colors.filter(color=>{
        if(color.id !== parseInt(res.data)){
          return color
        }
      })
      updateColors(newColors)
    })
    .catch(drama=>{
      console.log(drama)
    })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      <button onClick={(e)=>{
        e.preventDefault();
        setAdding(!adding);
      }}>Add another color</button>
      { editing && <EditMenu colorToEdit={colorToEdit} saveEdit={saveEdit} setColorToEdit={setColorToEdit} setEditing={setEditing}/> }
      { adding && <AddColor addColor={updateColors}/>}
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.