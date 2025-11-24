import { Batch } from '../types';
import { FLOURS } from '../flours-constants';
import { generateTechnicalMethod } from '../logic/methodGenerator';

// Assuming jsPDF is loaded from a CDN as per index.html
declare global {
  interface Window {
    jspdf: any;
  }
}

// Style Constants for Artisan Look (Green Accents)
const COLORS = {
  PRIMARY: [132, 204, 22], // Lime-500 (#84cc16)
  TEXT_DARK: [15, 23, 42], // Slate-900
  TEXT_GRAY: [71, 85, 105], // Slate-600
  DIVIDER: [226, 232, 240], // Slate-200
  WHITE: [255, 255, 255]
};

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
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
        doc.text('DoughLabPro', MARGIN_X, cursorY);
        
        cursorY += 12;

        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        const titleLines = doc.splitTextToSize(batch.name, CONTENT_WIDTH);
        doc.text(titleLines, MARGIN_X, cursorY);
        cursorY += (titleLines.length * 10) + 5;

        // --- 2. METRICS GRID (Hydration, Servings, Weight, Time) ---
        const colWidth = CONTENT_WIDTH / 4;
        const metricsY = cursorY;
        
        const drawMetric = (label: string, value: string, x: number) => {
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]); // Green Label
            doc.text(label, x, metricsY);
            
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]); // Dark Value
            doc.text(value, x, metricsY + 6);
        };

        // Metric 1: Hydration
        drawMetric('Hydration', `${batch.doughConfig.hydration}%`, MARGIN_X);
        
        // Metric 2: Servings
        const servingsLabel = batch.doughConfig.bakeType === 'PIZZAS' 
            ? `${batch.doughConfig.numPizzas} Pizzas` 
            : `${batch.doughConfig.numPizzas} Loaves`;
        drawMetric('Yield', servingsLabel, MARGIN_X + colWidth);

        // Metric 3: Total Weight
        const totalWeight = batch.doughResult ? batch.doughResult.totalDough.toFixed(0) : '0';
        drawMetric('Total Weight', `${totalWeight}g`, MARGIN_X + (colWidth * 2));

        // Metric 4: Time
        let timeString = "N/A";
        if (batch.bulkTimeHours || batch.proofTimeHours) {
             timeString = `${(batch.bulkTimeHours || 0) + (batch.proofTimeHours || 0)}h`;
        } else {
            // Try to infer from fermentation technique or description
            if (batch.doughConfig.fermentationTechnique === 'DIRECT') timeString = "2-6h";
            else timeString = "12h+";
        }
        drawMetric('Total Time', timeString, MARGIN_X + (colWidth * 3));

        cursorY += 20;

        // --- 3. INGREDIENTS SECTION ---
        checkPageBreak(60);
        
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        doc.text('Ingredients', MARGIN_X, cursorY);
        
        cursorY += 3;
        drawDivider(cursorY);
        cursorY += 10;

        if (batch.doughResult) {
            const ingredients = batch.doughResult.ingredientWeights || [];
            
            // Fallback if ingredientWeights is missing (legacy data)
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
                doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]);
                doc.text(ing.name, MARGIN_X, cursorY);

                // Weight (Right)
                doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
                const weightTxt = `${ing.weight.toFixed(0)} g`;
                
                const textWidth = doc.getTextWidth(weightTxt);
                doc.text(weightTxt, PAGE_WIDTH - MARGIN_X - textWidth, cursorY);

                cursorY += 8;
            });
        }

        cursorY += 10;

        // --- 4. METHOD SECTION ---
        // We use the generateTechnicalMethod to get the steps
        const steps = generateTechnicalMethod(batch.doughConfig, batch.doughResult!);

        checkPageBreak(40);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
        doc.text('Method', MARGIN_X, cursorY);
        
        cursorY += 3;
        drawDivider(cursorY);
        cursorY += 15;

        steps.forEach((step, index) => {
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            
            // Instructions wrapping
            doc.setFont('helvetica', 'normal');
            const instructions = doc.splitTextToSize(step.actionInstructions, CONTENT_WIDTH - 15); // Indented
            const stepHeight = 10 + (instructions.length * 5) + 10; 

            checkPageBreak(stepHeight);

            // Number Circle
            const circleX = MARGIN_X + 4;
            const circleY = cursorY - 4;
            doc.setFillColor(COLORS.PRIMARY[0], COLORS.PRIMARY[1], COLORS.PRIMARY[2]);
            doc.circle(circleX, circleY, 4, 'F');
            
            doc.setTextColor(COLORS.WHITE[0], COLORS.WHITE[1], COLORS.WHITE[2]);
            doc.setFontSize(9);
            doc.setFont('helvetica', 'bold');
            const numStr = String(index + 1);
            const numWidth = doc.getTextWidth(numStr);
            doc.text(numStr, circleX - (numWidth / 2), circleY + 1.2);

            // Title
            doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]); 
            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            doc.text(step.title, MARGIN_X + 15, circleY + 1);

            // Instructions
            cursorY += 5;
            doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]); 
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(instructions, MARGIN_X + 15, cursorY);

            cursorY += (instructions.length * 5) + 12;
        });

        // --- 5. NOTES ---
        if (batch.notes && batch.notes.trim().length > 0) {
             checkPageBreak(40);
             drawDivider(cursorY);
             cursorY += 10;
             
             doc.setFontSize(14);
             doc.setFont('helvetica', 'bold');
             doc.setTextColor(COLORS.TEXT_DARK[0], COLORS.TEXT_DARK[1], COLORS.TEXT_DARK[2]);
             doc.text('Notes', MARGIN_X, cursorY);
             cursorY += 8;
             
             doc.setFontSize(10);
             doc.setFont('helvetica', 'italic');
             doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]);
             const noteLines = doc.splitTextToSize(batch.notes, CONTENT_WIDTH);
             doc.text(noteLines, MARGIN_X, cursorY);
             cursorY += (noteLines.length * 5) + 10;
        }

        // --- 6. FOOTER ---
        const footerY = PAGE_HEIGHT - 10;
        doc.setDrawColor(COLORS.DIVIDER[0], COLORS.DIVIDER[1], COLORS.DIVIDER[2]);
        doc.setLineWidth(0.2);
        doc.line(MARGIN_X, footerY - 5, PAGE_WIDTH - MARGIN_X, footerY - 5);
        
        doc.setFontSize(8);
        doc.setTextColor(COLORS.TEXT_GRAY[0], COLORS.TEXT_GRAY[1], COLORS.TEXT_GRAY[2]);
        const footerText = 'Generated with DoughLabPro | doughlabpro.com';
        const footerWidth = doc.getTextWidth(footerText);
        doc.text(footerText, (PAGE_WIDTH - footerWidth) / 2, footerY);

        const safeName = batch.name.replace(/[^a-z0-9]/gi, '_').toLowerCase();
        const date = batch.createdAt.split('T')[0];
        doc.save(`doughlab-${date}-${safeName}.pdf`);

    } catch (error) {
        console.error("Failed to export batch to PDF:", error);
        throw new Error("Failed to generate PDF file.");
    }
};