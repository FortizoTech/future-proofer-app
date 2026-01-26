
Here is the **Phase 1 Master Plan** centered on **radical simplicity**. We will design this so even someone with basic literacy can navigate it using icons and color coding.

Since you have **Supabase** set up, we will use Supabase for *both* Authentication and the Database. It’s faster and keeps everything in one place.

---

### PART A: THE VISUAL BLUEPRINT (Text-Based Mockups)

We are removing navbars, complex footers, and "About Us" fluff. The app functions like a Kiosk.

#### Screen 1: The Entry (The "Gateway")
*Design Goal: One single action. Zero distraction.*

```text
+-------------------------------------------------------+
|                                                       |
|   [ LOGO: FUTURE PROOFER ] (Centered, Large)          |
|                                                       |
|            Unlock Your Potential                      |
|                                                       |
|                                                       |
|       [ BIG GREEN BUTTON: "START HERE" -> ]           |
|                                                       |
|                                                       |
|   (Very subtle text at bottom)                        |
|   Already a member? Log In                            |
+-------------------------------------------------------+
```

#### Screen 2: Sign In (Frictionless)
*Design Goal: No passwords to type (difficult on small screens). Use Google or "Magic Link".*

```text
+-------------------------------------------------------+
|  < Back                                               |
|                                                       |
|       Sign in to continue                             |
|                                                       |
|    +---------------------------------------------+    |
|    | [ G ]  Continue with Google                 |    |
|    +---------------------------------------------+    |
|                                                       |
|             --- OR ---                                |
|                                                       |
|    Enter Email: [___________________]                 |
|                                                       |
|    [ Send Me a Magic Link ]                           |
|    (User clicks link in email -> Automatically in)    |
+-------------------------------------------------------+
```

#### Screen 3: The Fork in the Road (Onboarding)
*Design Goal: The illiterate-friendly choice. Visual Cards.*

```text
+-------------------------------------------------------+
|  Who are you? (Tap one)                               |
|                                                       |
|  +-----------------------------------------------+    |
|  |  [ LARGE ICON: GRADUATION CAP / STUDENT ]     |    |
|  |                                               |    |
|  |  Find a Job / Learn Skills                    |    |
|  |  (Blue Background)                            |    |
|  +-----------------------------------------------+    |
|                                                       |
|          ------------- OR --------------              |
|                                                       |
|  +-----------------------------------------------+    |
|  |  [ LARGE ICON: BRIEFCASE / SHOP ]             |    |
|  |                                               |    |
|  |  Grow My Business                             |    |
|  |  (Green Background)                           |    |
|  +-----------------------------------------------+    |
+-------------------------------------------------------+
```

---

### PART B: TECHNICAL EXECUTION PLAN (Phase 1)

Since you are using **Turborepo** (`apps/web`) and **Supabase**, here is the code roadmap.

#### Step 1: Prepare the Supabase Database (SQL)
Go to your Supabase SQL Editor and run this. It is minimal. We connect the `profiles` table automatically to the auth user.

```sql
-- 1. Create a table for public profiles
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  mode text check (mode in ('CAREER', 'BUSINESS')),
  created_at timestamptz default now(),
  primary key (id)
);

-- 2. Enable Row Level Security (Safety First)
alter table public.profiles enable row level security;

-- 3. Allow users to read their own data
create policy "Users can view own profile" 
on profiles for select 
using ( auth.uid() = id );

-- 4. Allow users to update their own data
create policy "Users can update own profile" 
on profiles for update 
using ( auth.uid() = id );

-- 5. Auto-create profile when a user signs up (Trigger)
create function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

#### Step 2: Install Dependencies (in `apps/web`)

```bash
cd apps/web
npm install @supabase/auth-helpers-nextjs @supabase/supabase-js lucide-react
```

*   `lucide-react`: The standard icon set (clean, simple, lightweight).

#### Step 3: Define the Visual Language (`globals.css`)
To achieve simplicity, we restrict the font size and styling to be "chunky".

*Add this to your `apps/web/app/globals.css`:*
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  /* Set base font size larger for readability */
  html {
    font-size: 18px; 
  }
  
  /* Touch targets must be big on mobile */
  button {
    min-height: 55px; 
    border-radius: 12px;
  }
}
```

#### Step 4: Build The Components (The File Structure)

In `apps/web/app/`, we will create these exact pages:

**1. The "Start" Page** (`apps/web/app/page.tsx`)
```tsx
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 text-center">
      {/* 1. Brand */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tighter">FUTURE PROOFER</h1>
        <p className="mt-4 text-xl text-gray-600">Your Path to Success</p>
      </div>

      {/* 2. The Big Action */}
      <Link href="/login" className="w-full max-w-sm">
        <button className="flex w-full items-center justify-center gap-3 bg-black text-white text-xl font-medium py-6 rounded-2xl shadow-lg active:scale-95 transition-transform">
          Start Here <ArrowRight size={24} />
        </button>
      </Link>
      
      {/* 3. Login link for existing */}
      <Link href="/login" className="mt-8 text-gray-500 underline text-lg">
        Already a member?
      </Link>
    </div>
  );
}
```

**2. The Onboarding Page** (`apps/web/app/onboarding/page.tsx`)
This page handles saving the user's "Mode" to Supabase.

```tsx
'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { GraduationCap, Store } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const selectMode = async (mode: 'CAREER' | 'BUSINESS') => {
    // 1. Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // 2. Update their profile in Supabase
      const { error } = await supabase
        .from('profiles')
        .update({ mode: mode })
        .eq('id', user.id);

      if (!error) {
        // 3. Route to dashboard
        router.push('/dashboard');
      }
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4 gap-6">
      <h2 className="text-2xl font-bold mb-4">Choose your goal:</h2>

      {/* OPTION A: CAREER */}
      <button 
        onClick={() => selectMode('CAREER')}
        className="w-full max-w-sm h-48 bg-blue-50 border-2 border-blue-200 rounded-3xl flex flex-col items-center justify-center gap-4 active:bg-blue-100 transition-colors"
      >
        <div className="p-4 bg-blue-500 rounded-full text-white">
          <GraduationCap size={48} />
        </div>
        <span className="text-xl font-bold text-blue-900">Find a Job</span>
      </button>

      {/* OPTION B: BUSINESS */}
      <button 
        onClick={() => selectMode('BUSINESS')}
        className="w-full max-w-sm h-48 bg-green-50 border-2 border-green-200 rounded-3xl flex flex-col items-center justify-center gap-4 active:bg-green-100 transition-colors"
      >
        <div className="p-4 bg-green-600 rounded-full text-white">
          <Store size={48} />
        </div>
        <span className="text-xl font-bold text-green-900">Grow Business</span>
      </button>
    </div>
  );
}
```

### Action Items to Start:

1.  **Run the SQL code** in your Supabase dashboard to create the tables.
2.  **Paste the `page.tsx` code** above into your `apps/web/app` folder.
3.  **Run `npm run dev`**.

This gets you the core "Start -> Choice" mechanism without any design clutter. Does this meet your definition of "simple"?