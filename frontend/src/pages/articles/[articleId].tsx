import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

const ArticlePage = () => {
  const router = useRouter();
  const { articleId } = router.query;

  // You can fetch the article content based on the articleId here
  const articleContent = "Article content goes here.";

  return (
    <div>
      <h1>Article: {articleId}</h1>
      <p>{articleContent}</p>
      <Link href="/articles">Back to Articles</Link>
    </div>
  );
};

export default ArticlePage;
