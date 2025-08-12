import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
import { withSidebar } from 'vitepress-sidebar';

const vitePressOptions = {
  title: 'Создание приложения',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Egypt Hiero',
    outline: {
      label: 'На странице',
    },
    prev: 'Раньше',
    next: 'Дальше',
  },
  base: '/hiero/',
};

const vitePressSidebarOptions = {
  // VitePress Sidebar's options here...
  documentRootPath: '/docs',
  useTitleFromFileHeading: true,
  useFolderLinkFromSameNameSubFile: true,
  collapsed: true,
  capitalizeFirst: true,
};

export default defineConfig(
  withSidebar(vitePressOptions, vitePressSidebarOptions),
);
