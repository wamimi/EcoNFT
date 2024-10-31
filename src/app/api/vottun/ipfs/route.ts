// src/app/api/vottun/ipfs/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    
    // Log the form data for debugging
    console.log('Form data received:', {
      filename: formData.get('filename'),
      hasFile: formData.has('file')
    });

    const response = await fetch('https://ipfsapi-v2.vottun.tech/ipfs/v2/file/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOTTUN_API_KEY}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Vottun API error:', error)
      throw new Error('Failed to upload to IPFS')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('IPFS upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload to IPFS' },
      { status: 500 }
    )
  }
}