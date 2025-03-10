import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const formEntries = Array.from(formData.entries());
    
    // Basic validation for required fields
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const phone = formData.get('phone');
    
    if (!name || !email || !company || !phone) {
      return NextResponse.json(
        { error: 'Name, email, company, and phone are required' },
        { status: 400 }
      );
    }

    // Format the email content
    let emailContent = 'REQUEST FOR QUOTE DETAILS:\n\n';
    
    // Group form data by sections
    const generalInfo = ['name', 'title', 'company', 'email', 'phone', 'website', 'address'];
    const certificationInfo = ['productType', 'powerInput', 'clockFrequency', 'environmentalRating', 'modelNumbers', 'productWeight'];
    
    // Add General Information section
    emailContent += '## GENERAL INFORMATION\n';
    formEntries.forEach(([key, value]) => {
      if (generalInfo.includes(key.toString()) && value) {
        emailContent += `${key.toString().charAt(0).toUpperCase() + key.toString().slice(1)}: ${value}\n`;
      }
    });
    
    // Add Certification Areas section
    emailContent += '\n## CERTIFICATION AREAS\n';
    const certificationAreas = formData.getAll('certificationAreas');
    if (certificationAreas.length > 0) {
      emailContent += `Selected areas: ${certificationAreas.join(', ')}\n`;
    }
    
    // Add Other Certification Areas section
    const otherCertificationAreas = formData.getAll('otherCertificationAreas');
    if (otherCertificationAreas.length > 0) {
      emailContent += `Other certification areas: ${otherCertificationAreas.join(', ')}\n`;
    }
    
    // Add specific certification details
    const specificCertifications = [
      'ceSpecific', 'northAmericaSpecific', 'chinaSpecific', 'indiaSpecific', 
      'japanSpecific', 'koreaSpecific', 'mexicoSpecific', 'russiaSpecific',
      'southAmericaSpecific', 'taiwanSpecific', 'australiaSpecific'
    ];
    
    specificCertifications.forEach(certType => {
      const values = formData.getAll(certType);
      if (values.length > 0) {
        emailContent += `\n${certType}: ${values.join(', ')}\n`;
      }
    });
    
    // Add Product Information section
    emailContent += '\n## PRODUCT INFORMATION\n';
    formEntries.forEach(([key, value]) => {
      if (certificationInfo.includes(key.toString()) && value) {
        emailContent += `${key.toString().charAt(0).toUpperCase() + key.toString().slice(1)}: ${value}\n`;
      }
    });
    
    // Add deadline information
    const deadline = formData.get('deadline');
    if (deadline) {
      emailContent += `\nDeadline for Certification: ${deadline}\n`;
    }
    
    // Add additional comments
    const comments = formData.get('comments');
    if (comments) {
      emailContent += '\n## ADDITIONAL COMMENTS\n';
      emailContent += comments;
    }
    
    // Add lead source information
    const leadSource = formData.get('leadSource');
    if (leadSource) {
      emailContent += '\n\nLead Source: ' + leadSource;
    }
    
    const keyword = formData.get('keyword');
    if (keyword) {
      emailContent += '\nKeyword: ' + keyword;
    }
    
    // Send the email
    const data = await resend.emails.send({
      from: 'Quote Request <onboarding@resend.dev>',
      to: ['contact@certipathcompliance.com'],
      subject: `New Quote Request from ${name} at ${company}`,
      replyTo: email.toString(),
      text: emailContent,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending quote request:', error);
    return NextResponse.json(
      { error: 'Failed to send quote request' },
      { status: 500 }
    );
  }
} 