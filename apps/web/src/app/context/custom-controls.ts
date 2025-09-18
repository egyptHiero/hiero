import { useNavigate } from 'react-router-dom';
import React from 'react';

export const useCustomControls = () => {
  const [customControlsParams, setCustomControlsParams] = React.useState<
    Record<string, string | undefined>
  >({});
  const navigate = useNavigate();

  const searchParamsString = React.useMemo(() => {
    return Object.entries(customControlsParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
  }, [customControlsParams]);

  React.useEffect(() => {
    // eslint-disable-next-line no-restricted-globals
    if (location.search !== searchParamsString) {
      navigate(`?${searchParamsString}`, {
        preventScrollReset: true,
      });
    }
  }, [navigate, searchParamsString]);

  return { setCustomControlsParams };
};
