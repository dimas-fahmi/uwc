const Header = ({
  title,
  description,
  ...props
}: {
  title: string;
  description: string;
} & React.ComponentProps<"header">) => {
  return (
    <header {...props}>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-sm font-light opacity-70">{description}</p>
    </header>
  );
};

export default Header;
