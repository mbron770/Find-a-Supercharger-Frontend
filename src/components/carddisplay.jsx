import React from "react";
import CardGroup from "react-bootstrap/CardGroup";
//import Card from "react-bootstrap/Card";
import Individualcard from './individualcard'

export default function Carddisplay({stations}) {
  
  console.log(stations);

  return (
    <>
      <br></br>
      <CardGroup
        style={{
          height: "25vh",
          marginLeft: "100px",
          marginRight: "100px",
        }}
      > 
        <Individualcard stations = {stations}/>

      </CardGroup>
    </>
  );
}
