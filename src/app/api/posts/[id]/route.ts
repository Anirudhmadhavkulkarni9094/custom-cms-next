import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import slugify from 'slugify';

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { data, error } = await supabase
    .from('post_full_data') // use your VIEW here
    .select('*')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(data);
}

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const id = context.params.id;

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

    // 1. Update main post data
    const { error: postError } = await supabase
      .from('posts')
      .update({
        title,
        slug,
        content,
        category_id,
        featured_image,
        publish
      })
      .eq('id', id);

    if (postError) {
      console.error('Error updating post:', postError.message);
      return NextResponse.json({ error: postError.message }, { status: 500 });
    }

    // 2. Update tags (many-to-many)
    // Step 1: Delete existing tags
    const { error: deleteError } = await supabase
      .from('post_tag')
      .delete()
      .eq('post_id', id);

    if (deleteError) {
      console.error('Error deleting old tags:', deleteError.message);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    // Step 2: Insert new tags
    const tagInserts = tags_array.map((tag: any) => ({
      post_id: id,
      tag_id: tag.id
    }));

    const { error: insertError } = await supabase
      .from('post_tag')
      .insert(tagInserts);

    if (insertError) {
      console.error('Error inserting new tags:', insertError.message);
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Post updated successfully' });

  } catch (err: any) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  const { error } = await supabase.from('posts').delete().eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: 'Post deleted successfully' });
}
