import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import CourseProgress from './CourseProgress';
import { 
  Search, 
  Filter, 
  Play, 
  Clock, 
  Users, 
  Star,
  Laptop,
  Wrench,
  Palette,
  BookOpen,
  ChevronRight
} from 'lucide-react';

type Page = 'landing' | 'auth' | 'dashboard' | 'resources';

interface ResourcesPageProps {
  onNavigate: (page: Page) => void;
  user?: any;
}

export default function ResourcesPage({ onNavigate, user }: ResourcesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'digital', name: 'Digital Skills', icon: <Laptop className="h-4 w-4" /> },
    { id: 'vocational', name: 'Vocational Skills', icon: <Wrench className="h-4 w-4" /> },
    { id: 'creative', name: 'Creative Skills', icon: <Palette className="h-4 w-4" /> }
  ];

  const courses = [
    {
      id: 1,
      title: "Introduction to Web Development",
      description: "Learn the basics of HTML, CSS, and JavaScript to build your first website.",
      category: "digital",
      categoryName: "Digital Skills",
      level: "Beginner",
      duration: "8 hours",
      lessons: 24,
      students: 1542,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1662686439618-12cfd337c067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "Sarah Chen"
    },
    {
      id: 2,
      title: "Python Programming for Beginners",
      description: "Start your coding journey with Python - perfect for young programmers.",
      category: "digital",
      categoryName: "Digital Skills",
      level: "Beginner",
      duration: "10 hours",
      lessons: 30,
      students: 2103,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1588356646933-7cdb09b062e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "Alex Kumar"
    },
    {
      id: 3,
      title: "Basic Woodworking Skills",
      description: "Learn essential woodworking techniques and safety practices.",
      category: "vocational",
      categoryName: "Vocational Skills",
      level: "Beginner",
      duration: "6 hours",
      lessons: 18,
      students: 876,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1711840083711-1926d91eb9e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHBlb3BsZSUyMHdvb2R3b3JraW5nJTIwY3JhZnQlMjBza2lsbHN8ZW58MXx8fHwxNzU2NzQyMDcyfDA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "Mike Rodriguez"
    },
    {
      id: 4,
      title: "Electronics and Circuit Building",
      description: "Understand electronics basics and build your first circuits.",
      category: "vocational",
      categoryName: "Vocational Skills",
      level: "Beginner",
      duration: "7 hours",
      lessons: 21,
      students: 654,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "Emma Johnson"
    },
    {
      id: 5,
      title: "Digital Art & Design Fundamentals",
      description: "Explore digital art tools and design principles for creative expression.",
      category: "creative",
      categoryName: "Creative Skills",
      level: "Beginner",
      duration: "5 hours",
      lessons: 15,
      students: 1234,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1690094639172-6620fd026b43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwYXJ0JTIwZGVzaWduJTIwY3JlYXRpdmUlMjB5b3V0aHxlbnwxfHx8fDE3NTY3NDIwNzV8MA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "Lisa Park"
    },
    {
      id: 6,
      title: "Photography Basics",
      description: "Learn photography fundamentals and composition techniques.",
      category: "creative",
      categoryName: "Creative Skills",
      level: "Beginner",
      duration: "4 hours",
      lessons: 12,
      students: 987,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbGVhcm5pbmclMjBjb21wdXRlciUyMHNraWxsc3xlbnwxfHx8fDE3NTY3NDIwMzR8MA&ixlib=rb-4.1.0&q=80&w=400",
      instructor: "David Kim"
    }
  ];

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getCategoryIcon = (categoryId: string) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category?.icon || <BookOpen className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">Learning Resources</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our comprehensive library of courses designed specifically for young learners. 
            Build practical skills for your future through engaging video lessons.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="digital">Digital Skills</SelectItem>
                <SelectItem value="vocational">Vocational Skills</SelectItem>
                <SelectItem value="creative">Creative Skills</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                {category.icon}
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={selectedCategory} className="mt-8">
            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                {selectedCategory !== 'all' && ` in ${categories.find(c => c.id === selectedCategory)?.name}`}
              </p>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-all duration-200">
                  <div className="aspect-video relative group">
                    <ImageWithFallback
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button size="icon" className="rounded-full bg-white/90 text-black hover:bg-white">
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-black/70 text-white border-0"
                    >
                      {course.level}
                    </Badge>
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline" className="text-xs">
                        {getCategoryIcon(course.category)}
                        <span className="ml-1">{course.categoryName}</span>
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs">{course.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      Instructor: {course.instructor}
                    </div>
                    
                    <Button className="w-full">
                      Start Course
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No courses found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <div className="bg-muted/50 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">New This Week</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Laptop className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Mobile App Development</h3>
                <p className="text-sm text-muted-foreground">Learn to build mobile apps with React Native</p>
                <Badge variant="outline" className="mt-1 text-xs">Coming Soon</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                <Wrench className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">3D Printing Basics</h3>
                <p className="text-sm text-muted-foreground">Design and print your first 3D objects</p>
                <Badge variant="outline" className="mt-1 text-xs">Coming Soon</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}