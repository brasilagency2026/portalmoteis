import { NextRequest } from 'next/server'
import { S3Client, GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

const BUCKET = process.env.R2_BUCKET_NAME || 'motel-photos'
const SUPABASE_STORAGE_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/motel-photos`



export async function GET(
  request: NextRequest,
  context: { params: Promise<{ url: string[] }> }
) {
  const params = await context.params
  const imagePath = params.url?.join('/') || ''

  if (!imagePath) {
    return new Response('Path requise', { status: 400 })
  }

  // Try R2 first
  try {
    const command = new GetObjectCommand({ Bucket: BUCKET, Key: imagePath })
    const response = await s3Client.send(command)
    
    if (response.Body) {
      const bytes = await response.Body.transformToByteArray()
      
      return new Response(bytes, {
        status: 200,
        headers: {
          'Content-Type': response.ContentType || 'image/jpeg',
          'Content-Length': bytes.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'X-Proxy-Source': 'R2',
        },
      })
    }
  } catch (error: unknown) {
    const errName = error instanceof Error ? error.name : ''
    if (errName !== 'NoSuchKey') {
      console.error('❌ Erreur R2:', error)
    }
  }

  // Fallback: try Supabase and auto-migrate to R2
  try {
    const supabaseUrl = `${SUPABASE_STORAGE_URL}/${imagePath}`
    const res = await fetch(supabaseUrl)
    
    if (res.ok) {
      const contentType = res.headers.get('content-type') || 'image/jpeg'
      const arrayBuffer = await res.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      // Migrate to R2 in background
      s3Client.send(new PutObjectCommand({
        Bucket: BUCKET,
        Key: imagePath,
        Body: buffer,
        ContentType: contentType,
      })).catch(err => console.error('Migration R2 échouée:', err))

      return new Response(buffer, {
        status: 200,
        headers: {
          'Content-Type': contentType,
          'Content-Length': buffer.length.toString(),
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'X-Proxy-Source': 'Supabase',
        },
      })
    }
  } catch (error) {
    console.error('❌ Erreur Supabase fallback:', error)
  }

  return new Response(JSON.stringify({ 
    error: 'Image non trouvée',
    path: imagePath,
    r2_bucket: BUCKET,
    supabase_url: `${SUPABASE_STORAGE_URL}/${imagePath}`
  }), { 
    status: 404,
    headers: { 
      'Content-Type': 'application/json',
      'X-Proxy-Error': 'NotFound' 
    }
  })
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  })
}
