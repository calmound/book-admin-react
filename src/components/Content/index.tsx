import { PropsWithChildren, ReactNode } from "react";

import styles from "./index.module.css";

const Content: React.FC<
  PropsWithChildren & {
    operation?: ReactNode;
    title: string;
  }
> = ({ children, operation, title }) => {
  return (
    <>
      <div className={styles.title}>
        {title}
        {operation && <span className={styles.btn}>{operation}</span>}
      </div>
      <div className={styles.content}>{children}</div>
    </>
  );
};

export default Content;
