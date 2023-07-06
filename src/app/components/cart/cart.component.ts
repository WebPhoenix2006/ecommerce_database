import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  img_src: string;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  private refreshSubscription: Subscription;
  private readonly jsonServerUrl = 'https://my-json-server.typicode.com/WebPhoenix2006/shionhouse-db/cartItems';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCartItems();
    this.startAutoRefresh();
  }

  ngOnDestroy() {
    this.stopAutoRefresh();
  }

  fetchCartItems(): void {
    this.http.get<CartItem[]>(this.jsonServerUrl)
      .pipe(
        catchError((error) => {
          console.error('Error fetching cart items:', error);
          return []; // Return an empty array in case of error
        })
      )
      .subscribe((data) => {
        this.cartItems = data;
      });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  removeItem(item: CartItem): void {
    this.http.delete(`${this.jsonServerUrl}/${item.id}`)
      .subscribe(
        () => {
          const index = this.cartItems.findIndex((cartItem) => cartItem.id === item.id);
          if (index !== -1) {
            this.cartItems.splice(index, 1);
          }
        },
        (error) => {
          console.error('Error removing item from cart:', error);
        }
      );
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCartItem(item);
    }
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
    this.updateCartItem(item);
  }

  updateCartItem(item: CartItem): void {
    this.http.put(`${this.jsonServerUrl}/${item.id}`, item)
      .subscribe(
        () => {
          // Cart item updated successfully
        },
        (error) => {
          console.error('Error updating cart item:', error);
        }
      );
  }

  private startAutoRefresh(): void {
    this.refreshSubscription = interval(5000)
      .pipe(
        switchMap(() =>
          this.http.get<CartItem[]>(this.jsonServerUrl).pipe(
            catchError((error) => {
              console.error('Error refreshing cart items:', error);
              return []; // Return an empty array in case of error
            })
          )
        )
      )
      .subscribe((data) => {
        this.cartItems = data;
      });
  }

  private stopAutoRefresh(): void {
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  isOpen = false;

  open(): void {
    this.isOpen = true;
  }

  @Output() closeSidebarEvent: EventEmitter<void> = new EventEmitter<void>();

  closeSidebar(): void {
    this.isOpen = false;
    this.closeSidebarEvent.emit();
  }
}
