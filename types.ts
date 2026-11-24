import React from 'react';

export interface UserProfile {
  username: string;
  email: string;
  profilePicture: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string; // base64 data URL for display
  isKnowledgeGraph?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  sectionId?: string;
}

export interface SidebarSection {
  id: string;
  title: string;
  prompt: string;
  icon: React.ReactNode;
  background: React.FC;
}

// "My Garden" related types
export interface JournalEntry {
    id: string;
    date: string; // ISO string
    note: string;
    imageUrl?: string; // data URL
    aiHealthAnalysis?: string;
}

export interface PlantCareInfo {
    watering: string;
    sunlight: string;
    commonPests: string;
}

export interface PlantHealthStatus {
    status: 'Thriving' | 'Stable' | 'Needs Attention' | 'Vulnerable';
    summary: string;
}

export interface Plant {
    id:string;
    name: string;
    species: string;
    plantingDate: string; // ISO string
    journal: JournalEntry[];
    careInfo?: PlantCareInfo;
    aiHealthStatus?: PlantHealthStatus;
}

// Weather related types
export interface WeatherAlert {
    title: string;
    severity: 'low' | 'medium' | 'high';
}

export interface WeatherData {
    temperature: number;
    condition: string;
    conditionCode: number;
    location: string;
    alerts: WeatherAlert[];
    aiSummary?: string;
}