
export interface VisaCategory {
  id: string;
  name: string;
  description: string;
  officialUrl: string;
  benefits: string[];
  whoItIsFor: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  landmark: string;
  description: string;
  visas: VisaCategory[];
}

export const countries: Country[] = [
  {
    id: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    landmark: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop',
    description: 'The land of opportunity with diverse visa options for tourism, study, and work.',
    visas: [
      {
        id: 'tourism-business',
        name: 'Tourism & Business',
        description: 'For short-term visits for pleasure or business meetings.',
        officialUrl: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit.html',
        benefits: ['Up to 10 years validity', 'Multiple entries allowed', 'Fast processing'],
        whoItIsFor: 'Individuals visiting for tourism, vacation, or business consultations.'
      },
      {
        id: 'student-exchange',
        name: 'Student & Exchange',
        description: 'For academic studies or exchange programs.',
        officialUrl: 'https://travel.state.gov/content/travel/en/us-visas/study.html',
        benefits: ['Access to top-tier education', 'Work on-campus opportunities', 'Post-study work options'],
        whoItIsFor: 'Students enrolled in US academic institutions or exchange programs.'
      },
      {
        id: 'temporary-work',
        name: 'Temporary Work',
        description: 'For employment in specific fields for a fixed period.',
        officialUrl: 'https://travel.state.gov/content/travel/en/us-visas/employment.html',
        benefits: ['High earning potential', 'Professional growth', 'Path to permanent residency'],
        whoItIsFor: 'Skilled workers with a job offer from a US employer.'
      },
      {
        id: 'family-marriage',
        name: 'Family & Marriage',
        description: 'For relatives or spouses of US citizens/residents.',
        officialUrl: 'https://travel.state.gov/content/travel/en/us-visas/immigrate/family-immigration.html',
        benefits: ['Permanent residency path', 'Work authorization', 'Family reunification'],
        whoItIsFor: 'Spouses, children, or parents of US citizens or green card holders.'
      },
      {
        id: 'permanent-worker',
        name: 'Permanent Worker',
        description: 'For those seeking to live and work permanently in the US.',
        officialUrl: 'https://www.uscis.gov/working-in-the-united-states/permanent-workers',
        benefits: ['Green card status', 'Full work rights', 'Social security benefits'],
        whoItIsFor: 'Highly skilled professionals, researchers, or investors.'
      }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    landmark: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop',
    description: 'Known for its welcoming immigration policies and high quality of life.',
    visas: [
      {
        id: 'visitor',
        name: 'Visitor',
        description: 'For tourism, visiting family, or short-term business.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
        benefits: ['Easy online application', 'Valid for up to 10 years', 'Explore Canadian nature'],
        whoItIsFor: 'Tourists and family visitors.'
      },
      {
        id: 'study',
        name: 'Study',
        description: 'For international students at designated learning institutions.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
        benefits: ['World-class education', 'Part-time work allowed', 'PGWP eligibility'],
        whoItIsFor: 'Students accepted by Canadian colleges or universities.'
      },
      {
        id: 'temporary-work',
        name: 'Temporary Work',
        description: 'For foreign workers with valid job offers.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada.html',
        benefits: ['Gain Canadian work experience', 'High wages', 'Path to PR'],
        whoItIsFor: 'Professionals and skilled tradespeople.'
      },
      {
        id: 'family-sponsorship',
        name: 'Family Sponsorship',
        description: 'For relatives of Canadian citizens or PR holders.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship.html',
        benefits: ['Permanent residency', 'Healthcare access', 'Family unity'],
        whoItIsFor: 'Spouses, partners, children, and parents.'
      },
      {
        id: 'economic',
        name: 'Economic',
        description: 'For skilled workers under Express Entry or PNP.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
        benefits: ['Direct path to citizenship', 'Universal healthcare', 'Stable economy'],
        whoItIsFor: 'Skilled professionals with high CRS scores.'
      }
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    landmark: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1000&auto=format&fit=crop',
    description: 'The economic powerhouse of Europe with excellent work and study opportunities.',
    visas: [
      {
        id: 'schengen-visa',
        name: 'Schengen Visa (Short Stay)',
        description: 'For tourism or business visits up to 90 days.',
        officialUrl: 'https://www.auswaertiges-amt.de/en/visa-service/-/215870',
        benefits: ['Travel across 29 countries', 'Simple process', 'Business networking'],
        whoItIsFor: 'Tourists and business travelers.'
      },
      {
        id: 'national-visa-work',
        name: 'National Visa (Work)',
        description: 'For long-term employment in Germany.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals',
        benefits: ['EU Blue Card eligibility', 'High social security', 'Strong labor laws'],
        whoItIsFor: 'Qualified professionals with a job offer.'
      },
      {
        id: 'national-visa-study',
        name: 'National Visa (Study)',
        description: 'For university students or language learners.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/study',
        benefits: ['Low tuition fees', 'Work while studying', '18-month job seeker visa after'],
        whoItIsFor: 'Students admitted to German universities.'
      },
      {
        id: 'opportunity-card',
        name: 'Opportunity Card (Chancenkarte)',
        description: 'Points-based visa for job seekers.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card',
        benefits: ['Search for jobs in Germany', 'Part-time work allowed', 'Points for skills'],
        whoItIsFor: 'Skilled workers looking for employment.'
      }
    ]
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    landmark: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop',
    description: 'A global hub for finance, education, and culture.',
    visas: [
      {
        id: 'standard-visitor',
        name: 'Standard Visitor',
        description: 'For tourism, business, or short-term study.',
        officialUrl: 'https://www.gov.uk/standard-visitor-visa',
        benefits: ['Up to 6 months stay', 'Fast-track options', 'Multiple entries'],
        whoItIsFor: 'Tourists and short-term visitors.'
      },
      {
        id: 'skilled-worker',
        name: 'Skilled Worker',
        description: 'For those with a job offer from a licensed sponsor.',
        officialUrl: 'https://www.gov.uk/skilled-worker-visa',
        benefits: ['Path to settlement (ILR)', 'Bring dependents', 'NHS access'],
        whoItIsFor: 'Qualified professionals with sponsorship.'
      },
      {
        id: 'student-visa',
        name: 'Student Visa',
        description: 'For students aged 16 or over for higher education.',
        officialUrl: 'https://www.gov.uk/student-visa',
        benefits: ['Graduate visa eligibility', 'Work part-time', 'World-class universities'],
        whoItIsFor: 'Students with a CAS from a UK university.'
      },
      {
        id: 'graduate-visa',
        name: 'Graduate Visa',
        description: 'For international students who have completed a degree in the UK.',
        officialUrl: 'https://www.gov.uk/graduate-visa',
        benefits: ['2-3 years work rights', 'No sponsorship needed', 'Switch to Skilled Worker later'],
        whoItIsFor: 'Recent UK graduates.'
      }
    ]
  },
  {
    id: 'france',
    name: 'France',
    flag: '🇫🇷',
    landmark: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    description: 'The world\'s most visited country, offering rich culture and career paths.',
    visas: [
      {
        id: 'short-stay',
        name: 'Short-Stay (Schengen)',
        description: 'For visits up to 90 days.',
        officialUrl: 'https://france-visas.gouv.fr/en/web/france-visas/tourism-private-stay',
        benefits: ['Schengen area access', 'Cultural exploration', 'Business meetings'],
        whoItIsFor: 'Tourists and short-term visitors.'
      },
      {
        id: 'talent-passport',
        name: 'Talent Passport',
        description: 'For highly skilled workers, researchers, and artists.',
        officialUrl: 'https://france-visas.gouv.fr/en/web/france-visas/international-talents',
        benefits: ['4-year residency', 'Family included', 'No work permit needed'],
        whoItIsFor: 'Highly qualified professionals and creatives.'
      },
      {
        id: 'long-stay-student',
        name: 'Long-Stay Student',
        description: 'For students pursuing higher education.',
        officialUrl: 'https://france-visas.gouv.fr/en/web/france-visas/student',
        benefits: ['CAF housing subsidy', 'Part-time work', 'Post-study residency'],
        whoItIsFor: 'Students enrolled in French institutions.'
      }
    ]
  },
  {
    id: 'belgium',
    name: 'Belgium',
    flag: '🇧🇪',
    landmark: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?q=80&w=1000&auto=format&fit=crop',
    description: 'The heart of Europe, home to the EU and NATO.',
    visas: [
      {
        id: 'short-stay',
        name: 'Short-Stay (Type C)',
        description: 'For tourism or business up to 90 days.',
        officialUrl: 'https://diplomatie.belgium.be/en/travel-belgium/visa-belgium/short-stay-visa-schengen',
        benefits: ['Central location', 'Schengen access', 'Multilingual environment'],
        whoItIsFor: 'Tourists and business travelers.'
      },
      {
        id: 'work-permit-single',
        name: 'Single Permit (Work)',
        description: 'Combined work and residence permit.',
        officialUrl: 'https://www.belgium.be/en/work/coming_to_work_in_belgium/work_permit',
        benefits: ['Streamlined process', 'High standard of living', 'EU mobility'],
        whoItIsFor: 'Foreign workers with Belgian employment.'
      }
    ]
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    flag: '🇳🇱',
    landmark: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1000&auto=format&fit=crop',
    description: 'Innovative, open, and highly efficient country with great career prospects.',
    visas: [
      {
        id: 'highly-skilled-migrant',
        name: 'Highly Skilled Migrant',
        description: 'For professionals earning above a certain salary threshold.',
        officialUrl: 'https://ind.nl/en/residence-permits/work/highly-skilled-migrant',
        benefits: ['Fast-track processing', '30% tax ruling eligibility', 'Family reunification'],
        whoItIsFor: 'Qualified professionals with a recognized sponsor.'
      },
      {
        id: 'orientation-year',
        name: 'Orientation Year',
        description: 'For graduates from top universities to find work.',
        officialUrl: 'https://ind.nl/en/residence-permits/work/orientation-year-highly-educated-persons',
        benefits: ['1 year to find work', 'Unrestricted work rights', 'No sponsor needed initially'],
        whoItIsFor: 'Recent graduates from global top universities.'
      }
    ]
  },
  {
    id: 'italy',
    name: 'Italy',
    flag: '🇮🇹',
    landmark: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1000&auto=format&fit=crop',
    description: 'A country of art, history, and incredible lifestyle.',
    visas: [
      {
        id: 'tourism',
        name: 'Tourism Visa',
        description: 'For short visits to explore Italy.',
        officialUrl: 'https://vistoperitalia.esteri.it/home/en',
        benefits: ['Schengen access', 'World-class sites', 'Culinary experiences'],
        whoItIsFor: 'Tourists.'
      },
      {
        id: 'digital-nomad',
        name: 'Digital Nomad Visa',
        description: 'For remote workers seeking to live in Italy.',
        officialUrl: 'https://www.esteri.it/en/servizi-consolari-e-visti/ingressosoggiornoinitalia/visto-per-nomadi-digitali/',
        benefits: ['Live in Italy while working remotely', 'Renewable residency', 'Tax incentives'],
        whoItIsFor: 'Remote workers and freelancers.'
      }
    ]
  },
  {
    id: 'spain',
    name: 'Spain',
    flag: '🇪🇸',
    landmark: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1000&auto=format&fit=crop',
    description: 'Sunny climate, vibrant culture, and a growing tech scene.',
    visas: [
      {
        id: 'digital-nomad',
        name: 'Digital Nomad Visa',
        description: 'For remote workers and freelancers.',
        officialUrl: 'https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/index.aspx',
        benefits: ['Special tax regime', 'Residency for family', 'Travel in Schengen'],
        whoItIsFor: 'Remote employees and independent contractors.'
      },
      {
        id: 'non-lucrative',
        name: 'Non-Lucrative Visa',
        description: 'For those who wish to retire or live in Spain without working.',
        officialUrl: 'https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/index.aspx',
        benefits: ['Live in Spain', 'Path to permanent residency', 'Excellent healthcare'],
        whoItIsFor: 'Retirees and individuals with passive income.'
      }
    ]
  },
  {
    id: 'portugal',
    name: 'Portugal',
    flag: '🇵🇹',
    landmark: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1000&auto=format&fit=crop',
    description: 'One of the safest and most affordable countries in Western Europe.',
    visas: [
      {
        id: 'd7-visa',
        name: 'D7 Visa (Passive Income)',
        description: 'For retirees or those with stable passive income.',
        officialUrl: 'https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa',
        benefits: ['Path to citizenship', 'NHR tax status', 'Schengen access'],
        whoItIsFor: 'Retirees and those with rental/investment income.'
      },
      {
        id: 'digital-nomad',
        name: 'Digital Nomad (D8)',
        description: 'For remote workers with high income.',
        officialUrl: 'https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa',
        benefits: ['Live by the ocean', 'Fast processing', 'Residency for family'],
        whoItIsFor: 'High-earning remote workers.'
      }
    ]
  },
  {
    id: 'sweden',
    name: 'Sweden',
    flag: '🇸🇪',
    landmark: 'https://images.unsplash.com/photo-1509339022327-1e1e25360a41?q=80&w=1000&auto=format&fit=crop',
    description: 'Known for its social equality, innovation, and stunning nature.',
    visas: [
      {
        id: 'work-permit',
        name: 'Work Permit',
        description: 'For those with a job offer in Sweden.',
        officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html',
        benefits: ['High quality of life', 'Generous leave', 'Family reunification'],
        whoItIsFor: 'Skilled workers with Swedish employment.'
      }
    ]
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    landmark: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop',
    description: 'The "Rainbow Nation" with diverse landscapes and opportunities.',
    visas: [
      {
        id: 'critical-skills',
        name: 'Critical Skills Work Visa',
        description: 'For individuals with skills in high demand.',
        officialUrl: 'http://www.dha.gov.za/index.php/immigration-services/types-of-visas',
        benefits: ['Up to 5 years stay', 'No job offer needed initially', 'Permanent residency path'],
        whoItIsFor: 'Highly skilled professionals in specific sectors.'
      }
    ]
  },
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    landmark: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop',
    description: 'A global economic giant with deep history and rapid modernization.',
    visas: [
      {
        id: 'z-visa',
        name: 'Work Visa (Z)',
        description: 'For those taking up employment in China.',
        officialUrl: 'http://www.visaforchina.org/',
        benefits: ['Career growth', 'Cultural immersion', 'Competitive salaries'],
        whoItIsFor: 'Professionals with a Chinese work permit.'
      }
    ]
  },
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    landmark: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1000&auto=format&fit=crop',
    description: 'The largest country in the world with unique cultural and business ties.',
    visas: [
      {
        id: 'business-visa',
        name: 'Business Visa',
        description: 'For business meetings and negotiations.',
        officialUrl: 'https://russia-visacentre.com/',
        benefits: ['Multiple entries', 'Up to 1 year validity', 'Business networking'],
        whoItIsFor: 'Business professionals.'
      }
    ]
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    landmark: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000&auto=format&fit=crop',
    description: 'A bridge between Europe and Asia with a booming tourism sector.',
    visas: [
      {
        id: 'e-visa',
        name: 'e-Visa',
        description: 'Fast online visa for tourism and trade.',
        officialUrl: 'https://www.evisa.gov.tr/en/',
        benefits: ['Instant approval', 'Low cost', 'Valid for 180 days'],
        whoItIsFor: 'Tourists from eligible countries.'
      }
    ]
  },
  {
    id: 'uae',
    name: 'UAE',
    flag: '🇦🇪',
    landmark: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    description: 'A global business hub with tax-free income and luxury living.',
    visas: [
      {
        id: 'golden-visa',
        name: 'Golden Visa',
        description: 'Long-term residency for investors and talents.',
        officialUrl: 'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/golden-visa',
        benefits: ['10-year residency', '100% business ownership', 'No sponsor needed'],
        whoItIsFor: 'Investors, entrepreneurs, and specialized talents.'
      },
      {
        id: 'green-visa',
        name: 'Green Visa',
        description: 'For skilled employees and freelancers.',
        officialUrl: 'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/green-visa',
        benefits: ['5-year residency', 'Self-sponsored', 'Family benefits'],
        whoItIsFor: 'Skilled professionals and self-employed individuals.'
      }
    ]
  }
];
