import * as React from 'react';
import CIcon from '@coreui/icons-react'
import {
  CNavGroup,
  CNavItem,
  CNavTitle,
  CSidebar,
  CSidebarBrand,
  CSidebarHeader,
  CSidebarNav,
} from "@coreui/react";
import {cilBook, cilLibrary, cilText, cilBarcode, cilHome} from '@coreui/icons'
import {useAppContext} from "../context/app-context";
import {ROUTES} from "../routes";

export const Sidebar: React.FC = () => {
  const {isSidebarVisible, setSidebarVisible} = useAppContext();

  return (
    <CSidebar visible={isSidebarVisible} onVisibleChange={value => setSidebarVisible(value)} className="c-sidebar">
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>Egypt Hieroes</CSidebarBrand>
      </CSidebarHeader>
      <CSidebarNav>
        <CNavTitle>Nav Title</CNavTitle>
        <CNavItem href={ROUTES.SIGN_LIST}>
          <CIcon customClassName="nav-icon" icon={cilBarcode}/>
          Signs
        </CNavItem>
        <CNavItem href="#">
          <CIcon customClassName="nav-icon" icon={cilText}/>
          Translations
        </CNavItem>
        <CNavGroup
          toggler={
            <>
              <CIcon customClassName="nav-icon" icon={cilLibrary}/>
              Dictionaries
            </>
          }
        >
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilBook}/>
            Nav dropdown item
          </CNavItem>
          <CNavItem href="#">
            <CIcon customClassName="nav-icon" icon={cilBook}/>
            Nav dropdown item
          </CNavItem>
        </CNavGroup>
        <CNavItem href={ROUTES.ABOUT}>
          <CIcon customClassName="nav-icon" icon={cilHome}/>
          About
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
};

Sidebar.displayName = 'Sidebar';
