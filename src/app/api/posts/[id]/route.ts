// app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import slugify from 'slugify';

export async function GET(
  _: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', resolvedParams.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}


export async function PUT(
  req: NextRequest,
   { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;

  const id = resolvedParams.id;
  try {
    const { title, content, category, tags, featured_image, publish } = await req.json();

    const slug = slugify(title || '', { lower: true, strict: true });

    const { error } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        category_id: category?.id ?? null,
        featured_image,
        publish,
      })
      .eq('id', id);

    if (error) {
      console.error('Update error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Handle tags (optional if you have many-to-many logic)
    if (tags && Array.isArray(tags)) {
      const { error: deleteError } = await supabase
        .from('post_tag')
        .delete()
        .eq('post_id', id);

      if (deleteError) {
        console.error('Tag delete error:', deleteError.message);
        return NextResponse.json({ error: deleteError.message }, { status: 500 });
      }

      const tagInsert = tags.map((tag: any) => ({
        post_id: id,
        tag_id: tag.id,
      }));

      const { error: insertError } = await supabase
        .from('post_tag')
        .insert(tagInsert);

      if (insertError) {
        console.error('Tag insert error:', insertError.message);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  const { error } = await supabase.from('posts').delete().eq('id', resolvedParams.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post deleted' });
}
