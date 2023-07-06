import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CartComponent } from '../cart/cart.component';

interface CartItem {
  id: number;
  title: string;
  price: string;
  img_src: string;
  quantity: number;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  selectedItem: CartItem | null = null;
  cat_images = [
    { tag: 'GLASSES', img_src: 'assets/img/gallery/popular1.png' },
    { tag: 'WATCHES', img_src: 'assets/img/gallery/popular2.png' },
    { tag: 'JACKETS', img_src: 'assets/img/gallery/popular3.png' },
    { tag: 'CLOTHES', img_src: 'assets/img/gallery/popular4.png' }
  ];
  products = [
    { title: 'Knitted Jumper', price: '30.00', img_src: 'assets/img/gallery/arrival1.png', id: 1, quantity: 1 },
    { title: 'Cool Scarf', price: '30.00', img_src: 'assets/img/gallery/arrival2.png', id: 2, quantity: 1 },
    { title: 'Nice Shirt', price: '30.00', img_src: 'assets/img/gallery/arrival3.png', id: 3, quantity: 1 },
    { title: 'Checked Shirt', price: '30.00', img_src: 'assets/img/gallery/arrival4.png', id: 4, quantity: 1 },
    { title: 'Blue T-Shirt', price: '30.00', img_src: 'assets/img/gallery/arrival5.png', id: 5, quantity: 1 },
    { title: 'Nice Glasses', price: '30.00', img_src: 'assets/img/gallery/arrival6.png', id: 6, quantity: 1 },
    { title: 'Nice Top', price: '30.00', img_src: 'assets/img/gallery/arrival7.png', id: 7, quantity: 1 },
    { title: 'Cool Sneakers', price: '30.00', img_src: 'assets/img/gallery/arrival8.png', id: 8, quantity: 1 },
  ];
  cartItems: CartItem[] = [];
  totalPrice: string = '$0.00';
  private jsonServerUrl = 'https://my-json-server.typicode.com/WebPhoenix2006/shionhouse-db/cartItems'; // Change this URL to your JSON server endpoint

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchCartItems();
  }
  
  fetchCartItems(): void {
    this.http.get<CartItem[]>(this.jsonServerUrl)
      .subscribe(
        (data) => {
          this.cartItems = data;
          this.calculateTotalPrice();
        },
        (error) => {
          console.error('Error fetching cart items:', error);
        }
      );
  }

  addToCart(selectedItem: CartItem | null): void {
    if (selectedItem) {
      const existingItem = this.cartItems.find(item => item.title === selectedItem.title);

      if (existingItem) {
        // Item already exists in the cart, update the quantity
        existingItem.quantity += 1;

        // Update the cart item on the JSON server
        this.http.put<CartItem>(`${this.jsonServerUrl}/${existingItem.id}`, existingItem)
          .subscribe(
            () => {
              // Display a success message
              alert('Item added to cart successfully!');
            },
            (error) => {
              console.error('Error updating item in cart:', error);
            }
          );
      } else {
        // Item doesn't exist in the cart, add it as a new item with quantity 1
        const newId = this.generateUniqueId();
        const newItem: CartItem = {
          id: newId,
          title: selectedItem.title,
          price: selectedItem.price,
          img_src: selectedItem.img_src,
          quantity: 1
        };
        this.cartItems.push(newItem);

        // Recalculate the total price
        this.calculateTotalPrice();

        // Add the new item to the JSON server
        this.http.post<CartItem>(this.jsonServerUrl, newItem)
          .subscribe(
            () => {
              // Display a success message
              alert('Item added to cart successfully!');
            },
            (error) => {
              console.error('Error adding item to cart:', error);
            }
          );
      }
    }
  }

  removeFromCart(item: CartItem): void {
    const itemIndex = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
  
    if (itemIndex !== -1) {
      const currentItem = this.cartItems[itemIndex];
  
      if (currentItem.quantity > 1) {
        // Decrease the quantity by 1
        currentItem.quantity -= 1;
      } else {
        // Remove the item from the cartItems array if the quantity is 1
        this.cartItems.splice(itemIndex, 1);
      }
  
      // Recalculate the total price
      this.calculateTotalPrice();
  
      // Update the cart item on the JSON server
      this.http.put<CartItem>(`${this.jsonServerUrl}/${item.id}`, currentItem)
        .subscribe(
          () => {
            // Display a success message
            alert('Item quantity updated successfully!');
          },
          (error) => {
            console.error('Error updating item quantity:', error);
          }
        );
    }
  }
  

  generateUniqueId(): number {
    // Generate a random number between 1 and 10000
    return Math.floor(Math.random() * 10000) + 1;
  }

  calculateTotalPrice(): void {
    let totalPrice = 0;
    for (const item of this.cartItems) {
      const itemPrice = parseFloat(item.price.replace('$', ''));
      totalPrice += itemPrice * item.quantity;
    }
    // Store the total price in a variable or display it in the template as desired
    this.totalPrice = '$' + totalPrice.toFixed(2);
  }
  @ViewChild('sidebar') sidebar: CartComponent;
  

  close(): void {
    this.sidebar.isOpen = false;
  }

}
