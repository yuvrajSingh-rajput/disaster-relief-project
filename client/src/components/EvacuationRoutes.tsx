
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRightFromLine, Home, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RouteProps {
  id: string;
  name: string;
  status: 'clear' | 'congested' | 'blocked';
  startPoint: string;
  endPoint: string;
  distance: string;
  estimatedTime: string;
}

const EvacuationRoute = ({ route }: { route: RouteProps }) => {
  const getStatusColor = () => {
    switch (route.status) {
      case 'clear':
        return 'bg-success/10 text-success';
      case 'congested':
        return 'bg-warning/10 text-warning';
      case 'blocked':
        return 'bg-destructive/10 text-destructive';
    }
  };

  const getStatusText = () => {
    switch (route.status) {
      case 'clear':
        return 'Clear';
      case 'congested':
        return 'Congested';
      case 'blocked':
        return 'Blocked';
    }
  };

  return (
    <div className="border rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium">{route.name}</h3>
          <Badge variant="outline" className={getStatusColor()}>
            {getStatusText()}
          </Badge>
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{route.distance}</div>
          <div className="text-sm font-medium">{route.estimatedTime}</div>
        </div>
      </div>
      
      <div className="mt-4 flex items-center space-x-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm">{route.startPoint}</span>
        <ArrowRightFromLine className="h-4 w-4 text-muted-foreground mx-1" />
        <Home className="h-4 w-4 text-success" />
        <span className="text-sm">{route.endPoint}</span>
      </div>
    </div>
  );
};

const EvacuationRoutes = () => {
  const routes: RouteProps[] = [
    {
      id: '1',
      name: 'Western Express Highway Route',
      status: 'congested',
      startPoint: 'Andheri East',
      endPoint: 'Borivali Relief Camp',
      distance: '15.2 km',
      estimatedTime: '45 mins'
    },
    {
      id: '2',
      name: 'Eastern Express Highway Route',
      status: 'clear',
      startPoint: 'Kurla',
      endPoint: 'Mulund Relief Camp',
      distance: '12.8 km',
      estimatedTime: '22 mins'
    },
    {
      id: '3',
      name: 'LBS Road Route',
      status: 'blocked',
      startPoint: 'Bandra',
      endPoint: 'Vikhroli Relief Camp',
      distance: '18.4 km',
      estimatedTime: 'Unavailable'
    },
    {
      id: '4',
      name: 'SV Road Route',
      status: 'clear',
      startPoint: 'Dadar',
      endPoint: 'Goregaon Relief Camp',
      distance: '14.1 km',
      estimatedTime: '30 mins'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Evacuation Routes</CardTitle>
        <CardDescription>
          Active evacuation routes to nearest safe zones and relief camps
        </CardDescription>
      </CardHeader>
      <CardContent>
        {routes.map(route => (
          <EvacuationRoute key={route.id} route={route} />
        ))}
      </CardContent>
    </Card>
  );
};

export default EvacuationRoutes;
