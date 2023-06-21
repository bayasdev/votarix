interface DrawerMenuTitleProps {
  label: string;
}

const DrawerMenuTitle: React.FC<DrawerMenuTitleProps> = ({ label }) => {
  return <li className="menu-title">{label}</li>;
};

export default DrawerMenuTitle;
