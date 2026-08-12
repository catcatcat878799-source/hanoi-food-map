/* Design philosophy: Vietnamese Street Food Journal — warm editorial field notes, map-stamp branding, chopstick dividers, and photo-led storytelling. */
import { useState, useMemo, useCallback } from "react";
import {
  restaurants,
  categories,
  videoId,
  type Restaurant,
} from "@/lib/restaurants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Award,
  BarChart3,
  ChevronDown,
  ChevronUp,
  Clock,
  Coffee,
  ExternalLink,
  House,
  ListFilter,
  MapPin,
  MapPinned,
  Play,
  Search,
  SearchX,
  Share2,
  Soup,
  Sparkles,
  Utensils,
} from "lucide-react";
import { toast } from "sonner";

type CategoryId = (typeof categories)[number]["id"];

const categoryIcons: Record<CategoryId, typeof Sparkles> = {
  all: ListFilter,
  "fine-dining": Sparkles,
  local: House,
  "street-food": Soup,
  "cafe-dessert": Coffee,
};

function getInitialCategory(): CategoryId {
  if (typeof window === "undefined") return "all";

  const requestedCategory = new URLSearchParams(window.location.search).get(
    "category"
  );
  return categories.some(category => category.id === requestedCategory)
    ? (requestedCategory as CategoryId)
    : "all";
}

export default function Home() {
  const [activeCategory, setActiveCategory] =
    useState<CategoryId>(getInitialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesCategory =
        activeCategory === "all" || r.category === activeCategory;
      const normalizedQuery = searchQuery.trim().toLocaleLowerCase();
      const matchesSearch =
        normalizedQuery === "" ||
        [
          r.name,
          r.nameVi,
          r.food,
          r.foodDescription,
          r.address,
          r.district,
        ].some(value => value.toLocaleLowerCase().includes(normalizedQuery));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: restaurants.length };
    categories.forEach(cat => {
      if (cat.id !== "all") {
        counts[cat.id] = restaurants.filter(r => r.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const michelinCount = useMemo(
    () => restaurants.filter(r => r.michelin).length,
    []
  );

  const handleCategoryChange = useCallback((category: CategoryId) => {
    setActiveCategory(category);
    setVisibleCount(12);
    setExpandedId(null);

    const url = new URL(window.location.href);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    window.history.replaceState(
      null,
      "",
      `${url.pathname}${url.search}${url.hash}`
    );
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setVisibleCount(12);
    setExpandedId(null);
  }, []);

  const handleCardToggle = useCallback((id: number) => {
    setExpandedId(currentId => (currentId === id ? null : id));
  }, []);

  const handleShare = async (restaurant: Restaurant) => {
    const shareUrl = restaurant.mapsUrl;
    const shareText = `${restaurant.name} - ${restaurant.food}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `河內美食地圖 - ${restaurant.name}`,
          text: shareText,
          url: shareUrl,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError")
          return;
      }
    }

    await copyToClipboard(shareUrl);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("已複製 Google Maps 連結！");
    } catch {
      toast.error("複製失敗");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0392B] via-[#A93226] to-[#7B241C]" />
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: "url(/manus-storage/hanoi-hero_2daacb96.jpg)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6E3] via-transparent to-transparent" />

        <div className="relative container py-14 md:py-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-5 md:mb-7">
              <div className="brand-seal" aria-hidden="true">
                <MapPinned className="h-5 w-5" />
                <span>HN</span>
              </div>
              <div>
                <p className="editorial-kicker text-white/80">
                  HANOI · STREET FOOD JOURNAL
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-white/70">
                  <span className="h-px w-8 bg-[#E8C07D]" />
                  <span>河內現場筆記 · 影片選店</span>
                </div>
              </div>
            </div>
            <div className="max-w-3xl">
              <p className="editorial-overline mb-3 text-[#F4D59A]">
                VOL. 01 / OLD QUARTER TO WEST LAKE
              </p>
              <h1
                className="text-4xl md:text-7xl font-bold text-white mb-4 md:mb-5 leading-[1.05]"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                河內美食地圖
              </h1>
              <p className="max-w-2xl text-balance text-base leading-relaxed text-white/80 md:text-xl">
                把影片裡的那一口，標回河內街頭。從老城湯鍋到湖畔咖啡，
                {restaurants.length} 間店家、片段時間與地圖入口，沿著鏡頭慢慢走。
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:flex sm:flex-wrap sm:gap-4">
              <div className="flex flex-col items-center gap-2 text-center text-white/90 sm:flex-row sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl font-bold">
                    {restaurants.length}
                  </span>
                </div>
                <span className="text-sm">間店家</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-white/90 sm:flex-row sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm">{michelinCount} 間米其林</span>
              </div>
              <div className="flex flex-col items-center gap-2 text-center text-white/90 sm:flex-row sm:text-left">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl font-bold">4</span>
                </div>
                <span className="text-sm">大分類</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="space-y-4 lg:sticky lg:top-6 lg:space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <label htmlFor="restaurant-search" className="sr-only">
                    搜尋店家、食物或地址
                  </label>
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="restaurant-search"
                    type="search"
                    placeholder="搜尋店家、食物或地址..."
                    value={searchQuery}
                    onChange={e => handleSearchChange(e.target.value)}
                    className="pl-10 bg-white border-[#E8D5B0]"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-[#5D4E37] mb-3 px-2">
                  分類篩選
                </h3>
                <div className="category-scroller flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
                  {categories.map(cat => {
                    const CategoryIcon = categoryIcons[cat.id];
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        aria-pressed={activeCategory === cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex w-auto flex-shrink-0 items-center justify-between gap-3 whitespace-nowrap px-3 py-2.5 rounded-lg text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] focus-visible:ring-offset-2 lg:w-full ${
                          activeCategory === cat.id
                            ? "bg-[#C0392B] text-white shadow-md"
                            : "text-[#5D4E37] hover:bg-[#F5E6CC]"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <CategoryIcon
                            className="h-4 w-4"
                            aria-hidden="true"
                          />
                          {cat.label}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            activeCategory === cat.id
                              ? "bg-white/20"
                              : "bg-[#E8D5B0]"
                          }`}
                        >
                          {categoryCounts[cat.id] || 0}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Stats Card */}
              <div className="hidden rounded-xl bg-gradient-to-br from-[#1B4332] to-[#0F2A1F] p-5 text-white lg:block">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" aria-hidden="true" /> 統計總覽
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">總店家數</span>
                    <span className="font-bold">{restaurants.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">米其林店家</span>
                    <span className="font-bold">{michelinCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">高級餐廳</span>
                    <span className="font-bold">
                      {categoryCounts["fine-dining"]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">在地小店</span>
                    <span className="font-bold">{categoryCounts["local"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">街頭小吃</span>
                    <span className="font-bold">
                      {categoryCounts["street-food"]}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">咖啡甜點</span>
                    <span className="font-bold">
                      {categoryCounts["cafe-dessert"]}
                    </span>
                  </div>
                </div>
              </div>

              {/* Video Source */}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-xl bg-[#F5E6CC] p-4 hover:bg-[#E8D5B0] transition-colors group lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C0392B] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[#5D4E37]">原始影片</div>
                    <div className="text-sm font-semibold text-[#1B4332]">
                      YouTube 來源
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Editorial section heading: the card grid reads like a curated issue, not a generic directory. */}
            <div className="mb-5 md:mb-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="editorial-kicker text-[#C0392B]">THE SHORTLIST</p>
                  <h2
                    className="mt-1 text-2xl font-bold text-[#1B4332] md:text-3xl"
                    style={{ fontFamily: "'Noto Serif TC', serif" }}
                  >
                    今晚，先從這裡開吃
                  </h2>
                </div>
                <p
                  className="text-sm text-[#5D4E37]"
                  role="status"
                  aria-live="polite"
                >
                  共{" "}
                  <span className="font-bold text-[#1B4332]">
                    {filteredRestaurants.length}
                  </span>{" "}
                  間店家
                  {activeCategory !== "all" && (
                    <span className="ml-1">
                      · {categories.find(c => c.id === activeCategory)?.label}
                    </span>
                  )}
                </p>
              </div>
              <div className="editorial-divider mt-4" aria-hidden="true">
                <span />
                <span className="editorial-divider-label">筷子記號 · 影片時間線</span>
                <span />
              </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 items-start gap-5 md:grid-cols-2">
              {visibleRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isExpanded={expandedId === restaurant.id}
                  onToggle={() => handleCardToggle(restaurant.id)}
                  onShare={() => void handleShare(restaurant)}
                  index={index}
                  isFeatured={index === 0}
                />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredRestaurants.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setVisibleCount(c => c + 12)}
                  variant="outline"
                  className="border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white"
                >
                  再顯示{" "}
                  {Math.min(12, filteredRestaurants.length - visibleCount)} 間
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-20">
                <SearchX
                  className="mx-auto mb-4 h-14 w-14 text-[#C0392B]"
                  aria-hidden="true"
                />
                <p className="text-lg text-[#5D4E37]">找不到符合條件的店家</p>
                <p className="text-sm text-[#8B7355] mt-2">
                  請嘗試其他搜尋關鍵字或分類
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white/70 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            河內美食地圖 · 基於 YouTube 影片分析建構 · {restaurants.length}{" "}
            間店家完整指南
          </p>
          <p className="text-xs mt-2 text-white/40">
            資料來源：YouTube 影片分析與 Google Maps 搜尋結果
          </p>
        </div>
      </footer>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function RestaurantCard({
  restaurant,
  isExpanded,
  onToggle,
  onShare,
  index,
  isFeatured,
}: {
  restaurant: Restaurant;
  isExpanded: boolean;
  onToggle: () => void;
  onShare: () => void;
  index: number;
  isFeatured: boolean;
}) {
  const Icon = categoryIcons[restaurant.category] || Sparkles;
  const [photoFailed, setPhotoFailed] = useState(false);
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${restaurant.timestampSeconds}&end=${restaurant.timestampSeconds + 45}&autoplay=1&rel=0`;
  const videoPanelId = `restaurant-video-${restaurant.id}`;

  return (
    <Card
      className={`group self-start overflow-hidden border-2 bg-white transition-all duration-300 ${
        isFeatured ? "md:col-span-2" : ""
      } ${
        isExpanded
          ? "border-[#C0392B] shadow-xl ring-2 ring-[#C0392B]/20"
          : "border-transparent hover:border-[#E8D5B0] hover:shadow-lg"
      }`}
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
      }}
    >
      {/* Restaurant Photo */}
      {restaurant.photoUrl && !photoFailed && (
        <div
          className={`relative w-full overflow-hidden bg-[#E8D5B0] ${
            isFeatured ? "h-56 md:h-72" : "h-40 md:h-44"
          }`}
        >
          <img
            src={restaurant.photoUrl}
            alt={restaurant.name}
            loading="lazy"
            onError={() => setPhotoFailed(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${
                  restaurant.category === "fine-dining"
                    ? "border-[#C0392B] text-[#C0392B] bg-[#FDF2F0]"
                    : restaurant.category === "local"
                      ? "border-[#1B4332] text-[#1B4332] bg-[#F0F5F2]"
                      : restaurant.category === "street-food"
                        ? "border-[#E67E22] text-[#E67E22] bg-[#FDF5EC]"
                        : "border-[#8E44AD] text-[#8E44AD] bg-[#F8F0FB]"
                }`}
              >
                {restaurant.categoryLabel}
              </Badge>
              {restaurant.michelin && (
                <Badge className="text-xs px-2 py-0.5 bg-[#C0392B] text-white border-0">
                  <Award className="mr-1 h-3 w-3" aria-hidden="true" />
                  {restaurant.michelin}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle
                className="text-lg font-bold text-[#1B4332] leading-snug"
                style={{ fontFamily: "'Noto Serif TC', serif" }}
              >
                {restaurant.name}
              </CardTitle>
              <button
                type="button"
                onClick={onShare}
                className="flex-shrink-0 p-1.5 text-[#8B7355] hover:text-[#C0392B] hover:bg-[#F5E6CC] rounded-md transition-all duration-200"
                aria-label={`分享 ${restaurant.name}`}
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8B7355] italic">{restaurant.nameVi}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="editorial-timecode flex items-center gap-1 text-xs font-mono font-bold text-[#C0392B]">
              <span className="editorial-time-dot" aria-hidden="true" />
              <Clock className="w-3 h-3" />
              {restaurant.timestamp}
            </div>
            <div className="w-8 h-8 rounded-lg bg-[#F5E6CC] flex items-center justify-center">
              <Icon className="w-4 h-4 text-[#5D4E37]" />
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-start gap-2 text-sm text-[#5D4E37]">
            <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#C0392B]" />
            <span className="leading-relaxed">{restaurant.address}</span>
          </div>
          <div className="flex items-start gap-2 text-sm">
            <Utensils
              className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C0392B]"
              aria-hidden="true"
            />
            <div>
              <span className="font-semibold text-[#1B4332]">
                {restaurant.food}
              </span>
              <p className="text-xs text-[#8B7355] mt-1 leading-relaxed">
                {restaurant.foodDescription}
              </p>
            </div>
          </div>

          {/* Expand/Collapse indicator */}
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={isExpanded}
            aria-controls={videoPanelId}
            className="flex w-full items-center justify-between rounded-md border-t border-[#F5E6CC] px-1 pt-2 text-left transition-colors hover:text-[#C0392B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C0392B] focus-visible:ring-offset-2"
          >
            <span className="text-xs text-[#8B7355]">
              {isExpanded ? "收起影片" : "點擊查看影片片段"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#C0392B]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#C0392B]" />
            )}
          </button>

          {/* Expanded Content - Video Embed */}
          {isExpanded && (
            <div
              id={videoPanelId}
              className="pt-3 space-y-3"
              style={{ animation: "fadeInUp 0.3s ease-out" }}
            >
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-md">
                <iframe
                  src={embedUrl}
                  title={`${restaurant.name} 影片片段`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="flex gap-2">
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1B4332] text-white text-sm font-medium hover:bg-[#0F2A1F] transition-colors"
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
                <a
                  href={`https://youtu.be/${videoId}?t=${restaurant.timestampSeconds}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#C0392B] text-white text-sm font-medium hover:bg-[#A93226] transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  YouTube 原片
                </a>
              </div>
            </div>
          )}

          {/* Map Link (always visible) */}
          {!isExpanded && (
            <a
              href={restaurant.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-[#1B4332] hover:text-[#C0392B] transition-colors font-medium"
            >
              <MapPin className="w-3.5 h-3.5" />在 Google Maps 中查看
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
