/** @deprecated Use `@/lib/scrollRestore` instead. */
export {
  updateScrollRestoreState as updateHomeScrollState,
  saveScrollBeforeLeave as saveHomeScrollBeforeLeave,
  consumeScrollRestore as consumeHomeScrollRestore,
  restoreScrollPosition as restoreHomeScrollPosition,
  type ScrollRestorePayload as HomeScrollState,
} from "./scrollRestore";
