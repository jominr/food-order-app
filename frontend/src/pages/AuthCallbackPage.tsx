import { useCreateMyUser } from '@/api/MyUserApi';
import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';


const AuthCallbackPage = () => {
  // this page that we will redirect the user to 
  // this page is going to inside the auth0 provider 
  const navigate = useNavigate();
  const { user } = useAuth0();
  // 使用自定义hook返回了请求api的函数createUser
  const { createUser, isSuccess } = useCreateMyUser();
  
  // it stores a state value, but not trigger re-render
  const hasCreatedUser = useRef(false);
  
  useEffect(()=>{
    if (user?.sub && user?.email && !hasCreatedUser.current) {
      createUser({ auth0Id: user.sub , email: user.email });
      hasCreatedUser.current = true;
    }
    navigate("/")
  }, [createUser, navigate, user]);

  return (
    <>
      Loading...
    </>
  );
};

export default AuthCallbackPage;