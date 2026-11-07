
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Carousel from "../../components/carousel";
import FloatingHeader from "../../components/navBar";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  type, 
  author, 
  authortitle, 
  title, 
  slug, 
  publishedAt
}`;

const options = { next: { revalidate: 30 } };

export default async function Blog() {
 
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);


  const carouselData = posts.map((post) => ({
    title: post.title,
    type: post.type || 'Article',
    author: post.author || 'Oviqo Team',
    authorTitle: post.authortitle || 'Co-Founder, Oviqo',
    slug: post.slug.current,
  }));


  const finalCarouselData = carouselData.length > 0 ? carouselData : [
    {
      title: 'No posts found in Sanity yet',
      type: 'Notice',
      author: 'Ahad Alam',
      authorTitle: 'Co-Founder, Oviqo',
    }
  ];

  return (
    <>
     <FloatingHeader />

      <main className="flex-1 flex mx-auto flex-col w-full max-w-7xl justify-between pt-0 mt-0 pl-7 pr-7">
        <section>
          <h1 className="text-3xl font-bold text-slate-900 pt-0 py-6 text-left">
            The Resource Vault.
          </h1>

          
          <Carousel carouselData={finalCarouselData} />
        </section>
      </main>

      <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
        <p>© 2026 OVIQO. All rights reserved.</p>
        <p>Developed by Adl &amp; Ahad.</p>
      </footer>
    </>
  );
}