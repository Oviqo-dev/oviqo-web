import { Suspense } from "react";
import { type SanityDocument } from "next-sanity";
import { cacheLife, cacheTag } from "next/cache";
import { client } from "@/sanity/client";
import Carousel from "../../components/carousel";
import FloatingHeader from "../../components/navBar";
import Link from "next/link";
import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import Image from "next/image";
import blogImage from "../../public/blogImage.png";
import { HiArrowSmLeft, HiArrowSmRight } from "react-icons/hi";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;


const POSTS_QUERY = `{
  "posts": *[
    _type == "post"
    && defined(slug.current)
    && (!defined($type) || type == $type)
  ] | order(publishedAt desc)[$start...$end]{
    _id,
    type,
    title,
    slug,
    image,
    publishedAt,
    "preview": pt::text(body[0...3]),
    "author": author->name,
    "authorTitle": author->title,
    "authorImage": author->image
  },
  "total": count(*[
    _type == "post"
    && defined(slug.current)
    && (!defined($type) || type == $type)
  ])
}`;

type PostsResult = { posts: SanityDocument[]; total: number };

// Cached per (start, end, type). Call revalidateTag("posts") from a
// Sanity webhook to refresh immediately when content changes.
async function getPosts(
  start: number,
  end: number,
  type: string | null
): Promise<PostsResult> {
  "use cache";
  cacheLife("hours");
  cacheTag("posts");

  return client.fetch<PostsResult>(POSTS_QUERY, { start, end, type });
}

const categories = [
  { label: "All", value: undefined, width: "w-10" },
  { label: "Reports", value: "Report", width: "w-20" },
  { label: "News", value: "News", width: "w-15" },
  { label: "Articles", value: "Article", width: "w-20" },
  { label: "Blogs", value: "Blog", width: "w-15" },
];

const PAGE_SIZE = 9;

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
    </>
  );
}

async function BlogContent({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; type?: string }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const selectedType = resolvedSearchParams.type;

  const start = (page - 1) * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const { posts, total } = await getPosts(start, end, selectedType ?? null);
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const carouselData = posts.slice(0, 4).map((post) => ({
    title: post.title,
    type: post.type || "Article",
    author: post.author || "Oviqo Team",
    authorTitle: post.authorTitle || "Co-Founder, Oviqo",
    slug: post.slug.current,
    imageUrl: post.image
      ? urlFor(post.image)?.width(1200).auto("format").quality(75).url()
      : null,
    pfpUrl: post.authorImage
      ? urlFor(post.authorImage)?.width(100).height(100).auto("format").url()
      : null,
  }));

  const finalCarouselData =
    carouselData.length > 0
      ? carouselData
      : [
          {
            title: selectedType
              ? `No ${selectedType.toLowerCase()} found`
              : "Posts failed to load",
            type: "Notice",
            author: "Ahad Alam",
            authorTitle: "Co-Founder, Oviqo",
          },
        ];

  const pageHref = (p: number) =>
    `/resource?${selectedType ? `type=${selectedType}&` : ""}page=${p}`;

  return (
    <main className="flex-1 flex mx-auto flex-col w-full max-w-7xl justify-between pt-0 mt-0 pl-7 pr-7">
      <section>
        <h1 className="text-3xl font-bold text-slate-900 pt-0 py-6 text-left">
          The Resource Vault.
        </h1>

        <Carousel carouselData={finalCarouselData} />

        <div className="text-black flex mt-5 ml-0 p-0 items-center">
          {categories.map((cat) => {
            const isActive =
              selectedType === cat.value || (!selectedType && !cat.value);
            return (
              <Link
                key={cat.label}
                href={cat.value ? `/resource?type=${cat.value}` : `/resource`}
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
              ? urlFor(post.image)?.width(400).height(250).auto("format").url()
              : null;

            return (
              <Link
                key={post._id}
                href={`/resource/${post.slug.current}`}
                className="bg-white rounded-lg transition flex flex-col h-65"
              >
                <div className="w-full h-40 bg-gray-100 relative rounded-lg overflow-hidden">
                  {imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imageUrl}
                      alt={post.title}
                      width={400}
                      height={250}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={blogImage}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <p className="text-gray-600 mt-2">{post.type}</p>
                    <h2 className="text-lg font-bold text-black mt-0 line-clamp-1">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 line-clamp-2">
                      {post.preview
                        ? `${post.preview.slice(0, 50)}...`
                        : "Error loading preview, click to read."}
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
              href={pageHref(page - 1)}
              aria-label="Previous page"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium text-black transition flex items-center justify-center"
            >
              <HiArrowSmLeft className="w-5 h-5" />
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed flex items-center justify-center">
              <HiArrowSmLeft className="w-5 h-5" />
            </span>
          )}

          <span className="text-sm text-gray-700 font-medium">
            Page {page} of {totalPages || 1}
          </span>

          {page < totalPages ? (
            <Link
              href={pageHref(page + 1)}
              aria-label="Next page"
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 text-sm font-medium text-black transition flex items-center justify-center"
            >
              <HiArrowSmRight className="w-5 h-5" />
            </Link>
          ) : (
            <span className="px-4 py-2 bg-gray-100 rounded-md text-sm font-medium text-gray-400 cursor-not-allowed flex items-center justify-center">
              <HiArrowSmRight className="w-5 h-5" />
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
        <div className="h-8 bg-[#EBEAFB] rounded w-1/4"></div>
        <div className="h-64 bg-[#EBEAFB] rounded-lg"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="h-65 bg-[#EBEAFB] rounded-lg"></div>
          <div className="h-65 bg-[#EBEAFB] rounded-lg"></div>
          <div className="h-65 bg-[#EBEAFB] rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}