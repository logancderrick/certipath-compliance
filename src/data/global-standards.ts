export type Country = {
  name: string;
  slug: string;
  description: string;
  certifications: Certification[];
};

export type Certification = {
  name: string;
  discipline: string;
  mandatory: boolean;
  followUpInspections: boolean;
  validityPeriod: string;
  markRequired: boolean;
  localRepRequired: boolean;
  description: string;
};

export type Region = {
  name: string;
  slug: string;
  countries: Country[];
};

export const globalStandards: Region[] = [
  {
    name: "North America",
    slug: "north-america",
    countries: [
      {
        name: "United States & Canada",
        slug: "us-canada",
        description: "The regulatory approach in the United States and Canada differs from many other global markets. While product safety certification is often voluntary rather than legally mandated, it's frequently required by customers, insurance providers, and local jurisdictions. For workplace installations, electrical authorities may require non-certified or modified equipment to undergo evaluation by third-party agencies to verify compliance with electrical codes. For electronics, FCC compliance in the US and IC compliance in Canada are legally required for electromagnetic compatibility and wireless transmissions.",
        certifications: [
          {
            name: "FCC/IC",
            discipline: "EMC & Wireless",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: false,
            localRepRequired: false,
            description: "Electronic devices marketed in the US and Canada must meet FCC (Federal Communications Commission) and IC (Industry Canada) requirements respectively. These regulations ensure that electronic products don't cause harmful electromagnetic interference and operate properly in the presence of such interference. The requirements are enforced independently from safety certifications and follow separate testing procedures. Products must be appropriately labeled according to their classification and the type of approval process used."
          },
          {
            name: "NRTL",
            discipline: "Safety",
            mandatory: false,
            followUpInspections: true,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: false,
            description: "NRTL (Nationally Recognized Testing Laboratory) certification allows manufacturers to apply safety marks to products that meet applicable standards. Organizations like UL, CSA, TUV, and MET receive OSHA authorization to certify products according to consensus-based safety standards. This factory-based certification approach includes initial product evaluation, testing, and ongoing inspection to verify continued compliance. NRTL certification is especially important for mass-produced items, equipment connecting to building power, retail products, and when dealing with clients who specify such requirements."
          },
          {
            name: "FEB",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "Field Evaluation provides case-by-case safety certification for specific equipment units by recognized Field Evaluation Bodies (FEBs). This approach differs from NRTL certification by focusing on the actual installation environment rather than factory production. Field evaluations typically avoid destructive testing since they're conducted on the actual equipment to be used. This option is particularly valuable for equipment without existing NRTL approval, modified certified equipment, limited production items where NRTL certification would be impractical, or when customers request safety documentation for specific installations."
          }
        ]
      },
      {
        name: "Mexico",
        slug: "mexico",
        description: "Mexico implements a comprehensive regulatory framework for electrical and electronic products through its NOM (Normas Oficiales Mexicanas) system. These mandatory technical regulations cover various aspects including safety, energy efficiency, telecommunications, and electromagnetic compatibility. The specific requirements depend on product type and intended use. Mexican law requires importers to establish local representation and maintain documentation for market surveillance activities and customs clearance.",
        certifications: [
          {
            name: "NOM",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "1 year",
            markRequired: true,
            localRepRequired: true,
            description: "The NOM certification system establishes mandatory requirements for products sold in Mexico, addressing both safety and electromagnetic compatibility concerns. The certification pathway involves testing at accredited laboratories followed by evaluation and potential factory assessments. Manufacturers must submit technical documentation, provide test samples, undergo facility inspection when required, and receive formal certification before marketing products. Annual renewal is necessary for many product categories, with any design modifications triggering recertification requirements. Some products may qualify for streamlined procedures if they already hold recognized international certifications."
          },
          {
            name: "NOM-019-SCFI",
            discipline: "IT Equipment Safety",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "1 year",
            markRequired: true,
            localRepRequired: true,
            description: "NOM-019-SCFI specifically regulates information technology equipment in Mexico. The standard incorporates safety requirements aligned with international standards such as IEC 60950-1 and IEC 62368-1, adapted for the Mexican market. Compliance requires testing by authorized Mexican laboratories, comprehensive technical file submission, prototype evaluation, and regular surveillance inspections. Manufacturers must maintain relationships with certification bodies and undergo annual verification to maintain valid compliance status."
          }
        ]
      }
    ]
  },
  {
    name: "South America",
    slug: "south-america",
    countries: [
      {
        name: "Colombia",
        slug: "colombia",
        description: "Colombia requires imported electrical and electronic products to comply with national standards and regulations.",
        certifications: [
          {
            name: "RETIE",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: true,
            description: "The Technical Regulation for Electrical Installations (RETIE) is mandatory for electrical products and equipment in Colombia."
          }
        ]
      },
      {
        name: "Brazil",
        slug: "brazil",
        description: "Brazil has a mandatory certification system regulated by INMETRO (National Institute of Metrology, Standardization and Industrial Quality) that applies to many electrical and electronic products. Brazilian regulations require certification prior to import or sale, with different conformity assessment procedures depending on product risk level. Most regulated products require testing by accredited laboratories and certification through an approved Brazilian certification body (OCP).",
        certifications: [
          {
            name: "INMETRO",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "3-4 years",
            markRequired: true,
            localRepRequired: true,
            description: "INMETRO certification is required for a wide range of product categories in Brazil, with requirements based on national standards. The certification process typically involves selection of a local certification body (OCP), type testing at accredited laboratories, factory inspection, certification issuance, and ongoing surveillance. Products must bear the INMETRO mark, and certification requires periodic factory assessments and product re-evaluation. Foreign manufacturers must appoint a local representative in Brazil who assumes legal responsibility for product compliance."
          },
          {
            name: "ANATEL",
            discipline: "Telecommunications",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "2 years",
            markRequired: true,
            localRepRequired: true,
            description: "The National Telecommunications Agency (ANATEL) certification is required for telecommunications and radio equipment in Brazil. Products that connect to the public network or use radio frequency must be tested and certified by designated laboratories. The certification process involves laboratory testing, documentation review, and homologation (formal approval). Once certified, products must display the ANATEL identification seal containing a unique homologation number."
          },
          {
            name: "ANVISA",
            discipline: "Medical Devices",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "5 years",
            markRequired: false,
            localRepRequired: true,
            description: "The National Health Surveillance Agency (ANVISA) certification is required for medical devices and healthcare products in Brazil. The registration process varies by risk classification, with higher-risk devices requiring more extensive documentation and testing. Foreign manufacturers must appoint a Brazilian Registration Holder (BRH) who takes legal responsibility for the products in the Brazilian market. ANVISA registration must be renewed every five years, and any changes to registered products require regulatory notification or approval."
          }
        ]
      },
      {
        name: "Chile",
        slug: "chile",
        description: "Chile requires electrical products to be certified according to national standards before they can be imported or sold in the country.",
        certifications: [
          {
            name: "SEC",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: false,
            description: "The Superintendence of Electricity and Fuels (SEC) certification is required for electrical products in Chile."
          }
        ]
      },
      {
        name: "Argentina",
        slug: "argentina",
        description: "Argentina requires mandatory certification for many electrical and electronic products under the IRAM standards.",
        certifications: [
          {
            name: "S-Mark",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: true,
            description: "The S-Mark certification is required for many electrical products sold in Argentina."
          }
        ]
      }
    ]
  },
  {
    name: "Africa",
    slug: "africa",
    countries: [
      {
        name: "South Africa",
        slug: "south-africa",
        description: "South Africa requires certain electrical and electronic products to comply with the NRCS standards.",
        certifications: [
          {
            name: "NRCS",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "2 years",
            markRequired: true,
            localRepRequired: false,
            description: "The National Regulator for Compulsory Specifications (NRCS) certification is required for many electrical products in South Africa."
          }
        ]
      },
      {
        name: "Kenya",
        slug: "kenya",
        description: "Kenya requires imported products to be certified according to Kenya Bureau of Standards (KEBS) requirements.",
        certifications: [
          {
            name: "KEBS",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "1 year",
            markRequired: true,
            localRepRequired: false,
            description: "The Kenya Bureau of Standards (KEBS) certification is required for imported products in Kenya."
          }
        ]
      },
      {
        name: "Egypt",
        slug: "egypt",
        description: "Egypt requires imported products to comply with Egyptian standards and obtain certification before import.",
        certifications: [
          {
            name: "GOEIC",
            discipline: "Safety & Quality",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: false,
            localRepRequired: true,
            description: "The General Organization for Export and Import Control (GOEIC) certification is required for imported products in Egypt."
          }
        ]
      },
      {
        name: "Algeria",
        slug: "algeria",
        description: "Algeria requires imported products to comply with national standards and undergo certification.",
        certifications: [
          {
            name: "COC",
            discipline: "Safety & Quality",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Shipment-based",
            markRequired: false,
            localRepRequired: true,
            description: "A Certificate of Conformity (COC) is required for imported products in Algeria."
          }
        ]
      }
    ]
  },
  {
    name: "Europe",
    slug: "europe",
    countries: [
      {
        name: "European Union",
        slug: "european-union",
        description: "The European Union implements a comprehensive regulatory framework that requires products to comply with various directives and regulations before they can be placed on the market. The CE marking indicates that a product meets all applicable EU requirements and can move freely within the European Economic Area. Different product categories are subject to specific directives that outline essential safety, health, and environmental protection requirements.",
        certifications: [
          {
            name: "CE",
            discipline: "Safety, EMC, Radio, etc.",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The CE (Conformité Européenne) mark indicates that a product complies with all applicable EU directives and regulations. Depending on the product category and applicable directives, certification can be performed through self-declaration (for lower-risk products) or may require Notified Body involvement (for higher-risk products). Common directives include the Low Voltage Directive (LVD) for electrical safety, Electromagnetic Compatibility Directive (EMC), Radio Equipment Directive (RED), Machinery Directive, and Restriction of Hazardous Substances (RoHS) Directive. Technical documentation must be maintained, and an EU-based authorized representative is required for manufacturers outside the EU."
          },
          {
            name: "RED",
            discipline: "Radio Equipment",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The Radio Equipment Directive (RED) applies to products that intentionally transmit or receive radio waves for communication or radiodetermination. This includes wireless devices, IoT products, mobile phones, and more. Compliance involves demonstrating that the equipment meets essential requirements for safety, EMC, and efficient use of radio spectrum. For most radio equipment, Notified Body involvement is required to assess conformity with the directive."
          },
          {
            name: "RoHS",
            discipline: "Environmental",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: false,
            localRepRequired: true,
            description: "The Restriction of Hazardous Substances (RoHS) Directive restricts the use of certain hazardous substances in electrical and electronic equipment. Products must not contain more than the maximum permitted concentrations of lead, mercury, cadmium, hexavalent chromium, polybrominated biphenyls (PBB), polybrominated diphenyl ethers (PBDE), and certain phthalates. Compliance involves material testing, documentation, and ensuring the supply chain meets requirements."
          }
        ]
      }
    ]
  },
  {
    name: "United Kingdom",
    slug: "united-kingdom",
    countries: [
      {
        name: "United Kingdom",
        slug: "uk",
        description: "Following Brexit, the United Kingdom has established its own regulatory framework separate from the European Union, requiring products to comply with UK legislation and carry the UKCA (UK Conformity Assessed) mark. The UK system closely mirrors the EU's approach but operates independently, with different timelines and transition periods. Products placed on the UK market must comply with these new requirements, though certain EU certifications may continue to be recognized during transition periods.",
        certifications: [
          {
            name: "UKCA",
            discipline: "Safety, EMC, Radio, etc.",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The UKCA (UK Conformity Assessed) mark is the UK's product marking requirement for goods previously covered by the CE mark. The certification process typically involves assessment against UK designated standards (which currently mirror EU harmonized standards), preparation of technical documentation, and application of the UKCA mark. For some higher-risk products, involvement of a UK Approved Body is required. Manufacturers outside the UK must appoint a UK Responsible Person who takes regulatory responsibility for the product. The implementation timeline includes transition periods during which the CE mark may still be accepted for certain product categories."
          },
          {
            name: "UKNI",
            discipline: "Safety, EMC, Radio, etc.",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The UKNI marking applies to products placed on the Northern Ireland market that require mandatory third-party conformity assessment by a UK conformity assessment body. This unique arrangement is part of the Northern Ireland Protocol, which keeps Northern Ireland aligned with relevant EU rules. Products bearing the UKNI mark can be sold in Northern Ireland but cannot be placed on the EU market. For many product categories, CE marking alone remains sufficient for the Northern Ireland market if EU conformity assessment procedures are followed."
          },
          {
            name: "Ofcom",
            discipline: "Radio Equipment",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: false,
            localRepRequired: true,
            description: "The Office of Communications (Ofcom) regulates radio equipment in the UK, ensuring compliance with the UK Radio Equipment Regulations. These regulations set essential requirements for safety, EMC, and efficient use of radio spectrum. Manufacturers must perform appropriate conformity assessment procedures, prepare technical documentation, and apply the UKCA mark. For certain equipment types, registration with Ofcom may be required, and specific frequency usage may need additional authorizations."
          }
        ]
      }
    ]
  },
  {
    name: "Middle East",
    slug: "middle-east",
    countries: [
      {
        name: "United Arab Emirates",
        slug: "uae",
        description: "The UAE requires certain products to comply with ESMA regulations and obtain certification.",
        certifications: [
          {
            name: "ECAS",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "1 year",
            markRequired: true,
            localRepRequired: true,
            description: "The Emirates Conformity Assessment Scheme (ECAS) is required for certain products in the UAE."
          }
        ]
      },
      {
        name: "Saudi Arabia",
        slug: "saudi-arabia",
        description: "Saudi Arabia requires products to comply with SASO standards and obtain certification.",
        certifications: [
          {
            name: "SASO",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "1 year",
            markRequired: true,
            localRepRequired: true,
            description: "The Saudi Standards, Metrology and Quality Organization (SASO) certification is required for products in Saudi Arabia."
          }
        ]
      }
    ]
  },
  {
    name: "India",
    slug: "india",
    countries: [
      {
        name: "India",
        slug: "india",
        description: "India has implemented various mandatory certification schemes for products sold in its market, with the Bureau of Indian Standards (BIS) overseeing many of these programs. The Indian regulatory landscape continues to evolve, with an increasing number of product categories being brought under mandatory certification requirements. Non-compliant products may be detained at customs or face penalties if found in the marketplace.",
        certifications: [
          {
            name: "BIS",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "2 years",
            markRequired: true,
            localRepRequired: true,
            description: "The Bureau of Indian Standards (BIS) certification is required for many electronic and electrical products in India under the BIS Compulsory Registration Scheme (CRS). The certification process involves testing at BIS-recognized laboratories, submission of test reports and technical documentation, factory inspection, and certification issuance. Foreign manufacturers must appoint an Authorized Indian Representative (AIR) who serves as the local point of contact and assumes regulatory responsibilities. Products must bear the BIS mark along with a unique registration number, and certification requires renewal every two years with periodic factory surveillance."
          },
          {
            name: "WPC",
            discipline: "Radio/Wireless",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: false,
            localRepRequired: true,
            description: "The Wireless Planning and Coordination (WPC) approval is required for wireless and radio frequency devices in India. Operating under the Department of Telecommunications, WPC ensures that wireless equipment meets national frequency allocation and technical standards. The approval process typically involves obtaining Equipment Type Approval (ETA) through testing and documentation. For certain categories, additional certification may be required from the Standing Advisory Committee on Radio Frequency Allocation (SACFA)."
          },
          {
            name: "TEC",
            discipline: "Telecommunications",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "5 years",
            markRequired: true,
            localRepRequired: true,
            description: "The Telecommunication Engineering Centre (TEC) certification is required for telecommunications equipment that connects to Indian telecom networks. The certification ensures that equipment meets technical standards for network compatibility and security. The process involves testing at TEC-designated laboratories, submission of technical documentation, and certification issuance. Foreign manufacturers must work through a local representative, and certified products must display the TEC mark."
          }
        ]
      }
    ]
  },
  {
    name: "China",
    slug: "china",
    countries: [
      {
        name: "China",
        slug: "china",
        description: "China employs a mandatory certification framework focused on protecting health, safety, environmental standards, and national security interests. The Chinese regulatory system includes the CCC (China Compulsory Certification) program, which covers a wide range of product categories and requires pre-market certification. Any regulated products lacking proper certification documentation face import rejection, market seizure, or financial penalties.",
        certifications: [
          {
            name: "CCC",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "5 years",
            markRequired: true,
            localRepRequired: true,
            description: "China's CCC system addresses products across numerous categories, from electronics and electrical appliances to automotive parts and children's products. Certification follows a structured pathway: application filing, sample submission, laboratory testing at designated facilities, initial factory assessment, certificate issuance, and ongoing surveillance. Manufacturers must undergo annual facility inspections to maintain certification status. All compliant products require the CCC mark, obtained through authorized channels after successful certification. Foreign manufacturers must establish local representation to navigate the regulatory process."
          },
          {
            name: "SRRC",
            discipline: "Radio/Wireless",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "5 years",
            markRequired: true,
            localRepRequired: true,
            description: "The State Radio Regulation Commission (SRRC) certification is required for all radio and wireless equipment entering the Chinese market. This certification ensures that wireless devices comply with China's radio frequency requirements and will not cause harmful interference to other radio services. Testing must be conducted by authorized laboratories in China, and test samples must be submitted through a local representative."
          },
          {
            name: "NAL",
            discipline: "Network Access",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "3 years",
            markRequired: false,
            localRepRequired: true,
            description: "The Network Access License (NAL) is required for telecommunications equipment connecting to public networks in China. This license is issued by the Ministry of Industry and Information Technology (MIIT) and ensures that telecom terminal equipment meets China's technical standards for network security and compatibility. The certification process involves document review, sample testing, and expert evaluation."
          }
        ]
      }
    ]
  },
  {
    name: "Southeast Asia",
    slug: "southeast-asia",
    countries: [
      {
        name: "Singapore",
        slug: "singapore",
        description: "Singapore requires certain electrical and electronic products to comply with safety standards and obtain registration.",
        certifications: [
          {
            name: "Safety Mark",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "3 years",
            markRequired: true,
            localRepRequired: false,
            description: "The Safety Mark is required for certain electrical and electronic products in Singapore."
          }
        ]
      },
      {
        name: "Malaysia",
        slug: "malaysia",
        description: "Malaysia requires certain electrical products to comply with SIRIM standards and obtain certification.",
        certifications: [
          {
            name: "SIRIM",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "1-3 years",
            markRequired: true,
            localRepRequired: false,
            description: "SIRIM certification is required for certain electrical products in Malaysia."
          }
        ]
      }
    ]
  },
  {
    name: "Japan",
    slug: "japan",
    countries: [
      {
        name: "Japan",
        slug: "japan",
        description: "Japan has a sophisticated regulatory system for products entering its market, with different certification requirements based on product type and risk level. Electrical and electronic products must comply with multiple regulations including electrical safety, radio compliance, and telecommunications standards. The Japanese regulatory framework is divided into several schemes administered by different government agencies.",
        certifications: [
          {
            name: "PSE",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The Product Safety Electrical Appliance & Material (PSE) mark is required for electrical products under Japan's Electrical Appliance and Material Safety Law (DENAN). Products are classified into two categories: Category A (Diamond PSE mark) for higher-risk products requiring third-party certification, and Category B (Circle PSE mark) for lower-risk products that can be self-declared. The certification process typically involves testing to Japanese safety standards, documentation review, and continuous compliance maintenance. All products must bear the appropriate PSE mark to be legally sold in Japan."
          },
          {
            name: "MIC",
            discipline: "Radio/Wireless",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "5 years",
            markRequired: true,
            localRepRequired: true,
            description: "The Ministry of Internal Affairs and Communications (MIC) certification is required for radio and wireless devices in Japan. Under the Radio Law, all radio equipment must be certified by obtaining either Technical Conformity Mark Certification (Giteki Mark) or Technical Standards Conformity Certification (JATE for telecom terminal equipment). The certification process involves testing by authorized laboratories in Japan, submission of technical documentation, and application through a local representative. All certified devices must display the Giteki mark."
          },
          {
            name: "VCCI",
            discipline: "EMC",
            mandatory: false,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: false,
            description: "The Voluntary Control Council for Interference (VCCI) is a voluntary EMC standard for information technology equipment in Japan. While not legally mandatory, VCCI compliance is expected by most customers and retailers. Products can be registered as either Class A (for industrial environments) or Class B (for residential environments), and compliance can be achieved through self-declaration with appropriate testing. Compliant products should display the VCCI mark along with their classification."
          }
        ]
      }
    ]
  },
  {
    name: "South Korea",
    slug: "south-korea",
    countries: [
      {
        name: "South Korea",
        slug: "south-korea",
        description: "South Korea maintains a comprehensive regulatory framework for products entering its market, with the Korean Certification (KC) mark serving as the unified certification symbol. Various government agencies oversee different aspects of product compliance, requiring manufacturers to navigate multiple certification schemes based on product characteristics. Non-compliant products can be stopped at customs or face penalties in the marketplace.",
        certifications: [
          {
            name: "KC Safety",
            discipline: "Safety",
            mandatory: true,
            followUpInspections: true,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: true,
            description: "The Korean Certification (KC) safety mark is required for electrical and electronic products under the Electrical Appliances Safety Control Act. Products are classified into different safety certification levels based on risk, with requirements ranging from self-declaration (SDoC) to full certification with factory inspections. Testing must be conducted to Korean standards (typically based on IEC standards with national deviations), and certification must be maintained through ongoing compliance activities. All certified products must bear the KC mark along with the specific certification number."
          },
          {
            name: "KC EMC",
            discipline: "EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: true,
            description: "The KC EMC certification falls under the Electromagnetic Compatibility Control Act and applies to electronics, broadcasting, and communication equipment. Products must undergo testing at recognized laboratories to demonstrate that they don't cause electromagnetic interference and are not affected by such interference. Most products require a Supplier's Declaration of Conformity (SDoC), while certain categories need full certification. The KC mark must be applied to all compliant products along with the certification information."
          },
          {
            name: "KC RRA",
            discipline: "Radio/Wireless",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: true,
            localRepRequired: true,
            description: "The KC certification for radio and wireless equipment is administered by the National Radio Research Agency (RRA) under the Radio Waves Act. Products that intentionally emit radio waves must be certified to ensure they use the allocated frequency bands properly and don't cause harmful interference. Testing must be conducted by recognized laboratories, and certification applications require detailed technical documentation. All wireless products must display the KC mark with the corresponding certification information."
          }
        ]
      }
    ]
  },
  {
    name: "Eurasia",
    slug: "eurasia",
    countries: [
      {
        name: "Russia",
        slug: "russia",
        description: "Russia requires certain products to comply with EAC certification, which is valid across the Eurasian Economic Union.",
        certifications: [
          {
            name: "EAC",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "5 years",
            markRequired: true,
            localRepRequired: true,
            description: "The Eurasian Conformity (EAC) mark is required for certain products in Russia and other member states of the Eurasian Economic Union."
          }
        ]
      }
    ]
  },
  {
    name: "Australia/New Zealand",
    slug: "australia-new-zealand",
    countries: [
      {
        name: "Australia/New Zealand",
        slug: "australia-new-zealand",
        description: "Australia and New Zealand operate with integrated regulatory frameworks that allow for unified product compliance approaches across both markets. Their cooperative arrangements build upon Australia's Radio Communications Act and EMC Framework together with New Zealand's Radiocommunications Act and Electricity Act. This cross-recognition system enables manufacturers to address both markets through coordinated certification efforts, reducing duplication while maintaining regulatory standards.",
        certifications: [
          {
            name: "RCM",
            discipline: "Safety & EMC",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: false,
            description: "The Regulatory Compliance Mark (RCM) represents conformity with applicable safety, electromagnetic compatibility, radio communications, and telecommunications requirements across Australia and New Zealand. The compliance process generally involves product testing against relevant standards, preparing technical documentation, registering relevant electrical equipment with the EESS system, and applying the RCM mark appropriately. For most product types, manufacturers can self-declare compliance, though products deemed high-risk may require formal certification. The RCM has consolidated previous marking schemes including the former C-Tick and A-Tick identifiers."
          },
          {
            name: "EESS",
            discipline: "Electrical Safety",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "Variable",
            markRequired: false,
            localRepRequired: true,
            description: "The Electrical Equipment Safety System classifies electrical products into three risk tiers, with corresponding compliance requirements based on potential hazard level. Low and medium risk products (Levels 1-2) may use Supplier Declaration of Conformity, while high-risk products (Level 3) require formal certification through recognized certification bodies. All regulated products must be registered in the central EESS database, with a designated Responsible Supplier identified as the party legally accountable for ongoing compliance."
          },
          {
            name: "ACMA",
            discipline: "Telecommunications & Radio",
            mandatory: true,
            followUpInspections: false,
            validityPeriod: "N/A",
            markRequired: true,
            localRepRequired: true,
            description: "The Australian Communications and Media Authority oversees telecommunications and radio equipment regulation in Australia. Complying with ACMA requirements involves testing products to relevant standards, maintaining compliance records, registering with ACMA when required for specific product categories, and applying the RCM mark. While the system primarily uses supplier declarations, manufacturers must maintain evidence supporting compliance claims. A registered responsible supplier must be established within Australia to take regulatory responsibility for products placed on the market."
          }
        ]
      }
    ]
  }
]; 