import { jsPDF } from 'jspdf';
import { PortfolioData } from '@/types/portfolio';

export async function generateResumePDF(portfolioData: PortfolioData): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  const leftMargin = margin;
  const rightMargin = pageWidth - margin;
  let yPosition = margin;
  const lineHeight = 6;
  const sectionSpacing = 10;
  const subsectionSpacing = 8;

  // Color scheme - simple and readable
  const colors = {
    primary: [37, 99, 235] as [number, number, number],      // Blue
    textPrimary: [0, 0, 0] as [number, number, number],      // Black
    textSecondary: [60, 60, 60] as [number, number, number], // Dark gray
    textTertiary: [100, 100, 100] as [number, number, number], // Gray
  };

  // Helper function to add a new page if needed
  const checkPageBreak = (requiredSpace: number) => {
    if (yPosition + requiredSpace > pageHeight - margin) {
      doc.addPage();
      yPosition = margin;
      return true;
    }
    return false;
  };

  // Helper function to add text with word wrap
  const addText = (
    text: string,
    fontSize: number,
    options: {
      isBold?: boolean;
      color?: [number, number, number];
      x?: number;
      align?: 'left' | 'center' | 'right';
      maxWidth?: number;
      spacing?: number;
    } = {}
  ) => {
    const {
      isBold = false,
      color = colors.textPrimary,
      x = leftMargin,
      align = 'left',
      maxWidth = pageWidth - (leftMargin * 2),
      spacing = lineHeight,
    } = options;

    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    
    const lines = doc.splitTextToSize(text, maxWidth);
    
    lines.forEach((line: string) => {
      checkPageBreak(spacing);
      doc.text(line, x, yPosition, { align });
      yPosition += spacing;
    });
  };

  // Helper to add a section header
  const addSectionHeader = (title: string) => {
    checkPageBreak(15);
    yPosition += 5;
    
    // Section title - bold and colored
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.text(title, leftMargin, yPosition);
    
    // Underline
    yPosition += 2;
    doc.setDrawColor(colors.primary[0], colors.primary[1], colors.primary[2]);
    doc.setLineWidth(0.5);
    doc.line(leftMargin, yPosition, rightMargin, yPosition);
    
    yPosition += 5;
  };

  // ========== HEADER SECTION ==========
  yPosition = 20;
  
  // Name
  addText(portfolioData.personalInfo.name, 24, {
    isBold: true,
    color: colors.textPrimary,
    x: leftMargin,
    spacing: 8,
  });
  
  // Title - Bold and highlighted
  const titleText = portfolioData.personalInfo.title;
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(colors.primary[0], colors.primary[1], colors.primary[2]);
  const titleLines = doc.splitTextToSize(titleText, pageWidth - (leftMargin * 2));
  titleLines.forEach((line: string) => {
    checkPageBreak(7);
    doc.text(line, leftMargin, yPosition);
    yPosition += 7;
  });
  
  yPosition += 2;
  
  // Contact info
  const contactInfo = `${portfolioData.personalInfo.location} | ${portfolioData.personalInfo.email} | ${portfolioData.personalInfo.phone}`;
  addText(contactInfo, 10, {
    isBold: false,
    color: colors.textSecondary,
    x: leftMargin,
    spacing: 5,
  });
  
  // Social Links
  if (portfolioData.socialLinks && portfolioData.socialLinks.length > 0) {
    const socialIcons: Record<string, string> = {
      'LinkedIn': 'LinkedIn',
      'GitHub': 'GitHub',
      'Github': 'GitHub',
      'Twitter': 'Twitter',
      'Email': 'Email',
      'Gmail': 'Email',
      'Facebook': 'Facebook',
      'Instagram': 'Instagram',
      'YouTube': 'YouTube',
      'Website': 'Website',
    };
    
    const socialLinksText = portfolioData.socialLinks
      .map(link => {
        const platform = socialIcons[link.platform] || link.platform;
        return `${platform}: ${link.url.replace(/^https?:\/\//, '').replace(/^mailto:/, '')}`;
      })
      .join(' | ');
    
    addText(socialLinksText, 9, {
      isBold: false,
      color: colors.textSecondary,
      x: leftMargin,
      spacing: 5,
    });
  }
  
  yPosition += 5;

  // ========== PROFESSIONAL SUMMARY ==========
  addSectionHeader('PROFESSIONAL SUMMARY');
  
  if (portfolioData.personalInfo.bio) {
    addText(portfolioData.personalInfo.bio, 10, {
      isBold: false,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: lineHeight,
    });
    yPosition += subsectionSpacing;
  }

  // ========== KEY ACHIEVEMENTS ==========
  addSectionHeader('KEY ACHIEVEMENTS');
  
  // Calculate statistics
  const yearsExperience = portfolioData.experience.length > 0 
    ? portfolioData.experience.reduce((acc, exp) => acc + 2, 0)
    : 10.5;
  const topCompanies = portfolioData.experience.length > 0 
    ? new Set(portfolioData.experience.map(exp => exp.company)).size 
    : 6;
  const projectsDelivered = portfolioData.projects.length || 15;
  const leadershipYears = portfolioData.experience.length > 0
    ? portfolioData.experience.filter(exp => 
        exp.role.toLowerCase().includes('lead') || 
        exp.role.toLowerCase().includes('senior') ||
        exp.role.toLowerCase().includes('manager')
      ).length * 2
    : 4;

  const achievements = [
    `• ${yearsExperience}+ Years of Experience`,
    `• Worked with ${topCompanies} Top Companies`,
    `• Delivered ${projectsDelivered}+ Projects`,
    `• ${leadershipYears} Years of Leadership Experience`,
  ];

  achievements.forEach((achievement) => {
    addText(achievement, 10, {
      isBold: false,
      color: colors.textPrimary,
      x: leftMargin + 5,
      spacing: lineHeight,
    });
  });
  
  yPosition += subsectionSpacing;

  // ========== WORK EXPERIENCE ==========
  addSectionHeader('WORK EXPERIENCE');
  
  portfolioData.experience.forEach((exp, index) => {
    checkPageBreak(25);
    
    // Role
    addText(exp.role, 12, {
      isBold: true,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: 5,
    });
    
    // Company
    addText(exp.company, 11, {
      isBold: true,
      color: colors.primary,
      x: leftMargin,
      spacing: 4,
    });
    
    // Duration and location
    const durationLocation = `${exp.duration}${exp.location ? ` | ${exp.location}` : ''}${exp.current ? ' (Current)' : ''}`;
    addText(durationLocation, 9, {
      isBold: false,
      color: colors.textSecondary,
      x: leftMargin,
      spacing: 4,
    });
    
    yPosition += 2;
    
    // Description points
    exp.description.forEach((desc) => {
      checkPageBreak(lineHeight + 2);
      addText(`• ${desc}`, 9, {
        isBold: false,
        color: colors.textPrimary,
        x: leftMargin + 5,
        spacing: lineHeight,
      });
    });

    yPosition += subsectionSpacing;
  });

  // ========== EDUCATION ==========
  addSectionHeader('EDUCATION');
  
  portfolioData.education.forEach((edu) => {
    checkPageBreak(15);
    
    // Degree
    addText(`${edu.degree}${edu.field ? ` - ${edu.field}` : ''}`, 11, {
      isBold: true,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: 4,
    });
    
    // Institution
    addText(edu.institution, 10, {
      isBold: false,
      color: colors.primary,
      x: leftMargin,
      spacing: 4,
    });
    
    // Duration and location
    addText(`${edu.duration}${edu.location ? ` | ${edu.location}` : ''}`, 9, {
      isBold: false,
      color: colors.textSecondary,
      x: leftMargin,
      spacing: 4,
    });
    
    yPosition += subsectionSpacing;
  });

  // ========== TECHNICAL SKILLS ==========
  addSectionHeader('TECHNICAL SKILLS & TOOLS');
  
  // Group skills by category
  const skillsByCategory: Record<string, string[]> = {};
  portfolioData.skills.forEach((skill) => {
    const category = skill.category === 'technical' 
      ? 'Technical Skills' 
      : skill.category === 'tool' 
        ? 'Tools & Technologies' 
        : 'Professional Skills';
    if (!skillsByCategory[category]) {
      skillsByCategory[category] = [];
    }
    skillsByCategory[category].push(skill.name);
  });

  Object.entries(skillsByCategory).forEach(([category, skills]) => {
    checkPageBreak(15);
    
    // Category header
    addText(category + ':', 10, {
      isBold: true,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: 4,
    });
    
    // Skills list
    const skillsText = skills.join(', ');
    addText(skillsText, 9, {
      isBold: false,
      color: colors.textPrimary,
      x: leftMargin + 5,
      spacing: lineHeight,
    });
    
    yPosition += subsectionSpacing - 2;
  });

  // ========== SOCIAL LINKS & CONTACT ==========
  addSectionHeader('CONNECT WITH ME');
  
  if (portfolioData.socialLinks && portfolioData.socialLinks.length > 0) {
    portfolioData.socialLinks.forEach((link) => {
      checkPageBreak(8);
      const linkText = `${link.platform}: ${link.url}`;
      addText(linkText, 9, {
        isBold: false,
        color: colors.textPrimary,
        x: leftMargin,
        spacing: lineHeight,
      });
    });
  }
  
  if (portfolioData.personalInfo.email) {
    addText(`Email: ${portfolioData.personalInfo.email}`, 9, {
      isBold: false,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: lineHeight,
    });
  }
  
  yPosition += subsectionSpacing;

  // ========== KEY PROJECTS ==========
  addSectionHeader('KEY PROJECTS');
  
  portfolioData.projects.forEach((project, index) => {
    checkPageBreak(20);
    
    // Project name
    addText(project.name, 11, {
      isBold: true,
      color: colors.textPrimary,
      x: leftMargin,
      spacing: 4,
    });
    
    // Description
    addText(project.description, 9, {
      isBold: false,
      color: colors.textPrimary,
      x: leftMargin + 5,
      spacing: lineHeight,
    });
    
    yPosition += 2;
    
    // Technologies
    addText(`Technologies: ${project.technologies.join(', ')}`, 8, {
      isBold: false,
      color: colors.textSecondary,
      x: leftMargin + 5,
      spacing: lineHeight,
    });
    
    yPosition += subsectionSpacing;
  });

  // ========== FOOTER ==========
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    
    // Page number
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(colors.textTertiary[0], colors.textTertiary[1], colors.textTertiary[2]);
    doc.text(
      `Page ${i} of ${totalPages}`,
      pageWidth / 2,
      pageHeight - 10,
      { align: 'center' }
    );
  }

  // Generate filename
  const name = portfolioData.personalInfo.name.replace(/\s+/g, '_');
  const filename = `${name}_Resume.pdf`;

  // Save the PDF
  doc.save(filename);
}
