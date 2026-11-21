import React from 'react';
import { handleLegacyClick, handleLegacySubmit } from '../shared/actions.js';

export default function CheckoutPage() {
  const items=JSON.parse(localStorage.getItem("lc-cart")||"[]");
  const total=items.reduce((n,p)=>n+p.price*p.qty,0);
  return (
    <div className="page-content" onClick={handleLegacyClick} onSubmit={handleLegacySubmit}>
<section className={"page-hero"}><div className={"eyebrow"}>A considered experience</div><h1 className={"page-title"}>Checkout</h1></section><section className={"container checkout-layout"}><div><div className={"checkout-section"}><h2>01 / Contact</h2><input className={"field"} type={"email"} placeholder={"Email address"} required={""} /></div><div className={"checkout-section"}><h2>02 / Delivery address</h2><div className={"form-grid"}><input className={"field"} placeholder={"First name"} /><input className={"field"} placeholder={"Last name"} /><input className={"field full"} placeholder={"Address"} /><input className={"field"} placeholder={"City"} /><input className={"field"} placeholder={"Postal code"} /><input className={"field"} placeholder={"State"} /><input className={"field"} placeholder={"Phone number"} /></div></div><div className={"checkout-section"}><h2>03 / Payment</h2><label><input type={"radio"} name={"pay"} defaultChecked /> Credit / Debit card</label><br /><label><input type={"radio"} name={"pay"} /> UPI</label><br /><label><input type={"radio"} name={"pay"} /> Cash on delivery</label></div><button className={"btn"} data-legacy-onclick={"if(!cart.length){toast('Your bag is empty');return}cart=[];set('lc-cart',cart);updateCount();toast('Demo order placed successfully');setTimeout(()=>location.href='my-account.html',800)"}>Place demo order →</button></div><aside className={"summary"}><h2 className={"serif"}>Your order</h2><div className="checkout-products">{items.map(p=><div key={p.lineKey||p.id} className="row"><span>{p.name} · {p.size||"Not specified"} · {p.colour||"As pictured"}<br/>{p.qty} × ₹{p.price}</span></div>)}</div><div className={"summary-line"}><span>Subtotal</span><b>₹{total.toLocaleString("en-IN")}</b></div><div className={"summary-line"}><span>Shipping</span><span>Complimentary</span></div><div className={"summary-line"}><b>Total</b><b>₹{total.toLocaleString("en-IN")}</b></div></aside></section>
    </div>
  );
}
