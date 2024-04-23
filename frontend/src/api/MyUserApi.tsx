import { User } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = ()=> {
  const { getAccessTokenSilently } = useAuth0();

  // 定义一下这个函数返回值的类型，方便我们在page中调用时拿到具体的类型。
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }
    return response.json()
  }

  const { 
    data: currentUser, 
    isLoading, 
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest); // query name

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string,
  email: string,
}

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  // 定义一个mutation函数，用于发起数据变更请求，
  // useMutation返回一个mutation对象，其中包含处理异步数据变更的函数mutate, 这里叫mutateAsync, 改名字为createUser, 以及isLoading, isError等状态。
  // 当用户提交表单时，通过mutation.createUser(formData)触发mutation函数。

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error("Failed to create user");
    }
  }

  const { 
    mutateAsync: createUser, 
    isLoading, 
    isError, 
    isSuccess
  } = useMutation(createMyUserRequest);

  return {
    createUser, isLoading, isError, isSuccess
  }

};

type updateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
  // we need not define email, email just show for client.
}

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData : updateMyUserRequest)=> {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      throw new Error("Failed to update user");
    }
    return response.json();
  }

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    // isError,
    error,
    reset,
  } = useMutation(updateMyUserRequest)

  if (isSuccess) {
    toast.success("User profile updated!")
  }

  if (error) {
    toast.error(error.toString());
    reset(); // clear error, 防止再渲染，这应该是指下次调用时还保留了原来的error? useQuery的show toast就不用
  }

  return {
    updateUser,
    isLoading,
  }
}

  


  
