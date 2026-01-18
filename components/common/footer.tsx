import { 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Shield,
  Lock,
  Globe,
  Award,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productLinks = [
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'API Documentation', href: '/api-docs' },
    { name: 'Changelog', href: '/changelog' },
    { name: 'Status', href: '/status' },
  ];

  const solutionsLinks = [
    { name: 'For Enterprises', href: '/solutions/enterprise' },
    { name: 'For Startups', href: '/solutions/startups' },
    { name: 'For Education', href: '/solutions/education' },
    { name: 'For Legal', href: '/solutions/legal' },
    { name: 'For Research', href: '/solutions/research' },
    { name: 'Case Studies', href: '/case-studies' },
  ];

  const resourceLinks = [
    { name: 'Documentation', href: '/docs' },
    { name: 'Help Center', href: '/help' },
    { name: 'Community', href: '/community' },
    { name: 'Blog', href: '/blog' },
    { name: 'Webinars', href: '/webinars' },
    { name: 'Whitepapers', href: '/whitepapers' },
  ];

  const companyLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press Kit', href: '/press' },
    { name: 'Partners', href: '/partners' },
    { name: 'Contact', href: '/contact' },
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Data Processing', href: '/data-processing' },
    { name: 'Security', href: '/security' },
    { name: 'Compliance', href: '/compliance' },
    { name: 'Subprocessors', href: '/subprocessors' },
  ];

  const socialLinks = [
    { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
    { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
    { name: 'GitHub', href: 'https://github.com', icon: Github },
  ];

  return (
    <footer className=" text-white">
      {/* Enterprise Features Section */}
     
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <FileText className="w-8 h-8 text-orange-500 mr-2" />
              <span className="text-xl font-bold">AI Summarizer</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Advanced AI-powered document summarization for enterprises. 
              Transform complex documents into actionable insights with 
              enterprise-grade security and scalability.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <a href="mailto:sales@aisummarizer.com" className="hover:text-white transition-colors">
                  sales@aisummarizer.com
                </a>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <a href="tel:+1-555-ENTERPRISE" className="hover:text-white transition-colors">
                  +1 (555) ENTERPRISE
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              {solutionsLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="text-gray-400 text-sm">
                © {currentYear} AI Summarizer. All rights reserved.
              </div>
              
              {/* Legal Links */}
              <div className="flex flex-wrap gap-6">
                {legalLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href} 
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Compliance Badges */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 pt-6 border-t border-gray-800">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Shield className="w-4 h-4 text-green-500" />
              <span>SOC 2 Type II Compliant</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Globe className="w-4 h-4 text-blue-500" />
              <span>GDPR Compliant</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Lock className="w-4 h-4 text-purple-500" />
              <span>HIPAA Ready</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Award className="w-4 h-4 text-yellow-500" />
              <span>ISO 27001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;