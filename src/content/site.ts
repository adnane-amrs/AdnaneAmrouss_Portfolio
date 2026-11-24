// Personal details shared by every language.
export const site = {
  name: "Adnane Amrouss",
  shortName: "AMROUSS",
  email: "mradnane.amrouss@gmail.com",
  phone: "+212 766210264",
  phoneHref: "tel:+212766210264",
  website: "https://www.amrouss.com",
  github: "https://github.com/adnane-amrs",
  githubHandle: "adnane-amrs",
  location: "Afourer, Azilal — Morocco",
  photo: "/portfolio-picture.jpg",
  /** Small round avatars next to the name. */
  avatar: "/portfolio-picture-green.jpg",
  /**
   * Company and school logos for the Experience and Education carousels.
   * Drop the images in public/logos/ and set `src` (e.g. "/logos/d3-soft.png");
   * while `src` is empty, the circle shows the initials instead.
   */
  logos: {
    d3soft: { src: "/D3Soft_logo.png", initials: "D3" },
    // Round GM emblem cropped from public/gmsoft.png (the full mark is a thin wide band)
    gmsoft: { src: "/logos/gmsoft-emblem.png", initials: "GM" },
    // Emblem cropped from public/fsalogo.png (the full logo's text is unreadable at this size)
    fsa: { src: "/logos/fsa-emblem.png", initials: "FSA" },
    // Round seal: fills the circle
    est: { src: "/logo_est.webp", initials: "EST", fit: "cover" as const },
    fst: { src: "", initials: "FST" },
    lycee: { src: "", initials: "SBO" },
  },
  cv: {
    en: "/cv/Amrouss_Adnane_en.pdf",
    fr: "/cv/Amrouss_Adnane_fr.pdf",
  },
};
