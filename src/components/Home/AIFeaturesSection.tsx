import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import {
  Brain,
  Search,
  BarChart3,
  Zap,
  Target,
  Bot,
  LucideIcon
} from 'lucide-react';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const AIFeaturesGridContainer = styled(Grid)(() => ({
  marginBottom: 32,
}));

const FeatureCard = styled(Card)<{ index: number }>(({ index }) => ({
  borderRadius: 16,
  background: '#ffffff',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  height: '100%',
  animation: `${fadeInUp} 0.6s ease-out forwards`,
  animationDelay: `${index * 0.1}s`,
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
  },
}));

const FeatureCardContent = styled(CardContent)(() => ({
  padding: 24,
  position: 'relative',
  zIndex: 2,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const FeatureIcon = styled(Box)<{ bgColor: string }>(({ bgColor }) => ({
  width: 64,
  height: 64,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: bgColor,
  marginBottom: 20,
  animation: `${scaleIn} 0.5s ease-out 0.2s both`,
}));

const FeatureTitle = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 600,
  color: '#111827',
  marginBottom: 12,
});

const FeatureDescription = styled(Typography)({
  color: '#6b7280',
  fontSize: '0.95rem',
  lineHeight: 1.6,
  marginBottom: 16,
  flex: 1,
});

const FeatureTags = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
});

const FeatureChip = styled(Chip)({
  backgroundColor: '#f3f4f6',
  color: '#374151',
  fontSize: '0.75rem',
  fontWeight: 500,
  height: 28,
  '&:hover': {
    backgroundColor: '#e5e7eb',
  },
});

const SectionTitle = styled(Typography)({
  fontSize: '1.75rem',
  fontWeight: 700,
  color: '#111827',
  marginBottom: 8,
  textAlign: 'center',
});

const SectionSubtitle = styled(Typography)({
  fontSize: '1rem',
  color: '#6b7280',
  marginBottom: 32,
  textAlign: 'center',
  maxWidth: 600,
  margin: '0 auto 32px auto',
});

interface AIFeature {
  icon: LucideIcon;
  title: string;
  description: string;
  tags: string[];
  iconBg: string;
  iconColor: string;
}

interface AIFeaturesSectionProps {
  features?: AIFeature[];
}

const AIFeaturesSection: React.FC<AIFeaturesSectionProps> = ({
  features = [
    {
      icon: Brain,
      title: 'AI-Powered SEO Analysis',
      description: 'Our advanced AI algorithms analyze your website comprehensively, identifying SEO opportunities and providing actionable recommendations to improve your search rankings.',
      tags: ['SEO', 'AI Analysis', 'Rankings'],
      iconBg: '#ecfdf5',
      iconColor: '#10b981',
    },
    {
      icon: Search,
      title: 'Smart Keyword Research',
      description: 'Discover high-value keywords with our AI-driven research tools that analyze search intent, competition, and trending topics to optimize your content strategy.',
      tags: ['Keywords', 'Research', 'Content'],
      iconBg: '#fef3c7',
      iconColor: '#f59e0b',
    },
    {
      icon: BarChart3,
      title: 'Performance Insights',
      description: 'Get deep insights into your website performance with AI-generated reports that highlight trends, anomalies, and optimization opportunities.',
      tags: ['Analytics', 'Reports', 'Insights'],
      iconBg: '#e0f2fe',
      iconColor: '#0284c7',
    },
    {
      icon: Target,
      title: 'Competitor Analysis',
      description: 'AI-powered competitor analysis helps you understand your market position and identify strategies to outperform your competition.',
      tags: ['Competitors', 'Strategy', 'Market'],
      iconBg: '#f3e8ff',
      iconColor: '#8b5cf6',
    },
    {
      icon: Zap,
      title: 'Automated Optimization',
      description: 'Let our AI automatically optimize your website elements, from meta tags to content structure, ensuring peak performance across all devices.',
      tags: ['Automation', 'Optimization', 'Performance'],
      iconBg: '#fee2e2',
      iconColor: '#ef4444',
    },
    {
      icon: Bot,
      title: 'AI Content Assistant',
      description: 'Generate SEO-optimized content with our AI writing assistant that understands search intent and creates engaging, conversion-focused copy.',
      tags: ['Content', 'Writing', 'SEO'],
      iconBg: '#f0fdf4',
      iconColor: '#22c55e',
    },
  ]
}) => {
  return (
    <Box sx={{ py: 4 }}>
      <SectionTitle>
        Powered by Advanced AI Technology
      </SectionTitle>
      <SectionSubtitle>
        Experience the future of digital optimization with our comprehensive AI-driven platform
        that delivers intelligent insights and automated optimization solutions.
      </SectionSubtitle>

      <AIFeaturesGridContainer container spacing={3}>
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard index={index}>
                <FeatureCardContent>
                  <FeatureIcon bgColor={feature.iconBg}>
                    <IconComponent size={32} color={feature.iconColor} />
                  </FeatureIcon>

                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>

                  <FeatureTags>
                    {feature.tags.map((tag, tagIndex) => (
                      <FeatureChip
                        key={tagIndex}
                        label={tag}
                        size="small"
                        variant="outlined"
                      />
                    ))}
                  </FeatureTags>
                </FeatureCardContent>
              </FeatureCard>
            </Grid>
          );
        })}
      </AIFeaturesGridContainer>
    </Box>
  );
};

export default AIFeaturesSection;