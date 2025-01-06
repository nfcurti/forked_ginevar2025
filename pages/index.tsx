"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import BasePage from "@/component/basePage";
import GinevarLabs from "@/component/introPage";

export default function Home() {
  const [isLoading, setLoading] = useState(false);
  

  const router = useRouter();

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {

    
  }

  useEffect(() => {
    
  }, []);

  return (
    <BasePage description={ `Ginevar`} title={ `Ginevar`} isLoading={isLoading} >
        {/* <p>test</p> */}
        <GinevarLabs/>
      </BasePage>
  );
}
