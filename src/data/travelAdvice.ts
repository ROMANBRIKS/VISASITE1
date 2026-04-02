export interface TravelTip {
  id: string;
  title: string;
  content: string;
  category: 'safety' | 'culture' | 'logistics' | 'budget';
}

export interface TravelCountry {
  id: string;
  name: string;
  flag: string;
  isActive: boolean;
  description: string;
  advice: TravelTip[];
  image: string;
  gallery: string[];
  capital: string;
  currency: string;
  timezone: string;
  partners: { name: string; role: string }[];
}

export const travelCountries: TravelCountry[] = [
  {
    id: 'ghana',
    name: 'Ghana',
    flag: '🇬🇭',
    isActive: true,
    description: 'The gateway to West Africa, known for its rich history, vibrant culture, and friendly people.',
    image: 'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1591129841117-3adfd313e34f?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1520116468816-95b69f847357?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1580619305218-8423a7ef79b4?auto=format&fit=crop&q=80&w=1200'
    ],
    capital: 'Accra',
    currency: 'GHS',
    timezone: 'GMT +0',
    partners: [
      { name: "Ghana Heritage Tours", role: "Cultural & History" },
      { name: "West Africa Logistics", role: "Transport & Safety" }
    ],
    advice: [
      {
        id: 'g1',
        title: 'Akwaaba! (Welcome)',
        content: 'Ghanaians are known for their hospitality. Always greet people with a smile and use your right hand for giving or receiving items.',
        category: 'culture'
      },
      {
        id: 'g2',
        title: 'Tro-Tro Travel',
        content: 'Tro-tros are the local shared minibuses. They are affordable and a great way to experience local life, but be prepared for a bit of a squeeze!',
        category: 'logistics'
      },
      {
        id: 'g3',
        title: 'Street Food Safety',
        content: 'Enjoy the delicious street food like Jollof rice or Kelewele, but ensure it is served hot and from busy stalls with good hygiene.',
        category: 'safety'
      },
      {
        id: 'g4',
        title: 'Currency & Bargaining',
        content: 'The local currency is the Ghana Cedi (GHS). Bargaining is common in markets, but always do it with a friendly attitude.',
        category: 'budget'
      }
    ]
  },
  {
    id: 'kenya',
    name: 'Kenya',
    flag: '🇰🇪',
    isActive: false,
    description: 'Experience the magic of the African savannah, vibrant cultures, and stunning coastlines.',
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    capital: 'Nairobi',
    currency: 'KES',
    timezone: 'GMT +3',
    partners: [
      { name: "Safari Experts Ltd", role: "Logistics & Tours" },
      { name: "SafeTravel Kenya", role: "Security & Safety" }
    ],
    advice: [
      {
        id: 'k1',
        title: 'Safari Etiquette',
        content: 'Always stay inside the vehicle unless your guide says otherwise. Keep noise to a minimum to avoid disturbing the wildlife.',
        category: 'culture'
      },
      {
        id: 'k2',
        title: 'Water Safety',
        content: 'Drink only bottled or treated water. Avoid ice in drinks outside of high-end hotels.',
        category: 'safety'
      },
      {
        id: 'k3',
        title: 'Tipping Culture',
        content: 'Tipping is expected in the tourism industry. Aim for $10-15 per day for safari guides.',
        category: 'budget'
      }
    ]
  },
  {
    id: 'rwanda',
    name: 'Rwanda',
    flag: '🇷🇼',
    isActive: false,
    description: 'The land of a thousand hills, famous for its mountain gorillas and clean, green cities.',
    image: 'https://images.unsplash.com/photo-1589197331516-4d8458bb843e?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    capital: 'Kigali',
    currency: 'RWF',
    timezone: 'GMT +2',
    partners: [
      { name: "Gorilla Guardians", role: "Wildlife & Conservation" },
      { name: "Rwanda Safe Transit", role: "Logistics" }
    ],
    advice: [
      {
        id: 'r1',
        title: 'Plastic Bag Ban',
        content: 'Rwanda has a strict ban on non-biodegradable plastic bags. They will be confiscated at the airport.',
        category: 'logistics'
      },
      {
        id: 'r2',
        title: 'Umuganda',
        content: 'On the last Saturday of every month, locals participate in community work. Most businesses are closed until 11 AM.',
        category: 'culture'
      }
    ]
  },
  {
    id: 'tanzania',
    name: 'Tanzania',
    flag: '🇹🇿',
    isActive: false,
    description: 'Home to Kilimanjaro and the spice islands of Zanzibar.',
    image: 'https://images.unsplash.com/photo-1528164344705-47542687000d?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    capital: 'Dodoma',
    currency: 'TZS',
    timezone: 'GMT +3',
    partners: [],
    advice: []
  },
  {
    id: 'uganda',
    name: 'Uganda',
    flag: '🇺🇬',
    isActive: false,
    description: 'The Pearl of Africa, offering diverse landscapes and incredible primate encounters.',
    image: 'https://images.unsplash.com/photo-1501560379315-a1f274209748?auto=format&fit=crop&q=80&w=800',
    gallery: [],
    capital: 'Kampala',
    currency: 'UGX',
    timezone: 'GMT +3',
    partners: [],
    advice: []
  }
];
