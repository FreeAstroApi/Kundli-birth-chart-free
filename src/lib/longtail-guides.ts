export type LongtailGuideSection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
};

export type LongtailGuideFaq = {
  question: string;
  answer: string;
};

export type LongtailGuide = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  takeaway: string;
  sections: readonly LongtailGuideSection[];
  faqs: readonly LongtailGuideFaq[];
  related: readonly {
    href: string;
    label: string;
    description: string;
  }[];
};

export const LONGTAIL_GUIDES = {
  "lahiri-vs-raman-vs-kp-ayanamsha": {
    slug: "lahiri-vs-raman-vs-kp-ayanamsha",
    metaTitle: "Lahiri vs Raman vs KP Ayanamsha",
    metaDescription:
      "Compare Lahiri, Raman and KP ayanamsha settings, understand why sidereal degrees differ, and learn how to make a fair Kundli comparison.",
    eyebrow: "Sidereal calculation settings",
    h1: "Lahiri vs Raman vs KP Ayanamsha",
    intro:
      "Ayanamsha is the offset used to convert a tropical longitude into a sidereal longitude. Lahiri, Raman and Krishnamurti (KP) are established conventions, but they do not use exactly the same offset. That small difference can change a displayed degree and may change a sign, nakshatra pada or divisional placement near a boundary.",
    takeaway:
      "Use one ayanamsha consistently, record it with the chart, and compare exact degrees before deciding that two calculators disagree.",
    sections: [
      {
        heading: "What changes when the ayanamsha changes",
        paragraphs: [
          "The planets are not being moved to a different sky. The astronomical longitude is being expressed through a different sidereal reference convention. Most placements remain in the same sign when the longitude is far from a boundary, while a placement close to 0° or 30° can cross into the neighbouring sign.",
          "Derived layers can be more sensitive than the D1 sign. Nakshatra padas divide the zodiac into smaller spans, Navamsa divides each sign into nine parts of 3°20′, and a Vimshottari starting balance depends on the Moon's progress through its birth nakshatra. A modest longitude difference can therefore appear larger later in the report.",
        ],
        bullets: [
          "Planet and ascendant sidereal degrees",
          "Sign or nakshatra pada near a boundary",
          "D9 and other divisional placements",
          "Vimshottari starting balance and period boundaries",
        ],
      },
      {
        heading: "How Lahiri, Raman and KP are normally used",
        paragraphs: [
          "Lahiri is widely used in modern Indian Jyotish software and is a practical default when no lineage-specific convention has been requested. Raman is associated with another established sidereal reference, while KP is used in Krishnamurti Paddhati and in workflows built around that system's cuspal and timing methods.",
          "Popularity does not make one setting universally correct for every school. The useful question is whether the calculator, teacher, book and interpretation are using the same convention. Mixing a KP-derived degree table with a Lahiri-based interpretation can create avoidable confusion.",
        ],
      },
      {
        heading: "A fair calculator comparison",
        paragraphs: [
          "Enter the identical local birth date, clock time, seconds, birthplace and timezone in both tools. Then match the ayanamsha, house system and mean-or-true node choice. Compare the ascendant, Sun and Moon degrees before comparing chart drawings, yogas or predictions.",
          "If the degree tables agree but the diagrams look different, the issue is probably a regional display convention. If every degree is offset, check timezone and ayanamsha. If only houses differ, check the house system and birth time.",
        ],
      },
      {
        heading: "Which setting should you choose?",
        paragraphs: [
          "Use the convention required by the method you actually study. For an unlabeled general Kundli, Lahiri is a reasonable starting point because it is widely recognized, but the chart should still display the chosen setting. Changing ayanamsha only to obtain a preferred interpretation is not a sound comparison method.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can ayanamsha change my Moon sign?",
        answer:
          "It can when the Moon is close to a sidereal sign boundary. Compare the exact Moon longitude under each convention rather than assuming every chart will change.",
      },
      {
        question: "Does ayanamsha change the tropical chart?",
        answer:
          "No. Ayanamsha is applied when expressing positions in a sidereal zodiac. A tropical chart uses its own reference and does not subtract a sidereal offset.",
      },
      {
        question: "Should I switch ayanamsha for D9?",
        answer:
          "Keep the same underlying sidereal convention for D1 and D9. Otherwise the divisional chart is no longer a consistent derivation of the natal longitudes you started with.",
      },
    ],
    related: [
      {
        href: "/vedic-birth-chart-calculator",
        label: "Compare ayanamsha settings",
        description: "Generate the same chart with Lahiri, Raman or KP selected.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Why Kundli calculators differ",
        description: "Audit timezone, houses, nodes and display conventions too.",
      },
      {
        href: "/learn/how-to-read-navamsa-d9",
        label: "How to read D1 and D9 together",
        description: "See why exact sidereal degrees matter to Navamsa.",
      },
    ],
  },

  "how-to-read-navamsa-d9": {
    slug: "how-to-read-navamsa-d9",
    metaTitle: "How to Read a Navamsa D9 Chart",
    metaDescription:
      "Learn how to read a Navamsa D9 chart with the D1 chart, identify Vargottama planets, and understand why exact birth time matters.",
    eyebrow: "Navamsa study guide",
    h1: "How to Read a Navamsa D9 Chart With D1",
    intro:
      "Navamsa, or D9, divides every 30-degree zodiac sign into nine sections of 3°20′. It is a degree-based divisional chart, not a second horoscope created from a separate birth moment. A useful reading begins with the D1 natal chart and uses D9 to test how strongly a theme is repeated, refined or challenged.",
    takeaway:
      "Read D1 for the natal foundation, verify the exact degrees, and use D9 as supporting evidence rather than replacing the birth chart.",
    sections: [
      {
        heading: "Start with the D1 promise",
        paragraphs: [
          "Before interpreting D9, identify the D1 ascendant, its lord, the houses relevant to the question and the condition of the planets involved. D9 cannot responsibly be used to manufacture a result that has no support in the natal chart.",
          "For relationship questions, practitioners may examine the D1 seventh house, its lord and relevant significators before turning to D9. For broader questions of dharma or planetary maturity, the same principle applies: establish the natal context first.",
        ],
      },
      {
        heading: "Compare the same planet in both charts",
        paragraphs: [
          "Work planet by planet. Record its D1 sign, house, dignity and relationships, then note its D9 sign and the condition of that sign's lord. Repetition can strengthen a theme, while a contrasting D9 placement asks for a more qualified interpretation.",
          "Avoid isolated slogans such as 'a planet is good in D9, so every D1 problem disappears.' Strength, rulership, aspects, conjunctions and the running dasha still matter.",
        ],
        bullets: [
          "D1 sign, house and exact degree",
          "D9 sign and Navamsa ascendant",
          "Repeated dignity or repeated sign",
          "Relevant dasha period and natal context",
        ],
      },
      {
        heading: "What Vargottama means",
        paragraphs: [
          "A planet is commonly called Vargottama when it occupies the same zodiac sign in D1 and D9. This is a useful comparison flag, not an automatic promise of benefic results. The planet still expresses the houses it rules and the relationships it carries in the complete chart.",
          "A reliable calculator should derive the flag from the displayed D1 and D9 signs. You can verify it manually by comparing the sign labels in both charts rather than relying on an unexplained badge.",
        ],
      },
      {
        heading: "Why birth-time accuracy matters",
        paragraphs: [
          "The Navamsa ascendant can change quickly because the divisional chart magnifies the effect of the natal ascendant degree. Planets can also change Navamsa close to a 3°20′ boundary. Use the best recorded time available and retain uncertainty when the time is rounded or remembered.",
          "If two D9 charts differ, compare timezone, ayanamsha and the exact D1 longitudes before interpreting either result.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is Navamsa only for marriage?",
        answer:
          "No. Marriage is a common application, but many Jyotish traditions also use D9 when considering dharma, the deeper support behind natal placements and planetary strength.",
      },
      {
        question: "Can I calculate D9 without an exact birth time?",
        answer:
          "Planetary D9 signs may remain usable when their degrees are not near a boundary, but the D9 ascendant and houses can be unreliable with an uncertain time. The uncertainty should be stated rather than hidden.",
      },
      {
        question: "Does Vargottama mean a planet is always good?",
        answer:
          "No. It indicates repetition of the sign across D1 and D9. Interpretation still depends on rulership, dignity, aspects, conjunctions and the question being examined.",
      },
    ],
    related: [
      {
        href: "/navamsa-d9-calculator",
        label: "Calculate a Navamsa D9 chart",
        description: "Compare D1 and D9 from one verified birth record.",
      },
      {
        href: "/kundli-matching",
        label: "Kundli matching",
        description: "Keep D9 beside the wider two-chart compatibility review.",
      },
      {
        href: "/learn/lahiri-vs-raman-vs-kp-ayanamsha",
        label: "Compare ayanamsha settings",
        description: "Understand why a boundary placement may change.",
      },
    ],
  },

  "current-mahadasha-antardasha": {
    slug: "current-mahadasha-antardasha",
    metaTitle: "Current Mahadasha and Antardasha Explained",
    metaDescription:
      "Learn how a Vimshottari calculator finds the current Mahadasha and Antardasha, why dates differ, and how to read period levels responsibly.",
    eyebrow: "Vimshottari timing guide",
    h1: "Current Mahadasha and Antardasha Explained",
    intro:
      "Vimshottari Dasha organizes a traditional 120-year sequence into planetary periods. Mahadasha is the major period; Antardasha, also called Bhukti, is a subdivision within it. Some calculations continue into Pratyantardasha and shorter levels. The starting point depends on the Moon's birth nakshatra and its fractional progress through that nakshatra.",
    takeaway:
      "Use exact birth data, verify the Moon's sidereal longitude and read each shorter period inside the context of its parent Mahadasha and the natal chart.",
    sections: [
      {
        heading: "How the first period is found",
        paragraphs: [
          "The Moon's nakshatra identifies the ruler of the opening Mahadasha. The portion of the nakshatra already travelled at birth determines how much of that ruler's full period has elapsed and how much remains.",
          "This is why two people born in the same nakshatra do not necessarily begin with the same remaining duration. It is also why timezone, ayanamsha and precise Moon longitude matter when comparing software.",
        ],
      },
      {
        heading: "How to find the period active today",
        paragraphs: [
          "Locate today's date inside the Mahadasha start and end dates. Then locate it inside the returned Antardasha dates nested under that major period. If the software supplies another level, repeat the same process without treating a short subperiod as independent of its parents.",
          "A calculator should show the calculation timezone or date convention and keep the birth-chart settings available. Saving the exact period boundaries makes later comparisons reproducible.",
        ],
        bullets: [
          "Confirm the birth Moon and nakshatra",
          "Identify the active Mahadasha",
          "Identify the active Antardasha or Bhukti",
          "Return to the natal role of both period lords",
        ],
      },
      {
        heading: "Why Dasha dates differ between websites",
        paragraphs: [
          "First check the local birth time, timezone and coordinates. Then match the ayanamsha and compare the Moon's exact longitude. Small differences can change the starting balance even when the same first lord is shown.",
          "Software may also differ in year-length assumptions, rounding and the way it labels a boundary instant. Compare the raw dates and settings instead of assuming that a different display is automatically an error.",
        ],
      },
      {
        heading: "What a period does not guarantee",
        paragraphs: [
          "A Dasha period is an interpretive timing framework, not a fixed event prediction. Traditional interpretation also considers the period lord's houses, sign, dignity, aspects, yogas, divisional support and transits. It should not be used as a substitute for medical, legal, financial or safety decisions.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are Mahadasha and Antardasha the same?",
        answer:
          "No. Mahadasha is the major planetary period. Antardasha or Bhukti is a shorter planetary period operating inside that Mahadasha.",
      },
      {
        question: "Can the current Dasha change during the day?",
        answer:
          "A calculated boundary has a date and time, so a subperiod can change during a civil day. Check the displayed timezone and exact boundary rather than reading only the date label.",
      },
      {
        question: "Why is exact birth time important for Vimshottari Dasha?",
        answer:
          "The Moon moves continuously through its nakshatra. Birth time and timezone determine the Moon longitude used to calculate the opening balance and later period boundaries.",
      },
    ],
    related: [
      {
        href: "/vimshottari-dasha-calculator",
        label: "Calculate your Vimshottari timeline",
        description: "View returned active periods and Mahadasha boundaries.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Verify the natal chart",
        description: "Read each period lord in its complete birth-chart context.",
      },
      {
        href: "/learn/why-kundli-calculators-differ",
        label: "Compare calculation differences",
        description: "Check timezone, ayanamsha and boundary conventions.",
      },
    ],
  },

  "kundli-matching-score-18-of-36": {
    slug: "kundli-matching-score-18-of-36",
    metaTitle: "What Does 18 Out of 36 Mean in Kundli Matching?",
    metaDescription:
      "Understand the commonly used 18-of-36 Kundli matching threshold, all eight Ashtakoota factors, and why the total is not a relationship verdict.",
    eyebrow: "Ashtakoota score guide",
    h1: "What Does 18 Out of 36 Mean in Kundli Matching?",
    intro:
      "In many North Indian Ashtakoota traditions, 18 out of 36 is used as a common screening threshold for Guna Milan. It does not mean that every score above 18 guarantees compatibility or that every score below 18 predicts failure. The eight component kootas and the two complete birth charts matter more than a headline number alone.",
    takeaway:
      "Treat 18/36 as a traditional screening reference, then read the eight kootas, dosha evidence, both natal charts and the couple's real circumstances.",
    sections: [
      {
        heading: "Where the 36 points come from",
        paragraphs: [
          "Ashtakoota assigns different maximum values to Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot and Nadi. Together they total 36 points. Because the categories do not carry equal weight, two couples with the same total can have very different component profiles.",
        ],
        bullets: [
          "Varna: 1 point",
          "Vashya: 2 points",
          "Tara: 3 points",
          "Yoni: 4 points",
          "Graha Maitri: 5 points",
          "Gana: 6 points",
          "Bhakoot: 7 points",
          "Nadi: 8 points",
        ],
      },
      {
        heading: "How to read the total responsibly",
        paragraphs: [
          "The commonly quoted 18-point threshold is a convenient traditional reference, not a scientifically validated relationship test. Review which kootas supplied or lost points, whether the returned method recognizes exceptions, and whether both birth records are accurate.",
          "A high total cannot measure consent, safety, communication, shared values, financial expectations or practical readiness. A low total does not prove that a relationship will fail.",
        ],
      },
      {
        heading: "What else traditional matching may examine",
        paragraphs: [
          "Broader Jyotish matching can consider both ascendants, seventh houses and their lords, Venus and Jupiter, Manglik factors, Navamsa and running dashas. Regional traditions may use different systems, so an Ashtakoota result should be labeled rather than presented as the only form of compatibility analysis.",
        ],
      },
      {
        heading: "Why birth details are better than name-only matching",
        paragraphs: [
          "Calculated Guna Milan needs the Moon sign and nakshatra for both people. Date, time and place allow the calculator to derive those values consistently. Name-based methods are separate practices and should not be described as the same astronomical birth-chart comparison.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 18 out of 36 enough for marriage?",
        answer:
          "Many traditions use 18 as a basic screening threshold, but it is not enough to make a marriage decision. Read the component kootas, both charts and real-life compatibility.",
      },
      {
        question: "Is 36 out of 36 a guaranteed perfect match?",
        answer:
          "No. It is the maximum Ashtakoota score, not a guarantee of relationship quality, safety or permanence.",
      },
      {
        question: "Can two calculators give different Guna scores?",
        answer:
          "Yes. Compare the birth Moon, nakshatra, ayanamsha, input data and the exact matching rules or exceptions used by each calculator.",
      },
    ],
    related: [
      {
        href: "/kundli-matching",
        label: "Calculate all eight kootas",
        description: "Use two complete birth records and inspect the breakdown.",
      },
      {
        href: "/hi/kundli-milan",
        label: "हिंदी में कुंडली मिलान",
        description: "36 गुण और अष्टकूट का विवरण हिंदी में देखें।",
      },
      {
        href: "/learn/manglik-dosha-houses-cancellation-rules",
        label: "Understand Manglik assessment",
        description: "Separate Mars-related rules from the Guna total.",
      },
    ],
  },

  "manglik-dosha-houses-cancellation-rules": {
    slug: "manglik-dosha-houses-cancellation-rules",
    metaTitle: "Manglik Dosha Houses and Cancellation Rules",
    metaDescription:
      "Learn the commonly used Manglik Dosha houses, why some methods count from Lagna, Moon or Venus, and how cancellation traditions vary.",
    eyebrow: "Mangal Dosha methodology",
    h1: "Manglik Dosha Houses and Cancellation Rules",
    intro:
      "A widely used Manglik rule checks whether Mars occupies the 1st, 2nd, 4th, 7th, 8th or 12th house. Some lineages omit the 2nd house, use different weighting, or repeat the count from the Moon and Venus as well as the ascendant. A responsible result must identify its rule set instead of presenting one unexplained yes-or-no label.",
    takeaway:
      "Verify Mars's displayed sign and house, identify the reference point and rule set, and keep any cancellation claim separate from the initial placement check.",
    sections: [
      {
        heading: "The commonly checked houses",
        paragraphs: [
          "The common six-house list is 1, 2, 4, 7, 8 and 12. Another widespread version uses five houses—1, 4, 7, 8 and 12—without the 2nd. These are traditional interpretive rules, not scientific risk measures.",
          "When a calculator says only 'Manglik' without showing Mars's position, the result is difficult to audit. Start by confirming the natal Mars sign, house and the house-counting convention.",
        ],
      },
      {
        heading: "Lagna, Moon and Venus reference points",
        paragraphs: [
          "Some methods count the relevant houses only from the ascendant. Others repeat the count from the Moon and Venus and may assign different weight to each reference. This can produce partial, stronger or mixed labels even when every calculator uses the same planetary longitude.",
          "Do not combine three reference methods silently. A transparent assessment should show which reference triggered the returned rule and whether the final label came directly from the calculation provider or from an additional local interpretation.",
        ],
      },
      {
        heading: "Why cancellation rules vary",
        paragraphs: [
          "Traditional cancellation discussions may consider Mars's sign, dignity, conjunctions, aspects, house ownership, balancing placements or the partner's chart. Different texts and lineages do not apply one universal list, and a calculator should not imply that every exception is recognized unless it actually tests them.",
          "Separate three questions: whether Mars meets the initial house rule, whether the chosen tradition applies an exception, and how the two complete charts are interpreted together.",
        ],
      },
      {
        heading: "Avoid stigma and deterministic claims",
        paragraphs: [
          "Manglik is a traditional astrological category. It does not prove that a person is dangerous, unsuitable for marriage or destined for divorce. It must never override consent, safety, communication or professional support.",
        ],
      },
    ],
    faqs: [
      {
        question: "Which houses are used for Manglik Dosha?",
        answer:
          "A common rule uses houses 1, 2, 4, 7, 8 and 12. Some traditions omit the 2nd house or apply different rules, so the calculator should display its method.",
      },
      {
        question: "Is Manglik checked from the Moon and Venus?",
        answer:
          "Some traditions check from Lagna, Moon and Venus; others emphasize the ascendant. The reference points should be stated explicitly.",
      },
      {
        question: "Can Manglik Dosha be cancelled automatically?",
        answer:
          "Only if the calculator implements and discloses the relevant exception rules. Cancellation traditions vary, so an unexplained automatic label should be verified against the underlying chart.",
      },
    ],
    related: [
      {
        href: "/manglik-dosha-calculator",
        label: "Check the returned Manglik evidence",
        description: "Keep the API verdict beside the natal Mars placement.",
      },
      {
        href: "/kundli-matching",
        label: "Compare both Kundlis",
        description: "Place Manglik evidence beside the Ashtakoota breakdown.",
      },
      {
        href: "/learn/kundli-matching-score-18-of-36",
        label: "Understand the 36-Guna score",
        description: "Keep Mangal rules separate from the Guna total.",
      },
    ],
  },

  "ashtakavarga-bav-vs-sav": {
    slug: "ashtakavarga-bav-vs-sav",
    metaTitle: "Bhinnashtakavarga vs Sarvashtakavarga",
    metaDescription:
      "Understand the difference between BAV and SAV tables, how bindus are organized by sign, and how to audit an Ashtakavarga calculator.",
    eyebrow: "Ashtakavarga table guide",
    h1: "Bhinnashtakavarga vs Sarvashtakavarga",
    intro:
      "Bhinnashtakavarga (BAV) separates the bindu pattern associated with an individual planet. Sarvashtakavarga (SAV) combines eligible contributions into a sign-by-sign total. They answer related but different questions, so a single unexplained score is not a complete Ashtakavarga result.",
    takeaway:
      "Use BAV to inspect a planet-specific pattern, use SAV for the combined sign overview, and retain the natal house and running-period context.",
    sections: [
      {
        heading: "What a BAV table shows",
        paragraphs: [
          "A BAV row or table distributes bindus across Aries through Pisces for a particular planet according to the implemented traditional rules. It lets the reader see where that planet's pattern is relatively supported or sparse rather than reducing everything to one total.",
          "Confirm that the table labels all twelve signs in a stable order. When comparing software, compare the complete row rather than only a summary sentence.",
        ],
      },
      {
        heading: "What an SAV table shows",
        paragraphs: [
          "SAV aggregates the eligible Ashtakavarga contributions by sign. Readers often map those signs back to natal houses and later consider transits, but a higher total is not universally positive for every question.",
          "The ascendant, house lord, natal promise and dasha context remain relevant. SAV is a structured layer of evidence, not an independent event guarantee.",
        ],
      },
      {
        heading: "How to audit the calculator output",
        paragraphs: [
          "First verify the natal chart and selected ayanamsha. Then check that BAV identifies each planet and that SAV shows all twelve signs or houses. Save the settings with the table if you plan to compare another product or an astrologer's software.",
        ],
        bullets: [
          "Twelve clearly labeled signs",
          "Separate planet-level BAV rows",
          "A combined SAV row or table",
          "Visible chart and calculation settings",
        ],
      },
      {
        heading: "Common interpretation mistake",
        paragraphs: [
          "Do not treat the highest SAV number as a promise that every topic of that house will be easy. The table belongs inside a wider Jyotish method, and software totals can differ when inputs or implementation conventions differ.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are BAV and SAV the same?",
        answer:
          "No. BAV keeps planet-specific bindu patterns separate. SAV combines eligible contributions into a sign-by-sign overview.",
      },
      {
        question: "Is a high SAV score always good?",
        answer:
          "No. It is contextual and should be read with the natal house, its lord, the question and the wider chart.",
      },
      {
        question: "Why do Ashtakavarga tables differ?",
        answer:
          "Check birth data, timezone, ayanamsha, ascendant and implementation rules. Compare complete BAV and SAV rows instead of summary labels.",
      },
    ],
    related: [
      {
        href: "/ashtakavarga-calculator",
        label: "Calculate BAV and SAV",
        description: "Inspect the returned planet and combined tables.",
      },
      {
        href: "/shadbala-calculator",
        label: "Compare planetary strength",
        description: "Keep Ashtakavarga separate from the sixfold Shadbala measure.",
      },
      {
        href: "/vedic-birth-chart-calculator",
        label: "Verify the natal chart",
        description: "Confirm the birth record and calculation settings first.",
      },
    ],
  },

  "shadbala-rupas-planetary-strength": {
    slug: "shadbala-rupas-planetary-strength",
    metaTitle: "Shadbala Rupas and Six Planetary Strengths",
    metaDescription:
      "Learn how Shadbala uses six component strengths, how Rupas and Virupas relate, and how to read minimum-strength comparisons responsibly.",
    eyebrow: "Planetary strength guide",
    h1: "Shadbala Rupas and the Six Planetary Strengths",
    intro:
      "Shadbala combines six distinct measures: Sthana, Dig, Kala, Cheshta, Naisargika and Drik Bala. Software commonly totals the components in Virupas and expresses the result in Rupas, where 60 Virupas equal one Rupa. The component table is more useful than an unsupported label such as 'strongest planet.'",
    takeaway:
      "Read all six components, verify the unit and minimum shown by the calculator, and interpret strength as capacity—not automatic beneficence.",
    sections: [
      {
        heading: "The six components",
        paragraphs: [
          "Sthana Bala concerns positional sources of strength. Dig Bala concerns direction. Kala Bala groups time-related factors. Cheshta Bala relates to motion, Naisargika Bala to natural strength, and Drik Bala to aspectual influence within the implemented method.",
          "A planet can reach a similar total through a different component profile, so retaining the six values makes the result auditable and more useful for study.",
        ],
        bullets: [
          "Sthana Bala — positional strength",
          "Dig Bala — directional strength",
          "Kala Bala — temporal strength",
          "Cheshta Bala — motional strength",
          "Naisargika Bala — natural strength",
          "Drik Bala — aspectual strength",
        ],
      },
      {
        heading: "Rupas, Virupas and minimum values",
        paragraphs: [
          "Sixty Virupas equal one Rupa. A transparent result should label the unit rather than showing an unexplained number. If it displays a minimum required value, that minimum should be compared in the same unit as the total.",
          "Different software may expose raw subcomponents or use slightly different labels. Do not compare a Rupa value directly with an unlabeled Virupa total.",
        ],
      },
      {
        heading: "What a strong planet means—and does not mean",
        paragraphs: [
          "Shadbala describes capacity to express the planet's natal role. It does not make every planet beneficial, cancel difficult rulership or guarantee a desirable event. The planet's sign, houses, dignity, aspects, yogas and dasha context still matter.",
        ],
      },
      {
        heading: "How to compare calculators",
        paragraphs: [
          "Use identical birth data and timezone, then match ayanamsha and relevant conventions. Compare each of the six components, the Rupa total and the displayed minimum. If only the final total differs, the component table helps locate the source of the discrepancy.",
        ],
      },
    ],
    faqs: [
      {
        question: "How many Virupas are in one Rupa?",
        answer: "One Rupa equals 60 Virupas.",
      },
      {
        question: "Is the planet with the highest Shadbala always best?",
        answer:
          "No. A high score describes capacity. Whether that expression is constructive depends on the planet's complete natal role and context.",
      },
      {
        question: "Why should a Shadbala calculator show components?",
        answer:
          "The six values reveal how the total was built and make comparisons more auditable than a single strong-or-weak label.",
      },
    ],
    related: [
      {
        href: "/shadbala-calculator",
        label: "Calculate all six Balas",
        description: "Compare Rupas, the returned minimum and every component.",
      },
      {
        href: "/ashtakavarga-calculator",
        label: "Ashtakavarga calculator",
        description: "Use BAV and SAV as a separate strength framework.",
      },
      {
        href: "/vimshottari-dasha-calculator",
        label: "Vimshottari Dasha",
        description: "Read planetary capacity beside the active period.",
      },
    ],
  },

  "north-vs-south-vs-east-indian-charts": {
    slug: "north-vs-south-vs-east-indian-charts",
    metaTitle: "North vs South vs East Indian Birth Charts",
    metaDescription:
      "Compare North, South and East Indian Kundli layouts, learn what stays fixed in each chart, and convert the display without changing the planets.",
    eyebrow: "Regional chart layout guide",
    h1: "North vs South vs East Indian Birth Charts",
    intro:
      "North, South and East Indian charts can display the same sidereal planetary data through different visual conventions. Changing the layout should not recalculate the ascendant, signs, houses or planetary degrees. The key is knowing whether houses, signs or labelled regions are fixed in the chosen diagram.",
    takeaway:
      "Use the ascendant and sign labels to orient the diagram, then verify the same placement in the planetary table before interpreting a regional layout.",
    sections: [
      {
        heading: "North Indian: fixed houses",
        paragraphs: [
          "The common North Indian chart uses a diamond-based drawing with houses in fixed visual positions. The first house is normally the upper central diamond and the remaining houses proceed counterclockwise. Sign numbers change with the ascendant.",
          "This arrangement makes angular and trinal house relationships easy to spot once the reader knows the fixed house map.",
        ],
      },
      {
        heading: "South Indian: fixed signs",
        paragraphs: [
          "The common South Indian chart uses a rectangular grid in which Aries through Pisces occupy fixed boxes. The ascendant marker identifies which sign is the first house, and houses are counted from that sign through the fixed zodiac order.",
          "Because signs stay in the same place, comparing sign occupancy across charts can be visually quick.",
        ],
      },
      {
        heading: "East Indian: labelled regional conventions",
        paragraphs: [
          "East Indian, Bengali and Odia chart traditions use square, diamond and triangular regions whose exact orientation can vary. Rely on the displayed sign labels and ascendant marker rather than assuming that a North Indian house position has the same meaning.",
          "A calculator should keep the planet table visible so each diagram position can be cross-checked against sign, house and degree data.",
        ],
      },
      {
        heading: "How to convert the view safely",
        paragraphs: [
          "Generate the chart once, note the ascendant sign and one test planet, then switch the display style. The sign, house and degree in the table should remain unchanged while only the diagram moves.",
        ],
        bullets: [
          "Confirm the same birth input and ayanamsha",
          "Identify the ascendant sign",
          "Switch only the chart-style control",
          "Verify one or more planets in the degree table",
        ],
      },
    ],
    faqs: [
      {
        question: "Which Indian chart style is more accurate?",
        answer:
          "None is inherently more accurate. With identical data and settings, the layouts should display the same calculated positions.",
      },
      {
        question: "Is an East Indian chart the same as a Bengali chart?",
        answer:
          "Bengali charts are commonly included within East Indian conventions, but regional drawings can vary. Use the labels supplied by the specific chart.",
      },
      {
        question: "Why do the planets move when I change chart style?",
        answer:
          "Their diagram positions move because the layout changes. Their underlying sign, house and degree should remain the same.",
      },
    ],
    related: [
      {
        href: "/north-indian-birth-chart-calculator",
        label: "North Indian chart",
        description: "Generate the fixed-house diamond layout.",
      },
      {
        href: "/south-indian-birth-chart-calculator",
        label: "South Indian chart",
        description: "Generate the fixed-sign rectangular layout.",
      },
      {
        href: "/east-indian-birth-chart-calculator",
        label: "East Indian chart",
        description: "Generate the labelled Bengali and Odia-region convention.",
      },
    ],
  },
} as const satisfies Record<string, LongtailGuide>;

export type LongtailGuideSlug = keyof typeof LONGTAIL_GUIDES;

export const LONGTAIL_GUIDE_SLUGS = Object.keys(
  LONGTAIL_GUIDES,
) as LongtailGuideSlug[];

export function getLongtailGuide(slug: string): LongtailGuide | undefined {
  return LONGTAIL_GUIDES[slug as LongtailGuideSlug];
}
