import { IonButton } from "@ionic/react";
import amplitude from "amplitude-js";
import React from "react";
import { useState, useEffect } from "react";

type Props = {
  USER_ID:string
  AmplitudeInstance: any;
  button_color: string;
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>;
};

const Button: React.FC<Props> = ({
  USER_ID,
  AmplitudeInstance,
  button_color,
  setShowToast,
}) => {

  const [color, setColor] = useState("color");
  
  const handleClick = (button_color: string): void => {
    amplitude.getInstance(AmplitudeInstance as any).setUserId(USER_ID);
    amplitude
      .getInstance(AmplitudeInstance)
      .logEvent(`user clicked: ${button_color} `);
  };

  useEffect(() => {
    if (button_color === "original") setColor("medium");
    else if (button_color === "variant") {
      setColor("primary");
    }
  }, [button_color]);

  return (
    <IonButton
      color={`${color}`}
      expand="full"
      onClick={() => {
        handleClick(button_color);
        setShowToast(true);
      }}
    >
      Learn How
    </IonButton>
  );
};

export default Button;
