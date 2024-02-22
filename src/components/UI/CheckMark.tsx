import { IoIosCheckmarkCircle } from "react-icons/io";

interface CheckMarkProps {
  color?: string;
  size?: string;
  props?: any;
}

export function CheckMark({ color, size, ...props }: CheckMarkProps) {
  return <IoIosCheckmarkCircle color={color} size={size} {...props} />;
}
