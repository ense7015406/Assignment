import { useRouter } from "next/router";

const linkStyle: React.CSSProperties = {
  textDecoration: "underline",
  color: "blue",
  cursor: "pointer",
};

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={linkStyle}>
      {children}
    </a>
  );
};

export default CustomLink;
