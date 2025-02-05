import React, { FunctionComponent } from 'react'
import { graphql } from 'gatsby'
import { PostPageItemType } from 'types/PostItem.types' // 바로 아래에서 정의할 것입니다
import Template from 'components/Common/Template'
import PostHead from 'components/Post/PostHead'
import PostContent from 'components/Post/PostContent'
import CommentWidget from 'components/Post/CommentWidget'
import PageLayout from 'components/Common/PageLayout'
import SidebarNav from 'components/Main/SidebarNav'

type PostTemplateProps = {
  data: {
    allMarkdownRemark: {
      edges: PostPageItemType[]
    }
  }
  location: {
    href: string
  }
}

const PostTemplate: FunctionComponent<PostTemplateProps> = function ({
  data: {
    allMarkdownRemark: { edges },
  },
  location: { href },
}) {
  const {
    node: {
      html,
      frontmatter: { title, summary, date, categories, thumbnail },
    },
  } = edges[0]

  return (
    <Template
      title={title}
      description={summary}
      url={href}
      image={thumbnail.publicURL ?? null}
    >
      <PageLayout>
        <PostHead title={title} date={date} categories={categories} />
        <SidebarNav html={html} />
        <PostContent html={html} />
        <CommentWidget />
      </PageLayout>
    </Template>
  )
}

export const queryMarkdownDataBySlug = graphql`
  query queryMarkdownDataBySlug($slug: String) {
    allMarkdownRemark(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          html
          frontmatter {
            title
            summary
            date(formatString: "YYYY.MM.DD.")
            categories
            thumbnail
          }
        }
      }
    }
  }
`

export default PostTemplate
