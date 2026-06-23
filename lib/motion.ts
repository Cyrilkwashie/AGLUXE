export const premiumEase = [0.25, 0.46, 0.45, 0.94] as const;

export const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: premiumEase },
};

export const staggerContainer = {
  initial: {},
  whileInView: {
    transition: { staggerChildren: 0.12 },
  },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: premiumEase },
};
