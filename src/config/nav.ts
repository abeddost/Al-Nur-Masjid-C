export type NavLink = {
  href: string;
  labelKey: string;
};

export type NavItem =
  | { type: "link"; href: string; labelKey: string }
  | { type: "dropdown"; labelKey: string; items: NavLink[] };

export const navItems: NavItem[] = [
  { type: "link", href: "/", labelKey: "nav.home" },
  {
    type: "dropdown",
    labelKey: "nav.mosque",
    items: [
      { href: "/about-the-mosque", labelKey: "nav.aboutTheMosque" },
      { href: "/quran-school", labelKey: "nav.quranSchool" },
      { href: "/an-nur-football-team", labelKey: "nav.footballTeam" },
    ],
  },
  {
    type: "dropdown",
    labelKey: "nav.support",
    items: [
      { href: "/social-projects", labelKey: "nav.socialProjects" },
      { href: "/donation-campaign-mosque", labelKey: "nav.donationCampaign" },
      { href: "/consulting-and-services", labelKey: "nav.consulting" },
    ],
  },
  {
    type: "dropdown",
    labelKey: "nav.aboutUs",
    items: [
      { href: "/our-organisation", labelKey: "nav.ourOrganisation" },
      {
        href: "/articles-of-association",
        labelKey: "nav.articlesOfAssociation",
      },
    ],
  },
  { type: "link", href: "/contact", labelKey: "nav.contact" },
];
