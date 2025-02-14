import {
  Modal,
  type ModalProps,
  ModalBlock,
  type ModalBlockProps,
  ModalTriggerContext,
  type ModalTriggerContextProps,
  ModalTrigger,
  type ModalTriggerProps,
} from '@digdir/designsystemet-react';

// For some reason this fixes "ComponentSubcomponent" -> "Component.Subcomponent" in Storybook code snippets
Modal.displayName = 'Modal';

export {
  Modal,
  ModalProps,
  ModalBlock,
  ModalBlockProps,
  ModalTriggerContext,
  ModalTriggerContextProps,
  ModalTrigger,
  ModalTriggerProps,
};
