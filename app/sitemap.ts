import { supabase } from "@/lib/supabaseClient";

async function getArticles() {
  const { data: articles, error } = await supabase
    .from("articles")
    .select("article_id")
    .eq("is_deleted", false);
  if (error || !articles) {
    return [];
  }
  return articles;
}

export default async function sitemap() {
  const baseUrl = "https://hsdp-org.hr";

  const articles = await getArticles();

  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.article_id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...articleUrls,
  ];
}