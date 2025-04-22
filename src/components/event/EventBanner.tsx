import React from 'react';
import { Calendar, MapPin, Camera, Users } from 'lucide-react';
import { EventType } from '../../types';

interface EventBannerProps {
  event: EventType;
}

const EventBanner: React.FC<EventBannerProps> = ({ event }) => {
  return (
    <div className="relative">
      {/* Background banner image */}
      <div className="h-64 md:h-80 w-full overflow-hidden">
        <img 
          src={event.coverImage} 
          alt={event.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      
      {/* Event info overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold">{event.name}</h1>
          
          <div className="mt-4 flex flex-wrap gap-y-2 gap-x-6">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              <span>{event.totalPhotos} photos</span>
            </div>
            <div className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              <span>{event.participants} participants</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBanner;