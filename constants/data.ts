export const headerData = [
  { title: "About", href: "/about" },
  { title: "Categories", href: "/categories" },
  { title: "Shop", href: "/shop" },
  { title: "Deals", href: "/deal" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
];
export const quickLinksData = [
  { title: "Contact us", href: "/contact" },
  { title: "Terms & Conditions", href: "/terms" },
  { title: "Privacy Policy", href: "/privacy" },
  { title: "Help", href: "/help" },
];
export const categoriesData = [
  { title: "Mobiles", href: "mobiles" },
  { title: "Appliances", href: "appliances" },
  { title: "Smartphones", href: "smartphones" },
  { title: "Air Conditioners", href: "air-conditioners" },
  { title: "Washing Machine", href: "washing-machine" },
  { title: "Kitchen Appliances", href: "kitchen-appliances" },
  { title: "gadget accessories", href: "gadget-accessories" },
];
// Toggle this to show/hide the Best Sellers category
const showBestSellers = true;

export const productType = [
  ...(showBestSellers ? [{ title: "Best Sellers", value: "best-sellers" }] : []),
  { title: "Portable Fans", value: "portable-fans" },
  { title: "Stationery Sets", value: "stationery-sets" },
  { title: "Notebooks", value: "notebooks" },
  { title: "Art Supplies", value: "art-supplies" },
];