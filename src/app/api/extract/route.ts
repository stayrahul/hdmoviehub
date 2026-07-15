import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  // 1. Grab the TMDB ID from the incoming request URL
  const searchParams = req.nextUrl.searchParams;
  const tmdbId = searchParams.get('tmdbId');

  if (!tmdbId) {
    return NextResponse.json({ error: 'Missing TMDB ID' }, { status: 400 });
  }

  try {
    // 2. Step One: Ping the Consumet API to translate the TMDB ID into a Host ID
    // We are using the FlixHQ provider as our primary scraper target
    const searchRes = await fetch(`https://api.consumet.org/movies/flixhq/${tmdbId}`, {
      // Adding a small cache bypass to ensure fresh links
      cache: 'no-store' 
    });
    
    if (!searchRes.ok) throw new Error('Host search failed');
    const searchData = await searchRes.json();
    
    // If the scraper cannot find this specific movie, trigger the 404
    if (!searchData.results || searchData.results.length === 0) {
       return NextResponse.json({ error: 'Media not found on primary host' }, { status: 404 });
    }

    const mediaId = searchData.results[0].id;

    // 3. Step Two: Extract the raw .m3u8 HLS playlist and subtitle files
    const streamRes = await fetch(`https://api.consumet.org/movies/flixhq/watch?mediaId=${mediaId}`);
    
    if (!streamRes.ok) throw new Error('Extraction failed');
    const streamData = await streamRes.json();

    // 4. Step Three: Filter the payload to find the 1080p or highest quality auto-stream
    const bestSource = streamData.sources.find((src: { quality: string, url: string }) => 
      src.quality === '1080p' || src.quality === 'auto'
    ) || streamData.sources[0];

    // 5. Fire the payload back to your UltimatePlayer component
    return NextResponse.json({
      sourceUrl: bestSource.url,
      subtitles: streamData.subtitles || []
    }, { status: 200 });

  } catch (error) {
    // If anything fails (host down, scraper blocked), we return a 500 error.
    // Your UltimatePlayer component will catch this 500 error and instantly boot the Iframe Fallback.
    console.error("Pipeline Error:", error);
    return NextResponse.json({ error: 'Extraction pipeline failed' }, { status: 500 });
  }
}
