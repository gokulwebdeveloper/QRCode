import React, { useState } from 'react';
import { connect } from 'react-redux';
import QRCode from '../images/qrcode.png';
import { addToCart } from './actions/cartActions'
import '../index.css';

import {
  EmailShareButton,
  WhatsappShareButton,
  EmailIcon,
  WhatsappIcon
  } from "react-share";

function ProductDesc(props) { 
  let result;
    const [count, setCount] = useState('none');
   let productId = props.match.params.id;
   let propsState = props.items;
   const handleClick = (id) => {
        props.addToCart(id);
        alert("Add to cart successfully");
    }

     const generateQrCode = (productInfo) => {
       let user = {
        "data": {
        "productname": productInfo.name,
        "price": productInfo.price,
        "desc": productInfo.desc
        }
        
        };
      

       





      let response =  fetch('https://cors-anywhere.herokuapp.com/https://qrgenerator-271009.appspot.com/qrcode' , {
        crossDomain:true,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'mode': 'no-cors', 
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',        
        },
        body: JSON.stringify(user)
      })
      .then(response => response.json())
      .then(data => console.log(data));  
      
      setCount('block');
    }

    const subject="mailto:?subject=AutoZone - "+propsState[productId].title+"&body=%3Cp%3EPlease checkout this%3C%2Fp%3E%3Cimg%20src%3D%22data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4%2F%2F8%2Fw38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg%3D%3D%22%20alt%3D%22Red%20dot%22%20%2F%3E";
      return(
        <div className="container">
           <h3 align="center">{propsState[productId].title}</h3>
           <img src={propsState[productId].img} alt={propsState[productId].title} align="center"   className="center" />
           <p title={`Item Description of ${propsState[productId].title}`}>{propsState[productId].desc}</p>
            <p><b title="price">Price: <span title={`Price ${propsState[productId].price}$`}>{propsState[productId].price}$</span></b></p>
           <div style={{display:`${count}`}}>
           <img src={result} align="center" />
    
           <p>Share via : 
           <WhatsappShareButton url={QRCode}> <WhatsappIcon size={32} round={true} /></WhatsappShareButton>
     
            <a href={`${subject}`}>  <EmailIcon size={32} round={true} /></a>

 </p>
<div class="sharethis-inline-share-buttons"></div>
           </div>
           <button className="btn waves-effect waves-light productDesc marginleft"  onClick={() => { handleClick(propsState[productId].id) }}>Add To Cart</button>
            <button className="btn waves-effect waves-light productDesc"  onClick={() => { generateQrCode(propsState[productId]) }}>Generate QR Code</button>
            <br />
       </div>
      )

}
const mapStateToProps = (state) => {
    return {
        items: state.items
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        addToCart: (id) => { dispatch(addToCart(id)) }
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProductDesc);






