
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Carousel from "../../components/carousel";
import FloatingHeader from "../../components/navBar";
import Link from 'next/link';
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Image from 'next/image';
import blogImage from '../../public/blogImage.png';

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...9]{
  _id, 
  type, 
  author, 
  authortitle, 
  title, 
  slug, 
  image,
  publishedAt,
  excerpt
}`;



const options = { next: { revalidate: 30 } };

export default async function Blog() {
 
  const posts = await client.fetch<SanityDocument[]>(POSTS_QUERY, {}, options);


  const carouselData = posts.slice(0, 4).map((post) => ({
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
          
          <div className="text-black flex mt-5 ml-0 p-0">
            <div className="ml-2 w-10 pl-2 pr-2 rounded-md bg-gray-200 text-center hover:bg-[#EBEAFB]">All</div>
            <div className="ml-2 w-20 pl-2 pr-2 rounded-md bg-gray-200 text-center">Reports</div>
            <div className="ml-2 w-15 pl-2 pr-2 rounded-md bg-gray-200 text-center">News</div>
            <div className="ml-2 w-20 pl-2 pr-2 rounded-md bg-gray-200 text-center">Articles</div>
            <div className="ml-2 w-15 pl-2 pr-2 rounded-md bg-gray-200 text-center">Blog</div>  
          </div>




          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 ml-2">
            {posts.map((post) => {
              
              const imageUrl = post.image
                ? urlFor(post.image)?.width(400).height(250).url()
                : null;

              return (
                <Link 
                  key={post._id} 
                  href={`/${post.slug.current}`}
                  className="bg-white rounded-lg  transition flex flex-col h-65"
                >
                  
                  <div className="w-full h-40 bg-gray-100 relative rounded-lg overflow-hidden">
                    {imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={imageUrl} 
                        alt={post.title} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        <Image 
                          src={blogImage} 
                          alt="Profile picture of the author"
                          placeholder="blur"
                          className="w-full h-40"
                        />
                      </div>
                    )}
                  </div>

                 
                  <div className=" flex flex-col justify-between flex-1">
                    <div>
                     <p className="text-gray-600 mt-2">
                      {post.type}
                     </p>
                      <h2 className="text-lg font-bold text-black mt-0 line-clamp-1">
                        {post.title}
                      </h2>
                      <p className="text-gray-600">
                        {post.excerpt|| 'Click article to view text'}
                      </p>
                    </div>

                   
                  </div>
                </Link>
              );
            })}
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