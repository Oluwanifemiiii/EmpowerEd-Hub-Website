// @ts-check
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { createClient } from '@supabase/supabase-js'
import { serve } from '@hono/node-server';
import * as kv from './kv_store.js'
import "dotenv/config"
const app = new Hono()

app.use('*', cors({ origin: '*', allowHeaders: ['*'], allowMethods: ['*'] }))
app.use('*', logger())

// IMPORTANT: never expose SERVICE_ROLE to the browser.
// This code runs only on the server.
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variable')
}
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// ---- ROUTES ----
app.post('/signup', async (c) => {
  try {
    const { email, password, name, age, interests } = await c.req.json()
    if (!email || !password || !name) return c.json({ error: 'Missing required fields' }, 400)

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name, age, interests },
      email_confirm: true
    })
    if (authError) return c.json({ error: authError.message }, 400)

    const userId = authData.user.id
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
    }
    await kv.set(`user_profile:${userId}`, userProfile)

    return c.json({ message: 'User created successfully', user: { id: userId, email, name } })
  } catch (e) {
    console.error('Signup error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.get('/profile/:userId', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) return c.json({ error: 'Unauthorized' }, 401)

    const userId = c.req.param('userId')
    const profile = await kv.get(`user_profile:${userId}`)
    if (!profile) return c.json({ error: 'Profile not found' }, 404)

    return c.json({ profile })
  } catch (e) {
    console.error('Get profile error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/progress', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) return c.json({ error: 'Unauthorized' }, 401)

    const { courseId, lessonId, completed, timeSpent } = await c.req.json()
    const profile = await kv.get(`user_profile:${user.id}`)
    if (!profile) return c.json({ error: 'Profile not found' }, 404)

    profile.progress ??= {}
    profile.progress[courseId] ??= {}
    const prev = profile.progress[courseId][lessonId] || { timeSpent: 0 }
    profile.progress[courseId][lessonId] = {
      completed,
      completedAt: completed ? new Date().toISOString() : null,
      timeSpent: (prev.timeSpent || 0) + (timeSpent || 0)
    }

    profile.totalLearningHours = (profile.totalLearningHours || 0) + (timeSpent || 0)

    const courseProgress = profile.progress[courseId]
    const lessons = Object.keys(courseProgress)
    const done = lessons.filter((l) => courseProgress[l].completed)
    if (lessons.length > 0 && done.length === lessons.length) {
      if (!profile.completedCourses.includes(courseId)) profile.completedCourses.push(courseId)
    }

    await kv.set(`user_profile:${user.id}`, profile)
    return c.json({ message: 'Progress updated successfully', profile })
  } catch (e) {
    console.error('Update progress error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/contact', async (c) => {
  try {
    const { name, email, subject, message, type } = await c.req.json()
    if (!name || !email || !subject || !message) return c.json({ error: 'All fields are required' }, 400)

    const contactSubmission = {
      id: crypto.randomUUID(),
      name, email, subject, message,
      type: type || 'general',
      submittedAt: new Date().toISOString(),
      status: 'new'
    }
    await kv.set(`contact:${contactSubmission.id}`, contactSubmission)
    return c.json({ message: 'Contact form submitted successfully', id: contactSubmission.id })
  } catch (e) {
    console.error('Contact error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.get('/admin/contacts', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) return c.json({ error: 'Unauthorized' }, 401)

    const contacts = await kv.getByPrefix('contact:') || []
    contacts.sort(
  (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
)
    return c.json({ contacts })
  } catch (e) {
    console.error('Get contacts error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.post('/enroll', async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1]
    const { data: { user } } = await supabase.auth.getUser(accessToken)
    if (!user?.id) return c.json({ error: 'Unauthorized' }, 401)

    const { courseId } = await c.req.json()
    const profile = await kv.get(`user_profile:${user.id}`)
    if (!profile) return c.json({ error: 'Profile not found' }, 404)

    if (!profile.enrolledCourses.includes(courseId)) {
      profile.enrolledCourses.push(courseId)
      profile.enrolledAt ??= {}
      profile.enrolledAt[courseId] = new Date().toISOString()
      await kv.set(`user_profile:${user.id}`, profile)
    }

    return c.json({ message: 'Successfully enrolled in course', profile })
  } catch (e) {
    console.error('Enroll error:', e)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Start server
const port = process.env.PORT || 8787;

console.log(`API listening on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});

