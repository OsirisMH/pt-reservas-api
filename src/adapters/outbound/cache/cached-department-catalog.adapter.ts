import type { DepartmentOption } from "../../../core/application/dtos/department.dto";
import type { DepartmentCatalogPort } from "../../../core/application/ports/department-catalog.port";

type CacheEntry<T> = { value: T; expiresAt: number };

export class CachedDepartmentCatalogAdapter implements DepartmentCatalogPort {
  private cache: CacheEntry<DepartmentOption[]> | null = null;

  constructor(
    private readonly inner: DepartmentCatalogPort,
    private readonly ttlMs: number,
  ) {}

  async getActiveDepartments(): Promise<DepartmentOption[]> {
    const now = Date.now();

    if (this.cache && this.cache.expiresAt > now) {
      return this.cache.value;
    }

    try {
      const fresh = await this.inner.getActiveDepartments();
      this.cache = { value: fresh, expiresAt: now + this.ttlMs };
      return fresh;
    } catch (e) {
      if (this.cache) return this.cache.value;
      throw e;
    }
  }

  invalidate() {
    this.cache = null;
  }
}