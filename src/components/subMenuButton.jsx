

export const SubmenuButton = ({submenuDataObj}) => {
  return (
    <li className="sub-menu-item">
      <a href= {submenuDataObj.url} className="sub-menu-link">{submenuDataObj.name}</a>
    </li>
  );
};