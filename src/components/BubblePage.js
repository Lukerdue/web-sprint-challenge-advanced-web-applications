import React, { useEffect, useState } from "react";
import {fetchColors} from '../helpers/fetchColors'

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(()=>{
    fetchColors().then(res=>{
      console.log(res)
      setColorList(res)
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
