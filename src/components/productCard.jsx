



export const ProductCard = ({productsDataObj}) => {

    
    const volumes = Array.isArray(productsDataObj.volume)
    ? productsDataObj.volume
    : [productsDataObj.volume];
    const prices = Array.isArray(productsDataObj.price) ? productsDataObj.price : [productsDataObj.price];

  return(
   <li className="li_products_card">
            <div className='product_card'>
                <img className='img' src={productsDataObj.img} height={'150'} width={'150'} alt="" />
               
                    <h3>{productsDataObj.name}</h3>
                   
            <div className="product_props">

              <ul className="ul_product_props">{volumes.map((volume, index) => ( <li key= {index}>{volume}</li>))}
               </ul>
               <p>{productsDataObj.ingredients}</p>
               <ul>{prices.map((price, index) => ( <li key= {index}>{price}</li>))}
               </ul>
            </div>
          

                    </div>
                  

              

            </li>
  )
}