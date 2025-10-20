import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Error404Page } from '../pages/errors/404';
import { PageLayout } from './layout/page-layout';
import { ROUTES } from './routes';
import { DictionaryPage } from '../pages/dictionary';
import { DictionaryListPage } from '../pages/dictionary-list';
import { SignPage } from '../pages/sign';
import { SignListPage } from '../pages/sign-list';
import { AboutPage } from '../pages/about';
import { TranslationListPage } from '../pages/translation-list';
import { TranslationPage } from '../pages/translation';
import { RosettaListPage } from '../pages/rosetta-list';
import { RosettaPartPage } from '../pages/rosetta';
import { AppContextProvider } from './context/app-context';
import { RosettaBlockListPage } from '../pages/rosetta-block-list';
import { RosettaBlockPage } from '../pages/rosetta-block';

export const ApplicationRoutes: React.FC = () => (
  <BrowserRouter
    future={{ v7_relativeSplatPath: true, v7_startTransition: false }}
  >
    <AppContextProvider>
      <Routes>
        <Route element={<PageLayout />}>
          <Route path={ROUTES.SIGN_LIST} element={<SignListPage />} />
          <Route path={ROUTES.SIGN} element={<SignPage />} />
          <Route
            path={ROUTES.TRANSLATION_LIST}
            element={<TranslationListPage />}
          />
          <Route path={ROUTES.TRANSLATION} element={<TranslationPage />} />
          <Route
            path={ROUTES.DICTIONARY_LIST}
            element={<DictionaryListPage />}
          />
          <Route path={ROUTES.DICTIONARY} element={<DictionaryPage />} />
          <Route
            path={ROUTES.ROSETTA_PART_LIST}
            element={<RosettaListPage />}
          />
          <Route path={ROUTES.ROSETTA_PART} element={<RosettaPartPage />} />
          <Route path={ROUTES.ABOUT} element={<AboutPage />} />
          <Route
            path={ROUTES.ROSETTA_BLOCK_LIST}
            element={<RosettaBlockListPage />}
          />
          <Route path={ROUTES.ROSETTA_BLOCK} element={<RosettaBlockPage />} />
        </Route>
        <Route path="*" element={<Error404Page />} />
      </Routes>
    </AppContextProvider>
  </BrowserRouter>
);
