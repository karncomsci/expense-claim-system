"use client";
import { useState, useEffect } from "react";
import LayoutMain from "@/app/components/layouts/layout-main";
import FormExpenseClaim from "@/app/components/form-data/form-expense-claim"

export default function addExpenseClaim() {

  return (
    <>
      <LayoutMain>      
          <FormExpenseClaim />
      </LayoutMain>
    </>
  )
}