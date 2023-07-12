import Logo from "../../images/photo1686213216_clipdrop-background-removal.png";
import { ButtonApp } from "../../components";
import { useState } from "react";
import {useLogin} from "../../Context/usePost";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { postLogin ,error,loading} = useLogin("admin/login", {
    email: email,
    password: password,
  });

  return (
    <div className="fixed w-full h-full bg-white top-0 left-0 z-50 flex items-center justify-center text-center">
      {loading ? <div className="loading"></div> : ""}
      <div className="w-1/2 max-lg:w-[90%] flex flex-col justify-center space-y-6 border border-Brown p-10 rounded-2xl">
        <div className="flex justify-center">
          <img src={Logo} alt="w-full mx-auto" />
        </div>
        <div className="flex w-full mx-3">
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="block max-md:w-full mx-auto w-[100%] border-b border-b-Brown py-3 pr-5 font-semibold outline-none text-end placeholder:text-Brown"
          />
          <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
            بريد الالكتروني
          </pre>
        </div>
        <div className="flex w-full mx-3">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="block max-md:w-full mx-auto w-[100%] border-b border-b-Brown py-3 pr-5 font-semibold outline-none text-end placeholder:text-Brown"
          />
          <pre className="flex items-center border-b font-semibold text-Brown border-Brown -ml-4 justify-end  max-md:p-0">
            كلمة السر
          </pre>
        </div>
        <div className="text-red-500">{error}</div>
        <div onClick={postLogin} className="w-fit mx-auto">
          <ButtonApp>
            <span className="px-12">ارسال</span>
          </ButtonApp>
        </div>
      </div>
    </div>
  );
};

export default Login;
