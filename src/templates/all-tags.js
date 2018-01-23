import React from "react";
import Link from "gatsby-link";

function AllTags({ pathContext }) {
  const { tags } = pathContext;

  return (
    <div>
      <ul>
        {tags.map(tag => (
          <li>
            <Link to={`/tags/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllTags;
