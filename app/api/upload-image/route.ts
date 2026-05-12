import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { createClient } from '@/lib/supabase/server'

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || '',
  },
})

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const index = formData.get('index') as string | null

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10MB)' }, { status: 400 })
    }

    const timestamp = Date.now()
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const sanitizedExt = ext.replace(/[^a-z0-9]/g, '')
    const key = `${user.id}/${timestamp}-${index || '0'}-001.${sanitizedExt}`

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    await s3Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME || 'motel-photos',
      Key: key,
      Body: buffer,
      ContentType: file.type,
    }))

    // Return the proxy URL for display
    const proxyUrl = `/api/images/${key}`

    return NextResponse.json({ url: proxyUrl, key })
  } catch (error) {
    console.error('❌ Erreur upload R2:', error)
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 })
  }
}
