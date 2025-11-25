
import { Batch, DoughConfig, DoughResult } from '../types';
import { FLOURS } from '../flours-constants';
import { generateTechnicalMethod } from '../logic/methodGenerator';

// Assuming jsPDF is loaded from a CDN as per index.html
declare global {
  interface Window {
    jspdf: any;
  }
}

const COLORS = {
  PRIMARY: [132, 204, 22], // Lime-500 (#84cc16)
  TEXT_DARK: [15, 23, 42], // Slate-900
  TEXT_GRAY: [71, 85, 105], // Slate-600
  DIVIDER: [226, 232, 240], // Slate-200
  WHITE: [255, 255, 255]
};

/**
 * Generates a PDF with the specific UI design requested.
 */
export const exportBatchToPDF = (batch: Batch, t: (key: string, options?: any) => string): void => {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        
        // Page Config
        const PAGE_HEIGHT = doc.internal.pageSize.getHeight();
        const PAGE_WIDTH = doc.internal.pageSize.getWidth();
        const MARGIN_X = 20;
        const MARGIN_Y = 20;
        const CONTENT_WIDTH = PAGE_WIDTH - (MARGIN_X * 2);
        
        let cursorY = MARGIN_Y;

        // --- Helpers ---
        const checkPageBreak = (spaceNeeded: number) => {
            if (cursorY + spaceNeeded > PAGE_HEIGHT - MARGIN_Y) {
                doc.addPage();
                cursorY = MARGIN_Y;
            }
        };

        const drawDivider = (y: number) => {
            doc.setDrawColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]); // Green divider
            doc.setLineWidth(0.5);
            doc.line(MARGIN_X, y, PAGE_WIDTH - MARGIN_X, y);
        };

        // --- 1. HEADER ---
        // Brand
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]); 
        // Simple circle icon
        doc.setDrawColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
        doc.setLineWidth(1.5);
        doc.circle(MARGIN_X + 2, cursorY - 1, 3, 'S'); 
        doc.text('DoughLabPro', MARGIN_X + 8, cursorY);
        
        cursorY += 20;

        // Recipe Title
        doc.setFontSize(28);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        const titleLines = doc.splitTextToSize(batch.name, CONTENT_WIDTH);
        doc.text(titleLines, MARGIN_X, cursorY);
        cursorY += (titleLines.length * 10) + 5;

        // --- 2. KEY METRICS GRID ---
        // Layout: 4 columns
        const colWidth = CONTENT_WIDTH / 4;
        const metricsY = cursorY;
        
        const drawMetric = (label: string, value: string, x: number) => {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
            doc.text(label, x, metricsY);
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
            doc.text(value, x, metricsY + 6);
        };

        drawMetric('Hydration', `${batch.doughConfig.hydration}%`, MARGIN_X);
        
        const servingsLabel = batch.doughConfig.bakeType === 'PIZZAS' 
            ? `${batch.doughConfig.numPizzas} Pizzas` 
            : `${batch.doughConfig.numPizzas} Loaves`;
        drawMetric('Servings', servingsLabel, MARGIN_X + colWidth);

        const totalWeight = batch.doughResult ? batch.doughResult.totalDough.toFixed(0) : '0';
        drawMetric('Total Dough', `${totalWeight}g`, MARGIN_X + (colWidth * 2));

        // Estimate time based on technique
        let timeString = "2-4 hours";
        if (batch.doughConfig.fermentationTechnique !== 'DIRECT') {
            timeString = "12-24 hours";
        }
        // Or use actual recorded time if available
        if (batch.bulkTimeHours || batch.proofTimeHours) {
             timeString = `${(batch.bulkTimeHours || 0) + (batch.proofTimeHours || 0)} hours`;
        }
        drawMetric('Total Time', timeString, MARGIN_X + (colWidth * 3));

        cursorY += 20;

        // --- 3. INGREDIENTS SECTION ---
        checkPageBreak(60);
        
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        doc.text('Ingredients', MARGIN_X, cursorY);
        
        cursorY += 3;
        drawDivider(cursorY);
        cursorY += 10;

        if (batch.doughResult) {
            const ingredients = batch.doughResult.ingredientWeights || [];
            
            // If ingredientWeights is empty (legacy), build from basics
            if (ingredients.length === 0) {
                 const flourName = FLOURS.find(f => f.id === batch.doughConfig.flourId)?.name || 'Flour';
                 ingredients.push({ name: flourName, weight: batch.doughResult.totalFlour } as any);
                 ingredients.push({ name: 'Water', weight: batch.doughResult.totalWater } as any);
                 if(batch.doughResult.totalSalt > 0) ingredients.push({ name: 'Salt', weight: batch.doughResult.totalSalt } as any);
                 if(batch.doughResult.totalYeast > 0) ingredients.push({ name: 'Yeast', weight: batch.doughResult.totalYeast } as any);
                 if(batch.doughResult.totalOil > 0) ingredients.push({ name: 'Oil', weight: batch.doughResult.totalOil } as any);
                 if(batch.doughResult.totalSugar > 0) ingredients.push({ name: 'Sugar', weight: batch.doughResult.totalSugar } as any);
            }

            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');

            ingredients.forEach((ing) => {
                checkPageBreak(10);
                
                // Name (Left)
                doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
                doc.text(ing.name, MARGIN_X, cursorY);

                // Weight (Right)
                const weightTxt = `${ing.weight.toFixed(1)} g`;
                // Manual right alignment calculation
                const textWidth = doc.getTextWidth(weightTxt);
                doc.text(weightTxt, PAGE_WIDTH - MARGIN_X - textWidth, cursorY);

                cursorY += 10;
            });
        }

        cursorY += 10;

        // --- 4. METHOD SECTION ---
        const steps = generateTechnicalMethod(batch.doughConfig, batch.doughResult!);

        checkPageBreak(40);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        doc.text('Method', MARGIN_X, cursorY);
        
        cursorY += 3;
        drawDivider(cursorY);
        cursorY += 12;

        steps.forEach((step, index) => {
            // Step Title
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            const title = step.title;
            
            // Step Body
            doc.setFontSize(11);
            doc.setFont('helvetica', 'normal');
            const instructions = doc.splitTextToSize(step.actionInstructions, CONTENT_WIDTH - 15);
            
            const stepHeight = 8 + (instructions.length * 6) + 12; 

            checkPageBreak(stepHeight);

            // Draw Number Circle
            const circleX = MARGIN_X + 4;
            const circleY = cursorY - 3;
            doc.setFillColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]); // Green bg
            doc.setDrawColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
            doc.circle(circleX, circleY, 5, 'F');
            
            doc.setTextColor(COLORS.WHITE[0], COLORS.WHITE[1], COLORS.WHITE[2]); // White text
            doc.setFontSize(10);
            doc.setFont('helvetica', 'bold');
            // Center text in circle
            const numStr = String(index + 1);
            const numWidth = doc.getTextWidth(numStr);
            doc.text(numStr, circleX - (numWidth / 2), circleY + 1.5);

            // Step Title
            doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]); // Black text
            doc.setFontSize(12);
            doc.text(title, MARGIN_X + 15, cursorY - 2);

            // Step Body
            cursorY += 6;
            doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]); // Gray text
            doc.setFontSize(11);
            doc.text(instructions, MARGIN_X + 15, cursorY);

            cursorY += (instructions.length * 6) + 15;
        });

        // --- 5. NOTES SECTION (If any) ---
        if (batch.notes && batch.notes.trim().length > 0) {
             checkPageBreak(40);
             drawDivider(cursorY);
             cursorY += 10;
             
             doc.setFontSize(12);
             doc.setFont('helvetica', 'bold');
             doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
             doc.text('Chef Notes', MARGIN_X, cursorY);
             cursorY += 8;
             
             doc.setFontSize(11);
             doc.setFont('helvetica', 'italic');
             doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]);
             const noteLines = doc.splitTextToSize(batch.notes, CONTENT_WIDTH);
             doc.text(noteLines, MARGIN_X, cursorY);
             cursorY += (noteLines.length * 6) + 10;
        }

        // --- 6. FOOTER ---
        const footerY = PAGE_HEIGHT - 15;
        doc.setDrawColor(COLORS.DIVIDER[0], COLORS.DIVIDER[1], COLORS.DIVIDER[2]);
        doc.setLineWidth(0.2);
        doc.line(MARGIN_X, footerY - 5, PAGE_WIDTH - MARGIN_X, footerY - 5);
        
        doc.setFontSize(9);
        doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]);
        const footerText = 'Generated with DoughLabPro | doughlabpro.com';
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (PAGE_WIDTH - footerWidth) / 2, footerY + 5);

        const safeName = batch.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const date = batch.createdAt.split('T')[0];
        doc.save(`doughlab-${date}-${safeName}.pdf`);

    } catch (error) {
        console.error("Failed to export batch to PDF:", error);
        throw new Error("Failed to generate PDF file.");
    }
};
