import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Error404Page} from '../pages/errors/404';
import {PageLayout} from "./layout/page-layout";
import {ROUTES} from "./routes";
import {DictionaryPage} from "../pages/dictionary";
import {DictionaryListPage} from "../pages/dictionary-list";
import {SignPage} from "../pages/sign";
import {SignListPage} from "../pages/sign-list";
import {AboutPage} from "../pages/about";

export const ApplicationRoutes: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<PageLayout/>}>
        <Route path={ROUTES.DICTIONARY_LIST} element={<DictionaryListPage/>}/>
        <Route path={ROUTES.DICTIONARY} element={<DictionaryPage/>}/>
        <Route path={ROUTES.SIGN_LIST} element={<SignListPage/>}/>
        <Route path={ROUTES.SIGN} element={<SignPage/>}/>
        <Route path={ROUTES.ABOUT} element={<AboutPage/>}/>
      </Route>
      <Route path="*" element={<Error404Page/>}/>
    </Routes>
  </BrowserRouter>
);
