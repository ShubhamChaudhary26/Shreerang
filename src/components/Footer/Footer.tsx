import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const ShreerangFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Our Services",
      links: [
        { name: "Community Events", href: "#" },
        { name: "Membership Information", href: "#" },
        { name: "Volunteer Opportunities", href: "#" },
        { name: "Support & Donations", href: "#" }
      ]
    },
    {
      title: "About",
      links: [
        { name: "About Shreerang Association", href: "#" },
        { name: "Our Mission & Vision", href: "#" },
        { name: "Our Team", href: "#" },
        { name: "Contact Us", href: "#" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "News & Announcements", href: "#" },
        { name: "FAQs", href: "#" },
        { name: "Policies & Guidelines", href: "#" },
        { name: "Community Directory", href: "#" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" }
  ];

  return (
    <>
      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-3 px-6 rounded-t-2xl shadow-lg flex flex-col md:flex-row items-center md:justify-center relative">
        <span className="text-sm md:text-xl font-medium text-center mb-2 md:mb-0 md:mr-20">
          Want to Join or Partner with Shreerang Association?
        </span>
        <a
          href="tel:+919876543210"
          className="border border-white text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-white hover:text-blue-900 transition md:absolute md:right-[320px]"
        >
          Call Now
        </a>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-background to-muted/30 border-t border-border">
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Association Info */}
            <div className="lg:col-span-2">
              <div className="text-2xl lg:text-3xl font-bold gradient-text mb-4">
                🌸 Shreerang Association
              </div>
              <p className="text-muted-foreground mb-6 leading-relaxed max-w-md">
                Shreerang Association is dedicated to fostering cultural, social, and community development
                through events, initiatives, and support programs for residents and members.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center text-muted-foreground">
                  <Mail className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">contact@shreerangassociation.org</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Phone className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">+91 98765 43210</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-3 text-primary" />
                  <span className="text-sm">Shreerang Nagar, Thane, Maharashtra, India</span>
                </div>
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-foreground mb-4">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="border-t border-border mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-muted-foreground text-sm">
                © {currentYear} Shreerang Association. All rights reserved.
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-blue-900 hover:text-white transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default ShreerangFooter;
