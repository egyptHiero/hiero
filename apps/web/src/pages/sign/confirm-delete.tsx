import React from 'react';
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { createFuture, TFuture } from '../../utils';

interface ConfirmDeleteProps {
  visibility: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onConfirm: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  visibility: [visible, setVisible],
  onConfirm,
}) => {
  const { t } = useTranslation();

  const handleDelete = () => {
    setVisible(false);
    onConfirm();
  };

  return (
    <CModal
      alignment="center"
      visible={visible}
      onClose={() => setVisible(false)}
    >
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Modal title</CModalTitle>
      </CModalHeader>
      <CModalBody>{t('sign.confirm.delete')}</CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          {t('btn.cancel')}
        </CButton>
        <CButton color="primary" onClick={handleDelete}>
          {t('btn.delete')}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export const useConfirmDelete = () => {
  const confirmDeleteVisibility = React.useState(false);
  const [future, setFuture] = React.useState<TFuture>();
  const onConfirm = React.useCallback(() => future?.resolve(), [future]);

  return {
    ConfirmDelete: () => {
      return (
        <ConfirmDelete
          visibility={confirmDeleteVisibility}
          onConfirm={onConfirm}
        />
      );
    },
    showConfirmation: () => {
      const future = createFuture();
      setFuture(future);
      confirmDeleteVisibility[1](true);
      return future.promise;
    },
  };
};
