"use client";

import {
  Target,
  Users,
  Award,
  Globe,
  Eye,
  Heart,
  TrendingUp,
  Shield,
  Phone,
  CheckCircle,
} from "lucide-react";

const About = () => {
  const values = [
    {
      icon: <Eye className="h-12 w-12 text-primary" />,
      title: "Our Vision",
      description:
        "To be India's leading digital platform for e-governance solutions, making government services accessible to all.",
    },
    {
      icon: <Target className="h-12 w-12 text-primary" />,
      title: "Our Mission",
      description:
        "Simplifying and streamlining government services through technology, creating an environment where everyone can succeed.",
    },
    {
      icon: <Heart className="h-12 w-12 text-primary" />,
      title: "Our Values",
      description:
        "Transparency, efficiency, innovation, and customer-centricity drive everything we do.",
    },
  ];

  const milestones = [
    {
      year: "2018",
      title: "Company Founded",
      description: "Started with a vision to digitize government services",
    },
    {
      year: "2019",
      title: "First 1000 Customers",
      description: "Reached our first milestone with rent agreement services",
    },
    {
      year: "2020",
      title: "Financial Services Launch",
      description: "Expanded to provide comprehensive financial solutions",
    },
    {
      year: "2021",
      title: "Builder Solutions",
      description: "Launched specialized services for construction industry",
    },
    {
      year: "2022",
      title: "10,000+ Happy Customers",
      description: "Crossed 10,000 satisfied customers across all services",
    },
    {
      year: "2024",
      title: "Pan-India Presence",
      description: "Now serving customers across major Indian cities",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      description: "15+ years experience in fintech and government services",
    },
    {
      name: "Priya Sharma",
      position: "Head of Operations",
      description: "Expert in process optimization and customer experience",
    },
    {
      name: "Amit Patel",
      position: "Head of Technology",
      description: "Technology leader with expertise in digital platforms",
    },
    {
      name: "Neha Singh",
      position: "Head of Compliance",
      description: "Legal expert ensuring 100% regulatory compliance",
    },
  ];

  const stats = [
    { number: "50,000+", label: "Happy Customers" },
    { number: "100+", label: "Partner Companies" },
    { number: "₹500Cr+", label: "Business Facilitated" },
    { number: "99%", label: "Customer Satisfaction" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}

      {/* Vision Mission Values */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg border bg-white hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4 text-blue-900">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-[#DAECFF] rounded-2xl " >
      <div className="py-20 bg-muted ">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-900">Our Story</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              Shreerang was founded in 2018 with a simple yet powerful vision:
              to bridge the gap between citizens and government services through
              technology. What started as a small team passionate about solving
              bureaucratic challenges has grown into India's trusted
              e-governance platform. <br /> <br />
              We recognized that traditional government processes were
              time-consuming, complex, and often required multiple visits to
              different offices. Our founders, coming from technology and
              government sectors, decided to create a platform that would make
              these services accessible from the comfort of people's homes.{" "}
              <br /> <br />
              Today, we serve thousands of customers across India, helping them
              with rent agreements, financial services, and business solutions.
              Our commitment to transparency, efficiency, and customer
              satisfaction has made us a trusted partner for individuals and
              businesses alike.
            </div>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg space-y-6">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-primary text-blue-900" />
              <div>
                <h3 className="font-semibold">100% Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Bank-level security for all transactions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Globe className="h-8 w-8 text-primary text-blue-900" />
              <div>
                <h3 className="font-semibold">Pan-India Service</h3>
                <p className="text-sm text-muted-foreground">
                  Available across major Indian cities
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-8 w-8 text-primary text-blue-900" />
              <div>
                <h3 className="font-semibold">Award Winning</h3>
                <p className="text-sm text-muted-foreground">
                  Recognized for innovation in e-governance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
</div>
    

  

      {/* Achievements */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Our Achievements</h2>
          <p className="text-xl text-muted-foreground">
            Recognition and milestones we're proud of
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Award className="h-16 w-16 text-primary mx-auto mb-4 text-blue-900" />,
              title: "Best E-Governance Platform 2023",
              desc: "Recognized by Digital India Awards",
            },
            {
              icon: (
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4 text-blue-900" />
              ),
              title: "Fastest Growing Fintech",
              desc: "200% year-on-year growth",
            },
            {
              icon: (
                <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4 text-blue-900" />
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

    {/* Team */}
      <div className="py-20 bg-muted bg-[#DAECFF] mt-20 rounded-3xl">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-blue-900">Our Leadership Team</h2>
          <p className="text-xl text-muted-foreground">
            Meet the people driving our vision forward
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
          {team.map((member, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-lg bg-white hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Users className="h-12 w-12 text-primary text-blue-900" />
              </div>
              <h3 className="text-xl font-semibold">{member.name}</h3>
              <p className="text-primary font-semibold mb-2 text-blue-900">
                {member.position}
              </p>
              <p className="text-muted-foreground text-sm">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>



    </div>
  );
};

export default About;
