import React from "react";
import Link from "gatsby-link";

const IndexPage = ({ data }) => {
  const { edges: posts } = data.allMarkdownRemark;
  const postsMarkup = posts.map(({ node: post }) => {
    const { frontmatter } = post;
    return (
      <div>
        <h2>
          <Link to={frontmatter.path}>{frontmatter.title}</Link>
        </h2>
        <p>{frontmatter.date}</p>
        <p>{frontmatter.excerpt}</p>
        <ul>
          {post.frontmatter.tags.map(tag => (
            <li>
              <Link to={`/tags/${tag}`}>{tag}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  });
  return <div>{postsMarkup}</div>;
};

export const query = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            tags
            excerpt
          }
        }
      }
    }
  }
`;

export default IndexPage;
