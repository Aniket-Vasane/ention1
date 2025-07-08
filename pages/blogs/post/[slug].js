import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestShareButton,
  PinterestIcon,
} from "next-share";
import {
  PostDetail,
  PostWidget,
  Author,
  Comments,
  SideCategories,
} from "../../../components";

const PostDetails = ({ post }) => {
  const router = useRouter();

  const url = "https://eveit.in" + router.asPath;

  if (router.isFallback) {
    return <></>;
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords} />
      </Head>

      <div className="container mx-auto px-10  pt-40 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            <PostDetail post={post} />
            <Author author={post.author} />
            {/* <CommentsForm slug={post.slug} /> */}
            <Comments slug={post.slug} />
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:top-8">
              <div className="bg-white shadow-lg rounded-lg p-8 pb-12 mb-8">
                <h1 className="text-xl mb-8 font-semibold border-b pb-4">
                  WELCOME
                </h1>
                <p className="pb-4 text-justify">{post.excerpt}</p>
                <div>
                  <FacebookShareButton
                    url={url}
                    quote={
                      "eveIT is a rapidly growing company bringing your dreams into reality with IT services and solutions, Marketing and event management services."
                    }
                    hashtag={"#eveit"}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>

                  <LinkedinShareButton url={url}>
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>

                  <TwitterShareButton url={url} title={post.title}>
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>

                  <WhatsappShareButton
                    url={url}
                    title={post.title}
                    separator=":: "
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>

                  <PinterestShareButton url={url} media={post.title}>
                    <PinterestIcon size={32} round />
                  </PinterestShareButton>
                </div>
              </div>
              <PostWidget
                slug={post.slug}
                categories={post.categories.map((category) => category.slug)}
              />
              <SideCategories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default PostDetails;

// Switched to SSR: getServerSideProps is used instead of getStaticProps so that getStaticPaths is not required.
// If you want to use SSG in the future, restore getStaticProps and getStaticPaths, and ensure your API endpoint is available.
// export async function getStaticPaths() {
//   const { getPosts } = await import('../../../services');
//   const posts = await getPosts();
//   const paths = posts.map((post) => ({ params: { slug: post.slug } }));
//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
  const { getPostDetails } = await import('../../../services');
  const data = await getPostDetails(params.slug);
  if (!data) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post: data,
    },
  };
}
