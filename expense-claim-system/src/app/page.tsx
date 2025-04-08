"use client"
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { userService } from "@/app/services/user-service";
import LayoutLogin from "@/app/components/layouts/layout-login";
import FormLogin from "@/app/components/form-login/form-login";


export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const user = await userService();
      localStorage.setItem('user', JSON.stringify(user.employee ? user.employee : []));
    };
    fetchData();
}, []);
  return (
    <>
      <LayoutLogin>
           <FormLogin />
      </LayoutLogin>
    </>
  );
}

