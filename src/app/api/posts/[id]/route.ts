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
        category,
        tags,
        featured_image,
        publish,
      })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Post updated successfully' });
  } catch {
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
