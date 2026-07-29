import { useState, useMemo, useCallback } from "react";
import { restaurants, categories, videoId, type Restaurant } from "@/lib/restaurants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Clock, Search, ExternalLink, Play, ChevronDown, ChevronUp, Utensils, Coffee, Sparkles, Share2 } from "lucide-react";
import { toast } from "sonner";

const categoryIcons: Record<string, typeof Sparkles> = {
  "fine-dining": Sparkles,
  "local": Utensils,
  "street-food": Utensils,
  "cafe-dessert": Coffee,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      const matchesCategory = activeCategory === "all" || r.category === activeCategory;
      const matchesSearch = searchQuery === "" || 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.nameVi.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.food.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.foodDescription.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const visibleRestaurants = filteredRestaurants.slice(0, visibleCount);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: restaurants.length };
    categories.forEach((cat) => {
      if (cat.id !== "all") {
        counts[cat.id] = restaurants.filter((r) => r.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const michelinCount = useMemo(() => restaurants.filter((r) => r.michelin).length, []);

  const handleCardClick = useCallback((id: number) => {
    setExpandedId(expandedId === id ? null : id);
  }, [expandedId]);

  const handleShare = (restaurant: Restaurant, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareText = `🍽️ ${restaurant.name}\n${restaurant.food}\n📍 ${restaurant.address}\n\n河內美食地圖 - YouTube 影片導覽`;
    
    if (navigator.share) {
      navigator.share({
        title: `河內美食地圖 - ${restaurant.name}`,
        text: shareText,
        url: window.location.href,
      }).catch(() => {
        // 如果分享失敗，複製到剪貼板
        copyToClipboard(shareText);
      });
    } else {
      // 不支援 Web Share API，複製到剪貼板
      copyToClipboard(shareText);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("已複製到剪貼板！");
    }).catch(() => {
      toast.error("複製失敗");
    });
  };

  const formatTimestamp = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C0392B] via-[#A93226] to-[#7B241C]" />
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url(/manus-storage/hanoi-hero_2daacb96.jpg)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDF6E3] via-transparent to-transparent" />
        
        <div className="relative container py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 mb-6">
              <span className="text-sm text-white/90 font-medium">🇻🇳 河內美食探索</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              河內美食地圖
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-2xl">
              33 間河內必吃店家完整指南 · 對應 YouTube 影片片段 · Google Maps 地圖連結
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-xl font-bold">{restaurants.length}</span>
                </div>
                <span className="text-sm">間店家</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="text-sm">{michelinCount} 間米其林</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
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
      <div className="container py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="sticky top-6 space-y-6">
              {/* Search */}
              <div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="搜尋店家或食物..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white border-[#E8D5B0]"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm font-semibold text-[#5D4E37] mb-3 px-2">分類篩選</h3>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        activeCategory === cat.id
                          ? "bg-[#C0392B] text-white shadow-md"
                          : "text-[#5D4E37] hover:bg-[#F5E6CC]"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-base">{cat.icon}</span>
                        {cat.label}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        activeCategory === cat.id ? "bg-white/20" : "bg-[#E8D5B0]"
                      }`}>
                        {categoryCounts[cat.id] || 0}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Stats Card */}
              <div className="rounded-xl bg-gradient-to-br from-[#1B4332] to-[#0F2A1F] p-5 text-white">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="text-base">📊</span> 統計總覽
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
                    <span className="font-bold">{categoryCounts["fine-dining"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">在地小店</span>
                    <span className="font-bold">{categoryCounts["local"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">街頭小吃</span>
                    <span className="font-bold">{categoryCounts["street-food"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">咖啡甜點</span>
                    <span className="font-bold">{categoryCounts["cafe-dessert"]}</span>
                  </div>
                </div>
              </div>

              {/* Video Source */}
              <a
                href={`https://youtu.be/${videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-[#F5E6CC] p-4 hover:bg-[#E8D5B0] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C0392B] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-white fill-white" />
                  </div>
                  <div>
                    <div className="text-xs text-[#5D4E37]">原始影片</div>
                    <div className="text-sm font-semibold text-[#1B4332]">YouTube 來源</div>
                  </div>
                </div>
              </a>
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#5D4E37]">
                共 <span className="font-bold text-[#1B4332]">{filteredRestaurants.length}</span> 間店家
                {activeCategory !== "all" && (
                  <span className="ml-1">
                    · {categories.find((c) => c.id === activeCategory)?.label}
                  </span>
                )}
              </p>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleRestaurants.map((restaurant, index) => (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                  isExpanded={expandedId === restaurant.id}
                  onClick={() => handleCardClick(restaurant.id)}
                  onShare={(e) => handleShare(restaurant, e)}
                  index={index}
                />
              ))}
            </div>

            {/* Load More */}
            {visibleCount < filteredRestaurants.length && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setVisibleCount((c) => c + 12)}
                  variant="outline"
                  className="border-[#C0392B] text-[#C0392B] hover:bg-[#C0392B] hover:text-white"
                >
                  載入更多 ({filteredRestaurants.length - visibleCount} 間)
                </Button>
              </div>
            )}

            {/* Empty State */}
            {filteredRestaurants.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-lg text-[#5D4E37]">找不到符合條件的店家</p>
                <p className="text-sm text-[#8B7355] mt-2">請嘗試其他搜尋關鍵字或分類</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#1B4332] text-white/70 py-8 mt-12">
        <div className="container text-center">
          <p className="text-sm">
            河內美食地圖 · 基於 YouTube 影片分析建構 · {restaurants.length} 間店家完整指南
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
  onClick,
  onShare,
  index,
}: {
  restaurant: Restaurant;
  isExpanded: boolean;
  onClick: () => void;
  onShare: (e: React.MouseEvent) => void;
  index: number;
}) {
  const Icon = categoryIcons[restaurant.category] || Sparkles;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${restaurant.timestampSeconds}&end=${restaurant.timestampSeconds + 45}&autoplay=1`;

  return (
    <Card
      className={`group cursor-pointer transition-all duration-300 border-2 ${
        isExpanded
          ? "border-[#C0392B] shadow-xl ring-2 ring-[#C0392B]/20"
          : "border-transparent hover:border-[#E8D5B0] hover:shadow-lg"
      } bg-white overflow-hidden`}
      style={{
        animation: `fadeInUp 0.4s ease-out ${index * 0.05}s both`,
      }}
      onClick={onClick}
    >
      {/* Restaurant Photo */}
      {restaurant.photoUrl && (
        <div className="relative w-full h-40 overflow-hidden bg-gray-200">
          <img
            src={restaurant.photoUrl}
            alt={restaurant.name}
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
                  ⭐ {restaurant.michelin}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg font-bold text-[#1B4332] leading-snug" style={{ fontFamily: "'Noto Serif TC', serif" }}>
                {restaurant.name}
              </CardTitle>
              <button
                onClick={onShare}
                className="flex-shrink-0 p-1.5 text-[#8B7355] hover:text-[#C0392B] hover:bg-[#F5E6CC] rounded-md transition-all duration-200"
                title="分享店家"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-[#8B7355] italic">{restaurant.nameVi}</p>
          </div>
          <div className="flex flex-col items-end gap-1 flex-shrink-0">
            <div className="flex items-center gap-1 text-xs text-[#C0392B] font-mono font-bold bg-[#FDF2F0] px-2 py-1 rounded-md">
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
            <span className="text-base flex-shrink-0">🍴</span>
            <div>
              <span className="font-semibold text-[#1B4332]">{restaurant.food}</span>
              <p className="text-xs text-[#8B7355] mt-1 leading-relaxed">{restaurant.foodDescription}</p>
            </div>
          </div>

          {/* Expand/Collapse indicator */}
          <div className="flex items-center justify-between pt-2 border-t border-[#F5E6CC]">
            <span className="text-xs text-[#8B7355]">
              {isExpanded ? "收起影片" : "點擊查看影片片段"}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[#C0392B]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#C0392B]" />
            )}
          </div>

          {/* Expanded Content - Video Embed */}
          {isExpanded && (
            <div className="pt-3 space-y-3" style={{ animation: "fadeInUp 0.3s ease-out" }}>
              <div className="relative aspect-video rounded-lg overflow-hidden bg-black shadow-md">
                <iframe
                  src={embedUrl}
                  title={`${restaurant.name} 影片片段`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="flex gap-2">
                <a
                  href={restaurant.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1B4332] text-white text-sm font-medium hover:bg-[#0F2A1F] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MapPin className="w-4 h-4" />
                  Google Maps
                </a>
                <a
                  href={`https://youtu.be/${videoId}?t=${restaurant.timestampSeconds}s`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#C0392B] text-white text-sm font-medium hover:bg-[#A93226] transition-colors"
                  onClick={(e) => e.stopPropagation()}
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
              onClick={(e) => e.stopPropagation()}
            >
              <MapPin className="w-3.5 h-3.5" />
              在 Google Maps 中查看
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
