
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, Clock, Loader2 } from "lucide-react";

// Mock data for the map - in a real app this would come from your Firebase backend
const mockRequests = [
  { id: 1, type: "medical", lat: 19.0760, lng: 72.8777, status: "pending", urgency: "high" },
  { id: 2, type: "food", lat: 19.0330, lng: 72.8296, status: "in-progress", urgency: "medium" },
  { id: 3, type: "rescue", lat: 19.0883, lng: 72.8921, status: "pending", urgency: "emergency" },
  { id: 4, type: "shelter", lat: 19.1273, lng: 72.8691, status: "completed", urgency: "low" },
];

const EmergencyMap = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoaded(true);
    }, 1500);

    return () => clearTimeout(timer);
    
    // In a real implementation, you would initialize a map here using Google Maps API or another mapping service
    // Example with Google Maps:
    /*
    const googleMapScript = document.createElement('script');
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapScript.async = true;
    googleMapScript.defer = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener('load', () => {
      setIsMapLoaded(true);
      if (mapContainerRef.current) {
        const map = new google.maps.Map(mapContainerRef.current, {
          center: { lat: 19.0760, lng: 72.8777 }, // Mumbai
          zoom: 12,
        });

        // Add markers for each request
        mockRequests.forEach(request => {
          const marker = new google.maps.Marker({
            position: { lat: request.lat, lng: request.lng },
            map: map,
            title: `${request.type} - ${request.urgency}`
          });
        });
      }
    });
    */
  }, []);

  return (
    <div className="h-full w-full relative rounded-md overflow-hidden">
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
            <p className="text-sm font-medium mb-2">Request Types:</p>
            <div className="space-y-1 text-xs">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-emergency mr-2"></div>
                <span>Emergency</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-warning mr-2"></div>
                <span>Medical</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-info mr-2"></div>
                <span>Food/Water</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-success mr-2"></div>
                <span>Shelter</span>
              </div>
            </div>
            
            <div className="mt-2 pt-2 border-t">
              <p className="text-sm font-medium mb-2">Status:</p>
              <div className="space-y-1 text-xs">
                <div className="flex items-center">
                  <AlertCircle className="w-3 h-3 text-emergency mr-2" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 text-warning mr-2" />
                  <span>In Progress</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-3 h-3 text-success mr-2" />
                  <span>Completed</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Simulated map pins */}
          <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-emergency shadow-lg flex items-center justify-center text-white text-xs font-bold animate-pulse-emergency">1</div>
          </div>
          <div className="absolute top-2/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-info shadow-lg flex items-center justify-center text-white text-xs font-bold">2</div>
          </div>
          <div className="absolute top-1/3 right-1/4 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-warning shadow-lg flex items-center justify-center text-white text-xs font-bold animate-pulse-emergency">3</div>
          </div>
          <div className="absolute bottom-1/4 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 rounded-full bg-success shadow-lg flex items-center justify-center text-white text-xs font-bold">4</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencyMap;
