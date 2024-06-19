import { useRouter } from "next/router";
import { useState } from "react";

import { useDisclosure } from "@/hooks/use-disclosure";
import { Modal } from "@/components/common/modal";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/services/login-mutation/use-login-mutation";

import styles from "./style.module.scss";
import { useSignUpMutation } from "@/services/sighnup-mutation/use-signup-mutation";

type FormType = {
  username: string;
  email: string;
  password: string;
};

export const Page = () => {
  const router = useRouter();

  const [isLoginModalOpen, { open: loginModalOpen, close: loginModalClose }] =
    useDisclosure();

  const [
    isSignUpModalOpen,
    { open: signUpModalOpen, close: signUpModalClose },
  ] = useDisclosure();

  const methods = useForm<FormType>();

  const { mutate: loginMutate } = useLoginMutation();

  const { mutate: signUpMutate } = useSignUpMutation();

  const [errorMessage, setErrorMessage] = useState<string>("");

  const onLoginSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);

    loginMutate(data, {
      onSuccess: () => {
        console.log("loginSuccess");
        setErrorMessage("");
        router.push("/notes");
      },
      onError: (err) => {
        setErrorMessage(err.data.error);
      },
    });
  };

  const onSignUpSubmit: SubmitHandler<FormType> = (data) => {
    console.log(data);

    signUpMutate(data, {
      onSuccess: () => {
        console.log("SignUpSuccess");
        setErrorMessage("");
      },
      onError: (err) => {
        setErrorMessage(err.data.error);
      },
    });
  };

  return (
    <>
      <div className={styles["contentContainer"]}>
        <div className={styles["buttonWrap"]}>
          <button
            onClick={() => {
              loginModalOpen();
            }}
            className={styles["button"]}
          >
            Do u want to Login?
          </button>
        </div>
        <div className={styles["buttonWrap"]}>
          <button
            onClick={() => {
              signUpModalOpen();
            }}
            className={styles["button"]}
          >
            Do u want to SignUp?
          </button>
        </div>
        <Modal isOpen={isLoginModalOpen} close={loginModalClose}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onLoginSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="input your username..."
                  {...methods.register("username")}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="input your email..."
                  {...methods.register("email")}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="input your pass..."
                  {...methods.register("password")}
                />
              </div>
              <div>
                <button type="submit">submit</button>
              </div>
              {errorMessage !== "" && (
                <div>
                  <p>{errorMessage}</p>
                </div>
              )}
            </form>
          </FormProvider>
        </Modal>
        <Modal isOpen={isSignUpModalOpen} close={signUpModalClose}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSignUpSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="input your username..."
                  {...methods.register("username")}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="input your email..."
                  {...methods.register("email")}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="input your pass..."
                  {...methods.register("password")}
                />
              </div>
              <div>
                <button type="submit">submit</button>
              </div>
              {errorMessage !== "" && (
                <div>
                  <p>{errorMessage}</p>
                </div>
              )}
            </form>
          </FormProvider>
        </Modal>
      </div>
    </>
  );
};
