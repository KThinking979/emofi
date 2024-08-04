/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { ShopPage } from './pages/ShopPage/Loadable';
import { EarnPage } from './pages/EarnPage/Loadable';
import { RankPage } from './pages/RankPage/Loadable';
import { WalletPage } from './pages/WalletPage/Loadable';
import { NotFoundPage } from './pages/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { PATH_ROUTE } from 'types/route';
import { PageLayout } from './layout/PageLayout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - EmoFi"
        defaultTitle="EmoFi"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="EmoFi" />
      </Helmet>

      <Routes>
        <Route element={<PageLayout />}>
          <Route path={PATH_ROUTE.PLAY} element={<HomePage />} />
          <Route path={PATH_ROUTE.SHOP} element={<ShopPage />} />
          <Route path={PATH_ROUTE.EARN} element={<EarnPage />} />
          <Route path={PATH_ROUTE.RANK} element={<RankPage />} />
          <Route path={PATH_ROUTE.WALLET} element={<WalletPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </BrowserRouter>
  );
}
