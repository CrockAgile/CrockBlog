import React from "react";
import Link from "gatsby-link";
import Helmet from "react-helmet";

function Post({ data, location, pathContext }) {
  const { markdownRemark: post } = data;
  const { frontmatter, html } = post;
  const { title, date } = frontmatter;
  const { prev, next } = pathContext;

  return (
    <div>
      <Helmet title={`${title} - CrockBlog`} />

      <div>
        <h1>{title}</h1>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <p>
          {prev && (
            <Link to={prev.frontmatter.path}>
              Previous: {prev.frontmatter.title}
            </Link>
          )}
        </p>
      </div>
    </div>
  );
}

export const query = graphql`
  query PostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        path
        tags
        excerpt
      }
    }
  }
`;

export default Post;
