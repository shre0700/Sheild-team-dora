import React from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ShieldCheck,
  HeartPulse,
  Landmark,
  ExternalLink,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';

const Benefits: React.FC = () => {
  const navigate = useNavigate();

  const schemes = [
    {
      icon: Landmark,
      title: 'e-Shram Registration & Social Security',
      description:
        'A national database for unorganised and gig workers providing a Universal Account Number (UAN) and access to welfare schemes.',
      benefits: [
        'Universal Account Number (UAN)',
        'Eligibility for central welfare schemes',
        'Insurance & ration portability',
        'Integration with PMJAY and pensions',
      ],
      link: 'https://eshram.gov.in',
    },
    {
      icon: HeartPulse,
      title: 'Ayushman Bharat (PMJAY)',
      description:
        'Health insurance coverage announced for gig workers under Union Budget 2025–26.',
      benefits: [
        '₹5 lakh health cover per family',
        'Covers pre-existing conditions',
        'Cashless treatment',
        'Available via e-Shram registration',
      ],
      link: 'https://pmjay.gov.in',
    },
    {
      icon: ShieldCheck,
      title: 'State-Level Gig Worker Welfare Laws',
      description:
        'States like Rajasthan and Karnataka have introduced dedicated welfare laws for platform workers.',
      benefits: [
        'Accident & health insurance',
        'Maternity & pension benefits',
        'Welfare boards & grievance redressal',
        'EPF / ESIC in select states',
      ],
      link: '',
    },
    {
      icon: ShieldCheck,
      title: 'Other Central Welfare Schemes',
      description:
        'Gig workers registered under e-Shram can access multiple existing social security schemes.',
      benefits: [
        'PMJJBY – ₹2 lakh life insurance',
        'PMSBY – accidental insurance',
        'One Nation One Ration Card',
        'Housing & pension schemes',
      ],
      link: 'https://labour.gov.in',
    },
    {
      icon: ShieldCheck,
      title: 'Loans & Monetary Benefits for Verified Gig Workers',
      description:
        'Verified gig workers can access low-interest loans, financial assistance, and monetary incentives to grow their work and manage expenses.',
      benefits: [
        'Low-interest personal & business loans',
        'Access to emergency funds',
        'Government-backed subsidies for gig work',
        'Priority financial schemes for verified workers',
      ],
      link: '', 
      fullWidth: true,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Benefits | Gig Worker Portal</title>
        <meta
          name="description"
          content="Government of India benefits and welfare schemes for gig and platform workers"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header title="Benefits" showBack />

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          <div className="space-y-10">
            {/* Intro */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-semibold text-foreground">
                Government Benefits for Gig Workers
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                The Government of India provides social security, healthcare,
                insurance, and welfare benefits for registered gig and platform
                workers.
              </p>
            </div>

            {/* Scheme Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {schemes.map((scheme, index) => (
                <div
                  key={index}
                  className={`bg-card rounded-2xl shadow-card p-6 space-y-4 ${
                    scheme.fullWidth ? 'md:col-span-2 border-2 border-success' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <scheme.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {scheme.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {scheme.description}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {scheme.benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                        {benefit}
                      </li>
                    ))}
                  </ul>

                  {scheme.link && (
                    <a
                      href={scheme.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      Visit official website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}

                  {/* Apply Now button for Loans & Monetary Benefits */}
                  {scheme.fullWidth && (
                    <div className="mt-4">
                      <Button
                        size="lg"
                        variant="action"
                        className=" bg-green-500"
                        onClick={() => alert('Redirect to loan application page')}
                      >
                        Apply Now
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="bg-card rounded-2xl shadow-card p-6 text-center space-y-4">
              <h3 className="text-lg font-semibold">
                Start accessing these benefits today
              </h3>
              <p className="text-sm text-muted-foreground">
                Register, verify your identity, and unlock government-backed
                security as a gig worker.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="lg"
                  variant="action"
                  onClick={() => navigate('/get-verified')}
                >
                  Get Verified
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/')}
                >
                  Back to Dashboard
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Benefits;
