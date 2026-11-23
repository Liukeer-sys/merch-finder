import type { CatalogArtist } from '../../types/catalog';
export const researchArtists = [
  {
    "id": "taylor-swift",
    "name": "Taylor Swift",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter"
    ],
    "country": "US",
    "genres": [
      "Pop",
      "Country"
    ],
    "displayOrder": 1,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6667119979",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "Apple 艺人简介；仅录入本阶段需要的身份，非穷尽列表。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "the-weeknd",
    "name": "The Weeknd",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter"
    ],
    "country": "CA",
    "genres": [
      "R&B",
      "Pop"
    ],
    "displayOrder": 2,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/the-weeknd-mn0002674162/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "专业音乐资料库：Toronto 出身，歌手/词曲作者，alternative R&B 与 electro-pop；类型归并为上层分类。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "billie-eilish",
    "name": "Billie Eilish",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter"
    ],
    "country": "US",
    "genres": [
      "Pop"
    ],
    "displayOrder": 3,
    "evidence": [
      {
        "url": "https://interscope.com/pages/artist/billie-eilish",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country"
        ],
        "note": "唱片公司简介确认美国歌手及词曲作者。"
      },
      {
        "url": "https://en.wikipedia.org/wiki/Billie_Eilish",
        "checkedAt": "2026-11-06",
        "supports": [
          "genres"
        ],
        "note": "辅助来源：alternative pop / electropop / indie pop 归并 Pop；待补充厂牌类型描述。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "ariana-grande",
    "name": "Ariana Grande",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "US",
    "genres": [
      "Pop"
    ],
    "displayOrder": 4,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/ariana-grande-mn0002264745/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "lady-gaga",
    "name": "Lady Gaga",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "US",
    "genres": [
      "Pop"
    ],
    "displayOrder": 5,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6621239233",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "dua-lipa",
    "name": "Dua Lipa",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "UK",
    "genres": [
      "Pop"
    ],
    "displayOrder": 6,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6618152495",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      },
      {
        "url": "https://www.npg.org.uk/collections/search/person/mp168266/dua-lipa",
        "checkedAt": "2026-11-06",
        "supports": [
          "country"
        ],
        "note": "British-Albanian 双重国家关联；country 使用来源国 UK，另有 AL 关联，不能解释为唯一国籍。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "olivia-rodrigo",
    "name": "Olivia Rodrigo",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "US",
    "genres": [
      "Pop"
    ],
    "displayOrder": 7,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6621239006",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "sabrina-carpenter",
    "name": "Sabrina Carpenter",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "US",
    "genres": [
      "Pop"
    ],
    "displayOrder": 8,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6621238940",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      },
      {
        "url": "https://www.umusicpub.com/nashville/artists/sabrina-carpenter",
        "checkedAt": "2026-11-06",
        "supports": [
          "roles",
          "genres"
        ],
        "note": "UMPG 简介确认词曲作者及 Pop 成绩。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "bruno-mars",
    "name": "Bruno Mars",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Producer"
    ],
    "country": "US",
    "genres": [
      "Pop",
      "R&B"
    ],
    "displayOrder": 9,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/p1107691/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "ed-sheeran",
    "name": "Ed Sheeran",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter"
    ],
    "country": "UK",
    "genres": [
      "Pop"
    ],
    "displayOrder": 10,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/ed-sheeran-mn0002639628",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "justin-bieber",
    "name": "Justin Bieber",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter"
    ],
    "country": "CA",
    "genres": [
      "Pop"
    ],
    "displayOrder": 11,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/justin-bieber-p1152032/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "harry-styles",
    "name": "Harry Styles",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Actor"
    ],
    "country": "UK",
    "genres": [
      "Pop",
      "Rock"
    ],
    "displayOrder": 12,
    "evidence": [
      {
        "url": "https://www.sonymusic.co.uk/artist/harry-styles/",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      },
      {
        "url": "https://www.allmusic.com/artist/harry-styles-mn0002854537",
        "checkedAt": "2026-11-06",
        "supports": [
          "genres"
        ],
        "note": "Pop-rock 归并 Pop / Rock。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "beyonce",
    "name": "Beyoncé",
    "artistType": "Solo",
    "roles": [
      "Singer",
      "Songwriter",
      "Producer"
    ],
    "country": "US",
    "genres": [
      "Pop",
      "R&B"
    ],
    "displayOrder": 13,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/beyonc%C3%A9-mn0000761179/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "coldplay",
    "name": "Coldplay",
    "artistType": "Band",
    "roles": [],
    "country": "UK",
    "genres": [
      "Rock"
    ],
    "displayOrder": 14,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/coldplay-mn0000775877/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "linkin-park",
    "name": "Linkin Park",
    "artistType": "Band",
    "roles": [],
    "country": "US",
    "genres": [
      "Rock",
      "Hip-hop"
    ],
    "displayOrder": 15,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/linkin-park-mn0000289599",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "oasis",
    "name": "Oasis",
    "artistType": "Band",
    "roles": [],
    "country": "UK",
    "genres": [
      "Rock"
    ],
    "displayOrder": 16,
    "evidence": [
      {
        "url": "https://en.wikipedia.org/wiki/Oasis_(band)",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "imagine-dragons",
    "name": "Imagine Dragons",
    "artistType": "Band",
    "roles": [],
    "country": "US",
    "genres": [
      "Pop",
      "Rock"
    ],
    "displayOrder": 17,
    "evidence": [
      {
        "url": "https://en.wikipedia.org/wiki/Imagine_Dragons",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "eminem",
    "name": "Eminem",
    "artistType": "Solo",
    "roles": [
      "Rapper",
      "Producer",
      "Songwriter",
      "Actor"
    ],
    "country": "US",
    "genres": [
      "Hip-hop"
    ],
    "displayOrder": 18,
    "evidence": [
      {
        "url": "https://www.shadyrecords.com/artist/eminem-2/",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      },
      {
        "url": "https://www.allmusic.com/artist/eminem-mn0000157676",
        "checkedAt": "2026-11-06",
        "supports": [
          "genres"
        ],
        "note": "Rap 归并 Hip-hop。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "post-malone",
    "name": "Post Malone",
    "artistType": "Solo",
    "roles": [
      "Rapper",
      "Singer",
      "Songwriter",
      "Producer"
    ],
    "country": "US",
    "genres": [
      "Hip-hop",
      "Pop"
    ],
    "displayOrder": 19,
    "evidence": [
      {
        "url": "https://snapshot.apple.com/us/person/6621239776",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      },
      {
        "url": "https://www.allmusic.com/artist/post-malone-mn0003426458/biography",
        "checkedAt": "2026-11-06",
        "supports": [
          "genres"
        ],
        "note": "rap 与 pop mainstream；非穷尽类型。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  },
  {
    "id": "travis-scott",
    "name": "Travis Scott",
    "artistType": "Solo",
    "roles": [
      "Rapper",
      "Producer"
    ],
    "country": "US",
    "genres": [
      "Hip-hop"
    ],
    "displayOrder": 20,
    "evidence": [
      {
        "url": "https://www.allmusic.com/artist/travis-scott-mn0002998422",
        "checkedAt": "2026-11-06",
        "supports": [
          "artistType",
          "roles",
          "country",
          "genres"
        ],
        "note": "身份取有证据支持的子集；音乐子类型归并为上层类别。Band 的 roles 空数组表示不套用成员个人身份。"
      }
    ],
    "lastVerifiedAt": "2026-11-06"
  }
] satisfies readonly CatalogArtist[];
