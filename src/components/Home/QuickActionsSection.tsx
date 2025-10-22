import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Button, TextField, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { BarChart3, Search, LucideIcon } from 'lucide-react';

const QuickActionsGridContainer = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

const ActionCard = styled(Card)(({ theme }) => ({
  borderRadius: 0,
  border: 'none',
  cursor: 'default',
  transition: 'none',
  display: 'block',
  height: '100%',
  boxShadow: 'none',
  '& .MuiCardContent-root': {
    paddingTop: theme.spacing(2.5),
    paddingBottom: theme.spacing(2.5),
  },
}));

const ActionCardContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  minHeight: 320,
  display: 'grid',
  gridTemplateColumns: '80px 1fr 200px',
  gap: theme.spacing(3),
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    alignItems: 'stretch',
    minHeight: 'auto',
  },
}));

const ActionIcon = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  minWidth: 80,
  borderRadius: 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  flexShrink: 0,
}));

const ActionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(0.5),
}));

const ActionDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.95rem',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: 10,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
}));

interface QuickAction {
  icon: LucideIcon;
  title: string;
  description: string;
  path?: string;
  buttonText?: string;
  hasInput?: boolean;
}

interface QuickActionsSectionProps {
  actions?: QuickAction[];
}

const QuickActionsSection: React.FC<QuickActionsSectionProps> = ({
  actions = [
    {
      icon: BarChart3,
      title: 'Facebook Ads',
      description: 'Monitor and optimize your Meta advertising campaigns',
      path: '/facebook-ads',
      buttonText: 'View Dashboard',
    },
    {
      icon: Search,
      title: 'SEO Analysis',
      description: 'Analyze website performance and SEO metrics',
      hasInput: true,
    },
  ]
}) => {
  const navigate = useNavigate();
  const [seoUrl, setSeoUrl] = useState('');

  const handleAnalyzeUrl = () => {
    if (seoUrl.trim()) {
      navigate('/seo-analysis', { state: { url: seoUrl.trim() } });
    }
  };

  return (
    <QuickActionsGridContainer container spacing={0}>
      {actions.map((action, index) => {
        const IconComponent = action.icon;
        return (
          <Grid item xs={12} md={6} key={index} sx={{ height: '100%' }}>
            {action.hasInput ? (
              <ActionCard
                sx={{
                  cursor: 'default',
                  height: '100%',
                  background: (theme) => index === 0
                    ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.04)})`
                    : `linear-gradient(90deg, ${alpha(theme.palette.grey[50], 1)}, ${alpha(theme.palette.background.paper, 1)})`,
                  borderTopLeftRadius: index === 0 ? 12 : 0,
                  borderBottomLeftRadius: index === 0 ? 12 : 0,
                  borderTopRightRadius: index === 1 ? 12 : 0,
                  borderBottomRightRadius: index === 1 ? 12 : 0,
                }}
              >
                <ActionCardContent>
                  <ActionIcon aria-hidden>
                    <IconComponent size={32} color="#fff" />
                  </ActionIcon>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ActionTitle variant="h6">{action.title}</ActionTitle>
                    <ActionDescription>{action.description}</ActionDescription>

                    <Box sx={{ mt: 2, display: 'flex', gap: 2, alignItems: 'center', flexDirection: { xs: 'column', md: 'row' } }}>
                      <TextField
                        placeholder="https://example.com"
                        value={seoUrl}
                        onChange={(e) => setSeoUrl(e.target.value)}
                        variant="outlined"
                         fullWidth
                        aria-label="Website URL"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Search size={16} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                            backgroundColor: (theme) => theme.palette.background.paper,
                            boxShadow: 'none',
                            height: 45,
                          },
                        }}
                      />

                      <ActionButton
                        variant="contained"
                        color="primary"
                        onClick={handleAnalyzeUrl}
                        disabled={!seoUrl.trim()}
                        sx={{ width: { xs: '100%', md: '160px' } }}
                      >
                        Analyze
                      </ActionButton>
                    </Box>
                  </Box>

                  {/* CTA spacer column intentionally left empty for input card */}
                  <Box />
                </ActionCardContent>
              </ActionCard>
            ) : (
              <ActionCard
                onClick={() => action.path && navigate(action.path)}
                role={action.path ? 'button' : undefined}
                sx={{
                  cursor: action.path ? 'pointer' : 'default',
                  height: '100%',
                  background: (theme) => index === 0
                    ? `linear-gradient(90deg, ${alpha(theme.palette.primary.main, 0.12)}, ${alpha(theme.palette.primary.main, 0.04)})`
                    : `linear-gradient(90deg, ${alpha(theme.palette.grey[50], 1)}, ${alpha(theme.palette.background.paper, 1)})`,
                  borderTopLeftRadius: index === 0 ? 12 : 0,
                  borderBottomLeftRadius: index === 0 ? 12 : 0,
                  borderTopRightRadius: index === 1 ? 12 : 0,
                  borderBottomRightRadius: index === 1 ? 12 : 0,
                }}
              >
                <ActionCardContent>
                  <ActionIcon aria-hidden>
                    <IconComponent size={32} color="#fff" />
                  </ActionIcon>

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ActionTitle variant="h6">{action.title}</ActionTitle>
                    <ActionDescription>{action.description}</ActionDescription>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ActionButton
                      variant="outlined"
                      onClick={(e) => { e.stopPropagation(); action.path && navigate(action.path); }}
                      aria-label={action.buttonText}
                      sx={{ width: { xs: '100%', md: '160px' } }}
                    >
                      {action.buttonText}
                    </ActionButton>
                  </Box>
                </ActionCardContent>
              </ActionCard>
            )}
          </Grid>
        );
      })}
    </QuickActionsGridContainer>
  );
};

export default QuickActionsSection;