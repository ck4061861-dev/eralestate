import NavPage from "../Models/navPage.model.js";

export const getAllNavPages = async (req, res) => {
  try {
    const pages = await NavPage.find().sort({ category: 1, title: 1 });
    res.status(200).json(pages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nav pages", error: error.message });
  }
};

export const upsertNavPage = async (req, res) => {
  try {
    const { slug } = req.params;
    const { category, title, description, content, updatedBy } = req.body;

    if (!slug || !category || !title) {
      return res.status(400).json({ message: "slug, category and title are required" });
    }

    const page = await NavPage.findOneAndUpdate(
      { slug },
      {
        $set: {
          category,
          title,
          description: description || "",
          content: content && typeof content === "object" ? content : {},
          updatedBy: updatedBy || req.user?.id || "admin",
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Nav page saved successfully", page });
  } catch (error) {
    res.status(500).json({ message: "Error saving nav page", error: error.message });
  }
};

export const upsertManyNavPages = async (req, res) => {
  try {
    const { pages } = req.body;

    if (!Array.isArray(pages)) {
      return res.status(400).json({ message: "pages must be an array" });
    }

    const operations = pages
      .filter((item) => item?.slug && item?.category && item?.title)
      .map((item) => ({
        updateOne: {
          filter: { slug: item.slug },
          update: {
            $set: {
              category: item.category,
              title: item.title,
              description: item.description || "",
              content: item.content && typeof item.content === "object" ? item.content : {},
              updatedBy: item.updatedBy || req.user?.id || "admin",
            },
          },
          upsert: true,
        },
      }));

    if (!operations.length) {
      return res.status(400).json({ message: "No valid pages provided" });
    }

    await NavPage.bulkWrite(operations, { ordered: false });
    const savedPages = await NavPage.find().sort({ category: 1, title: 1 });

    res.status(200).json({ message: "Nav pages saved successfully", pages: savedPages });
  } catch (error) {
    res.status(500).json({ message: "Error saving nav pages", error: error.message });
  }
};
