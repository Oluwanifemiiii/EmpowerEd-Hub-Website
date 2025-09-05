import React, { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Building, 
  Heart, 
  Users,
  Clock,
  MessageSquare,
  Handshake
} from 'lucide-react';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources' | 'contact';

interface ContactPageProps {
  onNavigate: (page: Page) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/contact`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          type: formData.inquiryType,
          organization: formData.organization
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          organization: '',
          inquiryType: '',
          subject: '',
          message: ''
        });
        
        alert('Thank you for your message! We will get back to you within 24-48 hours.');
      } else {
        alert('Sorry, there was an error sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      alert('Sorry, there was an error sending your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: "contact@empoweredhub.org",
      description: "Send us an email anytime"
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: "+234 (0) 1234 567 890",
      description: "Mon-Fri 9AM-5PM WAT"
    },
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Address",
      details: "Lagos Business School, Pan-Atlantic University",
      description: "Lekki-Ajah Expressway, Lagos"
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      details: "24-48 hours",
      description: "We respond quickly to all inquiries"
    }
  ];

  const inquiryTypes = [
    { value: "partnership", label: "Partnership & Sponsorship" },
    { value: "volunteer", label: "Volunteer Opportunities" },
    { value: "student", label: "Student Enrollment" },
    { value: "curriculum", label: "Curriculum Inquiry" },
    { value: "media", label: "Media & Press" },
    { value: "general", label: "General Inquiry" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Get in Touch with Us
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready to partner with us or have questions about EmpowerEd Hub? 
            We'd love to hear from you and explore how we can work together to empower youth through education.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {info.icon}
                  </div>
                  <CardTitle className="text-lg">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-foreground mb-2">{info.details}</p>
                  <CardDescription>{info.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Contact Form and Info */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Send us a Message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization">Organization (Optional)</Label>
                    <Input
                      id="organization"
                      placeholder="Your organization or company"
                      value={formData.organization}
                      onChange={(e) => handleInputChange('organization', e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inquiryType">Inquiry Type *</Label>
                    <Select value={formData.inquiryType} onValueChange={(value) => handleInputChange('inquiryType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        {inquiryTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      placeholder="Brief subject of your inquiry"
                      value={formData.subject}
                      onChange={(e) => handleInputChange('subject', e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us more about your inquiry, partnership ideas, or questions..."
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      rows={6}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Partnership Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Handshake className="h-5 w-5" />
                    Partnership Opportunities
                  </CardTitle>
                  <CardDescription>
                    Join us in making a difference in young lives
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Corporate Partnerships</h4>
                      <p className="text-sm text-muted-foreground">
                        Partner with us to sponsor programs, provide equipment, or offer internship opportunities.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Volunteer Programs</h4>
                      <p className="text-sm text-muted-foreground">
                        Share your expertise by teaching, mentoring, or supporting our educational initiatives.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium">Funding & Grants</h4>
                      <p className="text-sm text-muted-foreground">
                        Help us expand our reach and impact through financial support and grants.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About Group 5, SMP 96</CardTitle>
                  <CardDescription>
                    Learn more about our team
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    We are a dedicated team from Lagos Business School, committed to addressing 
                    youth unemployment and digital exclusion in Nigeria. Our EmpowerEd Hub initiative 
                    focuses on providing practical, hands-on training to disadvantaged youth aged 10-15.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => onNavigate('landing')}
                    className="w-full"
                  >
                    Learn More About Us
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're interested in partnerships, volunteering, or learning more about our programs, 
            we're here to help you get involved in empowering youth through education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="text-primary bg-primary-foreground hover:bg-primary-foreground/90"
              onClick={() => onNavigate('landing')}
            >
              Explore Our Mission
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Contact Us Today
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}