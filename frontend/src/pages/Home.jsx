import React, { useState, useEffect } from 'react';
import {
  Container,
  Stack,
  Text,
  Button,
  Textarea,
  Group,
  Collapse,
  Switch,
  Transition,
  useMantineTheme,
  Space,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconStars, IconFileUpload, IconBriefcase, IconChevronRight } from '@tabler/icons-react';
import axios from 'axios';

// Components
import ResumeUpload from '../components/ResumeUpload';
import JobInputForm from '../components/JobInputForm';
import JobResults from '../components/JobResults';
import PageHeader from '../components/PageHeader';
import StepCard from '../components/StepCard';
import FancyLoader from '../components/FancyLoader';
import ErrorDisplay from '../components/ErrorDisplay';

const Home = () => {
  const theme = useMantineTheme();

  // State for form data
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState('');
  const [jobDetails, setJobDetails] = useState([]);
  const [jobResults, setJobResults] = useState([]);
  const [customInstructions, setCustomInstructions] = useState('');
  const [atsAnalysis, setAtsAnalysis] = useState(null);

  // UI state
  const [loading, handlers] = useDisclosure(false);
  const [showCustomInstructions, { toggle: toggleCustomInstructions }] = useDisclosure(false);
  const [error, setError] = useState(null);
  const [activeStep, setActiveStep] = useState(1);
  const [showResultsAnimation, setShowResultsAnimation] = useState(false);

  // Check which steps are completed
  const isStep1Complete = resumeFile || resumeText;
  const isStep2Complete = jobDetails.length > 0;

  // Update active step based on completion
  useEffect(() => {
    if (!isStep1Complete) {
      setActiveStep(1);
    } else if (!isStep2Complete) {
      setActiveStep(2);
    } else {
      setActiveStep(3);
    }
  }, [isStep1Complete, isStep2Complete]);

  const handleAnalyze = async () => {
    if ((!resumeFile && !resumeText) || jobDetails.length === 0) {
      notifications.show({
        title: 'Missing Information',
        message: 'Please provide a resume and at least one job listing',
        color: 'red',
      });
      return;
    }

    setError(null);
    handlers.open();
    const formData = new FormData();

    // Handle resume input
    if (resumeFile) {
      formData.append('resume', resumeFile);
    } else if (resumeText) {
      const textFile = new Blob([resumeText], { type: 'text/plain' });
      formData.append('resume', textFile, 'resume.txt');
    }

    // Convert job details to a JSON string (Even if empty)
    formData.append('job_links', JSON.stringify(jobDetails || []));

    try {
      // Convert job details to a JSON string
      const jobDetailsJson = JSON.stringify(jobDetails);
      formData.append('job_details', jobDetailsJson);
    } catch (error) {
      console.error('Error stringifying job details:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to process job details',
        color: 'red',
      });
      handlers.close();
      return;
    }

    // Add custom instructions if provided
    if (customInstructions.trim()) {
      formData.append('custom_instructions', customInstructions);
    }

    try {
      const response = await axios.post('http://localhost:5050/api/analyze', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        // Extract job analysis results
        const results = response.data.results || [];
        setJobResults(results);

        // Extract ATS analysis if available
        if (response.data.ats_analysis) {
          setAtsAnalysis(response.data.ats_analysis);
        }

        // Show success notification
        notifications.show({
          title: 'Success',
          message: 'Resume analysis completed successfully',
          color: 'green',
        });

        // Trigger animation for results
        setShowResultsAnimation(true);
      } else {
        throw new Error(response.data.error || 'Analysis failed');
      }
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setError(error.response?.data?.error || 'Error analyzing resume. Please try again.');
    } finally {
      handlers.close();
    }
  };

  // Prepare resume blob for components
  const getResumeBlob = () => {
    if (resumeFile) {
      return resumeFile;
    } else if (resumeText) {
      return new Blob([resumeText], { type: 'text/plain' });
    }
    return null;
  };

  return (
    <Container size="lg" py="xl">
      {/* Page Header */}
      <PageHeader
        title="Job Fit Analysis"
        description="Upload your resume and add job details to analyze your match score. Our AI-powered tool will help you understand how well your skills match the positions you're interested in."
        icon={<IconStars size={28} />}
      />

      <Stack spacing="xl">
        {/* Step 1: Resume Upload */}
        <StepCard
          title="Upload Resume"
          stepNumber={1}
          icon={<IconFileUpload size={18} />}
          badge="Required"
          badgeColor="blue"
          isActive={activeStep === 1}
          isCompleted={isStep1Complete && activeStep !== 1}
        >
          <ResumeUpload
            setResumeFile={setResumeFile}
            resumeText={resumeText}
            setResumeText={setResumeText}
          />
        </StepCard>

        {/* Step 2: Job Details */}
        <StepCard
          title="Enter Job Details"
          stepNumber={2}
          icon={<IconBriefcase size={18} />}
          badge="Required"
          badgeColor="blue"
          isActive={activeStep === 2}
          isCompleted={isStep2Complete && activeStep !== 2}
        >
          <JobInputForm jobDetails={jobDetails} setJobDetails={setJobDetails} />
        </StepCard>

        {/* Step 3: Customize Analysis */}
        <StepCard
          title="Customize Analysis"
          stepNumber={3}
          icon={<IconStars size={18} />}
          badge="Optional"
          badgeColor="gray"
          isActive={activeStep === 3}
          isCompleted={activeStep > 3}
        >
          <Stack spacing="md">
            <Group position="apart">
              <Text>Add custom instructions for more personalized analysis</Text>
              <Switch
                label="Add custom instructions"
                checked={showCustomInstructions}
                onChange={toggleCustomInstructions}
                sx={{
                  transition: 'all 0.2s ease',
                }}
              />
            </Group>

            <Collapse in={showCustomInstructions} transitionDuration={300}>
              <Textarea
                placeholder="Add custom instructions for the analysis (e.g., 'Focus on data science skills', 'Emphasize leadership experience')"
                label="Custom Instructions"
                minRows={3}
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.currentTarget.value)}
              />
            </Collapse>

            <Space h="md" />

            <Button
              onClick={handleAnalyze}
              disabled={(!resumeFile && !resumeText) || jobDetails.length === 0}
              loading={loading}
              fullWidth
              size="lg"
              rightIcon={<IconChevronRight size={18} />}
              variant="gradient"
              gradient={{ from: '#3498db', to: '#2E86C1' }}
              sx={{
                height: 50,
                fontSize: '1.1rem',
                transition: 'all 0.3s ease',
                '&:hover:not(:disabled)': {
                  transform: 'translateY(-3px)',
                  boxShadow: theme.shadows.md,
                },
              }}
            >
              {loading ? 'Analyzing...' : 'Analyze Job Fit'}
            </Button>
          </Stack>
        </StepCard>

        {/* Loading Overlay */}
        <FancyLoader
          visible={loading}
          message="Our AI is analyzing your resume against job descriptions. This may take a moment..."
        />

        {/* Error Display */}
        {error && (
          <ErrorDisplay
            title="Analysis Error"
            message="We encountered an issue while analyzing your resume."
            error={error}
            onRetry={handleAnalyze}
          />
        )}

        {/* Results Section */}
        <Transition
          mounted={showResultsAnimation && jobResults.length > 0}
          transition="slide-up"
          duration={500}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <JobResults
                results={jobResults}
                resumeFile={getResumeBlob()}
                ats_analysis={atsAnalysis}
              />
            </div>
          )}
        </Transition>
      </Stack>
    </Container>
  );
};

export default Home;
