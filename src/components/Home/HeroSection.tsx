"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Shield,
  FileText,
  Users,
  Key,
  Home as HomeIcon,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import Head from "next/head";
import MarqueeTicker from "./MarqueeTicker";
import RentAgreementSlider from "./OurServices";
import { FAQSection } from "./FAQ";

// Utility for classNames
function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(" ");
}

// --- Button component ---
const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: string; size?: string; asChild?: boolean }
>(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? React.Fragment : "button";

  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variantClasses: Record<string, string> = {
    default: "bg-primary text-white hover:bg-primary/90 shadow-md",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    premium: "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg",  // replaced yellow gradient with blue
  };

  const sizeClasses: Record<string, string> = {
    default: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-lg font-semibold",
  };

  const classes = cn(
    baseClasses,
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.default,
    className
  );

  if (asChild) {
    return React.Children.only(props.children)
      ? React.cloneElement(props.children as React.ReactElement, { className: classes, ref, ...props })
      : null;
  }

  return (
    <button className={classes} ref={ref} {...props}>
      {props.children}
    </button>
  );
});
Button.displayName = "Button";

// --- Card components ---
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("rounded-lg border border-gray-200 bg-white shadow-sm", className)}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-gray-600", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";



// --- Main Home page ---

export default function Home() {
  const features = [
    {
      id: "trusted",
      icon: Shield,
      title: "Trusted & Secure",
      description: "Professional legal documentation with complete security and confidentiality for all parties.",
    },
    {
      id: "legal",
      icon: FileText,
      title: "Legal Agreements",
      description: "Comprehensive rent agreements that protect both landlords and tenants with clear terms.",
    },
    {
      id: "support",
      icon: Users,
      title: "Expert Support",
      description: "Dedicated team of property experts to guide you through every step of the rental process.",
    },
    {
      id: "quick",
      icon: Key,
      title: "Quick Process",
      description: "Streamlined rental process that gets you into your perfect property faster than ever.",
    },
  ];

  const faqs = [
    {
      id: "faq1",
      title: "Is the online agreement legally valid?",
      content: "Yes, agreements are e-stamped and legally valid across India.",
    },
    {
      id: "faq2",
      title: "Do you offer doorstep service?",
      content: "Absolutely. Our executive visits for biometric KYC and signing.",
    },
    {
      id: "faq3",
      title: "How long does it take?",
      content: "Most agreements are completed within 24-72 hours.",
    },
  ];

  return (
    <>
    <Head>
        <title>Shreerang | Property Rental & Rent Agreements</title>
        <meta
          name="description"
          content="Create rent agreements online with Shreerang. Trusted property rental services with expert support and secure documentation."
        />
      </Head>

      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* Hero */}
        <section
          id="hero"
          className="relative min-h-[80vh] flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1470&q=80')",
          }}
        >
          <div className="absolute inset-0 bg-blue-600 bg-opacity-70"></div> {/* blue overlay */}
          <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-sans">
              Professional Property Rental <br />
              <span className="text-yellow-300">& Agreement Services</span> {/* blue text */}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for hassle-free property rentals with comprehensive legal protection and expert guidance every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="premium" size="lg" asChild>
                <Link href="/agreement" className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Get Agreement Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button className="border border-gray-300   hover:bg-yellow-300"  size="lg" asChild>
                <Link href="/login"  className="flex items-center gap-2 text-white " >
                  <Users className="w-5 h-5 text-white" />
                  Join Us
                </Link>
              </Button>
            </div>
          </div>
        </section>
        <MarqueeTicker />

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-sans">Why Choose Shreerang?</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We provide comprehensive property rental solutions with professional legal documentation and expert support to ensure a smooth experience for everyone.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
  {features.map(({ id, icon: Icon, title, description }) => (
    <Card
      key={id}
      className="hover:shadow-lg transition-shadow border-l-1 border-r-1 border-blue-500"
    >
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardContent>
    </Card>
  ))}
</div>

          </div>
        </section>

             <RentAgreementSlider />
        

       <FAQSection />

        {/* CTA Section */}
        <section className="py-10 bg-blue-600 text-white text-center"> {/* blue bg */}
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-sans">Ready to Get Started?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Contact us today for professional property rental services and legal agreements that protect your interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center ">
              <Button variant="premium" size="lg" asChild>
                <Link href="/contact" className="flex items-center gap-2 justify-center">
                  <ArrowRight className="w-5 h-5" />
                  Contact Us
                </Link>
              </Button>
             <Button className="border border-gray-300   hover:bg-yellow-300"  size="lg" asChild>
                <Link href="/agreement"  className="flex items-center gap-2 text-white " >
                  <Users className="w-5 h-5 text-white" />
               Get Agreement Now
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
