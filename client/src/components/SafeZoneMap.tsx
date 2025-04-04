
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, MapPin, Home, ShieldCheck } from "lucide-react";

// Mock data for safe zones
const mockSafeZones = [
  { id: 1, name: "City Hall Shelter", type: "shelter", capacity: "250 people", address: "123 Main St, Mumbai" },
  { id: 2, name: "St. Mary's School", type: "shelter", capacity: "180 people", address: "45 Education Rd, Mumbai" },
  { id: 3, name: "Central Hospital", type: "medical", capacity: "120 beds", address: "78 Health Ave, Mumbai" },
  { id: 4, name: "Municipal Building", type: "food", capacity: "400 meals/day", address: "90 Government Blvd, Mumbai" },
];

// Mock data for danger zones
const mockDangerZones = [
  { id: 1, name: "Flooded Underpass", type: "flood", severity: "high", address: "River Rd & Main St" },
  { id: 2, name: "Collapsed Building", type: "structural", severity: "high", address: "56 Construction Ave" },
  { id: 3, name: "Downed Power Lines", type: "electrical", severity: "medium", address: "89 Power Lane" },
];

const SafeZoneMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"safe" | "danger">("safe");
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
    
    // In a real implementation, you would initialize a map here using Google Maps API
  }, []);

  return (
    <div className="h-full w-full relative">
      <div className="flex justify-center mb-4 space-x-4">
        <Button 
          variant={activeTab === "safe" ? "default" : "outline"}
          onClick={() => setActiveTab("safe")}
          className="flex items-center"
        >
          <ShieldCheck className="mr-2 h-4 w-4" />
          Safe Zones
        </Button>
        <Button 
          variant={activeTab === "danger" ? "default" : "outline"} 
          onClick={() => setActiveTab("danger")}
          className="flex items-center"
        >
          <AlertTriangle className="mr-2 h-4 w-4" />
          Danger Zones
        </Button>
      </div>

      <div className="h-[400px] w-full relative rounded-md overflow-hidden">
        {!isMapLoaded ? (
          <div className="h-full w-full flex items-center justify-center bg-muted">
            <Skeleton className="h-full w-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Loading map...</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full w-full bg-[url('/map-placeholder.jpg')] bg-cover bg-center" ref={mapContainerRef}>
            {/* This is a placeholder for the actual map */}
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Legend */}
            <div className="absolute top-4 right-4 bg-white/90 dark:bg-gray-900/90 p-3 rounded-md shadow-md">
              <p className="text-sm font-medium mb-2">Map Legend:</p>
              <div className="space-y-1 text-xs">
                {activeTab === "safe" ? (
                  <>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                      <span>Shelter</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-info mr-2"></div>
                      <span>Medical Facility</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                      <span>Food Distribution</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-emergency mr-2"></div>
                      <span>High Risk</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                      <span>Medium Risk</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 rounded-full bg-info mr-2"></div>
                      <span>Low Risk</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="mt-2 pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full">
                  <Home className="mr-2 h-3 w-3" />
                  My Location
                </Button>
              </div>
            </div>
            
            {/* Simulated map pins */}
            {activeTab === "safe" ? (
              <>
                <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-success shadow-lg flex items-center justify-center text-white text-xs font-bold">S1</div>
                </div>
                <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-info shadow-lg flex items-center justify-center text-white text-xs font-bold">M1</div>
                </div>
                <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-success shadow-lg flex items-center justify-center text-white text-xs font-bold">S2</div>
                </div>
                <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-warning shadow-lg flex items-center justify-center text-white text-xs font-bold">F1</div>
                </div>
              </>
            ) : (
              <>
                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-emergency shadow-lg flex items-center justify-center text-white text-xs font-bold animate-pulse">!</div>
                </div>
                <div className="absolute bottom-1/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-emergency shadow-lg flex items-center justify-center text-white text-xs font-bold">!</div>
                </div>
                <div className="absolute top-1/2 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-6 h-6 rounded-full bg-warning shadow-lg flex items-center justify-center text-white text-xs font-bold">!</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-3">
          {activeTab === "safe" ? "Safe Locations" : "Danger Zones"}
        </h3>
        <div className="space-y-3">
          {activeTab === "safe" 
            ? mockSafeZones.map(zone => (
                <div key={zone.id} className="p-3 border rounded-md flex justify-between items-center">
                  <div>
                    <div className="font-medium">{zone.name}</div>
                    <div className="text-sm text-muted-foreground">{zone.address}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <Badge variant="outline" className="mr-2">
                        {zone.type === "shelter" ? "Shelter" : zone.type === "medical" ? "Medical" : "Food & Water"}
                      </Badge>
                      <span>{zone.capacity}</span>
                    </div>
                  </div>
                  <Button size="sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    Directions
                  </Button>
                </div>
              ))
            : mockDangerZones.map(zone => (
                <div key={zone.id} className="p-3 border rounded-md flex justify-between items-center bg-destructive/5 border-destructive/20">
                  <div>
                    <div className="font-medium">{zone.name}</div>
                    <div className="text-sm text-muted-foreground">{zone.address}</div>
                    <div className="flex items-center mt-1 text-xs">
                      <Badge variant={zone.severity === "high" ? "destructive" : "outline"} className="mr-2">
                        {zone.severity === "high" ? "High Risk" : "Medium Risk"}
                      </Badge>
                      <span>{zone.type}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="destructive">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Avoid Area
                  </Button>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  );
};

export default SafeZoneMap;
