import LoginPage from "@/components/Login"
import { RootState } from "store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
export default function Home() {
  const token = useSelector((state: RootState) => state.auth.token);
  const router = useRouter();
  if (token) router.push("/workspace");

  return <>{!token && <LoginPage></LoginPage>}</>;
}
