import { useEffect, useRef, useState } from "react";
import { restaurants, type Restaurant } from "@/lib/restaurants";
import { MapPin, X } from "lucide-react";

interface RestaurantMapProps {
  selectedCategory?: string;
  onRestaurantSelect?: (restaurant: Restaurant) => void;
}

export function RestaurantMap({ selectedCategory = "all", onRestaurantSelect }: RestaurantMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedMarker, setSelectedMarker] = useState<Restaurant | null>(null);
  const infoWindowRef = useRef<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  const filteredRestaurants = selectedCategory === "all" 
    ? restaurants 
    : restaurants.filter(r => r.category === selectedCategory);

  // 檢查 Google Maps API 是否已載入
  useEffect(() => {
    const checkGoogleMaps = () => {
      if (typeof window !== 'undefined' && window.google && window.google.maps) {
        setMapLoaded(true);
      }
    };

    // 立即檢查
    checkGoogleMaps();

    // 如果未載入，等待一段時間後重新檢查
    if (!mapLoaded) {
      const timer = setTimeout(checkGoogleMaps, 1000);
      return () => clearTimeout(timer);
    }
  }, [mapLoaded]);

  useEffect(() => {
    if (!mapRef.current || !mapLoaded) return;

    try {
      // 初始化地圖
      const map = new window.google.maps.Map(mapRef.current, {
        zoom: 13,
        center: { lat: 21.0285, lng: 105.8554 }, // 河內中心
        styles: [
          {
            featureType: "all",
            elementType: "labels.text.fill",
            stylers: [{ color: "#5D4E37" }],
          },
          {
            featureType: "water",
            elementType: "geometry.fill",
            stylers: [{ color: "#E8F4F8" }],
          },
        ],
      });

      mapInstanceRef.current = map;

      // 清除舊標記
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // 建立新標記
      const bounds = new window.google.maps.LatLngBounds();

      filteredRestaurants.forEach((restaurant) => {
        const marker = new window.google.maps.Marker({
          position: { lat: restaurant.latitude, lng: restaurant.longitude },
          map: map,
          title: restaurant.name,
          icon: getCategoryIcon(restaurant.category),
        });

        const position = marker.getPosition();
        if (position) {
          bounds.extend(position);
        }

        marker.addListener("click", () => {
          setSelectedMarker(restaurant);
          onRestaurantSelect?.(restaurant);

          // 關閉舊的 InfoWindow
          if (infoWindowRef.current) {
            infoWindowRef.current.close();
          }

          // 建立新的 InfoWindow
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="font-family: 'Noto Sans TC', sans-serif; padding: 8px; max-width: 200px;">
                <div style="font-weight: bold; color: #1B4332; margin-bottom: 4px; font-size: 14px;">
                  ${restaurant.name}
                </div>
                <div style="font-size: 12px; color: #5D4E37; margin-bottom: 4px;">
                  ${restaurant.food}
                </div>
                <div style="font-size: 11px; color: #8B7355; margin-bottom: 8px;">
                  ${restaurant.address}
                </div>
                ${restaurant.michelin ? `
                  <div style="font-size: 11px; color: #C0392B; font-weight: bold; margin-bottom: 4px;">
                    ⭐ ${restaurant.michelin}
                  </div>
                ` : ''}
                <a href="${restaurant.mapsUrl}" target="_blank" rel="noopener noreferrer" 
                   style="color: #1B4332; text-decoration: none; font-size: 11px; font-weight: bold;">
                  在 Google Maps 中查看 →
                </a>
              </div>
            `,
          });

          infoWindow.open(map, marker);
          infoWindowRef.current = infoWindow;

          // 移動地圖中心到標記
          const markerPosition = marker.getPosition();
          if (markerPosition) {
            map.panTo(markerPosition);
          }
        });

        markersRef.current.push(marker);
      });

      // 調整地圖邊界以顯示所有標記
      if (markersRef.current.length > 0) {
        map.fitBounds(bounds, { top: 50, right: 50, bottom: 50, left: 50 });
      }
    } catch (error) {
      console.error('Error initializing map:', error);
    }

    return () => {
      // 清理
      markersRef.current.forEach(marker => marker.setMap(null));
    };
  }, [filteredRestaurants, onRestaurantSelect, mapLoaded]);

  if (!mapLoaded) {
    return (
      <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border-2 border-[#E8D5B0] flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="text-4xl mb-4">🗺️</div>
          <p className="text-[#5D4E37]">正在載入地圖...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg border-2 border-[#E8D5B0]">
      <div ref={mapRef} className="w-full h-full" />
      
      {/* 地圖圖例 */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-md border border-[#E8D5B0]">
        <div className="text-xs font-semibold text-[#1B4332] mb-2">圖例</div>
        <div className="space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#C0392B]" />
            <span className="text-[#5D4E37]">高級餐廳</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#1B4332]" />
            <span className="text-[#5D4E37]">在地小店</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#E67E22]" />
            <span className="text-[#5D4E37]">街頭小吃</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-[#8E44AD]" />
            <span className="text-[#5D4E37]">咖啡甜點</span>
          </div>
        </div>
      </div>

      {/* 選中店家信息卡 */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg border-2 border-[#C0392B] p-4 max-w-xs z-10">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-[#1B4332]" style={{ fontFamily: "'Noto Serif TC', serif" }}>
              {selectedMarker.name}
            </h3>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-[#8B7355] hover:text-[#C0392B] transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-[#8B7355] italic mb-2">{selectedMarker.nameVi}</p>
          <div className="flex items-start gap-1 text-xs text-[#5D4E37] mb-2">
            <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-[#C0392B]" />
            <span>{selectedMarker.address}</span>
          </div>
          <p className="text-xs text-[#5D4E37] mb-3">
            <span className="font-semibold">{selectedMarker.food}</span>
          </p>
          {selectedMarker.michelin && (
            <div className="text-xs text-[#C0392B] font-bold mb-3">
              ⭐ {selectedMarker.michelin}
            </div>
          )}
          <a
            href={selectedMarker.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-white bg-[#1B4332] hover:bg-[#0F2A1F] px-2 py-1.5 rounded transition-colors"
          >
            <MapPin className="w-3 h-3" />
            Google Maps
          </a>
        </div>
      )}
    </div>
  );
}

function getCategoryIcon(category: string): string {
  const iconConfig: Record<string, string> = {
    "fine-dining": "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
    "local": "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
    "street-food": "http://maps.google.com/mapfiles/ms/icons/orange-dot.png",
    "cafe-dessert": "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
  };
  return iconConfig[category] || "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
}
