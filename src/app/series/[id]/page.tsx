import { getSeriesDetails, getImageUrl } from "@/lib/tmdb";
import Link from "next/link";
import { ArrowLeft, Star, Calendar } from "lucide-react";
import UltimatePlayer from "@/components/player/UltimatePlayer";
import BentoGrid from "@/components/ui/BentoGrid";

export default async function SeriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const series = await getSeriesDetails(id);
  const posterUrl = getImageUrl(series.poster_path, "w500");
  const backdropUrl = getImageUrl(series.backdrop_path, "original");

  const cast = series.credits?.cast?.slice(0, 10) || [];
  const recommendations = series.recommendations?.results?.slice(0, 20) || [];

  return (
    <div className="min-h-screen bg-obsidian pt-14 sm:pt-16 relative">
      
      {/* Full-bleed backdrop */}
      <div className="absolute top-0 left-0 right-0 h-[500px] sm:h-[600px] overflow-hidden z-0 pointer-events-none">
        <img src={backdropUrl} alt="" className="w-full h-full object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/70 to-obsidian" />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian/60 to-obsidian/40" />
      </div>

      {/* Player */}
      <div className="relative z-10 max-w-6xl mx-auto px-2 sm:px-4 md:px-8 pt-2 sm:pt-4">
        <Link href="/" className="inline-flex items-center gap-1.5 text-silver hover:text-white transition-colors text-xs sm:text-sm mb-3 sm:mb-5 px-2 group">
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>
        <UltimatePlayer 
          movieId={id} 
          type="tv" 
          imdbId={series.external_ids?.imdb_id} 
          title={series.name} 
          seasons={series.seasons} 
          releaseDate={series.first_air_date}
        />
      </div>

      {/* Details */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-4 md:px-8 pt-6 sm:pt-10 pb-16">
        <div className="flex gap-5 sm:gap-8">
          <div className="hidden sm:block w-[120px] md:w-[200px] shrink-0">
            <div className="w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)] glow-indigo">
              <img src={posterUrl} alt="Poster" className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="flex-1 space-y-3 sm:space-y-5 min-w-0">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
              {series.name || series.title}
            </h1>

            <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm">
              {series.vote_average > 0 && (
                <span className="flex items-center gap-1 text-brand-secondary font-bold bg-brand-secondary/10 px-2.5 py-1 rounded-lg">
                  <Star className="w-3 h-3 fill-current" />
                  {(series.vote_average * 10).toFixed(0)}%
                </span>
              )}
              <span className="text-white/30 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {(series.first_air_date || series.release_date)?.split('-')[0]}
              </span>
              {series.number_of_seasons && (
                <span className="text-white/30">
                  {series.number_of_seasons} Season{series.number_of_seasons > 1 ? 's' : ''}
                </span>
              )}
            </div>

            {series.tagline && (
              <p className="text-brand-primary/60 text-xs sm:text-sm italic">{series.tagline}</p>
            )}

            <p className="text-white/45 text-sm leading-relaxed">
              {series.overview}
            </p>

            <div className="flex flex-wrap gap-2">
              {series.genres?.map((g) => (
                <span key={g.id} className="px-3 py-1 bg-brand-primary/[0.06] text-brand-primary/80 text-[11px] rounded-lg border border-brand-primary/10 font-medium">
                  {g.name}
                </span>
              ))}
            </div>

            {/* Seasons */}
            {series.seasons && series.seasons.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold text-white mb-2">Seasons</h3>
                <div className="flex gap-1.5 flex-wrap">
                  {series.seasons.filter(s => s.season_number > 0).map((season) => (
                    <span key={season.id} className="px-3 py-1.5 bg-brand-primary/[0.06] border border-brand-primary/10 rounded-lg text-[11px] text-brand-primary/70 font-medium">
                      S{season.season_number} <span className="text-white/25">• {season.episode_count} eps</span>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-5 rounded-full bg-gradient-to-b from-brand-primary to-brand-secondary" />
              <h3 className="text-sm font-bold text-white">Cast</h3>
            </div>
            <div className="flex gap-4 overflow-x-auto hide-scroll pb-2">
              {cast.map((member) => (
                <div key={member.id} className="shrink-0 w-16 sm:w-20 text-center group">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-surface border-2 border-white/[0.06] mx-auto group-hover:border-brand-primary/30 transition-colors">
                    {member.profile_path ? (
                      <img src={getImageUrl(member.profile_path, "w500")} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/15 text-lg font-bold">{member.name[0]}</div>
                    )}
                  </div>
                  <p className="text-white/60 text-[10px] font-medium mt-2 line-clamp-1">{member.name}</p>
                  <p className="text-white/25 text-[9px] line-clamp-1">{member.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <BentoGrid title="More Like This" movies={recommendations} />
          </div>
        )}
      </div>
    </div>
  );
}
