import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import FloatingHeader from "../../../components/navBar"
import userProfile from '../../../public/memoji.png';
import Image from 'next/image';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  ...,
  "author": author->name,
  "authorTitle": author->title
}`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export async function generateStaticParams() {
  const SLUGS_QUERY = `*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
  const posts = await client.fetch<{ slug: string }[]>(SLUGS_QUERY);

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function PostContent({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const post = await client.fetch<SanityDocument>(
    POST_QUERY,
    { slug: resolvedParams.slug },
    options
  );

  if (!post) {
    return (
      <div className="flex flex-col gap-4 p-6">
        <Link href="/resource" className="hover:underline">
          Back to posts
        </Link>
        <h1 className="text-2xl font-bold mt-4">Post not found</h1>
      </div>
    );
  }

  function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <div className="w-full bg-[#F7F7FF]">
      <div className="max-w-7xl mx-auto">
        <FloatingHeader />
        <section className="w-full">
          <div className="flex w-full justify-between items-start gap-8 pl-6 pr-6 pb-10">
            
           
            <div className="w-3/5">  
              <Link href="/resource" className="hover:underline text-gray-600 underline">
                Back to posts
              </Link>

              <div className="prose mt-4 text-gray-600">
                {post.publishedAt && (() => {
                  const date = new Date(post.publishedAt);
                  const day = date.getDate();
                  const suffix = getOrdinalSuffix(day);
                  const month = date.toLocaleString('en-GB', { month: 'long' });
                  const year = date.getFullYear();

                  return <p>Published: {`${day}${suffix} ${month} ${year}`}</p>;
                })()}
              </div>

              <h1 className="text-4xl font-bold mb-6 mt-2">{post.title}</h1>
              
              <div className="flex items-center pt-0 mt-0">
                <div className="w-12.5 h-12.5 rounded-full bg-white flex-shrink-0">
                  {post.pfpUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={post.pfpUrl} 
                      alt={`Profile picture of ${post.author}`}
                      className="w-12 h-12 rounded-full object-cover"  
                    />
                  ) : (
                    <Image 
                      src={userProfile} 
                      alt="Profile picture of the author"
                      placeholder="blur"
                      className="w-12 h-12 rounded-full"
                    />
                  )}
                </div>
                <div className="pl-3">
                  <p className="mb-0 pb-0 font-medium">{post.author}</p>
                  <p className="text-gray-600 mt-0 pt-0 text-sm">{post.authorTitle}</p>
                </div>
              </div>
            </div>

            {/* Right Column (Featured Image) */}
            <div className="w-2/5 flex justify-end">
              {postImageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={postImageUrl}
                  alt={post.title}
                  className="aspect-video rounded-xl object-cover w-full"
                />
              )}
            </div>

          </div>
        </section>

        <section>
            <div className="flex-3">
              <div className="max-w-[30%]"></div>

              <div className="max-w-[70%]"></div>

            </div>


        </section>

      </div>
    </div>
  );
}

export default function PostPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <main className="min-h-screen flex flex-col gap-4 text-black">
      <Suspense fallback={<div className="animate-pulse p-6">Loading post...</div>}>
        <PostContent params={props.params} />
      </Suspense>
    </main>
  );
}