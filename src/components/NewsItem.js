import React from "react";

const NewsItem = ({ article }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
      )}
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-2">{article.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(article.publishedAt).toLocaleDateString()} -{" "}
          {article.source.name}
        </p>
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mt-2 block"
        >
          Read More
        </a>
      </div>
    </div>
  );
};

export default NewsItem;