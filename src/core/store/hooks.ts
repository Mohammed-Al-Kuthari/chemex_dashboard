"use client";

import { useCallback, useSyncExternalStore } from "react";

import { useAppStore } from "./AppStoreContext";
import type { AppDispatch, RootState } from "./configureStore";

export function useAppDispatch(): AppDispatch {
	return useAppStore().dispatch;
}

export function useAppSelector<TResult>(
	selector: (state: RootState) => TResult
): TResult {
	const store = useAppStore();

	const subscribe = useCallback(
		(listener: () => void) => store.subscribe(listener),
		[store]
	);

	const getSnapshot = useCallback(
		() => selector(store.getState()),
		[store, selector]
	);

	return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
