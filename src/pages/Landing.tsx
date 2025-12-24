import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Kanban, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight, 
  Check,
  Sparkles,
  Clock,
  Target,
  BarChart3
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Landing = () => {
  const features = [
    {
      icon: Kanban,
      title: 'Intuitive Kanban Boards',
      description: 'Drag and drop tasks across customizable columns. Visualize your workflow at a glance.'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Invite team members, assign tasks, and track progress together in real-time.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built for speed. No lag, no waiting. Your productivity deserves instant response.'
    },
    {
      icon: Shield,
      title: 'Role-Based Access',
      description: 'Owners, admins, members, viewers — everyone gets the right level of control.'
    },
    {
      icon: Clock,
      title: 'Due Date Tracking',
      description: 'Never miss a deadline. Visual indicators for overdue and upcoming tasks.'
    },
    {
      icon: Target,
      title: 'Priority Management',
      description: 'Flag tasks by priority. Focus on what matters most to your team.'
    }
  ];

  const pricingPlans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for personal projects',
      features: [
        'Up to 3 projects',
        '1 team member',
        'Basic Kanban boards',
        'Task management',
        'Mobile responsive'
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Pro',
      price: '$12',
      period: 'per month',
      description: 'For growing teams',
      features: [
        'Unlimited projects',
        'Up to 10 team members',
        'Advanced filters',
        'Priority support',
        'Custom fields',
        'Timeline view'
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact us',
      description: 'For large organizations',
      features: [
        'Unlimited everything',
        'SSO & SAML',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantee'
      ],
      cta: 'Contact Sales',
      popular: false
    }
  ];

  const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '50K+', label: 'Tasks Completed' },
    { value: '99.9%', label: 'Uptime' },
    { value: '4.9★', label: 'User Rating' }
  ];

  return (
    <>
      <Helmet>
        <title>TaskBoard - Modern Kanban Task Management</title>
        <meta name="description" content="TaskBoard is a GitHub Projects-style Kanban task manager. Organize your work with drag-and-drop boards, team collaboration, and powerful filtering." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-semibold tracking-tight">TaskBoard</span>
              </div>
              <div className="hidden md:flex items-center gap-8">
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
                <a href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
                <a href="#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/auth">
                  <Button variant="ghost" size="sm">Log in</Button>
                </Link>
                <Link to="/auth?mode=signup">
                  <Button size="sm" className="gap-2">
                    Get Started <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                Now with AI-powered task suggestions
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-br from-foreground via-foreground to-muted-foreground bg-clip-text">
                Organize work.
                <br />
                <span className="text-primary">Ship faster.</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                The Kanban board that gets out of your way. Drag, drop, and done. 
                Built for teams who value simplicity and speed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth?mode=signup">
                  <Button size="lg" className="w-full sm:w-auto gap-2 text-base px-8">
                    Start for free <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/board">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto text-base px-8">
                    View Demo
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Hero Image / Board Preview */}
            <motion.div 
              className="mt-16 relative"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10 pointer-events-none" />
              <div className="rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm shadow-2xl overflow-hidden">
                <div className="bg-muted/30 border-b border-border/40 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">TaskBoard — My Project</span>
                </div>
                <div className="p-6 grid grid-cols-4 gap-4 min-h-[300px]">
                  {['Backlog', 'Ready', 'In Progress', 'Completed'].map((col, i) => (
                    <div key={col} className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">{col}</span>
                        <Badge variant="secondary" className="text-xs">{3 - i}</Badge>
                      </div>
                      {Array.from({ length: 3 - i }).map((_, j) => (
                        <div 
                          key={j} 
                          className="p-3 rounded-lg border border-border/60 bg-background/80 hover:border-border transition-colors"
                        >
                          <div className="h-3 w-3/4 bg-muted rounded mb-2" />
                          <div className="h-2 w-1/2 bg-muted/60 rounded" />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border/40 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-3xl sm:text-4xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Features</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Everything you need to stay organized
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Powerful features wrapped in a simple interface. No bloat, no complexity.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {features.map((feature, i) => (
                <motion.div key={feature.title} variants={fadeInUp}>
                  <Card className="h-full border-border/60 bg-card/50 hover:bg-card/80 transition-colors group">
                    <CardHeader>
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="w-5 h-5 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Pricing</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Start free, upgrade when you're ready. No hidden fees, no surprises.
              </p>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {pricingPlans.map((plan) => (
                <motion.div key={plan.name} variants={fadeInUp}>
                  <Card className={`h-full relative ${plan.popular ? 'border-primary shadow-lg shadow-primary/10' : 'border-border/60'}`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
                      </div>
                    )}
                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      <div className="mt-4">
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground ml-2">/{plan.period}</span>
                      </div>
                      <CardDescription className="mt-2">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-3 text-sm">
                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/auth?mode=signup" className="block">
                        <Button 
                          className="w-full" 
                          variant={plan.popular ? 'default' : 'outline'}
                        >
                          {plan.cta}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Badge variant="outline" className="mb-4">Testimonials</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Loved by teams everywhere
              </h2>
            </motion.div>

            <motion.div 
              className="grid md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
            >
              {[
                {
                  quote: "Finally, a Kanban tool that doesn't get in the way. Clean, fast, and exactly what we needed.",
                  author: "Sarah Chen",
                  role: "Engineering Lead at Acme"
                },
                {
                  quote: "We switched from a bloated PM tool and never looked back. TaskBoard is refreshingly simple.",
                  author: "Marcus Johnson",
                  role: "Founder, StartupXYZ"
                },
                {
                  quote: "The drag-and-drop is buttery smooth. My team actually enjoys using it, which says a lot.",
                  author: "Emily Rodriguez",
                  role: "Product Manager"
                }
              ].map((testimonial, i) => (
                <motion.div key={i} variants={fadeInUp}>
                  <Card className="h-full border-border/60 bg-card/50">
                    <CardContent className="pt-6">
                      <p className="text-muted-foreground mb-6">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                          <span className="text-sm font-medium">{testimonial.author.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{testimonial.author}</div>
                          <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                Ready to organize your work?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of teams who use TaskBoard to ship faster. Start free, no credit card required.
              </p>
              <Link to="/auth?mode=signup">
                <Button size="lg" className="gap-2 text-base px-8">
                  Get started for free <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                  <Kanban className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">TaskBoard</span>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
                <a href="#" className="hover:text-foreground transition-colors">Terms</a>
                <a href="#" className="hover:text-foreground transition-colors">Contact</a>
              </div>
              <div className="text-sm text-muted-foreground">
                © 2024 TaskBoard. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Landing;
