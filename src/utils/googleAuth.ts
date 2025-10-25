import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { googleLogin } from "../store/slices/authSlice";

export const useGoogleOAuthCallback = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state === "google_auth") {
      setSearchParams({});
      dispatch(googleLogin(code) as any);
    }
  }, [searchParams, setSearchParams, dispatch]);
};

export const redirectToGoogleAuth = (authUrl: string) => {
  const url = new URL(authUrl);
  url.searchParams.set("state", "google_auth");
  
  window.location.href = url.toString();
};
