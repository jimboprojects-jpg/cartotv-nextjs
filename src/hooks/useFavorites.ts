'use client'
import { useState, useEffect, useCallback } from 'react';
import { Channel } from '@/data/countries';

const STORAGE_KEY = 'tv-globe-favorites';

export interface FavoriteChannel extends Channel {
  countryName: string;
  countryFlag: string;
}

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteChannel[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
  }, []);

  const saveFavorites = useCallback((newFavorites: FavoriteChannel[]) => {
    setFavorites(newFavorites);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
  }, []);

  const addFavorite = useCallback((channel: Channel, countryName: string, countryFlag: string) => {
    const newFav: FavoriteChannel = { ...channel, countryName, countryFlag };
    const exists = favorites.some(f => f.url === channel.url);
    if (!exists) {
      saveFavorites([...favorites, newFav]);
    }
  }, [favorites, saveFavorites]);

  const removeFavorite = useCallback((channelUrl: string) => {
    saveFavorites(favorites.filter(f => f.url !== channelUrl));
  }, [favorites, saveFavorites]);

  const isFavorite = useCallback((channelUrl: string) => {
    return favorites.some(f => f.url === channelUrl);
  }, [favorites]);

  const toggleFavorite = useCallback((channel: Channel, countryName: string, countryFlag: string) => {
    if (isFavorite(channel.url)) {
      removeFavorite(channel.url);
    } else {
      addFavorite(channel, countryName, countryFlag);
    }
  }, [isFavorite, removeFavorite, addFavorite]);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
  };
};
