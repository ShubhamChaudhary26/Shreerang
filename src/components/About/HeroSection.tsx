"use client";

import {
  Shield,
  Users,
  Award,
  CheckCircle,
  Target,
  Heart,
  Zap,
  Phone,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import WhoWeAreDescription from "./WhoAreDescription";
import Image from "next/image";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description:
        "We prioritize the security and trust of all our clients with transparent processes and professional legal documentation.",
    },
    {
      icon: Users,
      title: "Client-Focused",
      description:
        "Our team is dedicated to providing personalized service that meets each client's unique property rental needs.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our service, from initial consultation to final agreement execution.",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Streamlined processes and expert knowledge allow us to deliver fast, reliable property rental solutions.",
    },
  ];

  const team = [
    {
      name: "David Thompson",
      role: "Founder & CEO",
      description:
        "15+ years in real estate and property law, dedicated to simplifying property rentals.",
    },
    {
      name: "Lisa Rodriguez",
      role: "Legal Director",
      description:
        "Expert in property law with 12+ years of experience in rental agreements and contracts.",
    },
    {
      name: "Mark Johnson",
      role: "Property Manager",
      description:
        "Specialist in property management with extensive knowledge of the rental market.",
    },
  ];

  const achievements = [
    { number: "5000+", label: "Happy Clients" },
    { number: "10+", label: "Years Experience" },
    { number: "15000+", label: "Agreements Created" },
    { number: "99%", label: "Client Satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
    <section className="relative py-20 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/hero-property.jpg" // public folder me image ka path
          alt="Property Background"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-indigo-600/80"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Shreerang</h1>

        <p className="text-xl max-w-3xl mx-auto leading-relaxed">
          Your trusted partner in professional property rental services. We
          combine years of expertise with modern technology to deliver seamless
          rental experiences and comprehensive legal protection.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-8">
          <Link href="/agreement#agreement">
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded shadow-lg transition">
              Create Agreement Now
            </button>
          </Link>

          <Link href="/login">
            <button className="bg-white text-blue-600 font-semibold py-2 px-6 rounded shadow transition hover:bg-gray-100">
              Request a Call Back
            </button>
          </Link>
        </div>
      </div>
    </section>



      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-8">
            <Target className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            To revolutionize the property rental industry by providing
            transparent, secure, and efficient rental services backed by
            professional legal documentation. We believe that finding and
            renting property should be a stress-free experience for everyone
            involved.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <div className="text-gray-500">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhoWeAreDescription />

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            The principles that guide everything we do and ensure exceptional
            service for our clients.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                Founded in 2013, Shreerang began with a simple mission: to make
                property rental services more accessible, transparent, and
                secure for everyone. Our founder, David Thompson, experienced
                firsthand the complexities and challenges of traditional
                property rental processes.
              </p>
              <p>
                Over the years, we've grown from a small local service to a
                trusted name in property rentals, serving thousands of satisfied
                clients. Our commitment to professional legal documentation and
                customer service has earned us recognition as industry leaders.
              </p>
              <p>
                Today, Shreerang continues to innovate and improve our services,
                always putting our clients' needs first and ensuring every
                rental experience is smooth, secure, and successful.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold">Licensed & Certified</h3>
              </div>
              <p className="text-gray-600 mt-2">
                Fully licensed property management and legal documentation
                services.
              </p>
            </div>

            <div className="bg-pink-50 border border-pink-200 rounded-lg p-6">
              <div className="flex items-center space-x-3">
                <Heart className="w-6 h-6 text-pink-600" />
                <h3 className="text-lg font-semibold">Community Focused</h3>
              </div>
              <p className="text-gray-600 mt-2">
                Proudly serving our local community with personalized service
                and care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-black">
            Our Achievements
          </h2>
          <p className="text-xl text-muted-foreground">
            Recognition and milestones we&apos;re proud of
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: (
                <Award className="h-16 w-16 text-primary mx-auto mb-4 text-blue-500" />
              ),
              title: "Best E-Governance Platform 2023",
              desc: "Recognized by Digital India Awards",
            },
            {
              icon: (
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 text-blue-500" />
              ),
              title: "Fastest Growing Fintech",
              desc: "200% year-on-year growth",
            },
            {
              icon: (
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4 text-blue-500" />
              ),
              title: "ISO 27001 Certified",
              desc: "International security standards",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-lg text-center shadow-md"
            >
              {item.icon}
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Experienced professionals dedicated to providing exceptional
            property rental services.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white border rounded-lg p-6 shadow hover:shadow-lg transition"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.role}</p>
                <p className="text-gray-600 mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 bg-gradient-to-r from-blue-700 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Work With Us?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let our experienced team help you with all your property rental and
            legal documentation needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition"
            >
              Get Started Today
            </Link>
            <a
              href="tel:5551234567"
              className="flex items-center justify-center gap-2 border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              <Phone className="w-5 h-5" />
              Call (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
