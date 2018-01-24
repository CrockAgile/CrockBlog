const path = require("path");

function createPages({ boundActionCreators, graphql }) {
  const { createPage } = boundActionCreators;

  const query = graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            html
            id
            frontmatter {
              date
              path
              title
              excerpt
              tags
            }
          }
        }
      }
    }
  `);

  query.then(result => {
    if (result.errors) return Promise.reject(result.errors);

    const posts = result.data.allMarkdownRemark.edges;

    createPostPages(createPage, posts);
    createTagPages(createPage, posts);
  });
}

function createPostPages(createPage, posts) {
  const postTemplate = path.resolve("src/templates/post.js");

  posts.forEach(({ node }, index) => {
    createPage({
      path: node.frontmatter.path,
      component: postTemplate,
      context: {
        previous: index === 0 ? null : posts[index - 1].node,
        next: index === posts.length - 1 ? null : posts[index + 1].node,
      },
    });
  });
}

function createTagPages(createPage, posts) {
  const tagTemplate = path.resolve("src/templates/tag.js");
  const allTagsTemplate = path.resolve("src/templates/all-tags.js");

  const postsByTag = posts.reduce((byTag, { node }) => {
    for (const tag of node.frontmatter.tags) {
      if (!byTag.has(tag)) {
        byTag.set(tag, []);
      }
      byTag.get(tag).push(node);
    }
    return byTag;
  }, new Map());

  const tags = Array.from(postsByTag.keys()).sort();

  // page listing all tags
  createPage({
    path: "/tags",
    component: allTagsTemplate,
    context: {
      tags,
    },
  });

  // page for each tag
  for (const [tag, posts] of postsByTag) {
    createPage({
      path: `/tags/${tag}`,
      component: tagTemplate,
      context: {
        posts,
        tag,
      },
    });
  }
}

exports.createPages = createPages;
