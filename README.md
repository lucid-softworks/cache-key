# `@lucid-softworks/cache-key`

Deterministic cache keys built from a namespace and typed primitive parts.
Strings, numbers, bigint, booleans, `null`, and `undefined` remain distinct.

```ts
import { createCacheKey } from "@lucid-softworks/cache-key";

const tenantId = "tenant-1";
const userId = "user-42";
const version = 2;
const key = createCacheKey("user-profile", [tenantId, userId, version]);
```

Namespaces and string values are URI encoded. Object key semantics remain an
application decision rather than relying on unstable object serialization.
