import React from 'react';
import { Dropdown as RBDropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';

export interface DropdownMenuItem {
  label: string;
  onClick: VoidFunction;
}

export interface DropdownProps {
  isOpen?: boolean;
  label: string;
  menuItems: DropdownMenuItem[];
  toggle: VoidFunction;
}

export const Dropdown: React.FC<DropdownProps> = ({ isOpen = false, label, menuItems, toggle }) => {
  return (
    <RBDropdown isOpen={isOpen} toggle={toggle}>
      <DropdownToggle caret>{label}</DropdownToggle>
      <DropdownMenu end>
        {menuItems.map((menuItem) => (
          <DropdownItem key={menuItem.label} onClick={menuItem.onClick}>
            {menuItem.label}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </RBDropdown>
  );
};
