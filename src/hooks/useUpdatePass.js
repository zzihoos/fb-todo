import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { appAuth } from "../firebase/config";

export const useUpdatePass = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const updatePass = async newPass => {
    setError(null);
    setIsPending(true);
    try {
      await updatePassword(appAuth.currentUser, newPass);
			console.log("비밀번호 업데이트 완료");
      setIsPending(false);
    } catch (error) {
      console.log(error.message);
      setError(null);
      setIsPending(false);
    }
  };
  return { error, isPending, updatePass };
};
