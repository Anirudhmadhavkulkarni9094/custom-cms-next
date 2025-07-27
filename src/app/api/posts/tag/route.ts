import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
    const { data,  error } = await supabase
        .from('tag')
        .select('*');

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const { label, slug, description } = await req.json();

  const { data, error } = await supabase.from("tag").insert([
    {
      label,
      slug,
      description,
    },
  ]);

  if (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Category created", data }, { status: 200 });
}
