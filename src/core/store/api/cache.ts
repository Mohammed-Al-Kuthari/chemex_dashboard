export const CACHE_TAGS = {
  BRAND: "Brand",
  BASE_CHEMICAL: "BaseChemical",
  STORE: "Store",
  PRODUCE: "Produce",
  MACHINE: "Machine",
  ORDER: "Order",
  ADVERTISING: "Advertising",
  NOTIFICATION: "Notification",
  TELEMETRY: "Telemetry",
  USER: "User",
} as const;

export type CacheTag = (typeof CACHE_TAGS)[keyof typeof CACHE_TAGS];

export const CACHE_TAG_TYPES = Object.values(CACHE_TAGS);

export type CacheEntityIdentifier = string | number;

export const cacheTag = (type: CacheTag, id?: CacheEntityIdentifier) =>
  (id === undefined ? ({ type } as const) : ({ type, id } as const));

export const cacheCollectionTag = (type: CacheTag) => ({ type } as const);

export type CacheInvalidation = readonly { type: CacheTag; id?: CacheEntityIdentifier }[];

export const cacheInvalidations = {
  ofEntity(type: CacheTag, id: CacheEntityIdentifier): CacheInvalidation {
    return [cacheTag(type, id)];
  },
  ofCollection(type: CacheTag): CacheInvalidation {
    return [cacheCollectionTag(type)];
  },
  merge(...groups: CacheInvalidation[]): CacheInvalidation {
    return groups.flat();
  },
};

export const cacheProviders = {
  list<Result>(type: CacheTag, result?: Result) {
    if (!result) {
      return [cacheCollectionTag(type)];
    }

    return [cacheCollectionTag(type)];
  },
  entity<Result extends { id: CacheEntityIdentifier } | undefined>(
    type: CacheTag,
    result: Result,
  ) {
    if (!result) {
      return cacheInvalidations.ofCollection(type);
    }

    return cacheInvalidations.merge(
      cacheInvalidations.ofCollection(type),
      cacheInvalidations.ofEntity(type, result.id),
    );
  },
};
