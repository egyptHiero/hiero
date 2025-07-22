import React from 'react';
import {
  CButton,
  CDropdown,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import styled from '@emotion/styled';

const StyledCDropdownToggle = styled(CDropdownToggle)({
  ':after ': {
    display: 'none',
  },
});

const StyledCDropdownMenu = styled(CDropdownMenu)({
  minWidth: 0,
  transform: 'translate(-1px, 140px)',
});

const DIVIDER = <span>&#xFF0B;</span>;
const HORIZONTAL_DIVIDER = <span>&#x23E4;</span>;
const VERTICAL_DIVIDER = <span>&#x23D0;</span>;
const NEW_LINE = <span>&#x23CE;</span>;

export const Divider: React.FC = () => {
  const [divider, setDivider] = React.useState(DIVIDER);

  return (
    <CDropdown direction="center">
      <StyledCDropdownToggle size="lg">{divider}</StyledCDropdownToggle>
      <StyledCDropdownMenu className="text-center p-0">
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(DIVIDER)}
        >
          {DIVIDER}
        </CButton>
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(HORIZONTAL_DIVIDER)}
        >
          {HORIZONTAL_DIVIDER}
        </CButton>
        <CButton
          variant="outline"
          className="w-100"
          onClick={() => setDivider(VERTICAL_DIVIDER)}
        >
          {VERTICAL_DIVIDER}
        </CButton>
        <CButton
          variant="outline"
          className="w-100 h-100"
          onClick={() => setDivider(NEW_LINE)}
        >
          {NEW_LINE}
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
