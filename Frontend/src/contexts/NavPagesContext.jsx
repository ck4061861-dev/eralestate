import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  NAV_PAGE_DEFAULTS,
  getDefaultMenuByCategory,
} from "../data/navPageDefaults";

const NavPagesContext = createContext(null);

const normalizePage = (item) => ({
  id: item?._id || item?.id,
  slug: item?.slug || "",
  category: (item?.category || "").toLowerCase(),
  title: item?.title || "",
  description: item?.description || "",
  content: item?.content && typeof item.content === "object" ? item.content : {},
});

const mergePagesWithDefaults = (apiPages) => {
  const defaultsMap = NAV_PAGE_DEFAULTS.reduce((acc, item) => {
    acc[item.slug] = { ...item };
    return acc;
  }, {});

  for (const page of apiPages) {
    if (!page.slug) continue;
    if (defaultsMap[page.slug]) {
      defaultsMap[page.slug] = {
        ...defaultsMap[page.slug],
        ...page,
        content: {
          ...(defaultsMap[page.slug].content || {}),
          ...(page.content || {}),
        },
      };
      continue;
    }

    defaultsMap[page.slug] = page;
  }

  return Object.values(defaultsMap);
};

export function NavPagesProvider({ children }) {
  const API_URL = import.meta.env.VITE_API_URL;
  const [pages, setPages] = useState(NAV_PAGE_DEFAULTS);
  const [loading, setLoading] = useState(false);

  const refreshNavPages = useCallback(async () => {
    if (!API_URL) {
      setPages(NAV_PAGE_DEFAULTS);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/nav-pages`);
      if (!res.ok) throw new Error("Failed to fetch nav pages");
      const data = await res.json();
      const normalized = (Array.isArray(data) ? data : []).map(normalizePage);
      setPages(mergePagesWithDefaults(normalized));
    } catch {
      setPages(NAV_PAGE_DEFAULTS);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    refreshNavPages();
  }, [refreshNavPages]);

  const saveNavPage = useCallback(
    async (pageInput) => {
      const page = normalizePage(pageInput);
      if (!page.slug || !page.category || !page.title) {
        throw new Error("Slug, category and title are required");
      }

      const res = await fetch(`${API_URL}/api/nav-pages/${page.slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save nav page");
      }

      const data = await res.json();
      const saved = normalizePage(data.page || page);
      setPages((prev) => mergePagesWithDefaults(prev.map((item) => (item.slug === saved.slug ? saved : item))));
      return saved;
    },
    [API_URL]
  );

  const saveManyNavPages = useCallback(
    async (pagesInput) => {
      const prepared = pagesInput.map(normalizePage).filter((p) => p.slug && p.category && p.title);
      const res = await fetch(`${API_URL}/api/nav-pages/bulk`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pages: prepared }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to save nav pages");
      }

      const data = await res.json();
      const normalized = (Array.isArray(data.pages) ? data.pages : []).map(normalizePage);
      const merged = mergePagesWithDefaults(normalized);
      setPages(merged);
      return merged;
    },
    [API_URL]
  );

  const pagesBySlug = useMemo(() => {
    const map = {};
    pages.forEach((item) => {
      map[item.slug] = item;
    });
    return map;
  }, [pages]);

  const getPageBySlug = useCallback((slug) => pagesBySlug[slug], [pagesBySlug]);

  const getMenuByCategory = useCallback(
    (category) => {
      const items = pages
        .filter((item) => item.category === category)
        .map((item) => ({
          slug: item.slug,
          title: item.title,
          description: item.description,
        }));

      return items.length ? items : getDefaultMenuByCategory(category);
    },
    [pages]
  );

  const value = useMemo(
    () => ({
      pages,
      loading,
      refreshNavPages,
      saveNavPage,
      saveManyNavPages,
      getPageBySlug,
      getMenuByCategory,
    }),
    [pages, loading, refreshNavPages, saveNavPage, saveManyNavPages, getPageBySlug, getMenuByCategory]
  );

  return <NavPagesContext.Provider value={value}>{children}</NavPagesContext.Provider>;
}

export function useNavPagesContent() {
  const context = useContext(NavPagesContext);
  if (!context) {
    throw new Error("useNavPagesContent must be used inside NavPagesProvider");
  }
  return context;
}
