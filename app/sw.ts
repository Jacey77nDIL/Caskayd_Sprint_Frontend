/// <reference lib="webworker" />
import { defaultCache } from "@serwist/next/worker";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";
import { Serwist, NetworkFirst, ExpirationPlugin } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: [
    ...defaultCache,
    {
      matcher: ({ url }) => {
        const backendDomain = process.env.NEXT_PUBLIC_API_URL || "";
        return backendDomain ? url.href.includes(backendDomain) : false;
      },
      // USE THE CLASS INSTEAD OF A STRING
      handler: new NetworkFirst({
        cacheName: "caskayd-api-cache",
        plugins: [
          new ExpirationPlugin({
            maxEntries: 100, 
            maxAgeSeconds: 24 * 60 * 60, 
          }),
        ],
      }),
    },
  ],
  fallbacks: {
    entries: [
      {
        url: "/offline", 
        matcher({ request }) {
          return request.destination === "document";
        },
      },
    ],
  },
});

serwist.addEventListeners();