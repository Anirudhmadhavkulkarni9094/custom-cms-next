// app/api/posts/route.ts
import { supabase } from '@/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slugify';

export async function GET() {
  const { data, error } = await supabase
    .from('post_full_data') // <-- use the view
    .select('*');

  if (error) {
    console.error('Error fetching posts:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  try {
    const {
      title,
      content,
      category_object,
      tags_array,
      featured_image,
      publish
    } = await req.json();

    const slug = slugify(title || '', { lower: true, strict: true });
    const category_id = category_object?.id || null;

    // 1. Insert post
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert({
        title,
        slug,
        content,
        featured_image,
        publish,
        category_id
      })
      .select()
      .single();

    if (postError) {
      return NextResponse.json({ error: postError.message }, { status: 500 });
    }

    // 2. Insert post_tag entries
    const tagData = tags_array?.map((tag: { id: number }) => ({
      post_id: post.id,
      tag_id: tag.id
    })) || [];

    if (tagData.length > 0) {
      const { error: tagInsertError } = await supabase
        .from('post_tag')
        .insert(tagData);

      if (tagInsertError) {
        return NextResponse.json({ error: tagInsertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Post created successfully', post });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}