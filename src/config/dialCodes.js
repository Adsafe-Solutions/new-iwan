/* Dialling codes for the phone field's country dropdown.

   App configuration, not copy — no CMS will ever own this, and it does not vary
   by country the way content does.

   ⚠ A CURATED list, not the full ITU one. It covers the two countries Iwan
   runs in, the diaspora those communities actually reach, and the places
   volunteers have written from — roughly a hundred entries rather than two
   hundred and fifty. Someone outside it can still type their number; only the
   prefix is picked from here. Adding one is a line, and the only rule is that
   `iso` stays the lowercase two-letter code so `dialFor` can find it. */

export const DIAL_CODES = [
  { iso: "in", dial: "+91", label: "India", flag: "🇮🇳" },
  { iso: "ca", dial: "+1", label: "Canada", flag: "🇨🇦" },
  { iso: "us", dial: "+1", label: "United States", flag: "🇺🇸" },
  { iso: "gb", dial: "+44", label: "United Kingdom", flag: "🇬🇧" },
  { iso: "ae", dial: "+971", label: "United Arab Emirates", flag: "🇦🇪" },
  { iso: "sa", dial: "+966", label: "Saudi Arabia", flag: "🇸🇦" },
  { iso: "qa", dial: "+974", label: "Qatar", flag: "🇶🇦" },
  { iso: "kw", dial: "+965", label: "Kuwait", flag: "🇰🇼" },
  { iso: "bh", dial: "+973", label: "Bahrain", flag: "🇧🇭" },
  { iso: "om", dial: "+968", label: "Oman", flag: "🇴🇲" },
  { iso: "au", dial: "+61", label: "Australia", flag: "🇦🇺" },
  { iso: "nz", dial: "+64", label: "New Zealand", flag: "🇳🇿" },
  { iso: "sg", dial: "+65", label: "Singapore", flag: "🇸🇬" },
  { iso: "my", dial: "+60", label: "Malaysia", flag: "🇲🇾" },
  { iso: "id", dial: "+62", label: "Indonesia", flag: "🇮🇩" },
  { iso: "pk", dial: "+92", label: "Pakistan", flag: "🇵🇰" },
  { iso: "bd", dial: "+880", label: "Bangladesh", flag: "🇧🇩" },
  { iso: "lk", dial: "+94", label: "Sri Lanka", flag: "🇱🇰" },
  { iso: "np", dial: "+977", label: "Nepal", flag: "🇳🇵" },
  { iso: "mv", dial: "+960", label: "Maldives", flag: "🇲🇻" },
  { iso: "af", dial: "+93", label: "Afghanistan", flag: "🇦🇫" },
  { iso: "ir", dial: "+98", label: "Iran", flag: "🇮🇷" },
  { iso: "iq", dial: "+964", label: "Iraq", flag: "🇮🇶" },
  { iso: "jo", dial: "+962", label: "Jordan", flag: "🇯🇴" },
  { iso: "lb", dial: "+961", label: "Lebanon", flag: "🇱🇧" },
  { iso: "ps", dial: "+970", label: "Palestine", flag: "🇵🇸" },
  { iso: "sy", dial: "+963", label: "Syria", flag: "🇸🇾" },
  { iso: "ye", dial: "+967", label: "Yemen", flag: "🇾🇪" },
  { iso: "tr", dial: "+90", label: "Türkiye", flag: "🇹🇷" },
  { iso: "eg", dial: "+20", label: "Egypt", flag: "🇪🇬" },
  { iso: "ma", dial: "+212", label: "Morocco", flag: "🇲🇦" },
  { iso: "dz", dial: "+213", label: "Algeria", flag: "🇩🇿" },
  { iso: "tn", dial: "+216", label: "Tunisia", flag: "🇹🇳" },
  { iso: "ly", dial: "+218", label: "Libya", flag: "🇱🇾" },
  { iso: "sd", dial: "+249", label: "Sudan", flag: "🇸🇩" },
  { iso: "so", dial: "+252", label: "Somalia", flag: "🇸🇴" },
  { iso: "et", dial: "+251", label: "Ethiopia", flag: "🇪🇹" },
  { iso: "ke", dial: "+254", label: "Kenya", flag: "🇰🇪" },
  { iso: "tz", dial: "+255", label: "Tanzania", flag: "🇹🇿" },
  { iso: "ug", dial: "+256", label: "Uganda", flag: "🇺🇬" },
  { iso: "ng", dial: "+234", label: "Nigeria", flag: "🇳🇬" },
  { iso: "gh", dial: "+233", label: "Ghana", flag: "🇬🇭" },
  { iso: "sn", dial: "+221", label: "Senegal", flag: "🇸🇳" },
  { iso: "za", dial: "+27", label: "South Africa", flag: "🇿🇦" },
  { iso: "ie", dial: "+353", label: "Ireland", flag: "🇮🇪" },
  { iso: "fr", dial: "+33", label: "France", flag: "🇫🇷" },
  { iso: "de", dial: "+49", label: "Germany", flag: "🇩🇪" },
  { iso: "nl", dial: "+31", label: "Netherlands", flag: "🇳🇱" },
  { iso: "be", dial: "+32", label: "Belgium", flag: "🇧🇪" },
  { iso: "es", dial: "+34", label: "Spain", flag: "🇪🇸" },
  { iso: "pt", dial: "+351", label: "Portugal", flag: "🇵🇹" },
  { iso: "it", dial: "+39", label: "Italy", flag: "🇮🇹" },
  { iso: "ch", dial: "+41", label: "Switzerland", flag: "🇨🇭" },
  { iso: "at", dial: "+43", label: "Austria", flag: "🇦🇹" },
  { iso: "se", dial: "+46", label: "Sweden", flag: "🇸🇪" },
  { iso: "no", dial: "+47", label: "Norway", flag: "🇳🇴" },
  { iso: "dk", dial: "+45", label: "Denmark", flag: "🇩🇰" },
  { iso: "fi", dial: "+358", label: "Finland", flag: "🇫🇮" },
  { iso: "pl", dial: "+48", label: "Poland", flag: "🇵🇱" },
  { iso: "gr", dial: "+30", label: "Greece", flag: "🇬🇷" },
  { iso: "ru", dial: "+7", label: "Russia", flag: "🇷🇺" },
  { iso: "cn", dial: "+86", label: "China", flag: "🇨🇳" },
  { iso: "jp", dial: "+81", label: "Japan", flag: "🇯🇵" },
  { iso: "kr", dial: "+82", label: "South Korea", flag: "🇰🇷" },
  { iso: "th", dial: "+66", label: "Thailand", flag: "🇹🇭" },
  { iso: "ph", dial: "+63", label: "Philippines", flag: "🇵🇭" },
  { iso: "vn", dial: "+84", label: "Vietnam", flag: "🇻🇳" },
  { iso: "br", dial: "+55", label: "Brazil", flag: "🇧🇷" },
  { iso: "mx", dial: "+52", label: "Mexico", flag: "🇲🇽" },
];

/* The dial code for a country the site runs in, falling back to India's — the
   default country — rather than to nothing, so the select always opens on a
   real value. */
export const dialFor = (iso) =>
  DIAL_CODES.find((c) => c.iso === String(iso).toLowerCase())?.dial ?? "+91";

export default DIAL_CODES;
