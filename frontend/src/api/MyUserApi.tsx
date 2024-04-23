import { useMutation } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string,
  email: string,
}

export const useCreateMyUser = () => {
  // 定义一个mutation函数，用于发起数据变更请求，
  // useMutation返回一个mutation对象，其中包含处理异步数据变更的函数mutate, 这里叫mutateAsync, 改名字为createUser, 以及isLoading, isError等状态。
  // 当用户提交表单时，通过mutation.createUser(formData)触发mutation函数。

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
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

  


  
