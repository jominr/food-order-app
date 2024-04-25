import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { MinusCircle, PlusCircle, Trash } from "lucide-react";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  addQuantity: (cartItem: CartItem) =>void;
  minusQuantity: (cartIem: CartItem) => void;
  removeFromCart: (cartIem: CartItem) => void;
}

const OrderSummary = ({restaurant, cartItems, addQuantity, minusQuantity, removeFromCart}:Props) => {
  const getTotalCost = () => {
    const totalItemsPrice = cartItems.reduce(
      (total, cartItem)=> total + cartItem.price * cartItem.quantity, 
      0,
    );
    const totalWithDelivery = totalItemsPrice + restaurant.deliveryPrice;
    return (totalWithDelivery / 100).toFixed(2);
  }
  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item)=>(
          <div className="flex justify-between">
            <span className="flex items-center gap-1">
              <PlusCircle className="cursor-pointer" color="green" size={20} onClick={() => addQuantity(item)}/>
              <Badge variant="outline">
                { item.quantity }
              </Badge>
              <MinusCircle className="cursor-pointer" color="orange" size={20} onClick={() => minusQuantity(item)}/>
              { item.name }
            </span>
            <span className="flex items-center gap-1">
              <Trash className="cursor-pointer" color="red" size={20} onClick={()=>removeFromCart(item)}/>
              ${((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>

        <Separator />

      </CardContent>
    </>
  );
};

export default OrderSummary;