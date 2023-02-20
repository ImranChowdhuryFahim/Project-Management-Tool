import LoginPage from "@/components/Login"
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";

export default function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  if (token) router.push("/workspace");

  return (
    <>
      {token ? (
        <div className="grid h-screen place-items-center">
          <CircularProgress color="inherit" />
        </div>
      ) : (
        <LoginPage></LoginPage>
      )}
    </>
  );
}
