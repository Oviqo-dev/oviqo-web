
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Carousel from "../../components/carousel";
import FloatingHeader from "../../components/navBar";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{
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
          
          <div className="text-black flex mt-5 ml-8">
            <div className="ml-2 w-10 pl-2 pr-2 rounded-md bg-gray-200 text-center hover:bg-[#EBEAFB]">All</div>
            <div className="ml-2 w-20 pl-2 pr-2 rounded-md bg-gray-200 text-center">Reports</div>
            <div className="ml-2 w-15 pl-2 pr-2 rounded-md bg-gray-200 text-center">News</div>
            <div className="ml-2 w-20 pl-2 pr-2 rounded-md bg-gray-200 text-center">Articles</div>
            <div className="ml-2 w-15 pl-2 pr-2 rounded-md bg-gray-200 text-center">Blog</div>  
          </div>


          <div className="flex">
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-10">
              <div className="w-[90%] h-[60%] bg-gray-200 rounded-sm mt-2 "></div>
              <h2>Title</h2>
              <p>Paragraph</p>
            </div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
          </div>

          <div className="flex">
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-10"></div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
          </div>

          <div className="flex">
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-10"></div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
            <div className="w-[30%] h-50 bg-gray-200 rounded-md mt-5 ml-5"></div>
          </div>

          

          
        </section>
        <section className="flex items-center justify-center mt-4">

          <div className="flex">
            <div className="bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-black">1</div>
            <div className="bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-black">2</div>
            <div className="bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-black">3</div>
            <div className="bg-gray-200 rounded-full w-6 h-6 text-center ml-2 text-black">4</div>
          </div>
        </section>

          
      </main>

      <footer className="mt-10 py-6 text-center text-xs text-gray-900 bg-white">
        <p>© 2026 OVIQO. All rights reserved.</p>
        <p>Developed by Adl &amp; Ahad.</p>
      </footer>
    </>
  );
}