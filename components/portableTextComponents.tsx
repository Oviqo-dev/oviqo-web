import type { PortableTextComponents } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

function getYouTubeId(url?: string): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    if (u.hostname === "youtu.be") return u.pathname.slice(1) || null;
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname === "/watch") return u.searchParams.get("v");
      const match = u.pathname.match(/^\/(embed|shorts|live)\/([^/?]+)/);
      if (match) return match[2];
    }
  } catch {
    /* invalid URL */
  }
  return null;
}

export function getPortableTextComponents(
  idByKey: Record<string, string>
): PortableTextComponents {
  // _key is optional in the Portable Text types, so guard against undefined
  const idFor = (key?: string): string | undefined =>
    key ? idByKey[key] : undefined;

  return {
    block: {
      normal: ({ children }) => (
        <p className="mb-6 leading-relaxed text-gray-700">{children}</p>
      ),
      // The page title is the real <h1>, so body H1s render as <h2> with H1 sizing
      h1: ({ children, value }) => (
        <h2
          id={idFor(value._key)}
          className="scroll-mt-28 mt-12 mb-4 text-4xl font-bold text-black"
        >
          {children}
        </h2>
      ),
      h2: ({ children, value }) => (
        <h2
          id={idFor(value._key)}
          className="scroll-mt-28 mt-10 mb-4 text-3xl font-bold text-black"
        >
          {children}
        </h2>
      ),
      h3: ({ children, value }) => (
        <h3
          id={idFor(value._key)}
          className="scroll-mt-28 mt-8 mb-3 text-2xl font-semibold text-black"
        >
          {children}
        </h3>
      ),
      blockquote: ({ children }) => (
        <blockquote className="my-8 rounded-r-lg border-l-4 border-black bg-[#F7F7FF] px-6 py-4 italic text-gray-700">
          {children}
        </blockquote>
      ),
    },

    list: {
      bullet: ({ children }) => (
        <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700">{children}</ol>
      ),
    },

    marks: {
      link: ({ children, value }) => {
        const href: string = value?.href ?? "#";
        const external = /^https?:\/\//.test(href);
        return (
          <a
            href={href}
            className="font-medium text-black underline underline-offset-2 hover:text-gray-600"
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        );
      },
    },

    types: {
      image: ({ value }) => {
        if (!value?.asset) return null;
        const src = urlFor(value)?.width(1200).fit("max").auto("format").url();
        if (!src) return null;

        return (
          <figure className="my-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={value.alt || value.caption || ""}
              loading="lazy"
              className="h-auto w-full rounded-xl object-cover"
            />
            {value.caption && (
              <figcaption className="mt-3 text-center text-sm text-gray-500">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      youtubeEmbed: ({ value }) => {
        const id = getYouTubeId(value?.url);
        if (!id) return null;

        return (
          <div className="my-10 aspect-video w-full overflow-hidden rounded-xl bg-[#F7F7FF]">
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}`}
              title="YouTube video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
            />
          </div>
        );
      },
    },
  };
}