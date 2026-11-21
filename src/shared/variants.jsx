import React from 'react';
// Replace with verified SKU options before launch. Existing catalogue has no variant data.
export const defaultVariant=p=>({size:p.cat==='Clothing'?'S':'Not specified',colour:'As pictured'});
export function VariantFields({product,value,onChange}){return <div className="wf-variant-fields"><label>Colour<select value={value.colour} onChange={e=>onChange({...value,colour:e.target.value})}><option>As pictured</option></select></label><label>Size<select value={value.size} onChange={e=>onChange({...value,size:e.target.value})}>{(product.cat==='Clothing'?['S','M','L','XL']:['Not specified']).map(s=><option key={s}>{s}</option>)}</select></label></div>}
