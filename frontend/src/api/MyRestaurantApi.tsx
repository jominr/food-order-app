import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { toast } from "sonner";



const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async(restaurantFormData: FormData) :Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 这里不用写Content-type, 因为我们有文件要传，不是用json传
      },
      body: restaurantFormData,
    });

    if(!response.ok) {
      throw new Error("Failed to create restaurant")
    }

    return response.json();
  };

  const { 
    mutate: createRestaurant, 
    isLoading, 
    isSuccess,
    error
  } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }
  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { createRestaurant, isLoading };
}