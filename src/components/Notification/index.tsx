import { StatusNotification } from "@/interfaces";
import styles from "./styles.module.scss";

interface Props {
  status: StatusNotification;
  msj: string | null;
}

export const Notification = ({ status, msj }: Props) => {
  return (
    <div className={`${styles.notification} ${styles[status!]}`}>
      <span className="w-full text-left font-bold mb-2">Notification</span>
      <p>{msj}</p>
    </div>
  );
};
