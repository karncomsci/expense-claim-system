"use client"
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import LayoutLogin from "@/app/components/layouts/layout-login";
import { Mail } from "lucide-react";


type User = {
  email? : string;
}
export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/my-documents");
  }

 
  
  return (
    <>
      <LayoutLogin>
        <div className="h-screen bg-gradient-to-br from-blue-400 to-cyan-300 flex justify-center items-center w-full">
          <form method="POST" onSubmit={handleSubmit}>
            <div className="bg-white px-10 py-8 rounded-xl w-screen shadow-xl max-w-sm">
              <div className="space-y-4">
                <h1 className="text-center text-2xl font-semibold text-gray-600">
                  Login
                </h1>
                <hr />
                <div className="flex items-center border-2 py-2 px-3 rounded-md mb-4">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <input
                    className="pl-2 outline-none border-none w-full"
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                {/* 
                <div className="flex items-center border-2 py-2 px-3 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <input className="pl-2 outline-none border-none w-full" type="password" name="password" id="" placeholder="Password" required/>
                    
                </div>
                */}
              </div>

              <button
                type="submit"
                value="login"
                id="login"
                className="mt-6 w-full shadow-xl bg-gradient-to-tr from-blue-400 to-sky-200 hover:to-blue-700 text-indigo-100 py-2 rounded-md text-lg tracking-wide transition duration-1000"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </LayoutLogin>
    </>
  );
}

