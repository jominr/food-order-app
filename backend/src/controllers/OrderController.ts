import Stripe from "stripe";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string,
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
}
const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;
    const restaurant = await Restaurant.findById(
      checkoutSessionRequest.restaurantId
    );
    if (!restaurant) {
      throw new Error("Restaurant not found");
    }
    const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems)

    const session = await createSession(
      lineItems, 
      "TEST_ORDER_ID", 
      restaurant.deliveryPrice, 
      restaurant._id.toString()
    );

    if (!session.url) {
      throw res.status(500).json({ message: "Error creating stripe session"});
    }

    res.json({ url: session.url});

  } catch (error: any) {
    console.log(error);
    // stripe errors
    res.status(500).json({ message: error.raw.message })
  }
}
// geting the price from backend, more safe
const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[] ) => {
  // 1. foreach cartItem, get the menuItem object from the restaurant to get the price
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem)=>{
    const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
    if(!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`)
    }

    // 2. foreach cartItem, convert it to a stripe line item
    const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
      price_data: {
        currency: "aud",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        }
      },
      quantity: parseInt(cartItem.quantity),
    };
     // 3. return line item array
    return line_item;
  })

  return lineItems;
}

const createSession = async (
  lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
  orderId: string,
  deliveryPrice: number, 
  restaurantId: string,
) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "aud"
          }
        }
      }
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });
  return sessionData;
};

export default { createCheckoutSession }