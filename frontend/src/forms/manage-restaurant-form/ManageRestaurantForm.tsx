import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSelection from "./CuisinesSelection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z.object({
  restaurantName: z.string({
    required_error: "restuarant name is required",
  }),
  city: z.string({
    required_error: "city is required",
  }),
  country: z.string({
    required_error: "country is required",
  }),
  // using the coerce function converts the string value to a number
  deliveryPrice: z.coerce.number({
    required_error: "delivery price is required",
    invalid_type_error: "must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "estimated delivery time is required",
    invalid_type_error: "must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "please select at least one item",
  }),
  menuItems: z.array(z.object({
    name: z.string().min(1, "name is required"),
    price: z.coerce.number().min(1, "price is required")
  })),
  imageFile: z.instanceof(File, {message: "image is required"}),
});

// create a type based on this form schema
// use for useForm
type RestaurantFormData = z.infer<typeof formSchema>

type Props = {
  restaurant?: Restaurant,
  onSave: (restaurantFormData: FormData) => void
  isLoading: boolean;
}
const ManageRestaurantForm = ({ isLoading, onSave, restaurant } : Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0}],
    }
  });

  useEffect(()=> {
    if (!restaurant) {
      return;
    }
    // format the data in the restaurant objet to match what our form expects
    const deliveryPriceFormatted = parseInt((restaurant.deliveryPrice / 100).toFixed(2));
    const menuItemsFormatted = restaurant.menuItems.map((item)=> ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2))
    }));
    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted
    };
    form.reset(updatedRestaurant);

  }, [form, restaurant]);
  
  const onSubmit = (formDataJson: RestaurantFormData) => {
    // convert formDataJson to a new FormData object,
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    
    formData.append(
      "deliveryPrice", 
      (formDataJson.deliveryPrice * 100).toString()
    );

    formData.append(
      "estimatedDeliveryTime", 
      formDataJson.estimatedDeliveryTime.toString()
    );
    // same to postman request body:Form
    formDataJson.cuisines.forEach((cuisine, index)=> {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    
    formDataJson.menuItems.forEach((menuItem, index)=> {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(`menuItems[${index}][price]`, (menuItem.price * 100).toString());
    });

    formData.append(`imageFile`, formDataJson.imageFile);
    onSave(formData);
  };

  return (
    /*
      behind the scenes this form component uses an appContext to pass all the 
      form properties to the child component, so that's why in the detail section
      we can use the useFormContext hook to access
    */
    <Form {...form}>
      {/* the handleSubmit function is from react form library,
        which: 1, run the Zod validation, 
        2, if pass, then call the onSubmit function
        */}
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-gray-50 p-10 rounded-lg"
      >
        <DetailsSection/>
        <Separator />
        <CuisinesSelection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;

