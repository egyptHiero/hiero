import React from 'react';
import {
  CButton,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import styled from '@emotion/styled';
import {
  DELIMITER_HORIZONTAL,
  DELIMITER_NEAR,
  DELIMITER_NEW_LINE,
  DELIMITER_VERTICAL,
} from '../../../constants';
import { useSignContext } from '../context';

const StyledCDropdownToggle = styled(CDropdownToggle)({
  ':after ': {
    display: 'none',
  },
});

const StyledCDropdownMenu = styled(CDropdownMenu)({
  minWidth: 0,
  transform: 'translate(-1px, 140px)',
});

const ICON_DIVIDER_NEAR = <span>&#xFF0B;</span>;
const ICON_HORIZONTAL_DIVIDER = <span>&#x23E4;</span>;
const ICON_VERTICAL_DIVIDER = <span>&#x23D0;</span>;
const ICON_NEW_LINE = <span>&#x23CE;</span>;

const getDividerIcon = (value?: string) => {
  switch (value) {
    case DELIMITER_HORIZONTAL:
      return ICON_HORIZONTAL_DIVIDER;
    case DELIMITER_VERTICAL:
      return ICON_VERTICAL_DIVIDER;
    case DELIMITER_NEW_LINE:
      return ICON_NEW_LINE;
    default:
      return ICON_DIVIDER_NEAR;
  }
};

interface DividerProps {
  value?: string;
  setDivider: (value: string) => void;
}

export const Divider: React.FC<DividerProps> = ({ value, setDivider }) => {
  const divider = getDividerIcon(value);

  return (
    <CDropdown direction="center">
      <StyledCDropdownToggle variant="outline">{divider}</StyledCDropdownToggle>
      <StyledCDropdownMenu className="text-center p-0">
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(DELIMITER_NEAR)}
        >
          {ICON_DIVIDER_NEAR}
        </CButton>
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(DELIMITER_HORIZONTAL)}
        >
          {ICON_HORIZONTAL_DIVIDER}
        </CButton>
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(DELIMITER_VERTICAL)}
        >
          {ICON_VERTICAL_DIVIDER}
        </CButton>
        <CButton
          variant="outline"
          className="w-100 h-100"
          onClick={() => setDivider(DELIMITER_NEW_LINE)}
        >
          {ICON_NEW_LINE}
        </CButton>
      </StyledCDropdownMenu>
    </CDropdown>
  );
  /*
    <CButton className="btn-outline">
      <span style={{ fontSize: 38 }}>&#x23D0;&#x23E4; &crarr; +</span>
    </CButton>
*/
};

Divider.displayName = 'Divider';
