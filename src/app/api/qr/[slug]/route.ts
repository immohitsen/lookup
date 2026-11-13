import { NextRequest, NextResponse } from 'next/server';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

interface Ctx {
  params: Promise<{ slug: string }>;
}

export async function GET(req: NextRequest, { params }: Ctx) {
  const { slug } = await params;
  const format = req.nextUrl.searchParams.get('format') ?? 'png';
  const isBio = req.nextUrl.searchParams.get('isBio') === 'true';
  const viewOnly = req.nextUrl.searchParams.get('view') === '1';
  const darkColor = req.nextUrl.searchParams.get('color') ?? '#540B0E';
  const lightColor = req.nextUrl.searchParams.get('bg') ?? '#FAF7EE';

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const targetUrl = isBio ? `${appUrl}/${slug}` : `${appUrl}/s/${slug}`;

  if (format === 'svg') {
    const svg = await QRCode.toString(targetUrl, {
      type: 'svg',
      margin: 2,
      color: { dark: darkColor, light: lightColor },
    });
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        ...(viewOnly ? {} : { 'Content-Disposition': `attachment; filename="${slug}-qr.svg"` }),
      },
    });
  }

  const buffer = await QRCode.toBuffer(targetUrl, {
    type: 'png',
    margin: 2,
    scale: 10,
    color: { dark: darkColor, light: lightColor },
  });

  const headers: Record<string, string> = {
    'Content-Type': 'image/png',
  };

  if (!viewOnly) {
    headers['Content-Disposition'] = `attachment; filename="${slug}-qr.png"`;
  }

  return new NextResponse(buffer as unknown as BodyInit, { headers });
}
