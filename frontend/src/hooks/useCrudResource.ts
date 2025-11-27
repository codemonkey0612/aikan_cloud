import { useCallback, useEffect, useMemo, useState } from "react";
import type { CrudApi } from "../api/endpoints";
import type { ApiIdentifier } from "../api/client";

export interface CrudState<T> {
  items: T[];
  loading: boolean;
  error: string | null;
}

export interface CrudHookResult<
  T,
  CreateInput = Partial<T>,
  UpdateInput = Partial<T>
> extends CrudState<T> {
  refresh: () => Promise<void>;
  getItem: (id: ApiIdentifier) => Promise<T | null>;
  createItem: (payload: CreateInput) => Promise<T>;
  updateItem: (id: ApiIdentifier, payload: UpdateInput) => Promise<T>;
  deleteItem: (id: ApiIdentifier) => Promise<void>;
}

const getErrorMessage = (err: unknown) => {
  if (typeof err === "string") return err;
  if (err && typeof err === "object" && "message" in err) {
    return String((err as any).message);
  }
  return "Something went wrong";
};

export const useCrudResource = <
  T,
  CreateInput = Partial<T>,
  UpdateInput = Partial<T>
>(
  api: CrudApi<T, CreateInput, UpdateInput>
): CrudHookResult<T, CreateInput, UpdateInput> => {
  const [state, setState] = useState<CrudState<T>>({
    items: [],
    loading: true,
    error: null,
  });

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true }));
    try {
      const data = await api.list();
      setState({ items: data, loading: false, error: null });
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: getErrorMessage(error),
      }));
    }
  }, [api]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const getItem = useCallback(
    async (id: ApiIdentifier) => {
      try {
        return await api.get(id);
      } catch (error) {
        setState((prev) => ({
          ...prev,
          error: getErrorMessage(error),
        }));
        return null;
      }
    },
    [api]
  );

  const createItem = useCallback(
    async (payload: CreateInput) => {
      const created = await api.create(payload);
      setState((prev) => ({
        ...prev,
        items: [...prev.items, created],
      }));
      return created;
    },
    [api]
  );

  const updateItem = useCallback(
    async (id: ApiIdentifier, payload: UpdateInput) => {
      const updated = await api.update(id, payload);
      setState((prev) => ({
        ...prev,
        items: prev.items.map((item) =>
          (item as any).id === (updated as any).id ? updated : item
        ),
      }));
      return updated;
    },
    [api]
  );

  const deleteItem = useCallback(
    async (id: ApiIdentifier) => {
      await api.remove(id);
      setState((prev) => ({
        ...prev,
        items: prev.items.filter((item) => (item as any).id !== id),
      }));
    },
    [api]
  );

  return useMemo(
    () => ({
      ...state,
      refresh,
      getItem,
      createItem,
      updateItem,
      deleteItem,
    }),
    [state, refresh, getItem, createItem, updateItem, deleteItem]
  );
};

