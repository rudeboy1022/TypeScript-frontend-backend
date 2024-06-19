import { useCallback, useState } from "react";

/**
 * Modalなどの開閉処理するコンポーネントの制御に使用する custom hooks
 *
 * @param {boolean} initialState モーダルの初期状態。開いているか閉じているかを指定します。{true}だと開いた状態で表示
 * @param {function} callbacks 開閉イベントに対するコールバック関数。
 *
 * @returns {[boolean, { open: () => void; close: () => void; toggle: () => void }]} 現在の状態とモーダルを開く、閉じる、トグルするための関数を返す
 *
 * @example
 * ```
 * import { useDisclosure } from '@/hooks/common/use-disclosure';
 *
 * const [isOpen, { open, close }] = useDisclosure()
 * <>
 *   <button onClick={open}>
 *     モーダルを開く
 *   </button>
 *   <ModalComponent
 *     isOpen={isOpen}
 *     onClose={close}
 *   />
 * </>
 * ```
 */

export function useDisclosure(
  initialState = false,
  callbacks?: { onOpen?(): void; onClose?(): void }
) {
  const { onOpen, onClose } = callbacks || {};
  const [isOpen, setIsOpen] = useState(initialState);

  const open = useCallback(() => {
    setIsOpen((isOpen) => {
      if (!isOpen) {
        onOpen?.();
        return true;
      }
      return isOpen;
    });
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen((isOpen) => {
      if (isOpen) {
        onClose?.();
        return false;
      }
      return isOpen;
    });
  }, [onClose]);

  const toggle = useCallback(() => {
    isOpen ? close() : open();
  }, [close, open, isOpen]);

  return [isOpen, { open, close, toggle }] as const;
}
