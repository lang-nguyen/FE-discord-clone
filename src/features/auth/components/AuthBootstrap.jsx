import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bootstrapAuthThunk } from "@/store/slices/authSlice";

export function AuthBootstrap({ children }) {
  const dispatch = useDispatch();
  const bootstrapped = useSelector((state) => state.auth.bootstrapped);

  useEffect(() => {
    if (!bootstrapped) {
      dispatch(bootstrapAuthThunk());
    }
  }, [bootstrapped, dispatch]);

  return children;
}
