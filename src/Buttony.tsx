import { HTMLProps } from "react";

const Buttony = ({ className, ...props }: HTMLProps<HTMLSpanElement>) => {
  return (
    <span
      className={`user-select-none border border-dark px-1 me-1 cursor-pointer ${className}`}
      {...props}
    />
  );
};
export default Buttony;
