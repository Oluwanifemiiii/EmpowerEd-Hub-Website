import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from '@supabase/supabase-js';
import * as kv from './kv_store.tsx';

const app = new Hono();

app.use('*', cors({
  origin: "*",
  allowHeaders: ["*"],
  allowMethods: ["*"],
}));

app.use('*', logger(console.log));

const supabase = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// User signup route
app.post("/make-server-24097803/signup", async (c) => {
  try {
    const body = await c.req.json();
    const { email, password, name, age, interests } = body;

    if (!email || !password || !name) {
      return c.json({ error: "Missing required fields" }, 400);
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, age, interests },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (authError) {
      console.log(`Signup error: ${authError.message}`);
      return c.json({ error: authError.message }, 400);
    }

    // Store additional user profile data
    const userId = authData.user.id;
    const userProfile = {
      id: userId,
      name,
      email,
      age,
      interests: interests || [],
      enrolledCourses: [],
      completedCourses: [],
      progress: {},
      joinDate: new Date().toISOString(),
      totalLearningHours: 0
    };

    await kv.set(`user_profile:${userId}`, userProfile);

    return c.json({ 
      message: "User created successfully", 
      user: { id: userId, email, name }
    });
  } catch (error) {
    console.log(`Signup server error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get user profile route
app.get("/make-server-24097803/profile/:userId", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const userId = c.req.param('userId');
    const profile = await kv.get(`user_profile:${userId}`);
    
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    return c.json({ profile });
  } catch (error) {
    console.log(`Get profile error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Update user progress route
app.post("/make-server-24097803/progress", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { courseId, lessonId, completed, timeSpent } = body;

    const profile = await kv.get(`user_profile:${user.id}`);
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    // Update progress
    if (!profile.progress) profile.progress = {};
    if (!profile.progress[courseId]) profile.progress[courseId] = {};
    
    profile.progress[courseId][lessonId] = {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
      timeSpent: (profile.progress[courseId][lessonId]?.timeSpent || 0) + (timeSpent || 0)
    };

    // Update total learning hours
    profile.totalLearningHours = (profile.totalLearningHours || 0) + (timeSpent || 0);

    // Check if course is completed
    const courseProgress = profile.progress[courseId];
    const courseLessons = Object.keys(courseProgress);
    const completedLessons = courseLessons.filter(lesson => courseProgress[lesson].completed);
    
    if (completedLessons.length === courseLessons.length && courseLessons.length > 0) {
      if (!profile.completedCourses.includes(courseId)) {
        profile.completedCourses.push(courseId);
      }
    }

    await kv.set(`user_profile:${user.id}`, profile);

    return c.json({ message: "Progress updated successfully", profile });
  } catch (error) {
    console.log(`Update progress error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Contact form submission route
app.post("/make-server-24097803/contact", async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, subject, message, type } = body;

    if (!name || !email || !subject || !message) {
      return c.json({ error: "All fields are required" }, 400);
    }

    const contactSubmission = {
      id: crypto.randomUUID(),
      name,
      email,
      subject,
      message,
      type: type || 'general',
      submittedAt: new Date().toISOString(),
      status: 'new'
    };

    await kv.set(`contact:${contactSubmission.id}`, contactSubmission);

    return c.json({ 
      message: "Contact form submitted successfully",
      id: contactSubmission.id
    });
  } catch (error) {
    console.log(`Contact form submission error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Get all contact submissions (admin route)
app.get("/make-server-24097803/admin/contacts", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const contacts = await kv.getByPrefix('contact:');
    const sortedContacts = contacts.sort((a, b) => 
      new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
    );

    return c.json({ contacts: sortedContacts });
  } catch (error) {
    console.log(`Get contacts error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// Enroll in course route
app.post("/make-server-24097803/enroll", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    const { data: { user }, error } = await supabase.auth.getUser(accessToken);
    
    if (!user?.id) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const body = await c.req.json();
    const { courseId } = body;

    const profile = await kv.get(`user_profile:${user.id}`);
    if (!profile) {
      return c.json({ error: "Profile not found" }, 404);
    }

    if (!profile.enrolledCourses.includes(courseId)) {
      profile.enrolledCourses.push(courseId);
      profile.enrolledAt = profile.enrolledAt || {};
      profile.enrolledAt[courseId] = new Date().toISOString();
      
      await kv.set(`user_profile:${user.id}`, profile);
    }

    return c.json({ message: "Successfully enrolled in course", profile });
  } catch (error) {
    console.log(`Enroll error: ${error}`);
    return c.json({ error: "Internal server error" }, 500);
  }
});

Deno.serve(app.fetch);