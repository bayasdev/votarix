interface MenuTitleProps {
  label: string;
}

const MenuTitle: React.FC<MenuTitleProps> = ({ label }) => {
  return <li className="menu-title">{label}</li>;
};

export default MenuTitle;
