import type { Artist } from '../types/artist';

export const artists = [
  {
    "id": "luna-kai",
    "name": "LUNA KAI",
    "role": "singer",
    "countryCode": "US",
    "genre": "Pop",
    "categoryIds": ["pop"],
    "image": "/images/artists/luna-kai.webp"
  },
  {
    "id": "atrip",
    "name": "ATRIP",
    "role": "producer/singer",
    "countryCode": "US",
    "genre": "Electronic",
    "categoryIds": ["electronic"],
    "image": "/images/artists/atrip.webp"
  },
  {
    "id": "jax-riv",
    "name": "JAX RIV",
    "role": "rapper",
    "countryCode": "UK",
    "genre": "Hip-hop",
    "categoryIds": ["hip-hop"],
    "image": "/images/artists/jax-riv.webp"
  },
  {
    "id": "nova-ree",
    "name": "NOVA REE",
    "role": "singer",
    "countryCode": "US",
    "genre": "R&B",
    "categoryIds": ["rnb"],
    "image": "/images/artists/nova-ree.webp"
  },
  {
    "id": "elio-marks",
    "name": "ELIO MARKS",
    "role": "singer/songwriter",
    "countryCode": "UK",
    "genre": "Indie",
    "categoryIds": ["alternative"],
    "image": "/images/artists/elio-marks.webp"
  },
  {
    "id": "sera-jin",
    "name": "SERA JIN",
    "role": "singer",
    "countryCode": "KR",
    "genre": "Pop",
    "categoryIds": ["pop"],
    "image": "/images/artists/sera-jin.webp"
  },
  {
    "id": "kairo-del",
    "name": "KAIRO DEL",
    "role": "producer",
    "countryCode": "US",
    "genre": "Hip-hop",
    "categoryIds": ["hip-hop"],
    "image": "/images/artists/kairo-del.webp"
  },
  {
    "id": "miro-vel",
    "name": "MIRO VEL",
    "role": "singer",
    "countryCode": "CA",
    "genre": "R&B",
    "categoryIds": ["rnb"],
    "image": "/images/artists/miro-vel.webp"
  }
] satisfies readonly Artist[];
