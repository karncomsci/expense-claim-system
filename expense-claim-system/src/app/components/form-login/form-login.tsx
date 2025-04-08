import { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { Employees } from "@/app/models/Employees";
import { userService } from "@/app/services/user-service";

export default function LoginForm(){
    const [email, setEmail] = useState("");
    const [employees, setEmployees] = useState<Employees[]>([]);
    const router = useRouter();

    useEffect(() => {
      const fetchData = async () => {
         const user = localStorage.getItem('user');
         console.log(JSON.stringify(user));
        if (user) {
              const parsedUser = JSON.parse(user) as Employees[];
              setEmployees(parsedUser);
        }else{
          userService()
                  .then(res => {
                    setEmployees(res.employee as Employees[]);
                    res.employee ? localStorage.setItem('user', JSON.stringify(res.employee)) : []})
        }
      };
      fetchData();
  }, []);
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const matchedEmployee = employees.find((item) => item.email === email);
        if (matchedEmployee) {
            localStorage.setItem('login', JSON.stringify(matchedEmployee));
            router.push("/my-documents");
        } else {
            router.push("/");
        }
        
    }
    

    return (
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
              </div>

              <button
                name="login"
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
    )
}