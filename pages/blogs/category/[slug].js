import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getCategoryPost, getSingleCategory } from '../../../services';
import { PostCard, SideCategories } from '../../../components';
import {Loader} from '../../../components/Utils'
import { Footer, Navbar } from 'components'

const CategoryPost = ({ categoryPost, posts }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loader />;
  }

  return (
    <>
      <Head>
        <title>{categoryPost.name} category blog posts - ention</title>
        <meta name="description" content={categoryPost.description} />
        <meta name="keywords" content={categoryPost.keywords} />
      </Head>
<main className='bg-[#000F29]'>
<Navbar />
      <div className="container mx-auto px-10 pt-28 ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8">
            {posts.map((post, index) => (
              <PostCard key={index} post={post.node} />
            ))}
          </div>
          <div className="col-span-1 lg:col-span-4">
            <div className="relative lg:sticky top-28">
              <SideCategories />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </main>
    </>
  );
};
export default CategoryPost;

// getStaticPaths is used by Next.js to pre-render dynamic category pages at build time based on available categories from the CMS.
// By commenting this out, category pages will not be statically generated and may not be accessible unless you implement fallback logic or use SSR.
// export async function getStaticPaths() {
//   const { getCategories } = await import('../../../services');
//   const categories = await getCategories();
//   const paths = categories.map((cat) => ({ params: { slug: cat.slug } }));
//   return { paths, fallback: false };
// }

// Switched to SSR: getServerSideProps is used instead of getStaticProps so that getStaticPaths is not required.
// If you want to use SSG in the future, restore getStaticProps and getStaticPaths, and ensure your API endpoint is available.
export async function getServerSideProps({ params }) {
  const { getSingleCategory, getCategoryPost } = await import('../../../services');
  const categoryPost = await getSingleCategory(params.slug);
  const posts = await getCategoryPost(params.slug);
  return {
    props: { categoryPost, posts },
  };
}
