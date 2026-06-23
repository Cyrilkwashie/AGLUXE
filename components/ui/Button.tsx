import { ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';

type Variant = 'primary' | 'outline' | 'ghost';

const variants: Record<Variant, string> = {
  primary: 'bg-ag-gold text-white hover:bg-ag-gold-dark',
  outline:
    'border border-ag-black text-ag-black hover:bg-ag-black hover:text-white',
  ghost: 'text-ag-black underline-offset-4 hover:underline px-0 py-0',
};

type BaseProps = {
  variant?: Variant;
  className?: string;
};

type ButtonProps = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type LinkProps = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: Props) {
  const base =
    'inline-block font-sans text-xs tracking-[0.3em] uppercase px-8 py-3.5 transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-ag-gold focus:ring-offset-2';

  const classes = `${base} ${variants[variant]} ${className}`;

  if ('href' in props && props.href) {
    const { href, ...rest } = props;
    return <a href={href} className={classes} {...rest} />;
  }

  return <button className={classes} {...(props as ButtonProps)} />;
}
