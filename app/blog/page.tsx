import { Suspense } from "react";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Carousel from "../../components/carousel";
import FloatingHeader from "../../components/navBar";
import Link from 'next/link';
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import Image from 'next/image';
import blogImage from '../../public/blogImage.png';
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && (!defined($type) || type == $type)
]|order(publishedAt desc)[$start...$end]{
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

const POSTS_COUNT_QUERY = `count(*[
  _type == "post" 
  && defined(slug.current)
  && (!defined($type) || type == $type)
])`;

const options = { next: { revalidate: 30 } };

export default function Blog({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  return (
    <>
      <FloatingHeader />
      <Suspense fallback={<BlogLoadingSkeleton />}>
        <BlogContent searchParams={searchParams} />
      </Suspense>
      <footer className="mt-0 pt-0 ml-1 py-6 text-center text-xs text-gray-900 bg-white">
        <p>© 2026 OVIQO. All rights reserved.</p>
        <p>Developed by Adl &amp; Ahad.</p>
      </footer>
    </>
  );
}

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams.page) || 1;
  const selectedType = resolvedSearchParams.type;
  
  const pageSize = 9;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const [posts, totalPosts] = await Promise.all([
    client.fetch<SanityDocument[]>(POSTS_QUERY, { start, end, type: selectedType || null }, options),
    client.fetch<number>(POSTS_COUNT_QUERY, { type: selectedType || null }, options),
  ]);

  const totalPages = Math.ceil(totalPosts / pageSize);

  const carouselData = posts.slice(0, 4).map((post) => ({
    title: post.title,
    type: post.type || 'Article',
    author: post.author || 'Oviqo Team',
    authorTitle: post.authortitle || 'Co-Founder, Oviqo',
    slug: post.slug.current,
  }));

  const finalCarouselData = carouselData.length > 0 ? carouselData : [
    {
      title: selectedType ? `No ${selectedType.toLowerCase()} found` : 'No posts found in Sanity yet',
      type: 'Notice',
      author: 'Ahad Alam',
      authorTitle: 'Co-Founder, Oviqo',
    }
  ];

  const categories = [
    { label: "All", value: undefined, width: "w-10" },
    { label: "Reports", value: "Report", width: "w-20" },
    { label: "News", value: "News", width: "w-15" },
    { label: "Articles", value: "Article", width: "w-20" },
    { label: "Blogs", value: "Blog", width: "w-15" },
  ];

  return (
    <main className="flex-1 flex mx-auto flex-col w-full max-w-7xl justify-between pt-0 mt-0 pl-7 pr-7">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 pt-0 py-6 text-left">
          The Resource Vault.
        </h1>

        <Carousel carouselData={finalCarouselData} />
        
        <div className="text-black flex mt-5 ml-0 p-0 items-center">
          {categories.map((cat) => {
            const isActive = selectedType === cat.value || (!selectedType && !cat.value);
            return (
              <Link
                key={cat.label}
                href={cat.value ? `/blog?type=${cat.value}` : `/blog`}
                className={`ml-2 ${cat.width} py-1 rounded-md text-center text-sm transition ${
                  isActive 
                    ? "bg-[#EBEAFB] font-semibold" 
                    : "bg-gray-200 hover:bg-[#EBEAFB]"
                }`}
              >
                {cat.label}
              </Link>
            );
          })}
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
                className="bg-white rounded-lg transition flex flex-col h-65"
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

                <div className="flex flex-col justify-between flex-1">
                  <div>
                   <p className="text-gray-600 mt-2">
                    {post.type}
                   </p>
                    <h2 className="text-lg font-bold text-black mt-0 line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-600">
                      {post.excerpt || 'Error loading preview, click to read.'}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-center items-center gap-4 ml-0 mt-10 mb-6">
          {page > 1 ? (
            <Link
              href={`/blog?${selectedType ? `type=${selectedType}&` : ''}page=${page - 1}`}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium text-black transition flex items-center justify-center"
            >
              <HiArrowSmLeft className="w-5 h-5"/>
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed flex items-center justify-center">
              <HiArrowSmLeft className="w-5 h-5"/>
            </span>
          )}

          <span className="text-sm text-gray-700 font-medium">
            Page {page} of {totalPages || 1}
          </span>

          {page < totalPages ? (
            <Link
              href={`/blog?${selectedType ? `type=${selectedType}&` : ''}page=${page + 1}`}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium text-black transition flex items-center justify-center"
            >
              <HiArrowSmRight className="w-5 h-5"/>
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed flex items-center justify-center">
              <HiArrowSmRight className="w-5 h-5"/>
            </span>
          )}
        </div>

      </section>
    </main>
  );
}

function BlogLoadingSkeleton() {
  return (
    <div className="flex-1 flex mx-auto flex-col w-full max-w-7xl justify-between pt-0 mt-0 pl-7 pr-7 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="h-65 bg-gray-200 rounded-lg"></div>
          <div className="h-65 bg-gray-200 rounded-lg"></div>
          <div className="h-65 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}