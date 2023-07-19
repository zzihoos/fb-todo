import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { updateProfile } from "firebase/auth";
import { appAuth } from "../firebase/config";

export const useUpdateNickName = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const updateNickName = async nickName => {
    setError(null);
    setIsPending(true);
    try {
      //FB의 닉네임 변경 API 사용
      await updateProfile(appAuth.currentUser, { displayName: nickName });
      dispatch({ type: "updateName", payload: appAuth.currentUser });
    } catch (err) {
      console.log(err.message);
      setError(null);
      setIsPending(false);
    }
  };

  return { error, isPending, updateNickName };
};
