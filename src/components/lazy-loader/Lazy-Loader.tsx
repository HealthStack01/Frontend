import {FC, useEffect, useState} from "react";
import PageLoaderComponent from "../page-loader/page-loader";

export interface LazyLoaderProps {
  delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ({delay = 250, ...props}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <PageLoaderComponent /> : null;
};

export {LazyLoader as default};
