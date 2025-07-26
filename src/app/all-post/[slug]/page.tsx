"use client";
import { supabase } from '@/lib/supabaseClient';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

type Post = {
  id: string;
  title: string;
  category: { id: string; label: string };
  tags: { id: string; label: string }[];
  featured_image: string;
  content: string;
  publish: boolean;
  slug: string;
  created_at: string;
};

async function getPost(slug: string) {
  const { data, error } = await supabase
    .from('post_full_data')
    .select('*')
    .eq('slug', slug)
    .single<Post>();
  return { data, error };
}

export default function PostPreview({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPost(params.slug).then(({ data, error }) => {
      if (error || !data) {
        setPost(null);
      } else {
        setPost(data);
      }
      setLoading(false);
    });
  }, [params.slug]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }
  if (!post) {
    notFound();
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <article className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-gray-200">
        {/* Header */}
        <header className="p-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>{new Date(post.created_at).toLocaleString()}</span>
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium">
              {post.category?.label}
            </span>
          </div>
        </header>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="relative aspect-video w-full">
            <Image
              src={post.featured_image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Content */}
        <section className="prose prose-lg max-w-none px-8 py-10 text-gray-800">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </section>

        {/* Tags */}
        <footer className="px-8 pb-10 border-t border-gray-100">
          {post.tags?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm text-gray-600 font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-300 transition"
                  >
                    #{tag.label}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!post.publish && (
            <div className="mt-6 text-sm font-semibold text-yellow-800 bg-yellow-100 px-4 py-2 rounded-md border border-yellow-300">
              This post is in <strong>draft</strong> mode and not publicly visible.
            </div>
          )}
        </footer>
      </article>
    </div>
  );
}
