import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import FloatingHeader from "../../../components/navBar"

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]`;

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
      <div className="flex flex-col gap-4">
        <Link href="/resource" className="hover:underline">
          ← Back to posts
        </Link>
        <h1 className="text-2xl font-bold mt-4">Post not found</h1>
      </div>
    );
  }

  const postImageUrl = post.image
    ? urlFor(post.image)?.width(550).height(310).url()
    : null;

  return (
    <>
      <FloatingHeader />
      <Link href="/resource" className="hover:underline">
        ← Back to posts
      </Link>
      {postImageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={postImageUrl}
          alt={post.title}
          className="aspect-video rounded-xl"
          width="550"
          height="310"
        />
      )}
      <h1 className="text-4xl font-bold mb-8">{post.title}</h1>
      <div className="prose">
        {post.publishedAt && (
          <p>Published: {new Date(post.publishedAt).toLocaleDateString()}</p>
        )}
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
    </>
  );
}

export default function PostPage(props: { params: Promise<{ slug: string }> }) {
  return (
    <main className="container mx-auto min-h-screen max-w-7xl  flex flex-col gap-4 text-black">
      <Suspense fallback={<div className="animate-pulse">Loading post...</div>}>
        <PostContent params={props.params} />
      </Suspense>
    </main>
  );
}