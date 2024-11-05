// src/app/api/vottun/ipfs/metadata/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Log the incoming metadata for debugging
    console.log('Metadata received:', body)

    console.log(`Bearer ${process.env.NEXT_PUBLIC_VOTTUN_API_KEY}`);
    

    const response = await fetch('https://ipfsapi-v2.vottun.tech/ipfs/v2/file/metadata', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOTTUN_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('Vottun API error:', error)
      throw new Error('Failed to upload metadata to IPFS')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('IPFS metadata upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload metadata to IPFS' },
      { status: 500 }
    )
  }
}