let bagItemsObj ;
const ConvenienceFee=99;
onLoad();

function onLoad()
{
  loadBagItemObj();
  displayBagItems();
  displayBagSummary();
  
}

function displayBagSummary()
{
  let summaryElement = document.querySelector('.bag-summary');
  let totalItem =bagItemsObj.length;
  let totalMrp =0;
  let totalDiscount =0;
  let totalAmount=0;
  
  

  bagItemsObj.forEach(bagItem => {
    totalMrp += bagItem.original_price;
    totalDiscount+=bagItem.original_price-bagItem.current_price;
    

     
  })
   
  if(bagItemsObj.length==0){totalAmount = 0}
  else {
   totalAmount = totalMrp-totalDiscount+ConvenienceFee;}

  summaryElement.innerHTML=`<div class="bag-details-container">
  <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
  <div class="price-item">
    <span class="price-item-tag">Total MRP</span>
    <span class="price-item-value">₹ ${totalMrp}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Discount on MRP</span>
    <span class="price-item-value priceDetail-base-discount">-₹ ${totalDiscount}</span>
  </div>
  <div class="price-item">
    <span class="price-item-tag">Convenience Fee</span>
    <span class="price-item-value">₹ 99</span>
  </div>
  <hr>
  <div class="price-footer">
    <span class="price-item-tag">Total Amount</span>
    <span class="price-item-value">₹ ${totalAmount}</span>
  </div>
</div>
<button class="btn-place-order">
  <div class="css-xjhrni">PLACE ORDER</div>
</button>
</div>`;
}

function displayCount()
{
  let count = document.querySelector('.bagItemCount');

  if(bagItems.length>0)
  {
    count.style.visibility ='visible';
    count.innerText = bagItems.length;
  }
  else 
  {
    count.style.visibility ='hidden';
  }
}

function loadBagItemObj()
{
  bagItemsObj=bagItems.map(function(itemId)
  {
    for(let i=0;i<items.length;i++)
    {
      if(itemId == items[i].id)
      {
        return items[i];
      }

    }
  });
  console.log(bagItemsObj)
}

function displayBagItems()
{
  let element = document.querySelector('.bag-items-container');
   
  let innerHTML='';

  bagItemsObj.forEach(bagItem => {

    innerHTML+=generateItemHTML(bagItem);
    
  });
   
  element.innerHTML = innerHTML;

}

function removeItem(itemsId)
{
  bagItems = bagItems.filter(bagid=>bagid!=itemsId);

  localStorage.setItem('bagItems',JSON.stringify(bagItems));
  loadBagItemObj();
  displayBagItems();
  displayCount();
  displayBagSummary()
  
   
}

function generateItemHTML(item)
{
     return  `<div class="bag-item-container">
     <div class="item-left-part">
       <img class="bag-item-img" src="../${item.image}">
     </div>
     <div class="item-right-part">
       <div class="company">${item.company}</div>
       <div class="item-name">${item.item_name}</div>
       <div class="price-container">
         <span class="current-price">Rs ${item.current_price}</span>
         <span class="original-price">Rs ${item.original_price}</span>
         <span class="discount-percentage">(${item.discount_percentage}% OFF)</span>
       </div>
       <div class="return-period">
         <span class="return-period-days">${item.return_period} days </span> return available
       </div>
       <div class="delivery-details">
         Delivery by 
         <span class="delivery-details-days">${item.delivery_date}</span>
       </div>
     </div>
   
     <div class="remove-from-cart" onclick="removeItem(${item.id})">X</div>
   </div>`;
}