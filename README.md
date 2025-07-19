# AI-Powered Affiliate Marketing Management Platform

A production-grade, scalable onboarding UI and backend API for an AI-powered affiliate marketing management platform MVP.

## 🚀 Features

### Authentication System
- **Supabase Auth integration** with email/password authentication
- **Protected routes** - only authenticated users can access onboarding
- **Automatic login** after successful signup
- **Session management** with automatic token handling
- **Form validation** with clear error messages and loading states

### Onboarding System
- **Multi-step form wizard** with 7 comprehensive steps
- **Real-time validation** using Zod schemas
- **Progress tracking** with visual indicators
- **Responsive design** for all devices
- **Accessibility compliant** components
- **User-specific data** - form responses linked to authenticated users

### Form Steps
1. **Company Information** - Basic company details and industry
2. **Budget & Contract** - Budget, payment terms, and commission rates
3. **Target Audience** - Demographics, geography, and product details
4. **Creative & Copy** - AI-generated content or upload existing creatives
5. **Fraud & Security** - Fraud detection and affiliate approval settings
6. **Notifications & Reporting** - Email alerts and dashboard preferences
7. **Review & Submit** - Final review and submission

### Technical Stack
- **Frontend**: React 19, TypeScript, TailwindCSS
- **Backend**: Next.js 15 API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Form Handling**: Formik + Zod validation
- **State Management**: React Context + Zustand
- **UI Components**: Custom components with shadcn/ui patterns

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- PostgreSQL 12+
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd a_is_for_ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   # Database Configuration
   DATABASE_URL="postgresql://username:password@localhost:5432/affiliate_platform"
   NEXTAUTH_SECRET="your-secret-key"
   
   # Supabase Configuration (Required for authentication and API functionality)
   NEXT_PUBLIC_SUPABASE_URL="https://your-project-id.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
   SUPABASE_URL="https://your-project-id.supabase.co"
   SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
   ```
   
   **Getting Supabase Credentials:**
   1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
   2. Create a new project or select existing one
   3. Go to Settings → API
   4. Copy the "Project URL" as `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_URL`
   5. Copy the "anon" key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   6. Copy the "service_role" key as `SUPABASE_SERVICE_ROLE_KEY`

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   
   # (Optional) Seed the database
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) - you'll be redirected to the signup page

**Note:** If Supabase is not configured, the API will still work in development mode but will skip database inserts and show a warning. For production, Supabase configuration is required.

## 🏗️ Project Structure

```
├── app/
│   ├── api/onboarding/submit/route.ts  # API endpoint
│   ├── signup/page.tsx                 # Signup page
│   ├── signin/page.tsx                 # Signin page
│   ├── onboarding/page.tsx             # Onboarding page (protected)
│   └── layout.js                       # Root layout
├── components/
│   ├── ui/                             # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── select.tsx
│   ├── auth/                           # Authentication components
│   │   ├── signup-form.tsx             # Signup form
│   │   ├── signin-form.tsx             # Signin form
│   │   └── protected-route.tsx         # Route protection
│   └── onboarding-form/                # Onboarding form components
│       ├── onboarding-form.tsx         # Main form component
│       ├── onboarding-progress.tsx     # Progress indicator
│       └── steps/                      # Individual step components
│           ├── company-info-step.tsx
│           ├── budget-preferences-step.tsx
│           ├── target-audience-step.tsx
│           ├── creative-preferences-step.tsx
│           ├── fraud-risk-step.tsx
│           ├── notification-preferences-step.tsx
│           └── review-step.tsx
├── types/
│   └── onboarding.ts                   # TypeScript types and schemas
├── utils/
│   ├── cn.ts                           # CSS class utilities
│   ├── onboarding-steps.ts             # Step configuration
│   ├── validation.ts                   # Validation utilities
│   ├── supabase-client.ts              # Supabase client configuration
│   ├── supabase-admin.ts               # Supabase admin configuration
│   └── use-auth.ts                     # Authentication hook
├── prisma/
│   └── schema.prisma                   # Database schema
└── package.json
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode

# Database
npx prisma generate      # Generate Prisma client
npx prisma db push       # Push schema to database
npx prisma studio        # Open Prisma Studio
```

### Code Style Guidelines

- **Functional components** with hooks
- **TypeScript strict mode** enabled
- **Zod schemas** for validation
- **TailwindCSS** for styling
- **Conventional commits** for version control
- **ESLint** for code quality

### Component Patterns

```typescript
// Example component structure
interface ComponentProps {
  // Props interface
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // Component logic
  return (
    // JSX with proper accessibility
  );
}
```

## 🧪 Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project" and import your repository
   - Vercel will auto-detect Next.js configuration

2. **Configure Environment Variables**
   In Vercel dashboard → Settings → Environment Variables:
   ```env
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   DATABASE_URL=your-database-url (optional)
   NEXTAUTH_SECRET=your-secret-key (optional)
   ```

3. **Deploy**
   - Push to your main branch to trigger automatic deployment
   - Or manually deploy from Vercel dashboard

### Manual Production Build
```bash
npm run build
npm start
```

### Environment Variables for Production
- Set `NODE_ENV=production`
- Configure production database URL
- Set up proper secrets and API keys
- Enable HTTPS
- Configure CDN for static assets

### Database Migration
```bash
npx prisma migrate deploy
```

## 📊 API Documentation

### POST /api/onboarding/submit

Submit onboarding form data.

**Request Body:**
```typescript
{
  companyInfo: {
    companyName: string;
    industry: string;
    website: string;
    companySize: string;
    description: string;
  };
  budgetPreferences: {
    monthlyBudget: number;
    contractDuration: string;
    paymentTerms: string;
    commissionRate: number;
    payoutFrequency: string;
  };
  // ... other form sections
}
```

**Response:**
```typescript
{
  success: boolean;
  data?: {
    onboardingId: string;
    status: 'pending' | 'approved' | 'rejected';
    nextSteps: string[];
  };
  error?: {
    message: string;
    code: string;
    details?: ValidationError[];
  };
}
```

## 🔒 Security Features

- **Input validation** with Zod schemas
- **CSRF protection** (to be implemented)
- **Rate limiting** (to be implemented)
- **SQL injection prevention** via Prisma
- **XSS protection** with input sanitization
- **HTTPS enforcement** in production

## 🎯 Future Enhancements

### AI Features
- **AI-powered affiliate matching** engine
- **Autonomous campaign optimization** agent
- **GPT-based copywriting** agent
- **Real-time performance** dashboards
- **Automated fraud detection** module
- **AI-generated summaries** for clients

### Platform Features
- **User authentication** and authorization
- **Campaign management** dashboard
- **Affiliate portal** and tracking
- **Payment processing** integration
- **Analytics and reporting** tools
- **Mobile app** development

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Changelog

### v0.1.0 (Current)
- Initial onboarding system implementation
- Multi-step form with validation
- Database schema and API endpoints
- Responsive UI components
- TypeScript type safety
