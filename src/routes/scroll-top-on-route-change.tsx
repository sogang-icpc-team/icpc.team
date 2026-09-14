import { useEffect } from "react";
import {
  NavigationType,
  useLocation,
  useNavigationType,
} from "react-router-dom";

export const ScrollTopOnRouteChange = () => {
  const { key } = useLocation();
  const navigationType = useNavigationType();
  useEffect(() => {
    if (navigationType === NavigationType.Replace) {
      return;
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [key, navigationType]);
  return <></>;
};
