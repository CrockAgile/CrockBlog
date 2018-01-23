import React from "react";
import Link from "gatsby-link";

function Tag({ pathContext }) {
  const { posts, tag } = pathContext;

  return (
    <div>
      <span>Posts about {tag}</span>
      <ul>
        {posts.map(post => (
          <li>
            <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tag;
