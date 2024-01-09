// ! Dont change this code
const {
  fetchProductsData,
  setProductsCards,
  convertToRupiah,
  countDiscount,
} = require("../src/index.js");
const cartData = require("../src/data/cart.js");
const importedData = require("../src/data/product.js");
const importedCart = require("../src/data/cart.js");
const { fetchCartsData } = require("../src/dataService.js");
const {carts, total} = require("../src/data/cart.js");


//Product API Testing 
describe("Product API Testing", () => {

  //test case 1
  //mengembalikan data dari file product.js
  it('should return product data with id 1', () => {
      const product = importedData.products.find(product => product.id === 1);
  
      if (product === undefined) {
        expect(true).toBe(false);
      } else {
        expect(product.id).toBe(1);
      }
    });
  
  //test case 2
  //mengecek panjang limit produk
  it('should check products.length with limit', () => {
    const limit = 30;
    expect(importedData.products.length).toBeLessThanOrEqual(limit);
  });
 
  //test case 3 
  // mengembalikan data dari file cart.js dengan id 1
  it('should return carts data with id 1', () => {
    const cart = importedCart.carts.find(cart => cart.id === 1);

    if(cart === undefined){
        expect(true).toBe(false);
    }else{
        expect(cart.id).toBe(1);
    }
  });
});

//Carts API Testing
describe("Cart API Testing", () => {

  //test case 1
  it('should fetch data from file succesfully ', async () => {
      const mockedData = {
          carts: [
              {
                id: 1,
                products: [
                  {
                    id: 59,
                    title: "Spring and summershoes",
                    price: 20,
                    quantity: 3,
                    total: 60,
                    discountPercentage: 8.71,
                    discountedPrice: 55,
                    thumbnail: "https://i.dummyjson.com/data/products/59/thumbnail.jpg",
                  }
              ]
          }
          ]
      };
      //statment to return mock data
      jest.mock('../src/data/cart.js', () => ({
          __esModule: true,
          fetchCartsData: jest.fn(() => Promise.resolve(mockedData)),
      }));

      const { fetchCartsData } = require('../src/data/cart');
      const result = await fetchCartsData();
      expect(result).toEqual(mockedData);

  });

  //test case 2
  //
  test('length of carts array should be equal to total', () => {
    const cartLength = carts.length;
    expect(cartLength).toBe(total);
  })

  
});

//Convert To Rupiah
describe('Conver to rupiah', () => {
  //test case 1
  it('should convert price to Rupiah format', () => {
    const price = 1; // Replace with your test value
    const result = convertToRupiah(price);
    expect(result).toBe('Rp15436');
  });

  //test case 2
  it('should handle 0 prize', () => {
    const price = 0;
    const result = convertToRupiah(price);
    expect(result).toBe('Rp0');
  })

  //test case 3
  it('should handel negative price', () => {
    const price = -500;
    const result = convertToRupiah(price);
    expect(result).toBe('-Rp7718000');
  })
});

//Test Count Discount
describe('Test CountDiscount', ()=> {
  //test case 1
  //mengecek apakah menghitung discound dengan benar atau tidak
  it('should calculate discount correctly', () => {
    const price = 100;
    const discount = 20;
    const result = countDiscount(price, discount);
    const expected = 80; // Harga setelah diskon 20% dari 100
    expect(result).toBe(expected);
  });

  //test case 2
  //menghandel diskon 0%
  it('should handle zero discount', ()=>{
    const price = 40;
    const discount = 0;
    const result = countDiscount(price, discount);
    const expected = 40;
    expect(result).toBe(expected);
  });

  //test case 3
  //menghandel diskon yang tidak valid
  it('should handle invalid discount', () => {
    const price = 100;
    const discount = -10;
    const result = countDiscount(price, discount);
    const expected = 110;
    expect(result).toBe(expected);
  })
})

//Set Product Cards
describe('Test Set Product Cart', () => {
  
  //testcase 1
  it('should return array of object with correct key', () => {
    const products =[
      {
        id : 59,
        title : "Spring and summershoes",
        price : 20,
        discountPercentage : 8.71,
        thumbnail : "https://i.dummyjson.com/data/products/59/thumbnail.jpg",
      },
    ];
    const result = setProductsCards(products);
    expect(result).toBeInstanceOf(Array);

    result.forEach((productCard) => {
      console.log(productCard);
      expect(productCard).toHaveProperty('price');
      expect(productCard).toHaveProperty('after_discount');
      expect(productCard).toHaveProperty('image');
    });
  })
})

// @ Write your code here

// Asyncronous Testing
// https://jestjs.io/docs/asynchronous


// Mocking
// https://jestjs.io/docs/mock-functions


// Setup & Teardown
// https://jestjs.io/docs/setup-teardown
