# devTinder-frontend-mkd 🚀

[![React](https://img.shields.io/badge/React-v19.0-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-v2.2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-v4.0-570DF8?logo=daisyui&logoColor=white)](https://daisyui.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-v11.0-F107A3?logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Axios](https://img.shields.io/badge/Axios-v1.6-5A29E4?logo=axios&logoColor=white)](https://axios-http.com/)

A highly optimized, production-ready frontend client built for the devTinder developer-networking platform. This application features complex physical gestures, real-time feedback loops, precise state synchronization, and a zero-compromise security bouncer architecture. It serves as a stark rejection of tightly-coupled, bloated "spaghetti code" in favor of clean component abstraction, deterministic state flows, and modular design.

---

## 🚀 Live Demo
You can view the live deployment of this project here: [devTinder](http://20.197.61.151/)

## 🧠 My Engineering Philosophy

I believe that **UI is a deterministic reflection of state, and UX is the physics of how that state transitions**. 

When building client-side architectures, my approach is defined by three strict engineering constraints:
1. **Separation of Concerns (SoC)**: Components are dumb visual representations of data. They should never know about HTTP endpoints, storage protocols, or asynchronous network orchestrations. Business logic is strictly encapsulated within custom React hooks.
2. **Performance as a Feature**: Re-renders must be treated as computational expenses. The Virtual DOM must be preserved from unnecessary recalculations by avoiding premature optimizations and utilizing native browser capabilities first.
3. **Defensive UI Security**: Never trust client-side local memory. The frontend's primary role is to guide the user through logical pathways safely, while the backend acts as the immutable anchor of truth. Security boundaries on the client are built to prevent visual anomalies and flickering, while the server enforces actual authority.

---

## 🏗️ Architectural & UX Decisions

### 1. The "Fantastic Four" Security Architecture
To prevent visual flickering, unauthenticated endpoint access, and infinite redirect loops, the application implements a multi-layered client-side bouncer system:

```
                          [ Client Request ]
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
   [ Guest Route ]                                  [ Protected Route ]
 (Redirects if Session Active)                    (Redirects if Session Dead)
         │                                                 │
         └────────────────────────┬────────────────────────┘
                                  ▼
                     [ usePersistentLogin Hook ]
                 (Restores Redux RAM from Cookie on Mount)
                                  │
                                  ▼
                     [ Axios Global Interceptor ]
                 (Instantly Catches 401 & Flushes RAM)
```

- **`GuestRoute`**: A reverse-bouncer that intercepts logged-in users attempting to access public routes (`/login`, `/signup`) and routes them directly to the main dashboard.
- **`ProtectedRoute`**: A bouncer that blocks unauthorized users from hitting private routes (`/feed`, `/connections`, `/profile`), throwing them back to `/login`.
- **`usePersistentLogin`**: A custom hook triggered on the application root. Since browser refreshes wipe out Redux state (RAM), this hook silently queries the server profile endpoint to restore the global session state before resolving the initial route wrapper, eliminating visual layout jumps.
- **Axios Global Interceptor**: In-flight token expiries are captured at the networking edge. If any API request returns a `401 Unauthorized` status, the interceptor immediately clears the Redux store and forces a clean redirect, breaking potential infinite loop traps:

```javascript
// src/utils/axios.js
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            // Immediate state rollback on token expiry
            store.dispatch(removeUser());
            window.location.href = "/user/login"; 
        }
        return Promise.reject(error);
    }
);
```

### 2. High-Performance Tactile Card Stack (Framer Motion)
Implementing a smooth Tinder-style swiping interface requires complex drag physics, angle calculations, and coordinate transformations:

```javascript
// src/components/SwipeableCard.jsx
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";

export default function SwipeableCard({ children, onSwipe, active, zIndex }) {
    const controls = useAnimation();
    const x = useMotionValue(0);
    
    // Physical mapping: Card rotates as it drags horizontally
    const rotate = useTransform(x, [-200, 200], [-30, 30]);
    
    // Dynamic Opacity for Swipe Stamps (ACCEPT / REJECT)
    const acceptOpacity = useTransform(x, [0, 100], [0, 1]);
    const rejectOpacity = useTransform(x, [-100, 0], [1, 0]);

    const handleDragEnd = async (event, info) => {
        const threshold = 120; // Decision Boundary
        if (info.offset.x > threshold) {
            await controls.start({ x: 500, opacity: 0 }); // Exit Right
            onSwipe("interested");
        } else if (info.offset.x < -threshold) {
            await controls.start({ x: -500, opacity: 0 }); // Exit Left
            onSwipe("ignored");
        } else {
            controls.start({ x: 0, opacity: 1 }); // Snap Back
        }
    };
    
    return (
        <motion.div
            style={{ x, rotate }}
            drag={active ? "x" : false}
            onDragEnd={handleDragEnd}
            animate={controls}
            style={{ zIndex }}
            className="absolute cursor-grab active:cursor-grabbing"
        >
            {/* Stamp Overlays */}
            <motion.div style={{ opacity: acceptOpacity }} className="absolute text-success border-success">LIKE</motion.div>
            <motion.div style={{ opacity: rejectOpacity }} className="absolute text-error border-error">PASS</motion.div>
            {children}
        </motion.div>
    );
}
```

### 3. Separation of Concerns via Custom Hooks
Rather than bloating UI files with logic, components consume thin, clean abstractions. The main card stack relies on the `useFeed` custom hook, separating navigation, state dispatch, and pagination:

```javascript
// src/hooks/useFeed.js
export default function useFeed() {
    const dispatch = useDispatch();
    const feedUsers = useSelector((store) => store.feed);
    const [page, setPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [isError, setIsError] = useState(false);

    const fetchNextPage = useCallback(async () => {
        if (isFetching) return;
        setIsFetching(true);
        try {
            const data = await fetchFeedApi(page);
            dispatch(addFeed(data));
            setPage(prev => prev + 1);
        } catch (err) {
            setIsError(true);
        } finally {
            setIsFetching(false);
        }
    }, [page, isFetching]);

    // Threshold trigger: Refill the bucket when only 2 cards are left
    useEffect(() => {
        if (feedUsers.length <= 2) {
            fetchNextPage();
        }
    }, [feedUsers.length]);

    return { feedUsers, isFetching, isError, fetchNextPage };
}
```

### 4. Memory-Optimized State Architecture (Redux Toolkit)
A common architectural flaw in SPA applications is dumping the entire database payload into Redux memory. To optimize memory footprint and minimize the Virtual DOM diffing overhead:
* **Global Session State**: Redux stores only critical, lightweight metadata required by global layouts (e.g., `_id`, `firstName`, `photoUrl` in the Nav Bar).
* **On-Demand Local State**: Rich data structures (such as connection lists, detailed profile fields, and requests received) are fetched and managed on-demand at the component page layer via clean HTTP calls, keeping memory leakage to zero.

### 5. Reusable and Configurable Fields (Inversion of Control)
Instead of hardcoding inputs or copy-pasting code, the form layouts use highly configurable fields. `ChipInput` dynamically maps comma-separated inputs to a type-safe array of chips with built-in validation constraints, enter key support, and duplicate prevention:

```jsx
// src/components/ChipInput.jsx
export default function ChipInput({ watch, setValue, errors, fieldName, maxLimit = 15 }) {
    const currentSkills = watch(fieldName) || [];
    const [chipText, setChipText] = useState("");

    const handleAddChip = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const trimmed = chipText.trim();
            if (trimmed && !currentSkills.includes(trimmed) && currentSkills.length < maxLimit) {
                setValue(fieldName, [...currentSkills, trimmed], { shouldDirty: true });
                setChipText("");
            }
        }
    };

    return (
        <div className="form-control">
            <div className="flex flex-wrap gap-2">
                {currentSkills.map((skill, index) => (
                    <div key={index} className="badge badge-primary gap-1">
                        {skill}
                        <X className="w-3 h-3 cursor-pointer" onClick={() => removeSkill(index)} />
                    </div>
                ))}
            </div>
            <input value={chipText} onKeyDown={handleAddChip} onChange={(e) => setChipText(e.target.value)} />
        </div>
    );
}
```

---

## 🌟 Key Features

* **3D Levitating Live Preview**: A split-screen profile editor where form inputs (Name, Bio, Skills) instantly render onto an animated 3D card wrapper on hover, utilizing spring motion values.
* **Apple/Vercel Style Segmented Controls**: Sliding Nav Bar links utilizing Framer Motion's `layoutId` to animate active background indicators with smooth transition physics.
* **Optimistic UI with State Rollback**: Swipe actions and request approvals trigger instant state removals. If the network call fails, Redux triggers an automatic rollback (`restoreUserToFeed`), sliding the card back onto the stack without disrupting user flow.
* **Frictionless Scroll Containment**: Custom CSS mask gradients applied via `[mask-image:linear-gradient(...)]` dynamically fade out long overflowing skill lists, preventing hard clipping.
* **Global Error Airbag**: Integrated with `react-error-boundary` wrapping the root router. If a catastrophic runtime crash occurs, a fallback glassy `ErrorPage` is loaded with custom session recovery tools.

---

## 🛠️ Tech Stack

* **Build Tooling**: Vite + ESBuild (Zero-config development server)
* **View Layer**: React (Hooks, Context, Composition Patterns)
* **Global State**: Redux Toolkit (RTK) & React-Redux
* **Routing**: React Router DOM (Dynamic nested router layout)
* **Gestures & Animations**: Framer Motion
* **Styling**: Tailwind CSS v4 & DaisyUI (Fully theme-safe utilizing semantic variables)
* **Forms & Validation**: React Hook Form + Zod (RHF Resolver integration)

---

## ⚙️ Setup and Installation

Follow these steps to run the frontend application locally:

### Prerequisites
* Node.js (v26.2.0 or higher recommended)
* Running instances of the devTinder-backend API

### 1. Clone and Install Dependencies
```bash
git clone https://github.com/your-username/devTinder-frontend-mkd.git
cd devTinder-frontend-mkd
npm install
```

### 2. Configure Environment Variables
Create a `.env` file at the root of the project:
```env
VITE_BASE_URL=http://localhost:8080/api/v1
```

### 3. Run the Development Server
To launch Vite on your local machine:
```bash
npm run dev
```

To test the application on a mobile device on the same local network:
```bash
npm run dev -- --host
```

### 4. Build for Production
To generate optimized, minified static files utilizing esbuild console-drop flags:
```bash
npm run build
```
This compile output will be created inside the `dist/` directory, ready to be served by Nginx or uploaded to a global CDN.
