// utils/uploadImage.ts
import { supabase } from '@/lib/supabaseClient'

export async function uploadImage(file: File): Promise<string | null> {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Date.now()}.${fileExt}`
  const filePath = `${fileName}`

  const { error } = await supabase.storage
    .from('post-images')
    .upload(filePath, file)

  if (error) {
    console.error('Image upload error:', error.message)
    return null
  }

  // Get the public URL
  const { data } = supabase.storage
    .from('post-images')
    .getPublicUrl(filePath)

  return data?.publicUrl || null
}
