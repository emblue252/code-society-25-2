import csv from 'csv-parser';
import fs from 'fs';
import { Credit, MediaItem } from '../models/index.js';
import { Loader } from './loader.js';

export class EvanderBlueLoader implements Loader {
  getLoaderName(): string {
    return 'evanderblue';
  }

  async loadData(): Promise<MediaItem[]> {
    const credits = await this.loadCredits();
    const mediaItems = await this.loadMediaItems();

    // Add credits to existing media items using addCredit method
    const mediaItemMap = new Map();
    for (const item of mediaItems) {
      mediaItemMap.set(item.getId(), item);
    }
    for (const credit of credits) {
      const id = credit.getMediaItemId();
      const item = mediaItemMap.get(id);
      if (item && typeof item.addCredit === 'function') {
        item.addCredit(credit);
      }
    }

    console.log(
      `Loaded ${credits.length} credits and ${mediaItems.length} media items`,
    );

    return Array.from(mediaItemMap.values());
  }

  async loadMediaItems(): Promise<MediaItem[]> {
    const mediaItems = [];
    const readable = fs
      .createReadStream('data/media_items.csv', 'utf-8')
      .pipe(csv());
    for await (const row of readable) {
      const { id, type, title, year } = row;
      mediaItems.push(new MediaItem(id, title, type, year, []));
    }
    return mediaItems;
  }

  async loadCredits(): Promise<Credit[]> {
    const credits = [];
    const readable = fs
      .createReadStream('data/credits.csv', 'utf-8')
      .pipe(csv());
    for await (const row of readable) {
      const { media_item_id, role, name } = row;
      credits.push(new Credit(media_item_id, name, role));
    }
    return credits;
  }
}
