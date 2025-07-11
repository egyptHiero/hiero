import * as ReactDOM from 'react-dom/client';
import App from './app';
import {i18next} from './i18n-config';
import {I18nextProvider} from "react-i18next";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>
);
