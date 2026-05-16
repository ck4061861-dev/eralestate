import { useEffect, useMemo, useState } from "react";
import { useNavPagesContent } from "../contexts/NavPagesContext";

const categories = ["buy", "rent", "let"];

const emptySection = () => ({
  heading: "",
  subHeading: "",
  paragraphsText: "",
  pointsText: "",
});

const normalizeSectionForForm = (section = {}) => ({
  heading: section.heading || "",
  subHeading: section.subHeading || "",
  paragraphsText: Array.isArray(section.paragraphs)
    ? section.paragraphs.join("\n")
    : "",
  pointsText: Array.isArray(section.points) ? section.points.join("\n") : "",
});

const buildSectionsForSave = (sections = []) =>
  sections
    .map((section) => {
      const paragraphs = (section.paragraphsText || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const points = (section.pointsText || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);

      return {
        heading: section.heading?.trim() || "",
        subHeading: section.subHeading?.trim() || "",
        paragraphs,
        points,
      };
    })
    .filter(
      (section) =>
        section.heading ||
        section.subHeading ||
        section.paragraphs.length ||
        section.points.length
    );

export default function NavPagesManager() {
  const { pages, saveNavPage, saveManyNavPages } = useNavPagesContent();
  const [selectedSlug, setSelectedSlug] = useState("properties-for-sale");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const pageGroups = useMemo(() => {
    const grouped = { buy: [], rent: [], let: [] };
    pages.forEach((page) => {
      if (grouped[page.category]) grouped[page.category].push(page);
    });
    categories.forEach((category) => {
      grouped[category].sort((a, b) => a.title.localeCompare(b.title));
    });
    return grouped;
  }, [pages]);

  const selectedPage = useMemo(
    () => pages.find((item) => item.slug === selectedSlug) || pages[0],
    [pages, selectedSlug]
  );

  const [draft, setDraft] = useState(null);

  useEffect(() => {
    if (!selectedPage) return;
    const content = selectedPage.content || {};
    setDraft({
      ...selectedPage,
      heroLabel: content.heroLabel || "",
      heroTitle: content.heroTitle || "",
      heroDescription: content.heroDescription || "",
      primaryCtaText: content.primaryCtaText || content.ctaPrimaryText || "",
      secondaryCtaText: content.secondaryCtaText || content.ctaSecondaryText || "",
      sectionTitle: content.sectionTitle || "",
      introText: content.introText || "",
      bottomTitle: content.bottomTitle || content.ctaTitle || "",
      bottomDescription: content.bottomDescription || content.ctaDescription || "",
      bottomCtaText: content.bottomCtaText || "",
      sections: Array.isArray(content.sections)
        ? content.sections.map(normalizeSectionForForm)
        : [],
    });
  }, [selectedPage]);

  const handleSelect = (page) => {
    const content = page.content || {};
    setSelectedSlug(page.slug);
    setDraft({
      ...page,
      heroLabel: content.heroLabel || "",
      heroTitle: content.heroTitle || "",
      heroDescription: content.heroDescription || "",
      primaryCtaText: content.primaryCtaText || content.ctaPrimaryText || "",
      secondaryCtaText: content.secondaryCtaText || content.ctaSecondaryText || "",
      sectionTitle: content.sectionTitle || "",
      introText: content.introText || "",
      bottomTitle: content.bottomTitle || content.ctaTitle || "",
      bottomDescription: content.bottomDescription || content.ctaDescription || "",
      bottomCtaText: content.bottomCtaText || "",
      sections: Array.isArray(content.sections)
        ? content.sections.map(normalizeSectionForForm)
        : [],
    });
    setMessage("");
  };

  const handleSave = async () => {
    if (!draft) return;

    setSaving(true);
    try {
      const structuredSections = buildSectionsForSave(draft.sections);
      await saveNavPage({
        slug: draft.slug,
        category: draft.category,
        title: draft.title.trim(),
        description: draft.description.trim(),
        content: {
          heroLabel: draft.heroLabel?.trim() || "",
          heroTitle: draft.heroTitle?.trim() || "",
          heroDescription: draft.heroDescription?.trim() || "",
          primaryCtaText: draft.primaryCtaText?.trim() || "",
          secondaryCtaText: draft.secondaryCtaText?.trim() || "",
          ctaPrimaryText: draft.primaryCtaText?.trim() || "",
          ctaSecondaryText: draft.secondaryCtaText?.trim() || "",
          sectionTitle: draft.sectionTitle?.trim() || "",
          introText: draft.introText?.trim() || "",
          bottomTitle: draft.bottomTitle?.trim() || "",
          bottomDescription: draft.bottomDescription?.trim() || "",
          bottomCtaText: draft.bottomCtaText?.trim() || "",
          ctaTitle: draft.bottomTitle?.trim() || "",
          ctaDescription: draft.bottomDescription?.trim() || "",
          sections: structuredSections,
        },
      });
      setMessage(`Saved ${draft.title}`);
    } catch (error) {
      setMessage(error.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleSeedAll = async () => {
    setSaving(true);
    try {
      await saveManyNavPages(pages);
      setMessage("All navbar pages synced to database");
    } catch (error) {
      setMessage(error.message || "Failed to sync");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white border border-[#ebebeb] rounded-2xl p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#111]">Navbar Pages CMS</h2>
          <p className="text-sm text-[#666]">
            Buy, Rent, Let pages ka content yahan se dynamic edit hoga aur DB me save hoga.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSeedAll}
          disabled={saving}
          className="px-4 py-2 rounded-lg border border-[#dbeafe] bg-blue-50 text-blue-700 text-sm font-semibold hover:bg-blue-100 disabled:opacity-60"
        >
          Sync All To DB
        </button>
      </div>

      {message && (
        <div className="mb-4 rounded-lg border border-[#dbeafe] bg-[#f0f9ff] px-3 py-2 text-sm text-[#0369a1]">
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-5">
        <div className="border border-[#ebebeb] rounded-xl p-3 h-fit">
          {categories.map((category) => (
            <div key={category} className="mb-4 last:mb-0">
              <div className="text-[11px] uppercase tracking-widest font-bold text-[#999] mb-2">
                {category}
              </div>
              <div className="space-y-1">
                {pageGroups[category].map((page) => (
                  <button
                    key={page.slug}
                    type="button"
                    onClick={() => handleSelect(page)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                      selectedSlug === page.slug
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-[#444] hover:bg-[#f7f7f7]"
                    }`}
                  >
                    {page.title}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {draft && (
          <div className="border border-[#ebebeb] rounded-xl p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-semibold text-[#444]">Slug</label>
                <input
                  type="text"
                  disabled
                  value={draft.slug}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] bg-[#f8f8f8] text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Category</label>
                <input
                  type="text"
                  disabled
                  value={draft.category}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] bg-[#f8f8f8] text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Menu Title</label>
                <input
                  type="text"
                  value={draft.title}
                  onChange={(e) => setDraft((prev) => ({ ...prev, title: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Menu Description</label>
                <input
                  type="text"
                  value={draft.description}
                  onChange={(e) => setDraft((prev) => ({ ...prev, description: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Hero Label</label>
                <input
                  type="text"
                  value={draft.heroLabel}
                  onChange={(e) => setDraft((prev) => ({ ...prev, heroLabel: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Example: UK Property Guide"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Hero Title</label>
                <input
                  type="text"
                  value={draft.heroTitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, heroTitle: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Main page title"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-[#444]">Hero Paragraph</label>
                <textarea
                  value={draft.heroDescription}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, heroDescription: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Hero ke niche ka description"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Primary Button Text</label>
                <input
                  type="text"
                  value={draft.primaryCtaText}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, primaryCtaText: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Example: Book a Valuation"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Secondary Button Text</label>
                <input
                  type="text"
                  value={draft.secondaryCtaText}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, secondaryCtaText: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Example: Contact Advisor"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Section Title</label>
                <input
                  type="text"
                  value={draft.sectionTitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, sectionTitle: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Middle section heading"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Intro Paragraph</label>
                <input
                  type="text"
                  value={draft.introText}
                  onChange={(e) => setDraft((prev) => ({ ...prev, introText: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Section intro text"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Bottom CTA Heading</label>
                <input
                  type="text"
                  value={draft.bottomTitle}
                  onChange={(e) => setDraft((prev) => ({ ...prev, bottomTitle: e.target.value }))}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Bottom heading"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-[#444]">Bottom CTA Button Text</label>
                <input
                  type="text"
                  value={draft.bottomCtaText}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, bottomCtaText: e.target.value }))
                  }
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Bottom button label"
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-semibold text-[#444]">Bottom CTA Paragraph</label>
                <textarea
                  value={draft.bottomDescription}
                  onChange={(e) =>
                    setDraft((prev) => ({ ...prev, bottomDescription: e.target.value }))
                  }
                  rows={3}
                  className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Bottom section description"
                />
              </div>
            </div>

            <div className="mt-2 border border-[#ebebeb] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <label className="text-xs font-semibold text-[#444]">Section Wise Content Builder</label>
                  <p className="text-xs text-[#777] mt-1">
                    Heading, sub-heading, paragraph aur points line-by-line add karo. JSON likhne ki zarurat nahi.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDraft((prev) => ({
                      ...prev,
                      sections: [...(prev.sections || []), emptySection()],
                    }))
                  }
                  className="px-3 py-1.5 text-xs font-semibold rounded-md border border-[#dbeafe] bg-blue-50 text-blue-700 hover:bg-blue-100"
                >
                  Add Section
                </button>
              </div>

              <div className="space-y-3">
                {(draft.sections || []).map((section, index) => (
                  <div key={`${draft.slug}-section-${index}`} className="border border-[#e5e7eb] rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-bold text-[#666]">Section {index + 1}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({
                            ...prev,
                            sections: prev.sections.filter((_, i) => i !== index),
                          }))
                        }
                        className="text-xs text-red-600 hover:text-red-700 font-semibold"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-[#444]">Heading</label>
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              sections: prev.sections.map((item, i) =>
                                i === index ? { ...item, heading: e.target.value } : item
                              ),
                            }))
                          }
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#444]">Sub Heading</label>
                        <input
                          type="text"
                          value={section.subHeading}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              sections: prev.sections.map((item, i) =>
                                i === index ? { ...item, subHeading: e.target.value } : item
                              ),
                            }))
                          }
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#444]">Paragraphs</label>
                        <textarea
                          rows={4}
                          value={section.paragraphsText}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              sections: prev.sections.map((item, i) =>
                                i === index
                                  ? { ...item, paragraphsText: e.target.value }
                                  : item
                              ),
                            }))
                          }
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Har paragraph nayi line me likho"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-[#444]">Points (Bullets)</label>
                        <textarea
                          rows={4}
                          value={section.pointsText}
                          onChange={(e) =>
                            setDraft((prev) => ({
                              ...prev,
                              sections: prev.sections.map((item, i) =>
                                i === index ? { ...item, pointsText: e.target.value } : item
                              ),
                            }))
                          }
                          className="mt-1 w-full px-3 py-2 rounded-lg border border-[#ddd] text-sm focus:outline-none focus:border-blue-500"
                          placeholder="Har point nayi line me likho"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Page"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
