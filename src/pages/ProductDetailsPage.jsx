import { productImage } from '../image-settings/productImages.js';
import React, { useState, useRef } from 'react';
import { VariantFields, defaultVariant } from '../shared/variants.jsx';
import { PRODUCT_IMAGES } from '../image-settings/productImages.js';
import { products, addCart, toggleWish } from '../legacy/commerce.js';

const image = (id, width = 1600) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;
export default function ProductDetailsPage() {
  const id = Number(new URLSearchParams(window.location.search).get('id'));
  const product = products.find(p => p.id === id) || products[0];
  const gallery = [...new Set([productImage(product.id,0,image(product.img)), ...(PRODUCT_IMAGES[product.id]||[]).slice(1).filter(Boolean)])];
  const [selected,setSelected]=useState(0);
  const [variant,setVariant]=useState(defaultVariant(product));
  const touch=useRef(0);
  return <div className="page-content" data-editorial="WELSTENFORDE / PRODUCT ARCHIVE"><section className="container lc-detail">
    <div className="lc-gallery"><div className="lc-thumbs">{gallery.map((src, i) =>
      <button key={i} type="button" className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} aria-label={`View image ${i+1}`} aria-pressed={selected === i}><img src={src} alt={`${product.name} image ${i+1}`} /></button>
    )}</div><div className="lc-primary" onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-touch.current;if(Math.abs(d)>45)setSelected(i=>Math.max(0,Math.min(gallery.length-1,i+(d<0?1:-1))))}}><img id="lc-main-image" src={gallery[selected]} alt={`${product.name} image ${selected+1}`} title="Hover to zoom" /><button type="button" className="lc-main-wish" aria-label="Add to wishlist" onClick={e => toggleWish(product.id,e.currentTarget)}>{(()=>{try{return (JSON.parse(localStorage.getItem('lc-wish')||'[]')||[]).includes(product.id)?'♥':'♡'}catch{return '♡'}})()}</button></div></div>
    <div className="lc-detail-copy"><div className="eyebrow">{product.cat} / {product.tag}</div><h1>{product.name}</h1><p className="price">₹{product.price.toLocaleString('en-IN')}</p><p>Refined forms and considered details, designed to accompany your everyday.</p>
    <VariantFields product={product} value={variant} onChange={setVariant}/>
    {gallery.length===1&&<p>Additional product photographs are not yet available.</p>}
    <button type="button" className="btn" onClick={() => addCart(product.id,variant)}>Add to Bag</button><button type="button" className="btn outline" onClick={() => { addCart(product.id,variant); window.location.href='checkout.html'; }}>Buy Now</button><p>Complimentary shipping on qualifying orders.</p></div>
  </section></div>;
}
