import { styles } from "@/app/styles/style";
import React, { FC, useRef, useState } from "react";
import { VscWorkspaceTrusted } from "react-icons/vsc";

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Verification: FC<Props> = ({ setRoute }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    "0": "",
    "1": "",
    "2": "",
    "3": "",
  });

  const verificationHandler = async () => {
    setInvalidError(true);
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    const newVerifyNumber = { ...verifyNumber, [index]: value };
    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className={`${styles.title} mt-2`}>Verify Your Account</h1>
      <div className="mt-4 w-[80px] h-[80px] rounded-full bg-[#497Df2] flex items-center justify-center">
        <VscWorkspaceTrusted size={40} />
      </div>
      <div className="m-auto flex items-center justify-around mt-4">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="text"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] ml-2 bg-transparent border-[3px] rounded-[10px] text-center text-black dark:text-white text-[20px] font-Poppins outline-none ${
              invalidError ? "border-red-500" : "border-[#000004a]"
            }`}
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-4">
        <button className={`${styles.button}`} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <h5 className="mb-3 text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go Back to Sign In{" "}
        <span
          className="text-[#2190ff] cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Sign In
        </span>
      </h5>
    </div>
  );
};

export default Verification;
