import { verifyEmail } from "@/slices/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";

const EmailAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useParams();
  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.userCustom
  );
  useEffect(() => {
    dispatch(verifyEmail({ token }));
  }, [dispatch]);

  return (
    <>
      <div className="mt-10 flex items-center justify-center flex-col">
        <section className="max-w-2xl mx-auto bg-white">
          <header className="py-8 flex justify-center w-full">
            <a href="#">
              <img
                className="h-[80px]"
                src="/public/images/logo-white.png"
                alt="metablock-logo"
              />
            </a>
          </header>
          <div className="h-[200px] bg-[#365CCE] w-full text-white flex items-center justify-center flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-white"></div>
              {/* <EmailIcon /> */}
              <i className="fas fa-envelope"></i>
              <div className="w-10 h-[1px] bg-white"></div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="text-center text-sm sm:text-xl tracking-widest font-normal">
                Metablock Technolgies
              </div>
              <div className="text-xl p-5 text-center sm:text-3xl tracking-wider font-bold capitalize">
                {isError
                  ? "Your Email Verification link is invalid or Expired."
                  : isLoading
                  ? "Verifying"
                  : isSuccess
                  ? "Thanks For your Email Verification"
                  : null}
              </div>
            </div>
          </div>
          <main className="mt-8 pb-5 px-5 sm:px-10">
            <h2 className="text-gray-700 ">Hello,</h2>
            <p className="mt-2 leading-loose text-gray-600 ">
              Please use this link to verify your Email
            </p>

            <p className="mt-4 leading-loose text-gray-600">
              This Verification Link will only be valid for the next
              <span className="font-bold"> 10 minutes</span> . If the Link does
              not work, try again:
            </p>
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-3 mt-6 text-md font-bold tracking-wider text-white capitalize transition-colors duration-300 transform bg-black rounded-lg hover:bg-[#365CCE] focus:outline-none focus:ring focus:ring-transparent focus:ring-opacity-80"
            >
              Login
            </button>
          </main>
        </section>
      </div>
    </>
  );
};

export default EmailAuth;
