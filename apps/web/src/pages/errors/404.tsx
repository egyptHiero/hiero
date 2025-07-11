import * as React from 'react';

export const Error404Page: React.FC = () => {
  return (
    <div className="col-md-12 text-center">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};

Error404Page.displayName = 'Error404Page';
