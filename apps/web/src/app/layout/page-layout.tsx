import * as React from 'react';
import {Outlet} from "react-router-dom";
import {Sidebar} from "./sidebar";
import {Navbar} from "./navbar";
import {Container} from "../../controls";

export const PageLayout: React.FC = () => {
  return (
    <Container.Flex>
      <Sidebar/>
      <Container.Flex flexDirection="column" className="w-100 vh-100">
        <header>
          <Navbar/>
        </header>
        <main className="h-100">
          <Container.FullHeightScroller>
            <Outlet/>
          </Container.FullHeightScroller>
        </main>
        <footer/>
      </Container.Flex>
    </Container.Flex>
  );
};

PageLayout.displayName = 'PageLayout';
