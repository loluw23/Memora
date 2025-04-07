
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto py-10 px-4">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link to="/signup" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Sign Up
            </Link>
          </Button>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
          
          <div className="prose max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Memora! These Terms of Service govern your use of our platform and services. 
              By using Memora, you agree to these terms in full. If you disagree with any part of these 
              terms, you may not use our services.
            </p>
            
            <h2>2. Use of Service</h2>
            <p>
              Memora provides tools for learning, including flashcards, quizzes, and worksheets. You 
              are responsible for your use of the service and any content you create or share. You must 
              not use the service for any illegal or unauthorized purpose.
            </p>
            
            <h2>3. Account Registration</h2>
            <p>
              You must provide accurate and complete information when creating an account. You are 
              responsible for maintaining the security of your account and password. You must notify us 
              immediately of any security breach or unauthorized use of your account.
            </p>
            
            <h2>4. Content Rights</h2>
            <p>
              You retain ownership of any content you create on Memora. By uploading content, you grant 
              us a license to use, modify, and display that content in connection with providing the service. 
              You must not upload content that violates any third-party rights.
            </p>
            
            <h2>5. Privacy</h2>
            <p>
              Our Privacy Policy describes how we handle your personal information. By using Memora, 
              you consent to the collection and use of information as detailed in our Privacy Policy.
            </p>
            
            <h2>6. Changes to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of the service at any time. 
              We will notify users of significant changes to our services or terms.
            </p>
            
            <h2>7. Limitation of Liability</h2>
            <p>
              Memora is provided "as is" without warranties of any kind. We shall not be liable for any 
              indirect, incidental, special, or consequential damages arising from your use of the service.
            </p>
            
            <h2>8. Termination</h2>
            <p>
              We may terminate or suspend your account at our discretion without notice if you violate 
              these Terms of Service. You may also terminate your account at any time by contacting us.
            </p>
            
            <h2>9. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction 
              where we are based, without regard to its conflict of law provisions.
            </p>
            
            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. We will notify users of 
              significant changes. Your continued use of Memora after changes constitutes acceptance of 
              the new terms.
            </p>
            
            <p className="mt-8">
              Last updated: April 7, 2025
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
