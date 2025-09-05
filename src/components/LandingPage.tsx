import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  Users, 
  Shield, 
  Laptop, 
  Wrench, 
  Heart,
  Star,
  ArrowRight,
  Check,
  Target,
  Lightbulb,
  Building,
  Handshake
} from 'lucide-react';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources';

interface LandingPageProps {
  onNavigate: (page: Page) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const challenges = [
    {
      icon: <Target className="h-6 w-6" />,
      title: "High Dropout Rates",
      description: "Many young people can't complete their formal education because of poverty, family responsibilities, or lack of basic infrastructure."
    },
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Digital Exclusion",
      description: "A large number of youths are digitally illiterate because they lack access to the internet, devices, and digital training."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Unemployment & Idleness",
      description: "Without skills or certifications, these youths are often unemployed and vulnerable to crime, exploitation, and early parenthood."
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: "Lack of Practical Training",
      description: "Most current educational programs are too theoretical and don't provide the hands-on, skill-based training that young people need for real-world jobs."
    }
  ];

  const programs = [
    {
      icon: <Laptop className="h-6 w-6" />,
      title: "Digital Literacy",
      description: "Foundational training to bridge the digital divide."
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Vocational Skills",
      description: "Hands-on training for real-world applications."
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "Entrepreneurship",
      description: "Developing the mindset and skills needed to start a business."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Personal Development",
      description: "Building confidence and essential life skills."
    }
  ];

  const sponsorshipBenefits = [
    "Create a meaningful impact by changing the lives of marginalized youth through access to essential skills",
    "Reinforce your organization's commitment to social responsibility, youth empowerment, and inclusive development",
    "Receive formal recognition across all our project communications, promotional materials, community outreach programs, and impact reports"
  ];



  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold text-primary">EmpowerEd Hub</span>
            </div>
            <Button onClick={() => onNavigate('auth')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
                Empowering Youth Through 
                <span className="text-primary"> Digital Learning</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                EmpowerED Hub—a safe and accessible space dedicated to providing digital and vocational skills 
                to out-of-school and disadvantaged youth between the ages of 10 and 15. We equip them with the 
                skills they need to secure future employment, start their own businesses, and achieve personal growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => onNavigate('auth')}
                >
                  Start Learning Today
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Learn More
                </Button>
              </div>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Free for all students
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Age-appropriate content
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  Safe environment
                </div>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1623863568368-69e4cbe6cc0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIweW91dGglMjBzdHVkZW50cyUyMGxlYXJuaW5nJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NTY3NDE5NzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Diverse youth learning technology"
                className="rounded-lg shadow-2xl w-full h-[400px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              About Us 💻🎓
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              At the heart of our mission lies a commitment to empowering vulnerable youth. We are Group 5, SMP 96 of Lagos Business School, 
              and we're launching the EmpowerED Hub—a safe and accessible space dedicated to providing digital and vocational skills to 
              out-of-school and disadvantaged youth between the ages of 10 and 15.
            </p>
          </div>
          
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">
              We're tackling some of the most pressing challenges in our communities:
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {challenges.map((challenge, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center text-destructive mb-4">
                      {challenge.icon}
                    </div>
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{challenge.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Programs 🚀💡
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              The Digital Learning Hub will offer free training delivered by experienced facilitators, using modern technology 
              and learning tools. Our programs focus on practical, hands-on skills to prepare participants for success:
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{program.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Support Our Cause Section */}
      <section className="py-20 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Support Our Cause ❤🤝
            </h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              We're open to partnership to launch and operate our Digital Learning Hub.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">By becoming a sponsor, you will:</h3>
              <div className="space-y-4">
                {sponsorshipBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-muted-foreground">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 p-6 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-lg font-medium text-center">
                  We believe that with the right skills and opportunity, every young person can overcome their circumstances.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="p-8 text-center">
                <CardHeader>
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                    <Handshake className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl">Partner With Us</CardTitle>
                  <CardDescription className="text-lg">
                    Join us in creating meaningful change in young lives
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    size="lg" 
                    className="w-full"
                    onClick={() => onNavigate('contact')}
                  >
                    <Building className="mr-2 h-4 w-4" />
                    Contact Us for Partnership
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join us in empowering vulnerable youth through digital and vocational skills training. 
            Together, we can create a more equitable and productive society.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="text-primary bg-primary-foreground hover:bg-primary-foreground/90"
            onClick={() => onNavigate('auth')}
          >
            Create Your Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <BookOpen className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-primary">EmpowerEd Hub</span>
            </div>
            <p className="text-muted-foreground text-center md:text-right">
              © 2025 EmpowerEd Hub - Group 5, SMP 96 Lagos Business School. Empowering youth through digital learning.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}