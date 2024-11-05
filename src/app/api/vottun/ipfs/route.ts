import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // Debugging log
    console.log('Form data received:', {
      filename: formData.get('filename'),
      hasFile: formData.has('file')
    });

    // Check if file is present
    const file = formData.get('file');
    if (!file) {
      console.error("File was not found in form data");
      return NextResponse.json(
        { error: 'File is missing from request' },
        { status: 400 }
      );
    }

    // Debug API Key (only for development/testing; remove in production)
    console.log("Using Vottun API Key:", process.env.NEXT_PUBLIC_VOTTUN_API_KEY);
    console.log("Using Vottun Secret Key:", process.env.NEXT_PUBLIC_APPLICATION_ID);

    const response = await fetch('https://ipfsapi-v2.vottun.tech/ipfs/v2/file/upload', {
      method: 'POST',
      headers: {
        // Use the public environment variable for testing
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_VOTTUN_API_KEY??""}`,
        'x-application-vkn': process.env.NEXT_PUBLIC_APPLICATION_ID??""
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Vottun API error:', error);
      return NextResponse.json(
        { error: `Failed to upload to IPFS: ${error}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('IPFS upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload to IPFS' },
      { status: 500 }
    );
  }
}
