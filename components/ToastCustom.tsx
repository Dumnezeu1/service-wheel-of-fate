import React from "react";
import Toast, { AnyObject, BaseToastProps } from "react-native-toast-message";

import SuccessToast from "react-native-toast-message/src/components/success";
import ErrorToast from "react-native-toast-message/src/components/error";
import InfoToast from "react-native-toast-message/src/components/info";

interface toastCustomType {
  type?: "success" | "error" | "info";
  position?: "top" | "bottom";
  title?: string;
  text?: string;
  visibilityTime?: number;
}

export const toastCustom = ({
  type = "success",
  position = "top",
  title,
  text,
  visibilityTime = 2000,
}: toastCustomType) => {
  Toast.show({
    type,
    position,
    visibilityTime,
    text1: title,
    text2: text,
    topOffset: 60,
    bottomOffset: 40,
    props: {
      text1Style: {
        fontSize: 15,
        fontWeight: "400",
      },
    },
  });
};

const renderToast =
  (Component: React.FC<BaseToastProps>) => (props: BaseToastProps) =>
    (
      <Component
        text1Style={{ fontSize: 16 }}
        text2Style={{ fontSize: 14 }}
        onTrailingIconPress={() => Toast.hide()}
        {...props}
      />
    );

export const toastConfig: AnyObject = {
  success: renderToast(SuccessToast as React.FC<BaseToastProps>),
  error: renderToast(ErrorToast as React.FC<BaseToastProps>),
  info: renderToast(InfoToast as React.FC<BaseToastProps>),
};
