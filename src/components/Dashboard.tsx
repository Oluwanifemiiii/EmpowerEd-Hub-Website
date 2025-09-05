import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  Play,
  ChevronRight,
  Laptop,
  Wrench,
  Palette
} from 'lucide-react';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources';

interface DashboardProps {
  user: any;
  onNavigate: (page: Page) => void;
}

export default function Dashboard({ user, onNavigate }: DashboardProps) {
  // Use real user data when available
  const stats = [
    {
      title: "Courses in Progress",
      value: user?.enrolledCourses?.length || "0",
      description: "Keep up the great work!",
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      title: "Hours Learned",
      value: user?.totalLearningHours || "0",
      description: "Total hours",
      icon: <Clock className="h-5 w-5" />
    },
    {
      title: "Certificates Earned",
      value: user?.completedCourses?.length || "0",
      description: "Well done!",
      icon: <Award className="h-5 w-5" />
    },
    {
      title: "Member Since",
      value: user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Today",
      description: "Learning journey",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      category: "Digital Skills",
      progress: 65,
      nextLesson: "CSS Basics",
      duration: "45 min",
      categoryIcon: <Laptop className="h-4 w-4" />,
      image: "https://images.unsplash.com/photo-1662686439618-12cfd337c067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 2,
      title: "Basic Woodworking Skills",
      category: "Vocational Skills",
      progress: 30,
      nextLesson: "Using Hand Tools Safely",
      duration: "30 min",
      categoryIcon: <Wrench className="h-4 w-4" />,
      image: "https://images.unsplash.com/photo-1521946793085-0faa0d5a7b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 3,
      title: "Digital Art & Design Fundamentals",
      category: "Creative Skills",
      progress: 80,
      nextLesson: "Color Theory Applications",
      duration: "25 min",
      categoryIcon: <Palette className="h-4 w-4" />,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ];

  const recommendedCourses = [
    {
      title: "Python Programming for Beginners",
      category: "Digital Skills",
      duration: "8 hours",
      level: "Beginner",
      students: "1,234"
    },
    {
      title: "Electronics and Circuit Building",
      category: "Vocational Skills", 
      duration: "6 hours",
      level: "Beginner",
      students: "892"
    },
    {
      title: "Photography Basics",
      category: "Creative Skills",
      duration: "4 hours",
      level: "Beginner",
      students: "567"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Student'}! 👋</h1>
            <p className="text-muted-foreground mt-1">
              Ready to continue your learning journey? Let's pick up where you left off.
            </p>
          </div>
          <Button onClick={() => onNavigate('resources')}>
            Browse All Courses
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className="text-muted-foreground">
                  {stat.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Learning Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Continue Learning</h2>
              <p className="text-muted-foreground">Pick up where you left off</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {inProgressCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <ImageWithFallback
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" className="rounded-full">
                      <Play className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      <span className="mr-1">{course.categoryIcon}</span>
                      {course.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                  <CardDescription>
                    Next: {course.nextLesson} • {course.duration}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Continue Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recommended Courses */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Recommended for You</h2>
            <p className="text-muted-foreground">Based on your interests and learning path</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCourses.map((course, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <Badge variant="outline" className="w-fit text-xs">
                    {course.category}
                  </Badge>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <div className="space-y-1 text-muted-foreground">
                    <div className="flex justify-between text-sm">
                      <span>{course.duration}</span>
                      <span>{course.level}</span>
                    </div>
                    <div className="text-xs">
                      {course.students} students enrolled
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => onNavigate('resources')}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              Browse All Courses
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Award className="mr-2 h-4 w-4" />
              View Certificates
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              Learning Analytics
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}