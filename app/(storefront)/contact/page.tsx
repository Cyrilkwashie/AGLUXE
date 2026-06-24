import Link from 'next/link';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with AG LUXE — inquiries, bespoke orders, and customer care.',
};

const contactDetails = [
  {
    label: 'Email',
    value: 'hello@agluxe.com',
    href: 'mailto:hello@agluxe.com',
  },
  {
    label: 'Phone',
    value: '+1 (800) 000 0000',
    href: 'tel:+18000000000',
  },
  {
    label: 'Hours',
    value: 'Mon–Fri, 9am–6pm EST',
    href: undefined,
  },
];

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Pinterest', href: 'https://pinterest.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
];

export default function ContactPage() {
  return (
    <main className="pt-16 md:pt-20">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <p className="font-sans text-xs tracking-[0.4em] uppercase text-ag-gold mb-4">Get in Touch</p>
        <h1 className="font-display text-5xl md:text-6xl font-light text-ag-black mb-4">Contact</h1>
        <p className="font-sans text-sm text-ag-muted max-w-xl leading-relaxed mb-16">
          Whether you are seeking a bespoke piece, have a question about an order, or simply wish
          to learn more about our collections — we would love to hear from you.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-10">
            {contactDetails.map((item) => (
              <div key={item.label}>
                <p className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted mb-2">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="font-display text-2xl md:text-3xl text-ag-black hover:text-ag-gold transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="font-display text-2xl md:text-3xl text-ag-black">{item.value}</p>
                )}
              </div>
            ))}

            <div>
              <p className="font-sans text-xs tracking-[0.3em] uppercase text-ag-muted mb-4">
                Follow Us
              </p>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-sm tracking-wider uppercase text-ag-charcoal hover:text-ag-gold transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border border-ag-border p-8 md:p-10 bg-ag-cream/40">
            <h2 className="font-display text-2xl mb-2">Visit the Shop</h2>
            <p className="font-sans text-sm text-ag-muted leading-relaxed mb-6">
              Explore our full collection online, browse by category, and discover pieces crafted
              for life&apos;s most meaningful moments.
            </p>
            <Link
              href="/shop"
              className="inline-block px-8 py-3 border border-ag-black font-sans text-xs tracking-[0.3em] uppercase hover:bg-ag-black hover:text-white transition-all duration-300"
            >
              Browse Collection
            </Link>

            <div className="mt-10 pt-8 border-t border-ag-border flex items-center gap-3 text-ag-muted">
              <InstagramIcon className="w-5 h-5" strokeWidth={1.5} />
              <span className="font-sans text-sm">@agluxe</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
