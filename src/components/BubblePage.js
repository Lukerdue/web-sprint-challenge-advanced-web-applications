import React, { useEffect, useState } from "react";
import {axiosWithAuth} from '../helpers/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(()=>{
    axiosWithAuth().get(`http://localhost:5000/api/colors`)
    .then(res=>{
      setColorList(res.data)
    })
    .catch(drama=>{
      console.log("There was an error with your request")
      console.log(drama)
    })
  },[])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
