import React from 'react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Play, Clock, BookOpen, CheckCircle } from 'lucide-react';
import { projectId } from '../utils/supabase';

interface CourseProgressProps {
  user: any;
  courseId: string;
  courseTitle: string;
  category: string;
  lessons: {
    id: string;
    title: string;
    duration: string;
    completed?: boolean;
  }[];
  onProgressUpdate?: () => void;
}

export default function CourseProgress({ 
  user, 
  courseId, 
  courseTitle, 
  category, 
  lessons,
  onProgressUpdate 
}: CourseProgressProps) {
  
  const enrollInCourse = async () => {
    if (!user?.accessToken) return;
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/enroll`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ courseId })
      });

      if (response.ok) {
        console.log('Successfully enrolled in course');
        onProgressUpdate?.();
      } else {
        console.error('Enrollment failed');
      }
    } catch (error) {
      console.error('Enrollment error:', error);
    }
  };

  const markLessonComplete = async (lessonId: string, timeSpent: number = 0) => {
    if (!user?.accessToken) return;
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-24097803/progress`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          courseId,
          lessonId,
          completed: true,
          timeSpent: timeSpent / 60 // Convert to minutes
        })
      });

      if (response.ok) {
        console.log('Progress updated successfully');
        onProgressUpdate?.();
      } else {
        console.error('Progress update failed');
      }
    } catch (error) {
      console.error('Progress update error:', error);
    }
  };

  const isEnrolled = user?.enrolledCourses?.includes(courseId);
  const courseProgress = user?.progress?.[courseId] || {};
  const completedLessons = lessons.filter(lesson => courseProgress[lesson.id]?.completed).length;
  const progressPercentage = lessons.length > 0 ? (completedLessons / lessons.length) * 100 : 0;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{courseTitle}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </div>
          <Badge variant="secondary">
            {completedLessons}/{lessons.length} lessons
          </Badge>
        </div>
        
        {isEnrolled && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {!isEnrolled ? (
          <Button onClick={enrollInCourse} className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Enroll in Course
          </Button>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium">Course Lessons</h4>
            {lessons.map((lesson) => {
              const isCompleted = courseProgress[lesson.id]?.completed;
              return (
                <div 
                  key={lesson.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    {isCompleted ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <Play className="h-5 w-5 text-muted-foreground" />
                    )}
                    <div>
                      <p className={`font-medium ${isCompleted ? 'text-green-700' : ''}`}>
                        {lesson.title}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {lesson.duration}
                      </div>
                    </div>
                  </div>
                  
                  {!isCompleted && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markLessonComplete(lesson.id, 30)} // Simulate 30 minute lesson
                    >
                      Mark Complete
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}