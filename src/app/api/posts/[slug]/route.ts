// app/api/posts/[slug]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import slugify from 'slugify';

// ------------------- GET -------------------
export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

// ------------------- PUT -------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: oldSlug } = await params;

  try {
    const { title, content, category, tags, featured_image, publish } = await req.json();

    // Always regenerate slug from updated title
    const newSlug = slugify(title || '', { lower: true, strict: true });

    // Update post
    const { data: updatedPost, error } = await supabase
      .from('posts')
      .update({
        title,
        slug: newSlug,
        content,
        category_id: category?.id ?? null,
        featured_image,
        publish,
      })
      .eq('slug', oldSlug)
      .select('id') // get post id for tags
      .single();

    if (error) {
      console.error('Update error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Handle tags
    if (tags && Array.isArray(tags)) {
      const postId = updatedPost.id;

      // Remove old tags
      const { error: deleteError } = await supabase
        .from('post_tag')
        .delete()
        .eq('post_id', postId);

      if (deleteError) {
        console.error('Tag delete error:', deleteError.message);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }

      // Insert new tags
      const tagInsert = tags.map((tag: any) => ({
        post_id: postId,
        tag_id: tag.id,
      }));

      const { error: insertError } = await supabase.from('post_tag').insert(tagInsert);
      if (insertError) {
        console.error('Tag insert error:', insertError.message);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({
      message: 'Post updated successfully',
      slug: newSlug,
    });
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ------------------- DELETE -------------------
export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { error } = await supabase.from('posts').delete().eq('slug', slug);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post deleted' });
}
