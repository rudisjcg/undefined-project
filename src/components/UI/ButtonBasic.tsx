interface ButtonProps {
  children: React.ReactNode;
  onClick: (e: any) => void;
}

export default function BasicButton({
  children,
  onClick,
  ...props
}: ButtonProps) {
  return (
    <button className="" {...props}>
      {children}
    </button>
  );
}
