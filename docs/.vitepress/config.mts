import {defineConfig} from 'vitepress'

// https://vitepress.dev/reference/site-config
import {withSidebar} from 'vitepress-sidebar';

const vitePressOptions = {
    // VitePress's options here...
    title: 'VitePress Sidebar',
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
    },
};

const vitePressSidebarOptions = {
    // VitePress Sidebar's options here...
    documentRootPath: '/docs',
    useTitleFromFileHeading: true,
    useFolderLinkFromSameNameSubFile: true,
    collapsed: true,
    capitalizeFirst: true
};

export default defineConfig(withSidebar(vitePressOptions, vitePressSidebarOptions));
