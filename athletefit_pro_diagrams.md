# AthleteFit Pro: AI and IoT Integration in Digital Fitness
## Software Engineering Diagrams

This document contains a complete set of professional software engineering diagrams for the AthleteFit Pro platform. The diagrams are written using Mermaid.js syntax, which is widely supported by Markdown viewers, GitHub, Notion, and academic tools. 

> **Tip for your thesis:** To get high-resolution, white-background images for your report, you can copy the code blocks below and paste them into the [Mermaid Live Editor](https://mermaid.live). From there, you can export them as high-quality PNGs or SVGs.

---

### 1. Use Case Diagram
Illustrates the interactions between the main actors and the system's core functionalities.

```mermaid
%%{init: {'theme': 'default'}}%%
flowchart LR
    %% Actors
    Athlete([Athlete / Fitness User])
    Coach([Coach / Trainer])
    Admin([Administrator])
    API([Wearable Device APIs])

    %% System Boundary
    subgraph AthleteFit Pro System
        direction TB
        UC1((User Registration & Login))
        UC2((Profile Management))
        UC3((Set Fitness Goals))
        UC4((Connect Wearable Devices))
        UC5((Sync Health Data))
        UC6((Receive AI Recommendations))
        UC7((Log Workouts))
        UC8((View Progress Analytics))
        UC9((Messaging))
        UC10((Assign Workouts))
        UC11((Monitor Athlete Progress))
        UC12((User Management))
        UC13((System Analytics Reports))
    end

    %% Athlete Relationships
    Athlete --- UC1
    Athlete --- UC2
    Athlete --- UC3
    Athlete --- UC4
    Athlete --- UC5
    Athlete --- UC6
    Athlete --- UC7
    Athlete --- UC8
    Athlete --- UC9
    
    %% Coach Relationships
    Coach --- UC1
    Coach --- UC2
    Coach --- UC9
    Coach --- UC10
    Coach --- UC11
    
    %% Admin Relationships
    Admin --- UC1
    Admin --- UC12
    Admin --- UC13

    %% API Relationships
    API --- UC5
```

---

### 2. Data Flow Diagram (DFD)

#### Level 0: Context Diagram
Shows the system as a single high-level process interacting with external entities.

```mermaid
%%{init: {'theme': 'default'}}%%
flowchart TD
    Athlete[Athlete / Fitness User]
    Coach[Coach / Trainer]
    Admin[Administrator]
    Wearable[Wearable Device APIs]
    Sys((0.0\nAthleteFit Pro\nSystem))

    Athlete -- "Profile Data, Goals,\nWorkout Logs" --> Sys
    Sys -- "AI Workout Plans,\nProgress Reports" --> Athlete
    
    Coach -- "Workout Assignments,\nFeedback" --> Sys
    Sys -- "Athlete Progress,\nNotifications" --> Coach
    
    Wearable -- "Heart Rate, Steps,\nCalories, Sleep Data" --> Sys
    
    Admin -- "Configuration,\nManagement Queries" --> Sys
    Sys -- "System Analytics,\nReports" --> Admin
    
    Athlete <--> |"Messages"| Sys
    Coach <--> |"Messages"| Sys
```

#### Level 1: System Processes
Breaks down the context diagram into main sub-processes.

```mermaid
%%{init: {'theme': 'default'}}%%
flowchart TD
    Athlete[Athlete/User]
    Coach[Coach/Trainer]
    Wearable[Wearable Device APIs]
    
    subgraph System Processes
        P1((1.0\nManage Profiles\n& Goals))
        P2((2.0\nProcess\nWearable Data))
        P3((3.0\nGenerate AI\nRecommendations))
        P4((4.0\nManage Workouts\n& Logs))
        P5((5.0\nCommunication\nModule))
    end
    
    DB[(Supabase\nDatabase)]
    
    Athlete -- "Registration Info, Goals" --> P1
    P1 -- "User Profiles" --> DB
    
    Wearable -- "Health API Payload" --> P2
    P2 -- "Formatted Device Data" --> DB
    
    DB -- "Profile, Device Data,\nExercise DB" --> P3
    P3 -- "Generated Plan" --> DB
    P3 -- "Personalized Workout" --> Athlete
    
    Coach -- "Assigned Workout" --> P4
    Athlete -- "Completed Workout Log" --> P4
    P4 -- "Workout Records" --> DB
    
    Athlete -- "Chat Messages" --> P5
    Coach -- "Chat Messages" --> P5
    P5 -- "Message History" --> DB
```

---

### 3. Entity Relationship Diagram (ERD)
Details the database schema and relationships between core entities.

```mermaid
%%{init: {'theme': 'default'}}%%
erDiagram
    USERS ||--o{ GOALS : "has"
    USERS ||--o{ WORKOUTLOGS : "has"
    USERS ||--o{ DEVICEDATA : "generates"
    USERS ||--o{ MESSAGES : "sends/receives"
    COACHES ||--o{ MESSAGES : "sends/receives"
    COACHES ||--o{ WORKOUTS : "assigns"
    USERS ||--o{ WORKOUTS : "assigned to"
    WORKOUTS ||--|{ EXERCISES : "contains"
    USERS ||--o{ NOTIFICATIONS : "receives"

    USERS {
        uuid id PK
        string full_name
        string email
        string role "Athlete/Coach/Admin"
        datetime created_at
    }
    COACHES {
        uuid id PK
        uuid user_id FK
        string specialization
        string certification
    }
    GOALS {
        uuid id PK
        uuid user_id FK
        string goal_type
        date target_date
        string status
    }
    WORKOUTS {
        uuid id PK
        uuid assigned_by FK "coach_id, nullable"
        uuid assigned_to FK "user_id"
        string title
        datetime scheduled_for
        boolean is_ai_generated
    }
    EXERCISES {
        uuid id PK
        uuid workout_id FK
        string name
        int sets
        int reps
        float weight_kg
        int duration_seconds
    }
    WORKOUTLOGS {
        uuid id PK
        uuid user_id FK
        uuid workout_id FK
        datetime completed_at
        text feedback_notes
    }
    DEVICEDATA {
        uuid id PK
        uuid user_id FK
        string source_api
        string metric_type "HR, Steps, Sleep"
        float value
        datetime timestamp
    }
    MESSAGES {
        uuid id PK
        uuid sender_id FK
        uuid receiver_id FK
        text content
        datetime sent_at
    }
    NOTIFICATIONS {
        uuid id PK
        uuid user_id FK
        string content
        boolean is_read
        datetime created_at
    }
```

---

### 4. Class Diagram
Represents the static structure of the application's domain model.

```mermaid
%%{init: {'theme': 'default'}}%%
classDiagram
    class User {
        +UUID id
        +String name
        +String email
        +String role
        +register()
        +login()
        +updateProfile()
    }
    class Athlete {
        +Float weight
        +Float height
        +setGoal(Goal)
        +logWorkout(WorkoutLog)
        +syncDeviceData()
    }
    class Coach {
        +String specialization
        +assignWorkout(Athlete, Workout)
        +monitorProgress(Athlete)
    }
    class Goal {
        +String type
        +Date targetDate
        +updateStatus()
    }
    class Workout {
        +String title
        +Boolean isAIGenerated
        +addExercise(Exercise)
        +removeExercise(Exercise)
    }
    class Exercise {
        +String name
        +Int sets
        +Int reps
        +Float weight
    }
    class AIRecommendationEngine {
        +generatePlan(UserData): Workout
        +analyzeProgress(Logs): Analytics
    }
    class WearableManager {
        +fetchAppleHealthData()
        +fetchFitbitData()
        +syncToDatabase()
    }
    
    User <|-- Athlete
    User <|-- Coach
    Athlete "1" *-- "*" Goal
    Workout "1" *-- "*" Exercise
    Coach "1" -- "*" Workout : creates >
    Athlete "1" -- "*" Workout : assigned to >
    Athlete "1" -- "1" WearableManager : utilizes >
    AIRecommendationEngine ..> Workout : generates
    AIRecommendationEngine ..> Athlete : analyzes
```

---

### 5. Sequence Diagram: Generate Personalized Workout Plan
Shows the step-by-step object interactions required for AI workout generation.

```mermaid
%%{init: {'theme': 'default'}}%%
sequenceDiagram
    autonumber
    actor User as Athlete
    participant App as Mobile App
    participant API as Express.js API
    participant AI as Python AI Engine
    participant ExDB as ExerciseDB API
    participant DB as Supabase DB
    
    User->>App: Set Fitness Goals
    App->>API: POST /api/goals
    API->>DB: Save Goal
    User->>App: Request Workout Plan
    App->>API: GET /api/workouts/generate
    
    API->>DB: Fetch User Profile & Goals
    DB-->>API: UserData
    API->>DB: Fetch Recent DeviceData & Logs
    DB-->>API: HealthMetrics & PastLogs
    
    API->>AI: POST /generate_plan (UserData, Metrics)
    activate AI
    AI->>AI: Analyze Data & Goals
    AI->>ExDB: GET /exercises (Target Muscles)
    ExDB-->>AI: Exercise List & Details
    AI->>AI: Compose Optimal Routine
    AI-->>API: WorkoutPlan JSON
    deactivate AI
    
    API->>DB: Insert Workout & Exercises
    DB-->>API: Success (Workout IDs)
    
    API-->>App: Return 200 OK (Workout Details)
    App-->>User: Display Personalized Plan
```

---

### 6. System Architecture Diagram
Illustrates the layered architecture and technology stack.

```mermaid
%%{init: {'theme': 'default'}}%%
flowchart TD
    subgraph Presentation Layer
        MA[Mobile App<br/><i>React Native + TS</i>]
        WP[Web Portal<br/><i>Next.js + TS</i>]
    end

    subgraph API Layer
        NodeServer[Node.js / Express.js Server]
        Auth[JWT Authentication]
        Routers[API Route Handlers]
        NodeServer --- Auth --- Routers
    end

    subgraph AI Layer
        PyServer[Python Engine<br/><i>FastAPI / Flask</i>]
        RecLogic[AI Recommendation Logic]
        PyServer --- RecLogic
    end

    subgraph Database Layer
        SB[(Supabase PostgreSQL)]
    end

    subgraph External Services Layer
        FIT[Fitbit API]
        HK[Apple HealthKit]
        HC[Android Health Connect]
        EDB[ExerciseDB API]
    end

    %% Connections
    MA <-->|REST / HTTP| NodeServer
    WP <-->|REST / HTTP| NodeServer
    
    NodeServer <-->|Internal API / HTTP| PyServer
    NodeServer <-->|PostgREST| SB
    PyServer <-->|SQL / PostgREST| SB
    
    MA <-->|Native SDK| HK
    MA <-->|Native SDK| HC
    NodeServer <-->|OAuth 2.0| FIT
    PyServer <-->|HTTP GET| EDB
```

---

### 7. Activity Diagram: Workout Recommendation Process
Maps the logical flow of generating a workout.

```mermaid
%%{init: {'theme': 'default'}}%%
stateDiagram-v2
    [*] --> CollectUserData
    CollectUserData --> FetchDeviceData : Load Profile & Goals
    FetchDeviceData --> FetchHistory : Sync Wearable Metrics
    FetchHistory --> AnalyzeData : Retrieve Past Workouts
    
    state AnalyzeData {
        [*] --> CheckCurrentFitness
        CheckCurrentFitness --> IdentifyWeaknesses
        IdentifyWeaknesses --> DetermineOptimalLoad
        DetermineOptimalLoad --> [*]
    }
    
    AnalyzeData --> FetchExercises
    FetchExercises --> FilterByEquipment
    FilterByEquipment --> GeneratePlan
    
    state GeneratePlan {
        [*] --> SelectWarmup
        SelectWarmup --> SelectMainExercises
        SelectMainExercises --> SelectCooldown
        SelectCooldown --> [*]
    }
    
    GeneratePlan --> SaveToDB
    SaveToDB --> NotifyUser
    NotifyUser --> [*]
```

---

### 8. Deployment Diagram
Shows the physical deployment of system components across infrastructure.

```mermaid
%%{init: {'theme': 'default'}}%%
flowchart TD
    subgraph Client Devices
        Mob[Athlete Smartphone<br/>iOS / Android]
        PC[Coach PC / Laptop<br/>Web Browser]
    end

    subgraph Cloud Infrastructure Hosting
        Vercel[Vercel Edge Network<br/>Hosting Next.js Web Portal]
        ECS_Node[Container / Server<br/>Node.js API Server]
        ECS_Py[Container / Server<br/>Python AI Engine]
    end

    subgraph Supabase Platform
        SAuth[Supabase Auth]
        SDB[(Supabase PostgreSQL)]
        SStorage[Supabase Storage]
    end

    subgraph External Cloud APIs
        FitCloud[Fitbit Cloud]
        ExDB[ExerciseDB]
    end

    Mob -- HTTPS --> ECS_Node
    PC -- HTTPS --> Vercel
    Vercel -- HTTPS --> ECS_Node
    
    ECS_Node -- Internal RPC / HTTP --> ECS_Py
    ECS_Node -- HTTPS --> SAuth
    ECS_Node -- TCP/IP 5432 --> SDB
    ECS_Node -- HTTPS --> SStorage
    
    ECS_Py -- TCP/IP 5432 --> SDB
    ECS_Py -- HTTPS --> ExDB
    
    ECS_Node -- HTTPS --> FitCloud
```
