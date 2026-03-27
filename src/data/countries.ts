
export interface VisaCategory {
  id: string;
  name: string;
  description: string;
  officialUrl: string;
  benefits: string[];
  whoItIsFor: string;
  fileName?: string;
  howToApply?: string[];
}

export interface LivingInCountry {
  costOfLiving: string;
  healthcare: string;
  safety: string;
  culture: string;
}

export interface Country {
  id: string;
  name: string;
  flag: string;
  isoCode: string;
  landmark: string;
  description: string;
  visas: VisaCategory[];
  livingInCountry?: LivingInCountry;
}

export const countries: Country[] = [
  {
    id: 'united-states',
    name: 'United States',
    flag: '🇺🇸',
    isoCode: 'us',
    landmark: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=1000&auto=format&fit=crop',
    description: 'The land of opportunity with diverse visa options for tourism, study, and work.',
    livingInCountry: {
      costOfLiving: 'High, especially in major cities like New York and San Francisco. Rent varies widely.',
      healthcare: 'Private healthcare system. Insurance is highly recommended and often provided by employers.',
      safety: 'Generally safe, but varies by neighborhood. Standard urban precautions apply.',
      culture: 'Diverse, individualistic, and fast-paced. Strong emphasis on innovation and freedom.'
    },
    visas: [
      // Visitor / Travel
      {
        id: 'b1-visa',
        name: 'B1 Business Visa',
        description: 'For short-term business trips, meetings, and consultations.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Business networking', 'Short-term stay', 'Fast processing'],
        whoItIsFor: 'Business professionals.',
        fileName: 'B1_Visa_Guide.pdf',
        howToApply: [
          'Complete the DS-160 online application form.',
          'Pay the visa application fee.',
          'Schedule a visa interview at a US Embassy or Consulate.',
          'Gather required documents (passport, photo, business letter).',
          'Attend the interview and wait for processing.'
        ]
      },
      {
        id: 'b2-visa',
        name: 'B2 Tourist Visa',
        description: 'For tourism, vacation, or visiting friends and family.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Tourism exploration', 'Family visits', 'Up to 6 months stay'],
        whoItIsFor: 'Tourists and vacationers.',
        fileName: 'B2_Tourist_Visa_Guide.pdf'
      },
      {
        id: 'esta-guide',
        name: 'ESTA (Visa Waiver)',
        description: 'For citizens of VWP countries traveling for 90 days or less.',
        officialUrl: 'https://esta.cbp.dhs.gov/',
        benefits: ['No visa interview', 'Valid for 2 years', 'Instant approval'],
        whoItIsFor: 'VWP eligible citizens.',
        fileName: 'ESTA_Application_Guide.pdf'
      },
      // Student
      {
        id: 'f1-student',
        name: 'F1 Student Visa',
        description: 'For academic studies at US colleges and universities.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Top-tier education', 'OPT work rights', 'On-campus jobs'],
        whoItIsFor: 'Academic students.',
        fileName: 'F1_Student_Visa_Official_Guide.pdf'
      },
      {
        id: 'm1-vocational',
        name: 'M1 Vocational Visa',
        description: 'For non-academic or vocational studies.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Practical training', 'Specific skill acquisition', 'Short-term programs'],
        whoItIsFor: 'Vocational students.',
        fileName: 'M1_Vocational_Visa_Official_Guide.pdf'
      },
      // Work Visas
      {
        id: 'h1b-specialty',
        name: 'H1B Specialty Occupation',
        description: 'For skilled workers in specialty occupations.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Dual intent', '6-year stay', 'Spouse can work (H4 EAD)'],
        whoItIsFor: 'Skilled professionals.',
        fileName: 'H1B_Visa_Guide.pdf'
      },
      {
        id: 'h2b-non-agricultural',
        name: 'H2B Non-Agricultural Worker',
        description: 'For temporary non-agricultural services or labor.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Seasonal work', 'Renewable stay', 'Employer sponsorship'],
        whoItIsFor: 'Temporary workers.',
        fileName: 'H2B_Visa_Guide.pdf'
      },
      {
        id: 'h3-trainee',
        name: 'H3 Trainee or Special Education',
        description: 'For receiving training in the US that is not available in your home country.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Professional training', 'No degree required', 'Cultural exchange'],
        whoItIsFor: 'Trainees.',
        fileName: 'H3_Visa_Guide.pdf'
      },
      {
        id: 'l1a-manager',
        name: 'L-1A Executive/Manager',
        description: 'For intracompany transferees in managerial or executive roles.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['7-year stay', 'Path to EB-1C', 'Spouse can work'],
        whoItIsFor: 'Corporate managers.',
        fileName: 'L-1A_Visa_Guide.pdf'
      },
      {
        id: 'l1b-specialized',
        name: 'L-1B Specialized Knowledge',
        description: 'For intracompany transferees with specialized knowledge.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['5-year stay', 'Spouse can work', 'Company internal transfer'],
        whoItIsFor: 'Specialized employees.',
        fileName: 'L-1B_Visa_Guide.pdf'
      },
      {
        id: 'o1-extraordinary',
        name: 'O1 Extraordinary Ability',
        description: 'For individuals with extraordinary ability in their field.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['No cap', 'Indefinite extensions', 'High prestige'],
        whoItIsFor: 'Top-tier talent.',
        fileName: 'O1_Visa_Guide.pdf'
      },
      {
        id: 'p1-athlete',
        name: 'P1 Athlete/Entertainer',
        description: 'For internationally recognized athletes or members of entertainment groups.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Perform in US', 'Support staff included', 'Multiple entries'],
        whoItIsFor: 'Athletes and performers.',
        fileName: 'P1_Visa_Guide.pdf'
      },
      {
        id: 'p2-artist-exchange',
        name: 'P2 Artist/Exchange Program',
        description: 'For artists or entertainers performing under a reciprocal exchange program.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Cultural exchange', 'Performance rights', 'Short-term stay'],
        whoItIsFor: 'Exchange artists.',
        fileName: 'P2_Visa_Guide.pdf'
      },
      {
        id: 'p3-culturally-unique',
        name: 'P3 Culturally Unique Artist',
        description: 'For artists or entertainers performing in a culturally unique program.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Cultural promotion', 'Unique performances', 'Short-term stay'],
        whoItIsFor: 'Cultural artists.',
        fileName: 'P3_Visa_Guide.pdf'
      },
      {
        id: 'tn-nafta',
        name: 'TN NAFTA Professional',
        description: 'For Canadian and Mexican citizens in specific professions.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Fast processing', 'Renewable indefinitely', 'Low cost'],
        whoItIsFor: 'Canadian and Mexican professionals.',
        fileName: 'TN_Visa_Guide.pdf'
      },
      // Family-Based
      {
        id: 'k1-fiance',
        name: 'K1 Fiancé(e) Visa',
        description: 'For the fiancé(e) of a US citizen.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Marriage in US', 'Path to Green Card', 'Fast entry'],
        whoItIsFor: 'Fiancés of US citizens.',
        fileName: 'K1_Visa_Guide.pdf'
      },
      {
        id: 'k2-child-fiance',
        name: 'K2 Child of Fiancé(e)',
        description: 'For the children of K-1 visa applicants.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Stay with parent', 'Path to Green Card', 'Education access'],
        whoItIsFor: 'Children of K-1 applicants.',
        fileName: 'K2_Visa_Guide.pdf'
      },
      {
        id: 'k3-spouse-citizen',
        name: 'K3 Spouse of US Citizen',
        description: 'For the spouse of a US citizen awaiting an immigrant visa.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Wait for PR in US', 'Work rights', 'Family unity'],
        whoItIsFor: 'Spouses of US citizens.',
        fileName: 'K3_Visa_Guide.pdf'
      },
      {
        id: 'cr1-spouse',
        name: 'CR1/IR1 Spouse Visa',
        description: 'For spouses of US citizens.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Immediate Green Card', 'Work rights', 'Family unity'],
        whoItIsFor: 'Spouses of US citizens.',
        fileName: 'CR1_Visa_Guide.pdf'
      },
      {
        id: 'ir2-child-citizen',
        name: 'IR2 Child of US Citizen',
        description: 'For unmarried children under 21 of US citizens.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Immediate Green Card', 'Education access', 'Permanent stay'],
        whoItIsFor: 'Children of US citizens.',
        fileName: 'IR2_Visa_Guide.pdf'
      },
      {
        id: 'ir5-parent-citizen',
        name: 'IR5 Parent of US Citizen',
        description: 'For parents of US citizens (petitioner must be 21+).',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Immediate Green Card', 'Family reunification', 'Permanent stay'],
        whoItIsFor: 'Parents of US citizens.',
        fileName: 'IR5_Visa_Guide.pdf'
      },
      {
        id: 'f2a-spouse-child-pr',
        name: 'F2A Spouse/Child of LPR',
        description: 'For spouses and unmarried children of Green Card holders.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Path to Green Card', 'Family unity', 'Work rights'],
        whoItIsFor: 'Relatives of LPRs.',
        fileName: 'F2A_Visa_Guide.pdf'
      },
      {
        id: 'f2b-adult-child-pr',
        name: 'F2B Adult Child of LPR',
        description: 'For unmarried children (21+) of Green Card holders.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Path to Green Card', 'Permanent stay', 'Work rights'],
        whoItIsFor: 'Adult children of LPRs.',
        fileName: 'F2B_Visa_Guide.pdf'
      },
      {
        id: 'f4-sibling-citizen',
        name: 'F4 Sibling of US Citizen',
        description: 'For brothers and sisters of US citizens.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Path to Green Card', 'Family reunification', 'Permanent stay'],
        whoItIsFor: 'Siblings of US citizens.',
        fileName: 'F4_Visa_Guide.pdf'
      },
      // Employment-Based (Green Card)
      {
        id: 'eb1a-extraordinary',
        name: 'EB1A Extraordinary Ability',
        description: 'Green card for top-tier professionals.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['No employer needed', 'Fast processing', 'Permanent residency'],
        whoItIsFor: 'World-class experts.',
        fileName: 'EB1A_Visa_Guide.pdf'
      },
      {
        id: 'eb1b-researcher',
        name: 'EB1B Outstanding Researcher',
        description: 'Green card for outstanding professors and researchers.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['No PERM needed', 'High prestige', 'Permanent residency'],
        whoItIsFor: 'Researchers and professors.',
        fileName: 'EB1B_Visa_Guide.pdf'
      },
      {
        id: 'eb1c-manager',
        name: 'EB1C Multinational Manager',
        description: 'Green card for multinational executives or managers.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['No PERM needed', 'Direct Green Card', 'Corporate transfer'],
        whoItIsFor: 'Corporate executives.',
        fileName: 'EB1C_Visa_Guide.pdf'
      },
      {
        id: 'eb2-niw',
        name: 'EB2 NIW (National Interest Waiver)',
        description: 'Green card for those whose work benefits the US.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['No PERM needed', 'Self-petition', 'Permanent residency'],
        whoItIsFor: 'Advanced degree holders.',
        fileName: 'EB2_NIW_Visa_Guide.pdf'
      },
      {
        id: 'eb3-skilled-worker',
        name: 'EB3 Skilled/Professional',
        description: 'Green card for skilled workers, professionals, and other workers.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Permanent residency', 'Work for sponsor', 'Family included'],
        whoItIsFor: 'Skilled workers.',
        fileName: 'EB3_Visa_Guide.pdf'
      },
      {
        id: 'eb4-special-immigrant',
        name: 'EB4 Special Immigrant',
        description: 'Green card for special categories like religious workers.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Permanent residency', 'Diverse categories', 'Family included'],
        whoItIsFor: 'Special immigrants.',
        fileName: 'EB4_Visa_Guide.pdf'
      },
      {
        id: 'eb5-investor',
        name: 'EB5 Immigrant Investor',
        description: 'Green card through investment in US business.',
        officialUrl: 'https://ceac.state.gov/iv/',
        benefits: ['Direct Green Card', 'No job offer needed', 'Family included'],
        whoItIsFor: 'High-net-worth investors.',
        fileName: 'EB5_Visa_Guide.pdf'
      },
      // Business / Investor
      {
        id: 'e1-treaty-trader',
        name: 'E1 Treaty Trader',
        description: 'For citizens of treaty countries engaged in trade.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Indefinite stay', 'Spouse can work', 'Business growth'],
        whoItIsFor: 'Traders from treaty countries.',
        fileName: 'E1_Visa_Guide.pdf'
      },
      {
        id: 'e2-treaty-investor',
        name: 'E2 Treaty Investor',
        description: 'For citizens of treaty countries investing in US business.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Low investment threshold', 'Renewable', 'Spouse can work'],
        whoItIsFor: 'Investors from treaty countries.',
        fileName: 'E2_Visa_Guide.pdf'
      },
      // Special Categories
      {
        id: 'i1-media',
        name: 'I1 Media & Journalism',
        description: 'For representatives of foreign media traveling to the US.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Work as journalist', 'Indefinite extensions', 'Family included'],
        whoItIsFor: 'Journalists.',
        fileName: 'I1_Media_Visa_Guide.pdf'
      },
      {
        id: 'r1-religious',
        name: 'R1 Religious Worker',
        description: 'For ministers and religious workers.',
        officialUrl: 'https://ceac.state.gov/genniv/',
        benefits: ['Work for non-profits', 'Up to 5 years', 'Family included'],
        whoItIsFor: 'Religious professionals.',
        fileName: 'R1_Religious_Visa_Guide.pdf'
      },
      {
        id: 'vawa-guide',
        name: 'VAWA Self-Petition',
        description: 'For victims of abuse by a US citizen or PR relative.',
        officialUrl: 'https://www.uscis.gov/vawa',
        benefits: ['Confidentiality', 'Work authorization', 'Path to Green Card'],
        whoItIsFor: 'Abuse victims.',
        fileName: 'VAWA_Guide.pdf'
      }
    ]
  },
  {
    id: 'canada',
    name: 'Canada',
    flag: '🇨🇦',
    isoCode: 'ca',
    landmark: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=1000&auto=format&fit=crop',
    description: 'Known for its welcoming immigration policies and high quality of life.',
    livingInCountry: {
      costOfLiving: 'Moderate to high. Housing in cities like Toronto and Vancouver is expensive.',
      healthcare: 'Publicly funded healthcare system (Medicare). High quality and accessible to residents.',
      safety: 'Very safe with low crime rates. Known for its friendly and inclusive society.',
      culture: 'Multicultural, polite, and outdoor-oriented. Strong emphasis on diversity and inclusion.'
    },
    visas: [
      // Travel / Visitor
      {
        id: 'canada-eta',
        name: 'Canada eTA',
        description: 'Electronic Travel Authorization for visa-exempt foreign nationals.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/eta.html',
        benefits: ['Fast online approval', 'Valid for 5 years', 'Low cost'],
        whoItIsFor: 'Visa-exempt travelers.',
        fileName: 'Canada_eTA_Official_Guide.pdf',
        howToApply: [
          'Check if you need an eTA based on your nationality.',
          'Apply online using your passport and a credit card.',
          'Pay the application fee.',
          'Receive an email confirmation within minutes.',
          'Your eTA is electronically linked to your passport.'
        ]
      },
      {
        id: 'super-visa',
        name: 'Super Visa',
        description: 'For parents and grandparents of Canadian citizens or PRs.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/parent-grandparent-super-visa.html',
        benefits: ['Stay up to 5 years', 'Multiple entries', 'Family reunification'],
        whoItIsFor: 'Parents and grandparents.',
        fileName: 'Super_Visa_Parent_Grandparent_Visitor_Visa_Guide.pdf'
      },
      // Permanent Residency (PR)
      {
        id: 'express-entry',
        name: 'Express Entry',
        description: 'The primary system for skilled worker immigration.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html',
        benefits: ['Fast processing', 'Direct PR', 'Healthcare access'],
        whoItIsFor: 'Skilled professionals.',
        fileName: 'Express_Entry_Canada_Immigration_Guide.pdf'
      },
      {
        id: 'pnp-program',
        name: 'Provincial Nominee (PNP)',
        description: 'Immigration through specific Canadian provinces.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/provincial-nominees.html',
        benefits: ['Targeted occupations', 'Province support', 'Path to PR'],
        whoItIsFor: 'Workers with skills needed in specific provinces.',
        fileName: 'Provincial_Nominee_Program_PNP_Guide.pdf'
      },
      // Family Sponsorship
      {
        id: 'spouse-sponsorship',
        name: 'Spouse & Partner Sponsorship',
        description: 'Sponsor your spouse, partner, or dependent child.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/spouse-partner-children.html',
        benefits: ['Permanent residency', 'Work rights', 'Family unity'],
        whoItIsFor: 'Spouses and partners.',
        fileName: 'Family_Sponsorship_Spouse_Partner_Child_Guide.pdf'
      },
      {
        id: 'pgp-sponsorship',
        name: 'Parent & Grandparent Sponsorship',
        description: 'Sponsor your parents or grandparents for PR.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/family-sponsorship/parents-grandparents.html',
        benefits: ['Permanent residency', 'Family reunification', 'Healthcare access'],
        whoItIsFor: 'Sponsors of parents/grandparents.',
        fileName: 'Parent_and_Grandparent_Sponsorship_PGP_Guide.pdf'
      },
      // Work Programs
      {
        id: 'imp-program',
        name: 'International Mobility (IMP)',
        description: 'Work permits without an LMIA.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/international-mobility-program.html',
        benefits: ['No LMIA needed', 'Fast processing', 'Diverse categories'],
        whoItIsFor: 'Intra-company transferees and treaty workers.',
        fileName: 'International_Mobility_Program_IMP_Guide.pdf'
      },
      {
        id: 'tfwp-program',
        name: 'Foreign Worker Program (TFWP)',
        description: 'Work permits requiring an LMIA.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/permit/temporary/foreign-workers.html',
        benefits: ['High wages', 'Worker protections', 'Path to PR'],
        whoItIsFor: 'Workers with LMIA-supported job offers.',
        fileName: 'Temporary_Foreign_Worker_Program_TFWP_Guide.pdf'
      },
      // Study
      {
        id: 'study-permit',
        name: 'Study Permit',
        description: 'For international students at Canadian institutions.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html',
        benefits: ['World-class education', 'Work while studying', 'PGWP eligibility'],
        whoItIsFor: 'International students.',
        fileName: 'Study_Permit_Guide.pdf'
      },
      // Business / Special
      {
        id: 'startup-visa',
        name: 'Start-Up Visa (SUV)',
        description: 'For entrepreneurs with innovative business ideas.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/start-visa.html',
        benefits: ['Direct PR', 'Venture capital support', 'Business growth'],
        whoItIsFor: 'Innovative entrepreneurs.',
        fileName: 'Start-Up_Visa_SUV_Guide.pdf'
      },
      {
        id: 'self-employed-program',
        name: 'Self-Employed Persons',
        description: 'For those who have relevant experience in self-employment in cultural or athletic activities.',
        officialUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/self-employed.html',
        benefits: ['Direct PR', 'Work for yourself', 'Cultural contribution'],
        whoItIsFor: 'Artists and athletes.',
        fileName: 'Self-Employed_Persons_Program_Guide.pdf'
      }
    ]
  },
  {
    id: 'germany',
    name: 'Germany',
    flag: '🇩🇪',
    isoCode: 'de',
    landmark: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1000&auto=format&fit=crop',
    description: 'The economic powerhouse of Europe with excellent work and study opportunities.',
    livingInCountry: {
      costOfLiving: 'Moderate. Rent is the biggest expense, but food and transport are reasonable.',
      healthcare: 'Excellent universal healthcare system. Mandatory insurance for all residents.',
      safety: 'Very safe with well-maintained public spaces and efficient law enforcement.',
      culture: 'Structured, punctual, and rich in history. Strong emphasis on work-life balance.'
    },
    visas: [
      // Visitor / Travel
      {
        id: 'schengen-visa',
        name: 'Schengen Visa',
        description: 'For tourism or business visits up to 90 days.',
        officialUrl: 'https://www.auswaertiges-amt.de/en/visa-service/-/215870',
        benefits: ['Travel across 29 countries', 'Simple process', 'Business networking'],
        whoItIsFor: 'Tourists and business travelers.',
        fileName: 'Schengen_Visa_Germany_Guide.pdf',
        howToApply: [
          'Determine the type of Schengen visa you need.',
          'Find out where you need to apply (Embassy/Consulate/Visa Center).',
          'Book a visa appointment.',
          'Complete the application form and gather required documents.',
          'Attend the appointment and pay the visa fee.'
        ]
      },
      {
        id: 'short-stay-visitor',
        name: 'Short Stay Visitor Visa',
        description: 'For short-term visits to Germany for various purposes.',
        officialUrl: 'https://www.auswaertiges-amt.de/en/visa-service/-/215870',
        benefits: ['Up to 90 days stay', 'Multiple entry options', 'Cultural exchange'],
        whoItIsFor: 'Short-term visitors.',
        fileName: 'Short_Stay_Visitor_Visa_Guide.pdf'
      },
      // Study
      {
        id: 'student-visa',
        name: 'Germany Student Visa',
        description: 'For university students or language learners.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/study',
        benefits: ['Low tuition fees', 'Work while studying', '18-month job seeker visa after'],
        whoItIsFor: 'Students admitted to German universities.',
        fileName: 'Germany_Student_Visa_Guide.pdf'
      },
      {
        id: 'student-applicant-visa',
        name: 'Germany Student Applicant Visa',
        description: 'For those who haven\'t yet received a university admission.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/study',
        benefits: ['Stay in Germany to apply', 'Visit universities', 'Language course options'],
        whoItIsFor: 'Prospective students.',
        fileName: 'Germany_Student_Applicant_Visa_Guide.pdf'
      },
      // Work Visas
      {
        id: 'work-visa',
        name: 'Germany Work Visa',
        description: 'For long-term employment in Germany.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/work-qualified-professionals',
        benefits: ['High social security', 'Strong labor laws', 'Path to PR'],
        whoItIsFor: 'Qualified professionals with a job offer.',
        fileName: 'Germany_Work_Visa_Guide.pdf'
      },
      {
        id: 'eu-blue-card',
        name: 'EU Blue Card',
        description: 'For highly qualified workers with a high salary.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/eu-blue-card',
        benefits: ['Fast-track to PR', 'Family reunification', 'EU mobility'],
        whoItIsFor: 'Highly skilled professionals.',
        fileName: 'EU_Blue_Card_Germany_Guide.pdf'
      },
      {
        id: 'job-seeker-visa',
        name: 'Job Seeker Visa',
        description: 'For qualified professionals to look for a job in Germany.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/job-search-opportunity-card',
        benefits: ['6 months to find a job', 'In-person interviews', 'Local networking'],
        whoItIsFor: 'Skilled workers looking for employment.',
        fileName: 'Job_Seeker_Visa_Germany_Guide.pdf'
      },
      // Permanent Residency (PR)
      {
        id: 'permanent-residence',
        name: 'Germany Permanent Residence',
        description: 'For long-term residents to live and work indefinitely.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/living-permanently/settlement-permit',
        benefits: ['Indefinite stay', 'Full labor market access', 'Social benefits'],
        whoItIsFor: 'Long-term residents in Germany.',
        fileName: 'Germany_Permanent_Residence_Guide.pdf'
      },
      {
        id: 'eu-permanent-residence',
        name: 'EU Permanent Residence',
        description: 'Permanent residence status valid across the EU.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/living-permanently/settlement-permit',
        benefits: ['EU-wide residency', 'Work in other EU countries', 'Long-term security'],
        whoItIsFor: 'Qualified long-term residents.',
        fileName: 'EU_Permanent_Residence_Guide.pdf'
      },
      // Family Reunification
      {
        id: 'family-reunion',
        name: 'Germany Family Reunion Visa',
        description: 'To join family members already living in Germany.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/family-reunification',
        benefits: ['Live with family', 'Work permit included', 'Access to education'],
        whoItIsFor: 'Family members of German residents.',
        fileName: 'Germany_Family_Reunion_Visa_Guide.pdf'
      },
      {
        id: 'spouse-visa',
        name: 'Spouse Visa',
        description: 'Specifically for spouses of German residents.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/family-reunification',
        benefits: ['Immediate residency', 'Integration courses', 'Right to work'],
        whoItIsFor: 'Spouses of German residents.',
        fileName: 'Spouse_Visa_Germany_Guide.pdf'
      },
      // Business / Freelance
      {
        id: 'freelance-visa',
        name: 'Germany Freelance Visa',
        description: 'For self-employed individuals in liberal professions.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/self-employment',
        benefits: ['Work for multiple clients', 'Creative freedom', 'Path to PR'],
        whoItIsFor: 'Freelancers and artists.',
        fileName: 'Germany_Freelance_Visa_Guide.pdf'
      },
      {
        id: 'self-employment-visa',
        name: 'Germany Self-Employment Visa',
        description: 'For entrepreneurs starting a business in Germany.',
        officialUrl: 'https://www.make-it-in-germany.com/en/visa-residence/types/self-employment',
        benefits: ['Business ownership', 'Economic growth', 'Family included'],
        whoItIsFor: 'Business owners and entrepreneurs.',
        fileName: 'Germany_Self_Employment_Visa_Guide.pdf'
      }
    ]
  },
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    flag: '🇬🇧',
    isoCode: 'gb',
    landmark: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1000&auto=format&fit=crop',
    description: 'A global hub for finance, education, and culture.',
    livingInCountry: {
      costOfLiving: 'High, especially in London. Other regions are more affordable.',
      healthcare: 'National Health Service (NHS) provides free healthcare at the point of use.',
      safety: 'Generally safe. Major cities have typical urban safety considerations.',
      culture: 'Diverse, historic, and vibrant. Strong emphasis on tradition and innovation.'
    },
    visas: [
      {
        id: 'standard-visitor',
        name: 'Standard Visitor',
        description: 'For tourism, business, or short-term study.',
        officialUrl: 'https://www.gov.uk/standard-visitor-visa',
        benefits: ['Up to 6 months stay', 'Fast-track options', 'Multiple entries'],
        whoItIsFor: 'Tourists and short-term visitors.',
        howToApply: [
          'Check if you need a visa to visit the UK.',
          'Apply online at least 3 months before you travel.',
          'Pay the application fee.',
          'Book and attend an appointment at a visa application center.',
          'Provide your biometric information and documents.'
        ]
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
    isoCode: 'fr',
    landmark: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1000&auto=format&fit=crop',
    description: 'The world\'s most visited country, offering rich culture and career paths.',
    livingInCountry: {
      costOfLiving: 'High in Paris, moderate in other regions.',
      healthcare: 'Excellent public healthcare (PUMa). High quality and widely accessible.',
      safety: 'Generally safe, with standard urban precautions in major cities.',
      culture: 'Rich in history, art, and gastronomy. Strong emphasis on work-life balance and "art de vivre".'
    },
    visas: [
      {
        id: 'short-stay',
        name: 'Short-Stay (Schengen)',
        description: 'For visits up to 90 days.',
        officialUrl: 'https://france-visas.gouv.fr/en/web/france-visas/tourism-private-stay',
        benefits: ['Schengen area access', 'Cultural exploration', 'Business meetings'],
        whoItIsFor: 'Tourists and short-term visitors.',
        howToApply: [
          'Determine the type of visa you need.',
          'Create an account on the France-Visas website.',
          'Complete the online application form.',
          'Book an appointment at a visa center.',
          'Attend the appointment with your documents and pay the fee.'
        ]
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
    isoCode: 'be',
    landmark: 'https://images.unsplash.com/photo-1559113513-d5e09c78b9dd?q=80&w=1000&auto=format&fit=crop',
    description: 'The heart of Europe, home to the EU and NATO.',
    livingInCountry: {
      costOfLiving: 'Moderate to high. Brussels is more expensive but still affordable compared to London or Paris.',
      healthcare: 'High-quality healthcare system funded by social security and mandatory insurance.',
      safety: 'Very safe with low crime rates.',
      culture: 'Multilingual (Dutch, French, German), famous for chocolate, beer, and surrealist art.'
    },
    visas: [
      {
        id: 'short-stay',
        name: 'Short-Stay (Type C)',
        description: 'For tourism or business up to 90 days.',
        officialUrl: 'https://diplomatie.belgium.be/en/travel-belgium/visa-belgium/short-stay-visa-schengen',
        benefits: ['Central location', 'Schengen access', 'Multilingual environment'],
        whoItIsFor: 'Tourists and business travelers.',
        howToApply: [
          'Identify the purpose of your visit.',
          'Check which embassy or consulate is responsible for your area.',
          'Complete the Schengen visa application form.',
          'Gather required documents (passport, insurance, proof of funds).',
          'Submit your application and attend an interview if required.'
        ]
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
    isoCode: 'nl',
    landmark: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?q=80&w=1000&auto=format&fit=crop',
    description: 'Innovative, open, and highly efficient country with great career prospects.',
    livingInCountry: {
      costOfLiving: 'High, especially in Amsterdam and Utrecht. Housing is in high demand.',
      healthcare: 'Excellent private healthcare system with mandatory basic insurance for all residents.',
      safety: 'One of the safest countries in the world.',
      culture: 'Open-minded, direct, and cycling-oriented. Strong emphasis on innovation and sustainability.'
    },
    visas: [
      {
        id: 'highly-skilled-migrant',
        name: 'Highly Skilled Migrant',
        description: 'For professionals earning above a certain salary threshold.',
        officialUrl: 'https://ind.nl/en/residence-permits/work/highly-skilled-migrant',
        benefits: ['Fast-track processing', '30% tax ruling eligibility', 'Family reunification'],
        whoItIsFor: 'Qualified professionals with a recognized sponsor.',
        howToApply: [
          'Find an employer who is a recognized sponsor by the IND.',
          'Secure a job offer that meets the salary requirements.',
          'Your employer will submit the application to the IND on your behalf.',
          'Once approved, collect your MVV (provisional residence permit) if needed.',
          'Travel to the Netherlands and collect your residence permit card.'
        ]
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
    isoCode: 'it',
    landmark: 'https://images.unsplash.com/photo-1529260830199-42c24126f198?q=80&w=1000&auto=format&fit=crop',
    description: 'A country of art, history, and incredible lifestyle.',
    livingInCountry: {
      costOfLiving: 'Moderate. Northern cities are more expensive than the south.',
      healthcare: 'National Health Service (SSN) provides universal coverage.',
      safety: 'Generally safe, with typical tourist-related precautions in major cities.',
      culture: 'Passionate about food, family, and art. Slow-paced lifestyle ("la dolce vita").'
    },
    visas: [
      {
        id: 'tourism',
        name: 'Tourism Visa',
        description: 'For short visits to explore Italy.',
        officialUrl: 'https://vistoperitalia.esteri.it/home/en',
        benefits: ['Schengen access', 'World-class sites', 'Culinary experiences'],
        whoItIsFor: 'Tourists.',
        howToApply: [
          'Visit the "Il visto per l\'Italia" website to check requirements.',
          'Complete the application form for a short-stay visa.',
          'Gather required documents (flight itinerary, hotel booking, insurance).',
          'Book an appointment at the Italian embassy or consulate.',
          'Attend the interview and submit your application.'
        ]
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
    isoCode: 'es',
    landmark: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=1000&auto=format&fit=crop',
    description: 'Sunny climate, vibrant culture, and a growing tech scene.',
    livingInCountry: {
      costOfLiving: 'Moderate. Affordable compared to Northern Europe.',
      healthcare: 'High-quality public healthcare system (SNS) and excellent private options.',
      safety: 'Very safe with a vibrant social life in public spaces.',
      culture: 'Social, festive, and family-oriented. Famous for tapas, siestas, and diverse regional identities.'
    },
    visas: [
      {
        id: 'digital-nomad',
        name: 'Digital Nomad Visa',
        description: 'For remote workers and freelancers.',
        officialUrl: 'https://www.exteriores.gob.es/Consulados/londres/en/ServiciosConsulares/Paginas/index.aspx',
        benefits: ['Special tax regime', 'Residency for family', 'Travel in Schengen'],
        whoItIsFor: 'Remote employees and independent contractors.',
        howToApply: [
          'Verify your eligibility (income, remote work for at least 3 months).',
          'Gather required documents (criminal record check, proof of work, insurance).',
          'Apply online (if in Spain) or at a Spanish consulate (if abroad).',
          'Pay the relevant application fees.',
          'Receive your residency card (TIE) upon approval.'
        ]
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
    isoCode: 'pt',
    landmark: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=1000&auto=format&fit=crop',
    description: 'One of the safest and most affordable countries in Western Europe.',
    livingInCountry: {
      costOfLiving: 'Low to moderate. One of the most affordable in Western Europe.',
      healthcare: 'National Health Service (SNS) is available to residents, with high-quality private options.',
      safety: 'Consistently ranked as one of the safest countries in the world.',
      culture: 'Relaxed, family-oriented, and rich in maritime history. Famous for Fado, seafood, and beautiful coastlines.'
    },
    visas: [
      {
        id: 'd7-visa',
        name: 'D7 Visa (Passive Income)',
        description: 'For retirees or those with stable passive income.',
        officialUrl: 'https://vistos.mne.gov.pt/en/national-visas/general-information/type-of-visa',
        benefits: ['Path to citizenship', 'NHR tax status', 'Schengen access'],
        whoItIsFor: 'Retirees and those with rental/investment income.',
        howToApply: [
          'Open a Portuguese bank account and obtain a NIF (tax number).',
          'Gather proof of stable passive income (pension, dividends, rental).',
          'Secure long-term accommodation in Portugal.',
          'Apply for the D7 visa at the Portuguese consulate in your home country.',
          'Travel to Portugal and attend an appointment with SEF (AIMA) to collect your residence permit.'
        ]
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
    isoCode: 'se',
    landmark: 'https://images.unsplash.com/photo-1509339022327-1e1e25360a41?q=80&w=1000&auto=format&fit=crop',
    description: 'Known for its social equality, innovation, and stunning nature.',
    livingInCountry: {
      costOfLiving: 'High, particularly in Stockholm. However, high wages and social benefits balance this.',
      healthcare: 'Publicly funded healthcare system. High quality and accessible to all residents.',
      safety: 'Very safe with low crime rates and high social trust.',
      culture: 'Egalitarian, nature-loving, and innovative. Strong emphasis on sustainability and "lagom" (just the right amount).'
    },
    visas: [
      {
        id: 'work-permit',
        name: 'Work Permit',
        description: 'For those with a job offer in Sweden.',
        officialUrl: 'https://www.migrationsverket.se/English/Private-individuals/Working-in-Sweden.html',
        benefits: ['High quality of life', 'Generous leave', 'Family reunification'],
        whoItIsFor: 'Skilled workers with Swedish employment.',
        howToApply: [
          'Receive an official job offer from a Swedish employer.',
          'The employer initiates the application with the Migration Agency.',
          'You receive an email to complete your part of the application online.',
          'Pay the application fee and submit required documents.',
          'Wait for a decision and, if approved, visit the embassy for biometrics.'
        ]
      }
    ]
  },
  {
    id: 'south-africa',
    name: 'South Africa',
    flag: '🇿🇦',
    isoCode: 'za',
    landmark: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?q=80&w=1000&auto=format&fit=crop',
    description: 'The "Rainbow Nation" with diverse landscapes and opportunities.',
    livingInCountry: {
      costOfLiving: 'Low to moderate for those with foreign currency. Great value for lifestyle.',
      healthcare: 'Excellent private healthcare system. Public healthcare is available but varies in quality.',
      safety: 'Varies by area. Gated communities and private security are common in urban centers.',
      culture: 'Diverse and vibrant ("Rainbow Nation"). Famous for wildlife, wine, and outdoor adventure.'
    },
    visas: [
      {
        id: 'critical-skills',
        name: 'Critical Skills Work Visa',
        description: 'For individuals with skills in high demand.',
        officialUrl: 'http://www.dha.gov.za/index.php/immigration-services/types-of-visas',
        benefits: ['Up to 5 years stay', 'No job offer needed initially', 'Permanent residency path'],
        whoItIsFor: 'Highly skilled professionals in specific sectors.',
        howToApply: [
          'Check if your profession is on the official Critical Skills list.',
          'Get your qualifications evaluated by SAQA.',
          'Register with the relevant professional body in South Africa.',
          'Apply for the visa at a South African mission abroad.',
          'Provide proof of skills, experience, and police clearances.'
        ]
      }
    ]
  },
  {
    id: 'china',
    name: 'China',
    flag: '🇨🇳',
    isoCode: 'cn',
    landmark: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?q=80&w=1000&auto=format&fit=crop',
    description: 'A global economic giant with deep history and rapid modernization.',
    livingInCountry: {
      costOfLiving: 'Moderate. Tier 1 cities (Beijing, Shanghai) are expensive, but others are very affordable.',
      healthcare: 'Modern facilities in major cities. International health insurance is recommended for expats.',
      safety: 'Very safe with low rates of violent crime.',
      culture: 'Deeply historic yet rapidly modernizing. Strong emphasis on family, food, and collective harmony.'
    },
    visas: [
      {
        id: 'z-visa',
        name: 'Work Visa (Z)',
        description: 'For those taking up employment in China.',
        officialUrl: 'http://www.visaforchina.org/',
        benefits: ['Career growth', 'Cultural immersion', 'Competitive salaries'],
        whoItIsFor: 'Professionals with a Chinese work permit.',
        howToApply: [
          'Secure a job offer from a company licensed to hire foreigners.',
          'The employer applies for a Foreigner\'s Work Permit Notification.',
          'Apply for the Z visa at a Chinese Visa Application Service Center.',
          'Enter China and undergo a mandatory health check.',
          'Convert the Z visa into a Residence Permit within 30 days of arrival.'
        ]
      }
    ]
  },
  {
    id: 'russia',
    name: 'Russia',
    flag: '🇷🇺',
    isoCode: 'ru',
    landmark: 'https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=1000&auto=format&fit=crop',
    description: 'The largest country in the world with unique cultural and business ties.',
    livingInCountry: {
      costOfLiving: 'Moderate. Moscow and St. Petersburg are the most expensive.',
      healthcare: 'Public healthcare is available; private clinics are preferred by expats in major cities.',
      safety: 'Generally safe in major cities, though standard urban precautions apply.',
      culture: 'Rich in literature, music, and history. Strong emphasis on hospitality and tradition.'
    },
    visas: [
      {
        id: 'business-visa',
        name: 'Business Visa',
        description: 'For business meetings and negotiations.',
        officialUrl: 'https://russia-visacentre.com/',
        benefits: ['Multiple entries', 'Up to 1 year validity', 'Business networking'],
        whoItIsFor: 'Business professionals.',
        howToApply: [
          'Obtain an official invitation letter from a Russian company or the Ministry of Interior.',
          'Complete the online visa application form.',
          'Gather required documents (passport, photos, invitation).',
          'Submit the application at a Russian Visa Center or Consulate.',
          'Pay the visa fee and wait for processing.'
        ]
      }
    ]
  },
  {
    id: 'turkey',
    name: 'Turkey',
    flag: '🇹🇷',
    isoCode: 'tr',
    landmark: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=1000&auto=format&fit=crop',
    description: 'A bridge between Europe and Asia with a booming tourism sector.',
    livingInCountry: {
      costOfLiving: 'Low to moderate. Very affordable for those with foreign income.',
      healthcare: 'High-quality private healthcare, especially in medical tourism hubs like Istanbul.',
      safety: 'Generally safe, though typical tourist-related precautions apply in busy areas.',
      culture: 'A blend of Eastern and Western traditions. Famous for hospitality, bazaars, and history.'
    },
    visas: [
      {
        id: 'e-visa',
        name: 'e-Visa',
        description: 'Fast online visa for tourism and trade.',
        officialUrl: 'https://www.evisa.gov.tr/en/',
        benefits: ['Instant approval', 'Low cost', 'Valid for 180 days'],
        whoItIsFor: 'Tourists from eligible countries.',
        howToApply: [
          'Visit the official Turkish e-Visa website.',
          'Enter your nationality and passport details.',
          'Pay the e-Visa fee online using a credit or debit card.',
          'Download your e-Visa once the application is approved.',
          'Print the e-Visa or keep a digital copy for border control.'
        ]
      }
    ]
  },
  {
    id: 'uae',
    name: 'UAE',
    flag: '🇦🇪',
    isoCode: 'ae',
    landmark: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1000&auto=format&fit=crop',
    description: 'A global business hub with tax-free income and luxury living.',
    livingInCountry: {
      costOfLiving: 'High, especially in Dubai and Abu Dhabi. Tax-free income helps offset costs.',
      healthcare: 'World-class healthcare facilities with mandatory health insurance for residents.',
      safety: 'One of the safest countries in the world with very low crime rates.',
      culture: 'Cosmopolitan and luxurious. A mix of traditional Emirati heritage and global influences.'
    },
    visas: [
      {
        id: 'golden-visa',
        name: 'Golden Visa',
        description: 'Long-term residency for investors and talents.',
        officialUrl: 'https://u.ae/en/information-and-services/visa-and-emirates-id/residence-visas/golden-visa',
        benefits: ['10-year residency', '100% business ownership', 'No sponsor needed'],
        whoItIsFor: 'Investors, entrepreneurs, and specialized talents.',
        howToApply: [
          'Check your eligibility category (investor, talent, entrepreneur).',
          'Apply for an initial entry permit via the ICP or GDRFA portal.',
          'Undergo a medical fitness test in the UAE.',
          'Submit your application for the Golden Visa residency.',
          'Receive your 10-year residency visa and Emirates ID.'
        ]
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
