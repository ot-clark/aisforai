import { NextRequest, NextResponse } from 'next/server';
import { onboardingFormSchema } from '@/types/onboarding';
import { validateFormData, createApiError } from '@/utils/validation';
import { supabaseAdmin } from '@/utils/supabase-admin';

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Debug: Log the incoming data
    console.log('Incoming form data:', JSON.stringify(body, null, 2));

    // Remove fraudRisk if present
    const { fraudRisk, ...filteredBody } = body;

    // Validate the incoming data (ignore fraudRisk)
    const validation = validateFormData(onboardingFormSchema, filteredBody);
    
    if (!validation.success) {
      console.error('Validation errors:', validation.errors);
      const error = createApiError(
        'Validation failed',
        'VALIDATION_ERROR',
        400,
        validation.errors
      );
      
      return NextResponse.json(
        { success: false, error },
        { status: 400 }
      );
    }

    const formData = validation.data;
    console.log('Validated form data:', JSON.stringify(formData, null, 2));

    // Insert into Supabase
    const { error: dbError } = await supabaseAdmin
      .from('onboarding_applications')
      .insert([{ form_data: formData }]);

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      const error = createApiError(
        'Database insert failed',
        'DB_ERROR',
        500,
        [{ field: 'database', message: dbError.message, code: dbError.code || 'DB_ERROR' }]
      );
      return NextResponse.json(
        { success: false, error },
        { status: 500 }
      );
    }

    console.log('Successfully inserted into Supabase');

    const onboardingId = `onboarding_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Return success response
    return NextResponse.json({
      success: true,
      data: {
        onboardingId,
        status: 'pending',
        nextSteps: [
          'Review your application details',
          'Our team will review your application within 24-48 hours',
          'You will receive an email with next steps',
          'Set up your affiliate dashboard once approved'
        ]
      }
    });

  } catch (error) {
    console.error('Onboarding submission error:', error);
    
    const apiError = createApiError(
      'Internal server error',
      'INTERNAL_ERROR',
      500
    );

    return NextResponse.json(
      { success: false, error: apiError },
      { status: 500 }
    );
  }
}

// Rate limiting middleware (basic implementation)
function rateLimit(request: NextRequest): boolean {
  // TODO: Implement proper rate limiting
  // For now, just return true to allow all requests
  return true;
}

// CSRF protection (basic implementation)
function validateCSRF(request: NextRequest): boolean {
  // TODO: Implement proper CSRF validation
  // For now, just return true to allow all requests
  return true;
} 