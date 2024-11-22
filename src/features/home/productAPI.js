export function fetchAllProducts() {
  return  new Promise(async (resolve) =>{
    //todo we will not hard code server url
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    resolve({data})
  }
    
  );
}
export function fetchProductById(id){
  return new Promise(async (resolve) =>{
    const response = await fetch('https://fakestoreapi.com/products/'+id) 
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchProductByCategories(categories) {
  return new Promise(async (resolve) =>{
    const response = await fetch('https://fakestoreapi.com/products/category/'+categories)
    const data = await response.json()
    resolve({data})
  }
  );
}
export function fetchTypesOfCategories() {
  // console.log(id);
  return new Promise(async (resolve) =>{
    const response = await fetch('https://fakestoreapi.com/products/categories') 
    // console.log(id);
    const data = await response.json()
    resolve({data})
  }
  );
}
